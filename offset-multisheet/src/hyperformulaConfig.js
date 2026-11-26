import HyperFormula from 'hyperformula';
import { revenueData, summaryData } from './data';

console.log(`%c Using HyperFormula ${HyperFormula.version}`, 'color: blue; font-weight: bold');

const revenueSheetName = 'Revenue';
const summarySheetName = 'Summary';

// Create HyperFormula instance with two sheets.
const hf = HyperFormula.buildFromSheets(
  {
    [revenueSheetName]: revenueData,
    [summarySheetName]: summaryData,
  },
  {
    licenseKey: 'your-license-key', // get a key at https://handsontable.com/pricing/?tab=hyperformula
  }
);

// Get sheet IDs.
const revenueSheetId = hf.getSheetId(revenueSheetName);
const summarySheetId = hf.getSheetId(summarySheetName);

export { hf, revenueSheetName, summarySheetName, revenueSheetId, summarySheetId };
