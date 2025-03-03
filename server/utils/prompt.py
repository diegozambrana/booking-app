from datetime import datetime


def get_prompt_messages(message: str, context: str):
    """
    Generate the prompt messages for the user and the system.
    """

    user_message = """
    I want you to act as a chat agent to process the following text within the delimiters ~~~~~~~~~~~.

    Your task is to classify whether the message corresponds to one of the following command types: `create`, `delete`, `list`, `retrieve`, or `unknown`.

    * `create`: The message is about scheduling, creating, or adding a new booking.
    * `delete`: The message is about canceling or deleting a booking.
    * `list`: The message is requesting available time slots or a list of technicians.
    * `retrieve`: The message is asking for details about a previously made booking or a specific booking given an ID.
    * `unknown`: The message does not fit into any of the above categories.

    The response must be formatted as a JSON object. Below are the expected formats for each type:

    * For create
    ```
    {"type":"create","profession":"plumber","datetime":"2025-03-03T10:00:00"}
    ```
    * For delete
    ```
    {"type":"delete","booking_id":1}
    ```
    * For list, entity can be either `booking` or `technician`
    ```
    {"type":"list","id":1,"entity":"booking"}
    ```
    * For retrieve, entity can be either `booking` or `technician`
    ```
    {"type":"retrieve","booking_id":1,"entity":"booking"}
    ```
    * For unknown
    ```
    {"type":"unknown"}
    ```

    For example, if the message is "I want to schedule a plumber for 10 AM on March 3, 2025", the response should be:
    ```
    {"type":"create","profession":"plumber","datetime":"2025-03-03T10:00:00"}
    ```

    ~~~~~~~~~~~
    %s
    ~~~~~~~~~~~
    
    Today date is %s

    This is the context of the previous actions and messages that you can use to generate the response:
    ```
    %s
    ```
    """ % (
        message,
        datetime.now().isoformat(),
        context,
    )
    return [
        {
            "role": "system",
            "content": "You are a chat agent that processes text messages and returns responses strictly in raw JSON format, without markdown or additional formatting.",
        },
        {"role": "user", "content": user_message},
    ]
