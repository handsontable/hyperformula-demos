import { renderResult } from "./renderers";
import { hf, sheetId } from "./hyperformulaConfig";
import { tableData } from "./data";

/**
 * Bind the events to the buttons.
 */
export function bindEvents() {
  const runButton = document.querySelector("#run");

  runButton.addEventListener("click", () => {
    renderResult();
  });
}

export const ANIMATION_ENABLED = true;
