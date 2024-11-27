document.getElementById("dayPlannerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Get user inputs
    const currentTime = document.getElementById("currentTime").value;
    const tasks = document.getElementById("tasks").value.split(",").map(task => task.trim());
    const bedtime = document.getElementById("bedtime").value;

    // Display AI's immediate response
    const aiResponse = document.getElementById("aiResponse");
    aiResponse.innerText = "Great, let's do this!";

    // Clear previous results and start the loading animation
    const result = document.getElementById("result");
    result.innerText = ""; // Clear the previous plan

    const loadingIndicator = document.getElementById("loadingIndicator");
    let loadingText = "Generating Plan";
    loadingIndicator.innerText = loadingText;
    const loadingInterval = setInterval(() => {
        if (loadingIndicator.innerText.endsWith("...")) {
            loadingIndicator.innerText = loadingText;
        } else {
            loadingIndicator.innerText += ".";
        }
    }, 500);

    try {
        // Call the Flask API
        const response = await fetch("http://127.0.0.1:5000/plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                current_time: currentTime,
                tasks: tasks,
                bedtime: bedtime
            })
        });

        const data = await response.json();

        // Stop the loading animation
        clearInterval(loadingInterval);
        loadingIndicator.innerText = "";

        // Display the new AI-generated plan
        result.innerText = data.day_plan;

    } catch (error) {
        // Handle errors (e.g., network issues)
        clearInterval(loadingInterval);
        loadingIndicator.innerText = "Error generating plan.";
        console.error("Error:", error);
    }
});
