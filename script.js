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
    if (currentCalculation.length > 0 && hasOperator()) return;
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

  function hasOperator() {
    const operators = ["+", "-", "x", "/", "^"];
    const lastOperatorIndex = Math.max(
      currentCalculation.lastIndexOf("+"),
      currentCalculation.lastIndexOf("-"),
      currentCalculation.lastIndexOf("x"),
      currentCalculation.lastIndexOf("/"),
      currentCalculation.lastIndexOf("^")
    );

    const lastNonOperatorIndex = Math.max(
      currentCalculation.lastIndexOf("."),
      currentCalculation.lastIndexOf("0"),
      currentCalculation.lastIndexOf("1"),
      currentCalculation.lastIndexOf("2"),
      currentCalculation.lastIndexOf("3"),
      currentCalculation.lastIndexOf("4"),
      currentCalculation.lastIndexOf("5"),
      currentCalculation.lastIndexOf("6"),
      currentCalculation.lastIndexOf("7"),
      currentCalculation.lastIndexOf("8"),
      currentCalculation.lastIndexOf("9")
    );

    return lastOperatorIndex > lastNonOperatorIndex;
  }

  const isCleanChar = (value) => value === "<";

  function calculateResult() {
    try {
      currentResult = eval(currentCalculation.replace("x", "*"));
      result.textContent = currentResult;
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
