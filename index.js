import fs from 'fs';
import CalculateFees from './src/use-cases/calculate-fees/calculate-fees.js';
import cashInConfig from './json/cash-in.json' assert { type: "json" };
import cashOutJuridicalConfig from './json/cash-out-juridical.json' assert { type: "json" };
import cashOutNaturalConfig from './json/cash-out-natural.json' assert { type: "json" };

const processData = (inputData) => {
  if (!inputData) {
    throw new Error('No input data');
  }

  const operations = JSON.parse(inputData);
  const feesCalculator = new CalculateFees({
    operations,
    cashInConfig,
    cashOutJuridicalConfig,
    cashOutNaturalConfig,
  });

  return feesCalculator.getFees();
}

const displayResults = (results) => {
  results.forEach((fee) => console.log(fee.toFixed(2)));
};

const main = () => {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: node index.js <input_file_path>');
    return;
  }
  const filePath = args[0];
  const inputData = fs.readFileSync(filePath, 'utf8');
  const results = processData(inputData);
  displayResults(results);
};

main();
