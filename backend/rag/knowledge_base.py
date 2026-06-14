"""
RAG Knowledge Base using ChromaDB + HuggingFace local embeddings (no API key needed).
"""
import os
import glob
import logging
from pathlib import Path

logger = logging.getLogger("KnowledgeBase")

_vectorstore = None
_retriever = None

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"


def _get_docs_dir() -> str:
    return str(Path(__file__).parent / "docs")


def build_knowledge_base():
    global _vectorstore, _retriever
    try:
        from langchain_huggingface import HuggingFaceEmbeddings
        from langchain_chroma import Chroma
        from langchain_text_splitters import RecursiveCharacterTextSplitter
        from langchain_community.document_loaders import TextLoader

        logger.info(f"Loading embedding model: {EMBEDDING_MODEL}")
        embeddings = HuggingFaceEmbeddings(
            model_name=EMBEDDING_MODEL,
            model_kwargs={"device": "cpu"},
            encode_kwargs={"normalize_embeddings": True}
        )

        docs_dir = _get_docs_dir()
        all_docs = []
        splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=120)

        for file_path in glob.glob(os.path.join(docs_dir, "*.txt")):
            try:
                loader = TextLoader(file_path, encoding="utf-8")
                raw = loader.load()
                chunks = splitter.split_documents(raw)
                for chunk in chunks:
                    chunk.metadata["source_file"] = os.path.basename(file_path)
                all_docs.extend(chunks)
                logger.info(f"Loaded {len(chunks)} chunks from {os.path.basename(file_path)}")
            except Exception as e:
                logger.error(f"Failed to load {file_path}: {e}")

        try:
            from langchain_community.document_loaders import PyPDFLoader
            for file_path in glob.glob(os.path.join(docs_dir, "*.pdf")):
                try:
                    loader = PyPDFLoader(file_path)
                    raw = loader.load()
                    chunks = splitter.split_documents(raw)
                    for chunk in chunks:
                        chunk.metadata["source_file"] = os.path.basename(file_path)
                    all_docs.extend(chunks)
                    logger.info(f"Loaded {len(chunks)} chunks from {os.path.basename(file_path)}")
                except Exception as e:
                    logger.error(f"Failed to load PDF {file_path}: {e}")
        except ImportError:
            pass

        if not all_docs:
            logger.warning("No documents found in docs/")
            return False

        persist_dir = str(Path(__file__).parent / "chroma_db")
        _vectorstore = Chroma.from_documents(
            documents=all_docs,
            embedding=embeddings,
            persist_directory=persist_dir,
            collection_name="steelmind_knowledge"
        )
        _retriever = _vectorstore.as_retriever(
            search_type="mmr",
            search_kwargs={"k": 5, "fetch_k": 12}
        )
        logger.info(f"Knowledge base ready: {len(all_docs)} chunks indexed.")
        return True

    except ImportError as e:
        logger.error(f"Missing dependency for RAG: {e}")
        return False
    except Exception as e:
        logger.error(f"Failed to build knowledge base: {e}")
        return False


def retrieve_context(query: str, k: int = 5) -> str:
    global _retriever
    if _retriever is None:
        build_knowledge_base()
    if _retriever is not None:
        try:
            docs = _retriever.invoke(query)
            if docs:
                parts = []
                for i, doc in enumerate(docs[:k], 1):
                    source = doc.metadata.get("source_file", "unknown")
                    parts.append(f"[Source {i}: {source}]\n{doc.page_content}")
                return "\n\n---\n\n".join(parts)
        except Exception as e:
            logger.error(f"Vector retrieval failed: {e}")
    return _keyword_fallback(query)


def add_document_text(text: str, metadata: dict = None) -> bool:
    global _vectorstore
    if _vectorstore is None:
        return False
    try:
        from langchain_text_splitters import RecursiveCharacterTextSplitter
        from langchain_core.documents import Document

        splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=120)
        doc = Document(page_content=text, metadata=metadata or {})
        chunks = splitter.split_documents([doc])
        _vectorstore.add_documents(chunks)
        logger.info(f"Added {len(chunks)} chunks from uploaded document")
        return True
    except Exception as e:
        logger.error(f"Failed to add document: {e}")
        return False


def _keyword_fallback(query: str) -> str:
    keywords = [w for w in query.lower().split() if len(w) > 3]
    docs_dir = _get_docs_dir()
    results = []
    for file_path in glob.glob(os.path.join(docs_dir, "*.txt")):
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            lines = content.split("\n")
            matched = []
            for i, line in enumerate(lines):
                if any(kw in line.lower() for kw in keywords):
                    start, end = max(0, i - 2), min(len(lines), i + 5)
                    matched.append("\n".join(lines[start:end]))
            if matched:
                results.append(f"[{os.path.basename(file_path)}]\n" + "\n...\n".join(matched[:3]))
        except Exception:
            continue
    return "\n\n---\n\n".join(results[:4]) if results else "No relevant documentation found."
