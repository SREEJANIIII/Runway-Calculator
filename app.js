let cashInput = document.getElementById("cash");
let burnRateInput = document.getElementById("burnRate");
let submit = document.getElementById("bttn");

let monthsLeft = document.getElementById("monthsLeft");
let status = document.getElementById("status");
let daysLeft = document.getElementById("daysLeft");
let container = document.getElementsByClassName("container")[0];
let result;

submit.addEventListener("click", () => {
    if (document.getElementById("result")) {
    document.getElementById("result").remove();
}
    result= document.createElement("div");
    let monthsLeft = document.createElement("h2");
    let status = document.createElement("p");
    let daysLeft = document.createElement("p");
    result.id = "result";
    monthsLeft.id = "monthsLeft";
    status.id = "status";
    daysLeft.id = "daysLeft";
    result.appendChild(monthsLeft);
    result.appendChild(status);
    result.appendChild(daysLeft);
    container.appendChild(result);

    let cash = parseFloat(cashInput.value);
    let burnRate = parseFloat(burnRateInput.value);

    if (isNaN(cash) || isNaN(burnRate) || burnRate <= 0) {
        alert("Please enter valid financial values.");
        return;
    }

    let runwayMonths = cash / burnRate;
    let runwayDays = Math.floor(runwayMonths * 30);

    monthsLeft.textContent = `${runwayMonths.toFixed(1)} Months of Runway`;
    daysLeft.textContent = `${runwayDays} Days Until Zero`;

    // Reset classes
    status.className = "";
    monthsLeft.className = "";

    // Financial health states
    if (runwayMonths > 6) {
        
        status.textContent = "SAFE ZONE ✅";
        status.classList.add("safe");
        status.style.backgroundColor = "#042500";
        monthsLeft.classList.add("safe");
        container.style.borderColor = "#3a972e";
        document.body.style.backgroundImage="url('bg1.png')";
        document.body.style.backgroundSize="cover";
    } 
    else if (runwayMonths >= 3) {
        container.style.backgroundColor = "#000000";
        status.textContent = "WARNING ZONE ⚠️";
        status.classList.add("warning");
        monthsLeft.classList.add("warning");
        container.style.borderColor = "#ffd700";
        status.style.backgroundColor = "#2c2c00";
        document.body.style.backgroundImage="url('bg2.png')";
        document.body.style.backgroundSize="cover";
    } 
    else {
        container.style.backgroundColor = "#000000";
        status.textContent = "DANGER ZONE 🚨";
        status.classList.add("danger");
        monthsLeft.classList.add("danger");
        container.style.borderColor = "#ff3b3b";
        status.style.backgroundColor = "#2c0000";
        document.body.style.backgroundImage="url('bg3.png')";
        document.body.style.backgroundSize="cover";
    }

    if (runwayMonths < 3) {
        daysLeft.textContent += " — Immediate cost reduction recommended!";
    }

});