from dotenv import load_dotenv
import os
from openai import OpenAI

# Load environment variables from the .env file
load_dotenv()

# Fetch the API key from the .env file
api_key = os.getenv("OPENAI_API_KEY")

# Initialize the client with the API key
client = OpenAI(api_key=api_key)


def generate_day_plan(current_time, tasks, bedtime):
    # Construct the dynamic prompt
    prompt = f"""
    The time is {current_time}. I have {', '.join(tasks)} to do today, and I'd like to be in bed by {bedtime}.
    Assist in planning my day dynamically with breaks and self-care activities.
    """

    # Generate a completion
    completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
    )

    # Return the generated day plan
    return completion.choices[0].message.content


if __name__ == "__main__":
    # Get user inputs
    current_time = input("What is the current time? (e.g., 8:00 AM): ").strip()
    tasks = input("List your tasks for the day, separated by commas: ").split(", ")
    bedtime = input("What time would you like to go to bed? (e.g., 10:00 PM): ").strip()

    # Generate the day plan
    day_plan = generate_day_plan(current_time, tasks, bedtime)

    # Print the dynamic day plan
    print("\nHere is your dynamic day plan:\n")
    print(day_plan)
