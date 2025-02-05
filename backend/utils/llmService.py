import os
from langchain import PromptTemplate, LLMChain
from huggingface_hub import InferenceClient

# Load API key from environment
HUGGINGFACEHUB_API_TOKEN = os.getenv("HUGGINGFACEHUB_API_TOKEN")

# Initialize LLM from Hugging Face (Mistral-7B)
repo_id = "mistralai/Mistral-7B-Instruct-v0.2"
client = InferenceClient(model=repo_id, token=HUGGINGFACEHUB_API_TOKEN)

# Define prompt template
template = """Question: {question}
Answer: Let's think step by step."""
prompt = PromptTemplate(template=template, input_variables=["question"])

def generate_response(message):
    """Generate a response from the LLM."""
    try:
        response = client.text_generation(message, max_new_tokens=128, temperature=0.7)
        return response
    except Exception as e:
        return f"LLM Error: {str(e)}"
