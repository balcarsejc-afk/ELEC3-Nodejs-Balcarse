// Full name: JC Argel Balcarse
// Section: IV-BSIT-A
// Activity: N2 - Modular Calculator
// Date: 2026-11-19

// Bawat function ay isang math operation; simple ang logic para madaling sundan.
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) throw new Error('Hindi puwedeng mag-divide sa zero.');
  return a / b;
}
function average(a, b) { return (a + b) / 2; }

module.exports = { add, subtract, multiply, divide, average };
