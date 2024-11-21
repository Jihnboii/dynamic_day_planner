from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from openai import OpenAI

# Load environment variables
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
client = OpenAI(api_key=api_key)

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

def generate_day_plan(current_time, tasks, bedtime):
    prompt = f"""
    The time is {current_time}. I have {', '.join(tasks)} to do today, and I'd like to be in bed by {bedtime}.
    Assist in planning my day dynamically with breaks and self-care activities.
    """
    completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
    )
    return completion.choices[0].message.content

@app.route('/plan', methods=['POST'])
def plan_day():
    data = request.json
    current_time = data.get("current_time", "8:00 AM")
    tasks = data.get("tasks", ["Relax"])
    bedtime = data.get("bedtime", "10:00 PM")

    day_plan = generate_day_plan(current_time, tasks, bedtime)
    return jsonify({"day_plan": day_plan})

if __name__ == "__main__":
    app.run(debug=True)
