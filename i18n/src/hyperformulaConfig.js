import HyperFormula from "hyperformula";
import enUS from "hyperformula/es/i18n/languages/enUS"
import { tableData } from "./data";

console.log(
  `%c Using HyperFormula ${HyperFormula.version}`,
  "color: blue; font-weight: bold"
);

const config = {
  language: 'enUS',
  dateFormats: ['MM/DD/YYYY', 'MM/DD/YY', 'YYYY/MM/DD'],
  timeFormats: ['hh:mm', 'hh:mm:ss.sss'],
  decimalSeparator: '.',
  thousandSeparator: ',',
  functionArgSeparator: ';',
  currencySymbol: ['$', 'USD'],
  localeLang: 'en-US',
  licenseKey: "gpl-v3",
}

HyperFormula.registerLanguage('enUS', enUS);

// Create an empty HyperFormula instance.
const hf = HyperFormula.buildEmpty(config);

// Add a new sheet and get its id.
const sheetName = hf.addSheet("main");
const sheetId = hf.getSheetId(sheetName);

// Fill the HyperFormula sheet with data.
hf.setCellContents(
  {
    row: 0,
    col: 0,
    sheet: sheetId
  },
  tableData
);

export { hf, sheetName, sheetId };
