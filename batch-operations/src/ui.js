import { renderTable } from "./renderers";
import { hf, sheetId } from "./hyperformulaConfig";
import { tableData } from "./data";

export const ANIMATION_ENABLED = true;
let IS_CALCULATED = false;

/**
 * Bind the events to the buttons.
 */
export function bindEvents() {
  const runButton = document.querySelector("#run");
  const resetButton = document.querySelector("#reset");
  const calculatedCheckbox = document.querySelector("#isCalculated");

  runButton.addEventListener("click", () => {
    runBatchOperations();
  });

  resetButton.addEventListener("click", () => {
    resetTableData();
  });

  calculatedCheckbox.addEventListener("change", e => {
    if (e.target.checked) {
      renderTable(true);
    } else {
      renderTable();
    }

    IS_CALCULATED = e.target.checked;
  });
}

/**
 * Reset the data for the table.
 */
function resetTableData() {
  hf.setSheetContent(sheetId, tableData);
  renderTable(IS_CALCULATED);
}

/**
 * Run batch operations.
 */
function runBatchOperations() {
  hf.batch(() => {
    hf.setCellContents({ col: 1, row: 0, sheet: sheetId }, [["=B4"]]);
    hf.setCellContents({ col: 1, row: 1, sheet: sheetId }, [["=B4"]]);
    hf.setCellContents({ col: 1, row: 2, sheet: sheetId }, [["=B4"]]);
    hf.setCellContents({ col: 1, row: 4, sheet: sheetId }, [["=B4"]]);
  });

  renderTable(IS_CALCULATED);
}
