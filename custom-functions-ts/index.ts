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