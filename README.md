# Dynamic Day Planner

A **Dynamic Day Planner** built with Flask, OpenAI API, HTML, & CSS. This application helps users plan their day dynamically by generating a personalized schedule based on tasks, current time, and desired bedtime.

## Features
- Interactive form for user input (current time, tasks, bedtime).
- Backend powered by Flask, with OpenAI API for generating day plans.
- Simple and responsive frontend for displaying the generated plan.

---

## Installation and Setup

### Prerequisites
- Python 3.8 or higher
- Pip (Python package manager)
- A valid OpenAI API key

### Clone the Repository
```bash
git clone https://github.com/Jihnboii/dynamic_day_planner.git
cd dynamic_day_planner
```

### Set Up a Virtual Environment
```bash
python -m venv .venv
```

Activate the virtual environment:
- On **Windows**:
  ```bash
  .venv\Scripts\activate
  ```
- On **macOS/Linux**:
  ```bash
  source .venv/bin/activate
  ```

### Install Dependencies
```bash
pip install flask flask-cors openai python-dotenv
```

### Set Up the `.env` File
Create a `.env` file in the project root and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

---

## Running the Application

### Start the Flask Backend
Run the following command to start the Flask API:
```bash
python app.py
```
The API will be available at: `http://127.0.0.1:5000`

### Test the Frontend
1. Open the `index.html` file in your browser.
2. Fill out the form with:
   - **Current Time**: e.g., `8:00 AM`
   - **Tasks**: e.g., `Task 1, Task 2, Task 3`
   - **Bedtime**: e.g., `10:00 PM`
3. Click **Generate Plan** to view your dynamic schedule.

---

## Project Structure
```
dynamic_day_planner/
├── .venv/              # Virtual environment (not tracked in Git)
├── .env                # Environment variables (not tracked in Git)
├── app.py              # Flask API backend
├── day_planner.py      # CLI version of the planner
├── index.html          # Frontend for user interaction
├── README.md           # Project documentation
└── .gitignore          # Files and directories to ignore in Git
```

---

## How It Works
1. The **frontend** collects user input (current time, tasks, and bedtime).
2. The **backend** uses Flask to process the input and calls the OpenAI API to generate a personalized schedule.
3. The generated schedule is sent back to the frontend and displayed for the user.

---

## Example Output
**Input**:
- Current Time: `7:00 AM`
- Tasks: `Brush Teeth, Get Dressed`
- Bedtime: `10:00 PM`

**Generated Plan**:
```
7:00 AM - 7:15 AM: Brush Teeth
7:15 AM - 7:30 AM: Get Dressed
7:30 AM - 8:00 AM: Prepare breakfast
8:00 AM - 9:00 AM: Complete task 1
...
10:00 PM: Get ready for bed
```

---

## Future Enhancements
- Add task prioritization and estimated durations.
- Provide options to save or download the schedule.
- Deploy the application to a live server for public access.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
