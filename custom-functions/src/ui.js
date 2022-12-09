import { runCalculations, resetTable } from './renderers';
import { hf, sheetId } from './hyperformulaConfig';
import { tableData } from './data';

/**
 * Bind the events to the buttons.
 */
export function bindEvents() {
  const runButton = document.querySelector('#run');
  const resetButton = document.querySelector('#reset');

  runButton.addEventListener('click', () => {
    runCalculations(hf, sheetId);
  });

  resetButton.addEventListener('click', () => {
    resetTable(tableData);
  });
}

export const ANIMATION_ENABLED = true;
