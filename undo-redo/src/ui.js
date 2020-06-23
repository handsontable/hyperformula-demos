import { renderTable, clearInfo, displayInfo } from "./renderers";
import { hf, sheetId } from "./hyperformulaConfig";

/**
 * Bind the events to the buttons.
 */
export function bindEvents() {
  const removeRowButton = document.querySelector("#remove-row");
  const undoButton = document.querySelector("#undo");

  removeRowButton.addEventListener("click", () => {
    removeSecondRow();
  });

  undoButton.addEventListener("click", () => {
    undo();
  });
}

/**
 * Remove the second row from the table.
 */
export function removeSecondRow() {
  const filledRowCount = hf.getSheetDimensions(sheetId).height;

  clearInfo();

  if (filledRowCount < 2) {
    displayInfo("There's not enough filled rows to perform this action.");

    return;
  }

  hf.removeRows(sheetId, [1, 1]);
  renderTable(true);
}

/**
 * Run the HF undo action.
 */
export function undo() {
  clearInfo();

  if (!hf.isThereSomethingToUndo()) {
    displayInfo("There's nothing to undo.");

    return;
  }

  hf.undo();
  renderTable();
}

export const ANIMATION_ENABLED = true;
