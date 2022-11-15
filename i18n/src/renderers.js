import { hf, sheetId } from "./hyperformulaConfig";
import { formatCellValue } from "./formatCellValue";
import { ANIMATION_ENABLED } from "./ui";

/**
 * Fill the HTML table with data.
 *
 * @param {boolean} calculated `true` if it should render calculated values, `false` otherwise.
 */
export function renderTable(calculated = false) {
  const tbodyDOM = document.querySelector(".example tbody");
  const updatedCellClass = ANIMATION_ENABLED ? "updated-cell" : "";
  const { height, width } = hf.getSheetDimensions(sheetId);
  let newTbodyHTML = "";

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const cellAddress = { sheet: sheetId, col, row };
      const cellHasFormula = hf.doesCellHaveFormula(cellAddress);
      const showFormula = cellHasFormula && !calculated;
      const displayValue = showFormula ? hf.getCellFormula(cellAddress) : formatCellValue(cellAddress);

      newTbodyHTML += `<td class="${
        cellHasFormula ? updatedCellClass : ""
      }"><span>
      ${displayValue}
      </span></td>`;
    }

    newTbodyHTML += "</tr>";
  }

  tbodyDOM.innerHTML = newTbodyHTML;
}

/**
 * Replace formulas with their results.
 */
export function runCalculations() {
  renderTable(true);
}

/**
 * Replace the values in the table with initial data.
 */
export function resetTable() {
  renderTable();
}
