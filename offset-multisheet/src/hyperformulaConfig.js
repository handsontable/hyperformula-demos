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
    licenseKey: 'gpl-v3'
  }
);

// Get sheet IDs.
const revenueSheetId = hf.getSheetId(revenueSheetName);
const summarySheetId = hf.getSheetId(summarySheetName);

export { hf, revenueSheetName, summarySheetName, revenueSheetId, summarySheetId };
