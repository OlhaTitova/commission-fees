const cashInConfig = require('./json/cash-in.json');
const cashOutJuridicalConfig = require('./json/cash-out-juridical.json');
const cashOutNaturalConfig = require('./json/cash-out-natural.json');
const fs = require('fs');

const processData = async (inputData) => {
  if(!inputData) {
    throw new Error('No input data')
  };

  const operations = JSON.parse(inputData);

  try{
    const {CalculateFees} = await import('./src/use-cases/calculate-fees/calculate-fees.js');
    const feesCalculator = new CalculateFees({
      cashInConfig,
      cashOutJuridicalConfig,
      cashOutNaturalConfig,
      operations
    });

    return feesCalculator.getFees();
  }
  catch(err){
    console.error('Error in get commission fees', err);
    throw err;
  }
}

const getResult = (data) => {
  let a;
  processData(data).then((result) => {
    result.forEach(fee => console.log(fee.toFixed(2)));
    a = result;
  })

  return a;
}

const main = () => {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: node index.cjs <input_file_path>');
    return;
  }
  const filePath = args[0];
  const inputData = fs.readFileSync(filePath, 'utf8')
  getResult(inputData);
};

main();
