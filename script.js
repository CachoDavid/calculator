class Calculator {
  constructor(displayTextPreview, displayTextCurrent) {
    this.displayTextPreview = displayTextPreview;
    this.displayTextCurrent = displayTextCurrent;
    this.clear();
  }

  chooseOperation(operation) {
    if (this.operation === "=") {
      this.calculator();
    }

    this.operation = operation;
    this.previousOperand = `${this.CurrentOperand} ${this.operation}`;
    this.CurrentOperand = "";
  }

  appendNumber(number) {
    if (this.CurrentOperand.includes(".") && number === ".") return;
    this.CurrentOperand = `${this.CurrentOperand}${number.toString()}`;
  }

  clear() {
    this.CurrentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.displayTextPreview.innerText = this.previousOperand;
    this.displayTextCurrent.innerText = this.CurrentOperand;
  }
}
const numberButtons = document.querySelectorAll(".button.num");
const operationButtons = document.querySelectorAll(".button.operator");
const equalsButtons = document.querySelector(".equal");
const cleanAllButtons = document.querySelector(".cleanAll");
const cleanRowButtons = document.querySelector(".cleanRow");
const displayTextPreview = document.getElementById("calculation");
const displayTextCurrent = document.getElementById("result");

const calculator = new Calculator(displayTextPreview, displayTextCurrent);
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(
      "🚀 ~ file: script.js:49 ~ numberButtons.forEach ~ button:",
      button.innerText
    );
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

cleanAllButtons.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
