import { hf, sheetId } from "./hyperformulaConfig";
import { nbRows } from "./data";

/**
 * Bind the events to the buttons.
 */
export function bindEvents() {
  const calculateButton = document.querySelector("#calculate");
  const formulaPreview = document.querySelector("#address-preview");
  const calculationResult = document.querySelector("#result");
  const cellAddress = { sheet: sheetId, row: 2, col: 2 };
  const cellName = hf.simpleCellAddressToString(cellAddress, sheetId);
  formulaPreview.innerText = cellName;

  calculateButton.addEventListener("click", () => {
        const before = window.performance.now();
        for (let i=1; i<=nbRows; i++) {
          const oneCellAddress = { sheet: sheetId, row: i, col: 2 };
          const res = hf.getCellValue(oneCellAddress);
        }
        const dur = window.performance.now() - before;
        const res = hf.getCellValue(cellAddress);
        calculationResult.innerText = `${res} (${dur} ms)`;
  });
}
