# AI Document Q&A Assistant

## Overview

The **AI Document Q&A Assistant** is a powerful tool powered by **LLaMA 3** and **GROQ**, designed to analyze documents and provide high-accuracy answers to user queries. With this assistant, users can upload documents, process them for AI analysis, and ask specific questions about the contents of the documents. This project leverages modern machine learning techniques to ensure fast and accurate results.
![image](https://github.com/user-attachments/assets/76a06e35-d398-4334-9b03-84c6e25ef3ea)

## Features

- **Document Upload and Processing**: Allows users to upload their documents (e.g., PDFs) for AI analysis.
- **Q&A Capabilities**: After processing, users can ask questions related to the uploaded documents, and the assistant will provide accurate answers based on the document content.
- **Integration with LLaMA 3 and GROQ**: Utilizes cutting-edge models for question answering.

## Technologies Used

- **LLaMA 3**: Language Model for answering questions based on document content.
- **GROQ**: Optimized processing for AI inference tasks.
- **Streamlit**: A fast way to create the user interface.
- **FAISS**: A library for efficient similarity search and clustering of dense vectors.
- **FastAPI**: Backend framework for handling API requests and managing document processing.
- **Hugging Face BGE Embeddings**: For vector embeddings and document analysis.
- **Python**: Core programming language for backend processing.

## Setup & Installation

To run the project locally, follow the steps below:

### Prerequisites

- Python 3.8+
- Node.js (for frontend)
- Pip (Python package manager)
- Virtualenv (optional but recommended for creating isolated Python environments)

### Backend Setup

1. **Clone the Repository**:
   ```
   git clone https://github.com/your-repository-url.git
   cd your-repository-directory
   ```

2. **Install Dependencies**:
   Create and activate a virtual environment (optional):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

   Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

3. **Install FAISS**:
   ```
   pip install faiss-cpu
   ```

4. **Start the Backend**:
   Run the FastAPI server:
   ```
   uvicorn app:app --reload
   ```

   This will start the backend server on `http://localhost:8000`.

### Frontend Setup

1. **Navigate to the frontend folder**:
   ```
   cd frontend
   ```

2. **Install Node.js Dependencies**:
   ```
   npm install
   ```

3. **Run the Frontend**:
   ```
   npm start
   ```

   This will start the React application on `http://localhost:3000`.

## Using the Application

1. **Process Documents**: Before asking any questions, you need to process the documents. Click on the **"Process Documents"** button to upload and process your documents.

2. **Ask Questions**: Once the documents are processed, you can enter your question in the search box and click the **"Ask"** button. The assistant will analyze the document and provide the most accurate answer based on the content.

## API Endpoints

The backend exposes the following API endpoints:

- **POST /embed**: This endpoint triggers the document processing and embedding procedure.
- **POST /query**: This endpoint takes a user question and returns the answer along with relevant document snippets.

### Example Request for Document Processing

```
POST /embed
```

This will trigger the backend to process and embed the documents for analysis.

### Example Request for Query

```
POST /query
{
  "question": "What is the population of the US?"
}
```

This will return a JSON response with the answer and relevant document excerpts.

## Troubleshooting

- **CORS Issues**: Ensure that the frontend is running on `http://localhost:3000` and the backend on `http://localhost:8000`.
- **FAISS Installation Issues**: Make sure that FAISS is installed correctly. You can refer to [the FAISS installation guide](https://github.com/facebookresearch/faiss/blob/main/INSTALL.md) for more details.
- **Document Format**: The current implementation supports PDF documents. Make sure to upload documents in a supported format.

## Contributing

Feel free to fork this project, create an issue, or submit a pull request if you want to contribute improvements. Ensure all contributions adhere to the coding standards and include appropriate tests.

## License

This project is licensed under the MIT License.
