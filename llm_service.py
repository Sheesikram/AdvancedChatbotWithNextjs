import os
from langchain_groq import ChatGroq
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from typing import Tuple, List
from langchain_core.documents import Document

class LLMService:
    def __init__(self):
        self.llm = ChatGroq(
            groq_api_key="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",
            model_name="Llama3-8b-8192"
        )
        
        self.prompt = ChatPromptTemplate.from_template("""
            Answer the questions based on the provided context only.
            Please provide the most accurate response based on the question
            <context>
            {context}
            </context>
            Question: {input}
        """)

    async def get_response(self, question: str, vector_store) -> Tuple[str, List[Document]]:
        document_chain = create_stuff_documents_chain(self.llm, self.prompt)
        retriever = vector_store.as_retriever()
        retrieval_chain = create_retrieval_chain(retriever, document_chain)
        
        response = retrieval_chain.invoke({"input": question})
        return response["answer"], response["context"]