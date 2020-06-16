import { hf, sheetId } from "./hyperformulaConfig";

/**
 * Bind the events to the buttons.
 */
export function bindEvents() {
  const calculateButton = document.querySelector("#calculate");
  const formulaPreview = document.querySelector("#formula-preview");
  const calculationResult = document.querySelector("#result");
  const cellAddress = { sheet: sheetId, row: 0, col: 2 };

  formulaPreview.innerText = hf.getCellFormula(cellAddress);

  calculateButton.addEventListener("click", () => {
    calculationResult.innerText = hf.getCellValue(cellAddress);
  });
}
