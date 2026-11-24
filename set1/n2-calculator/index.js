// Full name: JC Argel Balcarse
// Section: IV-BSIT-A
// Activity: N2 - Modular Calculator
// Date: 2026-11-19

const math = require('./operations'); // Custom module na may math functions.
const formatResult = require('./formatter'); // Custom formatter.
const os = require('os'); // Built-in module: kunin ang platform info.

const [operation, firstText, secondText] = process.argv.slice(2);
const first = Number(firstText);
const second = Number(secondText);

if (!operation || firstText === undefined || secondText === undefined ||
    !Number.isFinite(first) || !Number.isFinite(second)) {
  console.log('Usage: node index.js <add|subtract|multiply|divide|average> <number1> <number2>');
  process.exitCode = 1;
} else {
  const symbols = { add: '+', subtract: '-', multiply: '*', divide: '/', average: 'avg' };
  if (!Object.prototype.hasOwnProperty.call(symbols, operation)) {
    console.log('Unknown operation. Piliin: add, subtract, multiply, divide, average.');
    process.exitCode = 1;
  } else {
    try {
      const result = math[operation](first, second);
      console.log(formatResult(symbols[operation], first, second, result));
      console.log('Platform:', os.platform());
    } catch (error) {
      console.log('Error:', error.message);
      process.exitCode = 1;
    }
  }
}
