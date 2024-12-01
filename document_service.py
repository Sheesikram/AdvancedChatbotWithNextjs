from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_community.vectorstores import FAISS

class DocumentService:
    def __init__(self):
        self.embeddings = HuggingFaceBgeEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2",
            model_kwargs={'device': 'cpu'},
            encode_kwargs={'normalize_embeddings': True}
        )
        self.vector_store = None

    async def process_documents(self):
        # Load documents
        loader = PyPDFDirectoryLoader("./us_census")
        documents = loader.load()
        
        # Split documents
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        split_documents = text_splitter.split_documents(documents[:20])
        
        # Create vector store
        self.vector_store = FAISS.from_documents(
            split_documents,
            self.embeddings
        )
        
        return True

    def get_vector_store(self):
        if not self.vector_store:
            raise Exception("Documents have not been processed yet")
        return self.vector_store
