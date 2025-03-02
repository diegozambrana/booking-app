import os
from dotenv import load_dotenv, find_dotenv
from openai import OpenAI

_ = load_dotenv(find_dotenv())

OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
client = OpenAI(api_key=OPENAI_API_KEY)


def get_openai_response_content(messages) -> str:
    """
    Get the response from the OpenAI API
    """
    completion = client.chat.completions.create(model="gpt-4o-mini", messages=messages)
    return completion.choices[0].message.content
