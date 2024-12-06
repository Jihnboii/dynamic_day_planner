from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai

# Load environment variables
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
openai.api_key = api_key

# Initialize Flask app and enable CORS
app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

def generate_affirmation(current_time, tasks, bedtime):
    prompt = f"""
    The time is {current_time}. I have {', '.join(tasks)} to do today, and I'd like to be in bed by {bedtime}.
    Provide a short, affirmative message acknowledging my goals and offering encouragement.
    """
    completion = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
    )
    return completion.choices[0].message["content"].strip()


def generate_day_plan(current_time, tasks, bedtime):
    """Generates the detailed schedule in a specific format."""
    prompt = f"""
    The time is {current_time}. I have {', '.join(tasks)} to do today, and I'd like to be in bed by {bedtime}.
    Assist in planning my day dynamically with breaks and self-care activities. Follow this exact format:

    Here is your schedule:

    00:00 AM/PM - 00:00 AM/PM: Task
    ...
    Notes: Include one to two notes about the schedule, such as adjustments or reminders.
    """
    completion = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that creates schedules following precise formats."},
            {"role": "user", "content": prompt},
        ],
    )
    return completion.choices[0].message["content"].strip()


@app.route("/")
def home():
    """Route to serve the homepage."""
    return render_template("index.html")


@app.route('/adjustments', methods=['POST'])
def generate_adjustments():
    """Generate an updated schedule based on user adjustments."""
    data = request.json
    previous_schedule = data.get("previous_schedule", "")
    adjustments = data.get("adjustments", "")

    prompt = f"""
    Here is the current schedule:
    {previous_schedule}

    Please make the following adjustments:
    {adjustments}

    Ensure the updated schedule maintains this format:
    00:00 AM/PM - 00:00 AM/PM: Task
    ...
    Notes: [Include concise notes if necessary].
    """
    completion = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that follows formatting guidelines strictly."},
            {"role": "user", "content": prompt},
        ],
    )
    adjusted_schedule = completion.choices[0].message["content"].strip()
    return jsonify({"adjusted_schedule": adjusted_schedule})


@app.route('/affirmation', methods=['POST'])
def get_affirmation():
    """Endpoint to generate the affirmation message."""
    data = request.json
    current_time = data.get("current_time", "8:00 AM")
    tasks = data.get("tasks", ["Relax"])
    bedtime = data.get("bedtime", "10:00 PM")

    affirmation = generate_affirmation(current_time, tasks, bedtime)
    return jsonify({"affirmation": affirmation})


@app.route('/schedule', methods=['POST'])
def generate_schedule():
    """Endpoint to generate the day schedule."""
    data = request.json
    current_time = data.get("current_time", "8:00 AM")
    tasks = data.get("tasks", ["Relax"])
    bedtime = data.get("bedtime", "10:00 PM")

    schedule = generate_day_plan(current_time, tasks, bedtime)
    return jsonify({"schedule": schedule})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
