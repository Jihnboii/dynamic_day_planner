let lastGeneratedSchedule = ""; // Store the last generated schedule

document.getElementById("dayPlannerForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get user inputs
    const currentTime = document.getElementById("currentTime").value;
    const tasks = document.getElementById("tasks").value.split(",").map(task => task.trim());
    const bedtime = document.getElementById("bedtime").value;

    // Clear previous content
    const aiResponse = document.getElementById("aiResponse");
    const result = document.getElementById("result");
    const loadingIndicator = document.getElementById("loadingIndicator");

    aiResponse.innerText = ""; // Clear affirmation
    result.innerText = ""; // Clear previous schedule
    loadingIndicator.innerText = ""; // Clear loading animation

    // === INSTANT AFFIRMATION ===
    const affirmations = [
        "Absolutely! Let’s make sure your day is balanced and productive.",
        "Sounds great! Let’s work on a plan to help you achieve your goals.",
        "Sure thing! I’ll ensure we prioritize breaks and self-care.",
        "Let’s do this! Together, we’ll make an awesome schedule.",
        "No problem! Let’s create a day that works perfectly for you."
    ];
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    aiResponse.innerText = randomAffirmation; // Display a random affirmation

    // === START LOADING ANIMATION ===
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
        // === SECOND AI CALL: Generate the schedule ===
        const scheduleResponse = await fetch("http://127.0.0.1:5000/schedule", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                current_time: currentTime,
                tasks: tasks,
                bedtime: bedtime
            })
        });

        const scheduleData = await scheduleResponse.json();

        // Stop loading animation and display schedule
        clearInterval(loadingInterval);
        loadingIndicator.innerText = "";

        lastGeneratedSchedule = scheduleData.schedule; // Save the generated schedule
        result.innerText = lastGeneratedSchedule; // Display the schedule
        aiResponse.innerText = ""; // Clear the affirmation message

        // Clear the three input fields
        document.getElementById("currentTime").value = "";
        document.getElementById("tasks").value = "";
        document.getElementById("bedtime").value = "";

        // Switch to adjustments section
        document.getElementById("dayPlannerForm").style.display = "none";
        document.getElementById("adjustments-section").style.display = "block";

    } catch (error) {
        // Handle errors
        clearInterval(loadingInterval);
        loadingIndicator.innerText = "Error generating plan.";
        console.error("Error:", error);
    }
});

document.getElementById("adjustmentsButton").addEventListener("click", async function () {
    const adjustments = document.getElementById("adjustments").value;

    // Include the previous schedule in the adjustment request
    const result = document.getElementById("result");
    const aiResponse = document.getElementById("aiResponse");
    const loadingIndicator = document.getElementById("loadingIndicator");

    // Clear previous content
    aiResponse.innerText = ""; // Clear affirmation
    result.innerText = ""; // Clear previous schedule
    loadingIndicator.innerText = ""; // Clear loading animation

    // === INSTANT AFFIRMATION ===
    const affirmations = [
        "Let’s adjust your schedule as needed!",
        "Got it! Making the necessary adjustments now.",
        "Sure thing, adjusting your day plan.",
        "Let’s refine this schedule for you!",
        "No worries, we’ll make this work!"
    ];
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    aiResponse.innerText = randomAffirmation; // Display a random affirmation

    // === START LOADING ANIMATION ===
    loadingIndicator.innerText = "Applying adjustments...";
    const loadingInterval = setInterval(() => {
        if (loadingIndicator.innerText.endsWith("...")) {
            loadingIndicator.innerText = "Applying adjustments";
        } else {
            loadingIndicator.innerText += ".";
        }
    }, 500);

    try {
        const adjustmentResponse = await fetch("http://127.0.0.1:5000/adjustments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                previous_schedule: lastGeneratedSchedule, // Pass the previous schedule
                adjustments: adjustments
            })
        });

        const adjustmentData = await adjustmentResponse.json();

        lastGeneratedSchedule = adjustmentData.adjusted_schedule; // Update the stored schedule
        clearInterval(loadingInterval);
        loadingIndicator.innerText = "";

        result.innerText = lastGeneratedSchedule; // Display the adjusted schedule
        aiResponse.innerText = ""; // Clear the affirmation message

        // Clear the textarea value
        document.getElementById("adjustments").value = ""; // This clears the textarea

    } catch (error) {
        clearInterval(loadingInterval);
        loadingIndicator.innerText = "Error applying adjustments.";
        console.error("Error:", error);
    }
});

document.getElementById("resetButton").addEventListener("click", function () {
    // Reset to initial form
    document.getElementById("dayPlannerForm").style.display = "block";
    document.getElementById("adjustments-section").style.display = "none";
    document.getElementById("adjustments").value = "";
    document.getElementById("result").innerText = "";
    document.getElementById("aiResponse").innerText = ""; // Clear affirmation
    lastGeneratedSchedule = ""; // Clear stored schedule
});
