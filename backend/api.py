from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from utils.llmServicePy import generate_response

app = FastAPI()

class MessageRequest(BaseModel):
    message: str

@app.post("/generate")
def generate_text(request: MessageRequest):
    response = generate_response(request.message)
    return {"response": response}
