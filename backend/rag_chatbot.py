import os
from dotenv import load_dotenv
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_community.document_loaders import DirectoryLoader
from langchain_cohere import ChatCohere, CohereEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain

load_dotenv()

COHERE_API_KEY = os.getenv("COHERE_API_KEY")

# Load data
loader = DirectoryLoader("data/")
docs = loader.load()
# Split text into chunks
text_splitter = RecursiveCharacterTextSplitter()
documents = text_splitter.split_documents(docs)
# Define the embedding model
embeddings = CohereEmbeddings(
    cohere_api_key=COHERE_API_KEY, model="embed-multilingual-v3.0"
)
# Create the vector store
vector = Chroma.from_documents(documents, embeddings)
# Define a retriever interface
retriever = vector.as_retriever()
# Define LLM
llm = ChatCohere(cohere_api_key=COHERE_API_KEY, model="command-r-plus-08-2024")
# Define prompt template
prompt = ChatPromptTemplate.from_template(
    """Answer the question based only on the provided context. 
    In this context, know that "Direction Générale du Trésor Public" and "Direction du Trésor Public" and "Trésor Public" 
    can be used to designate the same entity. When answering you don't necessarily need to say that you're answering 
    based on the context. Of course, you'll answer based only on the context but you don't need to say it each time when answering.
    In case the information is not in the context provided, answer that you don't have the information and give contacts of DGTCP.

<context>
{context}
</context>

Question: {input}"""
)

# Create a retrieval chain to answer questions
document_chain = create_stuff_documents_chain(llm, prompt)
retrieval_chain = create_retrieval_chain(retriever, document_chain)
