from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import rag_chatbot

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
)


@app.post("/ask-bot")
async def chatbot(message=Body(embed=True)):
    retrieval_chain = rag_chatbot.retrieval_chain
    response = retrieval_chain.invoke({"input": message})
    bot_answer = response["answer"]
    return bot_answer
