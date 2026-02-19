import HyperFormula from 'hyperformula';
import { initialData } from './data';

export function setupHF() {
  console.log(`%c Using HyperFormula ${HyperFormula.version}`, 'color: blue; font-weight: bold');

  const hf = HyperFormula.buildEmpty({
    licenseKey: 'gpl-v3',
  });

  const sheetName = hf.addSheet('main');
  const sheetId = hf.getSheetId(sheetName);

  hf.setCellContents(
    { row: 0, col: 0, sheet: sheetId },
    initialData
  );

  return { hf, sheetId };
}

/** Read computed results from column C of the spreadsheet. */
export function readResultsFromHF(hf, sheetId) {
  const cell = (row) => ({ sheet: sheetId, row, col: 2 });
  return {
    irr3y: hf.getCellValue(cell(0)),
    irr5y: hf.getCellValue(cell(1)),
    npv: hf.getCellValue(cell(2)),
    paybackYear: hf.getCellValue(cell(3)),
  };
}

/** Update cash flow and discount rate values in the spreadsheet. */
export function setHFData(hf, sheetId, { initial, y1, y2, y3, y4, y5, discount }) {
  hf.setCellContents(
    { row: 0, col: 0, sheet: sheetId },
    [[initial], [y1], [y2], [y3], [y4], [y5], [discount]],
  );
}
