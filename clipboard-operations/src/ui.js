import { runCalculations, resetTable } from "./renderers";
import { hf, sheetId } from "./hyperformulaConfig";
import { tableData } from "./data";

/**
 * Bind the events to the buttons.
 */
export function bindEvents() {
  const copyButton = document.querySelector("#copy");
  const pasteButton = document.querySelector("#paste");
  const wasCopied = document.createTextNode("Second row copied");
  const wasPasted = document.createTextNode("Pasted into the first row");
  const UImsg = document.querySelector("#isCopied");

  copyButton.addEventListener("click", () => {
    runCalculations(hf, sheetId);
    wasPasted.remove();
    UImsg.appendChild(wasCopied);
  });

  pasteButton.addEventListener("click", () => {
    resetTable(tableData);
    wasCopied.remove();
    UImsg.appendChild(wasPasted);
  });
}

export const ANIMATION_ENABLED = true;
