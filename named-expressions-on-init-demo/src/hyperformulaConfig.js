import HyperFormula from "hyperformula";
import { tableData } from "./data";

console.log(
  `%c Using HyperFormula ${HyperFormula.version}`,
  "color: blue; font-weight: bold"
);

const config = {
  dateFormats: ['MM/DD/YYYY', 'MM/DD/YY', 'YYYY/MM/DD'],
  timeFormats: ['hh:mm', 'hh:mm:ss.sss'],
  decimalSeparator: '.',
  currencySymbol: ['$', 'USD'],
  localeLang: 'en-US',
  licenseKey: "gpl-v3",
}

const sheetName = 'main';

const namedExpressions = [
  {
    name: 'AnnualInterestRate',
    expression: `=${sheetName}!$B$1`,
  },
  {
    name: 'NumberOfMonths',
    expression: `=${sheetName}!$B$2`,
  },
  {
    name: 'LoanAmount',
    expression: `=${sheetName}!$B$3`,
  },
];

// Create a HyperFormula instance with data and named expressions.
const hf = HyperFormula.buildFromSheets({ [sheetName]: tableData }, config, namedExpressions);
// Add a new sheet and get its id.
const sheetId = hf.getSheetId(sheetName);

export { hf, sheetName, sheetId };
