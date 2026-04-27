let cashInput = document.getElementById("cash");
let burnRateInput = document.getElementById("burnRate");
let submit = document.getElementById("bttn");

let container = document.getElementsByClassName("container")[0];

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
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
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
        status.textContent = "SAFE ZONE ✅";
        status.classList.add("safe");
        monthsLeft.classList.add("safe");
        status.style.backgroundColor = "#042500";
        container.style.borderColor = "#3a972e";
        document.body.style.backgroundImage = "url('bg1.png')";
    } 
    else if (runwayMonths >= 6) {
        status.textContent = "MODERATE ZONE ⚠️";
        status.classList.add("warning");
        monthsLeft.classList.add("warning");
        status.style.backgroundColor = "#2c2c00";
        container.style.borderColor = "#ffd700";
        document.body.style.backgroundImage = "url('bg2.png')";
    } 
    else if (runwayMonths >= 3) {
        status.textContent = "WARNING ZONE ⚠️";
        status.classList.add("warning");
        monthsLeft.classList.add("warning");
        status.style.backgroundColor = "#4a2200";
        container.style.borderColor = "#ff9900";
        document.body.style.backgroundImage = "url('bg2.png')";
    } 
    else {
        status.textContent = "DANGER ZONE 🚨";
        status.classList.add("danger");
        monthsLeft.classList.add("danger");
        status.style.backgroundColor = "#2c0000";
        container.style.borderColor = "#ff3b3b";
        document.body.style.backgroundImage = "url('bg3.png')";
        daysLeft.textContent += " — Immediate cost reduction recommended!";
    }

    document.body.style.backgroundSize = "cover";
});