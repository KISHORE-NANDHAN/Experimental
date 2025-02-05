import os
from langchain_huggingface import HuggingFaceEndpoint
from langchain import PromptTemplate, LLMChain
from huggingface_hub import InferenceClient

# Load API key from environment
HUGGINGFACEHUB_API_TOKEN = os.getenv("HUGGINGFACEHUB_API_TOKEN")

# Initialize LLM from Hugging Face (Mistral-7B)
repo_id = "mistralai/Mistral-7B-Instruct-v0.2"
llm = HuggingFaceEndpoint(repo_id=repo_id, max_length=128, temperature=0.7, token=HUGGINGFACEHUB_API_TOKEN)

# Define prompt template
template = """Question: {question}
Answer: Let's think step by step."""
prompt = PromptTemplate(template=template, input_variables=["question"])

# Create LangChain pipeline
llm_chain = LLMChain(llm=llm, prompt=prompt)

def generate_response(message):
    """Generate a response from the LLM."""
    try:
        response = llm_chain.invoke(message)
        return response
    except Exception as e:
        return f"LLM Error: {str(e)}"
