import json
from service.handle_data import (
    get_list_technicians,
    get_technician_available,
    retrieve_booking_by_id,
)
from service.openai_client import get_openai_response_content
from utils.prompt import get_prompt_messages


def analyze_command(command: str, context: str):
    messages = get_prompt_messages(command, context)
    response = get_openai_response_content(messages)
    response_json = json.loads(response)
    return response_json


def process_text_command(command: str, context: str):
    command = command.lower()
    command_obj = analyze_command(command, context)
    print(command_obj)

    if command_obj["type"] == "create":
        technicians = get_list_technicians()
        professions = [technician.profession for technician in technicians]
        profession = (
            command_obj["profession"]
            if command_obj["profession"] in professions
            else None
        )

        if profession:
            technician = get_technician_available(profession, command_obj["datetime"])

            if technician:
                return {
                    "status": "success",
                    "type": "create",
                    "message": f"Do you wan to create a booking with the {technician['profession']} {technician['name']}?",
                    "object": technician,
                    "datetime": command_obj["datetime"],
                }

            else:
                return {
                    "status": "error",
                    "type": "create",
                    "message": "Technician not available",
                }

        else:
            return {
                "status": "error",
                "type": "create",
                "message": "Profession not found",
            }
    elif command_obj["type"] == "retrieve":
        if command_obj["entity"] == "booking":
            booking = retrieve_booking_by_id(command_obj["booking_id"])
            return {
                "status": "success",
                "type": "retrieve",
                "message": "This is the booking you requested",
                "object": booking,
            }

    elif command_obj["type"] == "delete":
        booking = retrieve_booking_by_id(command_obj["booking_id"])
        return {
            "status": "success",
            "type": "delete",
            "message": "Do you want to delete this booking?",
            "object": booking,
        }

    if command_obj["type"] == "unknown":
        return {
            "status": "error",
            "type": "unknown",
            "message": "Command not recognized, try again",
        }

    return {"status": "error", "message": "We have some issues, try again later"}
