// usage:
// npm run tsc && node index.js

const txt: string = "world";
console.log("hello", txt);

import HyperFormula from 'hyperformula';

const hf = HyperFormula.buildEmpty({
  language: 'enGB', // TODO: change to enUS
  dateFormats: ['MM/DD/YYYY', 'MM/DD/YY', 'YYYY/MM/DD'],
  timeFormats: ['hh:mm', 'hh:mm:ss.sss'],
  decimalSeparator: '.',
  thousandSeparator: ',',
  functionArgSeparator: ';',
  currencySymbol: ['$', 'USD'],
  localeLang: 'en-US',
  licenseKey: "gpl-v3",
});

const sheetName = hf.addSheet("main");
const sheetId = hf.getSheetId(sheetName);

const tableData = [
  ["Greg Black", "11:45 AM", "05/23/1989", "=YEAR(NOW())-YEAR(C1)", "$80,000.00"],
  ["Anne Carpenter", "12:30 PM", "01/01/1980", "=YEAR(NOW())-YEAR(C2)", "$95,000.00"],
  ["Natalie Dem", "1:30 PM", "12/13/1973", "=YEAR(NOW())-YEAR(C3)","$78,500.00"],
  ["John Sieg", "2:00 PM", "10/31/1995", "=YEAR(NOW())-YEAR(C4)", "$114,000.00"],
  ["Chris Aklips", "11:30 AM", "08/18/1987", "=YEAR(NOW())-YEAR(C5)", "$71,900.00"],
  ["AVERAGE", null, null, "=AVERAGE(D1:D5)", "=AVERAGE(E1:E5)"]
];

hf.setCellContents(
  {
    row: 0,
    col: 0,
    sheet: sheetId
  },
  tableData
);

console.log(hf.getAllSheetsValues());