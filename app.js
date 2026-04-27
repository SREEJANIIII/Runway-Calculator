let start=document.getElementById("startBtn");
let pg=document.getElementById("Start");

start.addEventListener("click", () => {// Create main container
start.remove();
pg.remove();
let container = document.createElement("div");
container.className = "container";

// Title
let title = document.createElement("h1");
title.textContent = "Runway Calculator";

// Currency selector
let currencySelect = document.createElement("select");
currencySelect.id = "currency";

let inrOption = document.createElement("option");
inrOption.value = "INR";
inrOption.textContent = "₹ INR";

let usdOption = document.createElement("option");
usdOption.value = "USD";
usdOption.textContent = "$ USD";

currencySelect.appendChild(inrOption);
currencySelect.appendChild(usdOption);

// Cash input
let cashInput = document.createElement("input");
cashInput.type = "number";
cashInput.id = "cash";
cashInput.placeholder = "Total Cash on Hand ($/₹)";
cashInput.required = true;

// Burn rate input
let burnRateInput = document.createElement("input");
burnRateInput.type = "number";
burnRateInput.id = "burnRate";
burnRateInput.placeholder = "Monthly Burn Rate ($/₹)";
burnRateInput.required = true;

// Button
let submit = document.createElement("button");
submit.id = "bttn";
submit.textContent = "CALCULATE RUNWAY";

// Append all elements
container.appendChild(title);
container.appendChild(currencySelect);
container.appendChild(cashInput);
container.appendChild(burnRateInput);
container.appendChild(submit);

// Add container to page
document.body.appendChild(container);


submit.addEventListener("click", () => {
    // Remove old result if it exists
    const oldResult = document.getElementById("result");
    if (oldResult) {
        oldResult.remove();
    }

    // Create result container
    let result = document.createElement("div");
    let monthsLeft = document.createElement("h2");
    let status = document.createElement("p");
    let daysLeft = document.createElement("p");
    let cashDisplay = document.createElement("p");
    let burnDisplay = document.createElement("p");

    result.id = "result";
    monthsLeft.id = "monthsLeft";
    status.id = "status";
    daysLeft.id = "daysLeft";

    result.appendChild(cashDisplay);
    result.appendChild(burnDisplay);
    result.appendChild(monthsLeft);
    result.appendChild(status);
    result.appendChild(daysLeft);

    container.appendChild(result);

    let cash = parseFloat(cashInput.value);
    let burnRate = parseFloat(burnRateInput.value);

    // Validation
    if (isNaN(cash) || isNaN(burnRate) || burnRate <= 0) {
        alert("Please enter valid financial values.");
        result.remove();
        return;
    }

    // Currency formatter
    function formatCurrency(amount) {
    let selectedCurrency = document.getElementById("currency").value;
    let locale = selectedCurrency === "INR" ? "en-IN" : "en-US";

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: selectedCurrency,
        maximumFractionDigits: 0
    }).format(amount);
}
    // Calculations
    let runwayMonths = cash / burnRate;
    let runwayDays = Math.floor(runwayMonths * 30);

    // Display financial summary
    cashDisplay.textContent = `Cash on Hand: ${formatCurrency(cash)}`;
    burnDisplay.textContent = `Monthly Burn: ${formatCurrency(burnRate)}`;

    // Main results
    monthsLeft.textContent = `${runwayMonths.toFixed(1)} Months of Runway`;
    daysLeft.textContent = `${runwayDays} Days Until Zero`;

    // Reset classes
    status.className = "";
    monthsLeft.className = "";

    // Financial health states
    if (runwayMonths > 12) {
        document.body.style.backgroundImage = "url('bg1.png')";
        status.textContent = "SAFE ZONE ✅";
        status.classList.add("safe");
        monthsLeft.classList.add("safe");
        status.style.backgroundColor = "#042500";
        container.style.borderColor = "#4af158";
    } 
    else if (runwayMonths >= 6) {
        document.body.style.backgroundImage = "url('bg2.png')";
        status.textContent = "MODERATE ZONE ⚠️";
        status.classList.add("warning");
        monthsLeft.classList.add("warning");
        status.style.backgroundColor = "#2c2c00";
        container.style.borderColor = "#ffd700";
        daysLeft.textContent += " -- 💡 Reducing expenses could improve runway.";

    } 
    else if (runwayMonths >= 3) {
        document.body.style.backgroundImage = "url('bg4.png')";
        status.textContent = "WARNING ZONE ⚠️";
        status.classList.add("warning");
        monthsLeft.classList.add("warning");
        status.style.backgroundColor = "#4a2200";
        container.style.borderColor = "#ff9900";
        daysLeft.textContent += " -- Consider cost optimization!";
    } 
    else {
        alert("🚨 DANGER ZONE: Immediate action required! 🚨");
        document.body.style.backgroundImage = "url('bg3.png')";
        status.textContent = "DANGER ZONE 🚨";
        status.classList.add("danger");
        monthsLeft.classList.add("danger");
        status.style.backgroundColor = "#2c0000";
        container.style.borderColor = "#ff3b3b";
        if (runwayMonths < 1) {    
            daysLeft.textContent += " -- CRITICAL CASHOUT ⚠️";
        }
        daysLeft.textContent += " -- Immediate cost reduction recommended!";
    }
    document.body.style.backgroundSize = "cover";
    // Create progress bar container
let progressContainer = document.createElement("div");
let progressBar = document.createElement("div");
let progressText = document.createElement("p");

// Assign IDs/classes
progressContainer.className = "progress-container";
progressBar.id = "progress-bar";
progressText.id = "progress-text";

// Nest elements
progressContainer.appendChild(progressBar);
result.appendChild(progressContainer);
result.appendChild(progressText);

// Runway progress logic
let maxRunway = 12; // 12 months is the max for full bar
let progressPercent = Math.min((runwayMonths / maxRunway) * 100, 100);

// Set width
progressBar.style.width = `${progressPercent}%`;

// Display text
progressText.textContent = `${runwayMonths.toFixed(1)} / ${maxRunway} months`;

// Dynamic bar colors
if (runwayMonths > 12) {
    progressBar.style.background = "linear-gradient(90deg, #00ff66, #00ffcc)";
}
else if (runwayMonths >= 6) {
    progressBar.style.background = "linear-gradient(90deg, #ffd700, #ffcc00)";
}
else if (runwayMonths >= 3) {
    progressBar.style.background = "linear-gradient(90deg, #ff9900, #ff6600)";
}
else {
    progressBar.style.background = "linear-gradient(90deg, #ff3b3b, #ff0000)";
}
});
});