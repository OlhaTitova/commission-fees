const cashInJson = require('./json/cash-in.json');
const cashOutJuridicalJson = require('./json/cash-out-juridical.json');
const cashOutNaturalJson = require('./json/cash-out-natural.json');
const fs = require('fs');

const processData = (inputData) => {
  const operations = JSON.parse(inputData);

  return import('./src/use-cases/calculate-fees.js')
    .then(({CalculateFees}) => new CalculateFees({
      cashInJson,
      cashOutJuridicalJson,
      cashOutNaturalJson,
      operations
    }).getFee())
    .catch(err => console.error('Error in get commission fees', err)
    )
};

const readFile = (filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    processData(data).then(r => r);
  });
};

const main = () => {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: node index.cjs <input_file_path>');
    return;
  }
  const filePath = args[0];
  readFile(filePath);
};

main();