const billInput = document.querySelector("#bill");
const tipPercentBtns = document.querySelectorAll(".radio-item");
const peopleNumInput = document.querySelector("#people");
const tipAmountDisp = document.querySelector("#tip-amount");
const totalDisp = document.querySelector("#total");
const resetBtn = document.querySelector(".button--reset");
const error = document.querySelector(".error-msg");

let bill = 0;
let tipPercent = 0;
let peopleNum = 0;
let tipAmount = 0;
let total = 0;

billInput.addEventListener("input", calculateTip);
billInput.addEventListener("focus", () => {
  billInput.parentElement.classList.add("focused");
  billInput.parentElement.classList.remove("unfocused");
});
billInput.addEventListener("blur", () => {
  billInput.parentElement.classList.add("unfocused");
  billInput.parentElement.classList.remove("focused");
});

tipPercentBtns.forEach((button) => {
  button.addEventListener("click", updatePercent);
  if (button.nodeName == "INPUT") {
    button.addEventListener("input", updatePercent);
  }
});

peopleNumInput.addEventListener("input", () => {
  if (peopleNumInput.value == "" || peopleNumInput.value == "0") {
    error.style.display = "inline";
    peopleNumInput.parentElement.classList.add("error");
  } else {
    error.style.display = "none";
    peopleNumInput.parentElement.classList.remove("error");
    calculateTip();
  }
});
peopleNumInput.addEventListener("focus", () => {
  peopleNumInput.parentElement.classList.add("focused");
  peopleNumInput.parentElement.classList.remove("unfocused");
});
peopleNumInput.addEventListener("blur", () => {
  peopleNumInput.parentElement.classList.add("unfocused");
  peopleNumInput.parentElement.classList.remove("focused");
});

resetBtn.addEventListener("click", clearAllData);

function updatePercent(e) {
  // Remove active state from the button chosen previously
  tipPercentBtns.forEach((button) => {
    button.classList.remove("active");
    button.classList.remove("active--custom");
  });
  // Adding active state to the right button
  if (e.target.id == "custom-percent") {
    e.target.classList.add("active--custom");
  } else {
    e.target.classList.add("active");
  }
  // Update percent value
  tipPercent =
    parseInt(e.target.dataset.percent) * 0.01 ||
    parseInt(e.target.value) * 0.01;
  calculateTip();
}

function calculateTip() {
  bill = parseInt(billInput.value);
  peopleNum = parseInt(peopleNumInput.value);

  if (bill && peopleNum) {
    tipAmount = (bill * tipPercent) / peopleNum;
    total = (bill + tipAmount) / peopleNum;
  }
  // Displaying the results
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  tipAmountDisp.innerHTML = formatter.format(tipAmount);
  totalDisp.innerHTML = formatter.format(total);
  resetBtn.classList.add("active");
}

function clearAllData() {
  location.reload();
}
