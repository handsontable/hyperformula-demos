import { runCalculations, resetTable } from './renderers';
import { hf, sheetId } from './hyperformulaConfig';
import { tableData } from './data';

/**
 * Bind click events to the Run and Reset buttons.
 */
export function bindEvents() {
  const runButton = document.querySelector('#run');
  const resetButton = document.querySelector('#reset');

  runButton.addEventListener('click', () => {
    runCalculations();
  });

  resetButton.addEventListener('click', () => {
    hf.clearSheet(sheetId);
    hf.setCellContents(
      { sheet: sheetId, col: 0, row: 0 },
      tableData
    );
    resetTable();
  });
}

export const ANIMATION_ENABLED = true;
