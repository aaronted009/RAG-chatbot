import os
from dotenv import load_dotenv
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_community.document_loaders import (
    DirectoryLoader,
    JSONLoader,
    MergedDataLoader
)
from langchain_cohere import ChatCohere, CohereEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
import requests
import json
from pprint import pprint

load_dotenv()

COHERE_API_KEY = os.getenv("COHERE_API_KEY")
X_RAPID_API_KEY = os.getenv("X_RAPID_API_KEY")

# Check if current user is authenticated
user_is_connected = 1
# Load data
if not user_is_connected:
    print("Utilisateur non connecté")
    loader = DirectoryLoader(
        "data/"
    )  # There are visitors (non connected users) for publicly available data and connected users (employees) who can have access to more private data
    docs = loader.load()
else:
    print("Utilisateur connecté")
    # Get data from API
    url = "https://ai-content-scraper.p.rapidapi.com/scrape"

    payload = {"url": "https://tresorbenin.bj/"}
    headers = {
        "x-rapidapi-key": X_RAPID_API_KEY,
        "x-rapidapi-host": "ai-content-scraper.p.rapidapi.com",
        "Content-Type": "application/json",
    }

    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        data = response.json()
        with open("data/api_response.json", "w") as f:
            json.dump(data, f)
            # json_content = json.load(f)
            print("JSON API response :\n")
            pprint(data)

        # Ensure the JSON structure contains the 'content' key
        if 'content' not in data:
            raise ValueError("The JSON file does not contain the 'content' key.")
        api_data_loader = JSONLoader("data/api_response.json", jq_schema=".content")
        api_docs_loaded = api_data_loader.load()
        print("JSONLoader data :\n")
        pprint(api_data_loader.load())
        public_data_loader = DirectoryLoader("data/")
        public_data_loaded = public_data_loader.load()
        print("DirectoryLoader data :\n")
        pprint(public_data_loader)
        loader = MergedDataLoader(loaders=[api_data_loader, public_data_loader])
        # loader = MergedDataLoader([api_data_loader, public_data_loader])
        # loader = api_data_loader
        docs = api_docs_loaded + public_data_loaded
    else:
        print("Failed to retrieve data from API")

    # print(f"Response after API request : {response.json()}\n")
    # print(f"Text response after API request : {response.text}")
    # loader = TextLoader(response.text)
    # loader = JSONLoader(response.json(), jq_schema=".quiz")
    # loader = telegram.text_to_docs(response.text)


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
    """Answer the following question based only on the provided context:

<context>
{context}
</context>

Question: {input}"""
)

# Create a retrieval chain to answer questions
document_chain = create_stuff_documents_chain(llm, prompt)
retrieval_chain = create_retrieval_chain(retriever, document_chain)
response = retrieval_chain.invoke(
    {
        "input": "Quels sont les services offerts par la direction du trésor? Donne-moi toutes les informations dont j'ai besoin y compris les pièces ou formalités à remplir."
    }
)
print(response["answer"])
