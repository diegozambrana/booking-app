from dotenv import dotenv_values
from openai import OpenAI

config = dotenv_values()
OPENAI_API_KEY = config["OPENAI_API_KEY"]
client = OpenAI(api_key=OPENAI_API_KEY)


def get_openai_response_content(messages) -> str:
    """
    Get the response from the OpenAI API
    """
    completion = client.chat.completions.create(model="gpt-4o-mini", messages=messages)
    return completion.choices[0].message.content
