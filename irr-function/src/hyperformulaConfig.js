import HyperFormula from 'hyperformula';
import { tableData } from './data';

console.log(`%c Using HyperFormula ${HyperFormula.version}`, 'color: blue; font-weight: bold');

const hf = HyperFormula.buildEmpty({
  precisionRounding: 10,
  licenseKey: 'gpl-v3',
});

const sheetName = hf.addSheet('main');
const sheetId = hf.getSheetId(sheetName);

hf.setCellContents(
  { row: 0, col: 0, sheet: sheetId },
  tableData
);

export { hf, sheetName, sheetId };
