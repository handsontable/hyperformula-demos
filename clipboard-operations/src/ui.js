import { renderTable, updateCopyInfo } from "./renderers";
import { hf, reinitializeData } from "./hyperformulaConfig";

/**
 * Bind the events to the buttons.
 */
export function bindEvents() {
  const copyButton = document.querySelector("#copy");
  const pasteButton = document.querySelector("#paste");
  const resetButton = document.querySelector("#reset");

  copyButton.addEventListener("click", () => {
    copy();
    updateCopyInfo("Second row copied");
  });

  pasteButton.addEventListener("click", () => {
    paste();
    updateCopyInfo("Pasted into the first row");
  });

  resetButton.addEventListener("click", () => {
    reinitializeData();
    updateCopyInfo("");
    renderTable();
  });
}

/**
 * Copy the second row.
 */
function copy() {
  return hf.copy({ sheet: 0, col: 0, row: 1 }, 3, 1);
}

/**
 * Paste the HF clipboard into the first row.
 */
function paste() {
  hf.paste({ sheet: 0, col: 0, row: 0 });
  renderTable();
}

export const ANIMATION_ENABLED = true;
