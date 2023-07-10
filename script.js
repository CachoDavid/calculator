// JavaScript
window.addEventListener("DOMContentLoaded", () => {
  const calculation = document.getElementById("calculation");
  const result = document.getElementById("result");
  const numericButtons = document.querySelectorAll(".num");
  const operatorButtons = document.querySelectorAll(".operator");

  let currentCalculation = "";
  let currentResult = "";

  numericButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonValue = button.textContent;
      updateCalculation(buttonValue);
    });
  });

  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonValue = button.textContent;

      if (buttonValue === "=") {
        calculateResult();
      } else if (buttonValue === "C") {
        clearAll();
      } else if (buttonValue === "CE") {
        clearRow();
      } else if (buttonValue === "<") {
        removeLastChar();
      } else {
        addOperator(buttonValue);
      }
    });
  });

  function addOperator(value) {
    currentCalculation += value;
    calculation.textContent = currentCalculation;
    currentResult = "";
    result.textContent = currentResult;
  }

  function updateCalculation(value) {
    if (hasPointer(value)) return;

    if (isCleanChar(value)) {
      removeLastChar();
      return;
    }

    currentCalculation += value;
    currentResult += value;
    calculation.textContent = currentCalculation;
    result.textContent = currentResult;
  }

  const hasPointer = (value) =>
    value === "." && currentCalculation.includes(".");

  const isCleanChar = (value) => value === "<";

  function calculateResult() {
    try {
      currentResult = eval(currentCalculation.replace("x", "*"));
      result.textContent = currentResult.replace("Infinity", "Error");
    } catch (error) {
      result.textContent = "Error";
    }
  }

  function clearAll() {
    currentCalculation = "";
    currentResult = "";
    calculation.innerHTML = "";
    result.textContent = "";
  }

  function clearRow() {
    if (currentResult.length === 0) return;
    const currentResultsLength = currentResult.length;
    currentCalculation = currentCalculation.slice(0, currentResultsLength * -1);
    currentResult = "";
    calculation.textContent = currentCalculation;
    result.textContent = currentResult;
  }

  function removeLastChar() {
    if (currentResult.length === 0) return;

    currentCalculation = currentCalculation.slice(0, -1);
    currentResult = currentResult.slice(0, -1);
    calculation.textContent = currentCalculation;
    result.textContent = currentResult;
  }

  function displayResult(value) {
    result.textContent = value;
  }
});
