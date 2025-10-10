import { runCalculations, resetTable } from './renderers';
import { hf, revenueSheetId } from './hyperformulaConfig';
import { revenueData } from './data';

/**
 * Bind the events to the buttons.
 */
export function bindEvents() {
  const runButton = document.querySelector('#run');
  const resetButton = document.querySelector('#reset');

  runButton.addEventListener('click', () => {
    runCalculations();
  });

  resetButton.addEventListener('click', () => {
    // Reset by clearing all sheets and re-adding initial data
    hf.clearSheet(revenueSheetId);
    hf.setCellContents(
      { sheet: revenueSheetId, col: 0, row: 0 },
      revenueData
    );
    resetTable();
  });
}

export const ANIMATION_ENABLED = true;
