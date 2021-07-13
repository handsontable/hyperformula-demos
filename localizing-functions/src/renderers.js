import { hf, sheetId } from "./hyperformulaConfig";
import { ANIMATION_ENABLED } from "./ui";

/**
 * Fill the HTML table with data.
 *
 * @param {boolean} calculated `true` if it should render calculated values, `false` otherwise.
 */
export function renderTable(calculated = false) {
  const tbodyDOM = document.querySelector(".example tbody");
  const updatedCellClass = ANIMATION_ENABLED ? "updated-cell" : "";
  const totals = ["=SOMME(Year_1)", "=SOMME(Year_2)"];
  const { height, width } = hf.getSheetDimensions(sheetId);
  let newTbodyHTML = "";
  let totalRowsHTML = "";

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const cellAddress = { sheet: sheetId, col, row };
      const cellHasFormula = hf.doesCellHaveFormula(cellAddress);
      const showFormula = calculated || !cellHasFormula;
      let cellValue = "";

      if (!hf.isCellEmpty(cellAddress) && showFormula) {
        cellValue = hf.getCellValue(cellAddress);

        if (!isNaN(cellValue)) {
          cellValue = cellValue.toFixed(2);
        }
      } else {
        cellValue = hf.getCellFormula(cellAddress);
      }

      newTbodyHTML += `<td class="${
        cellHasFormula ? updatedCellClass : ""
      }"><span>
      ${cellValue}
      </span></td>`;
    }

    newTbodyHTML += "</tr>";
  }

  totalRowsHTML = `<tr>
<td>TOTAL</td>
<td class="${updatedCellClass}">
  <span>${
    calculated
      ? hf.calculateFormula(totals[0], sheetId).toFixed(2)
      : totals[0]
  }</span>
</td>
<td class="${updatedCellClass}">
  <span>${
    calculated
      ? hf.calculateFormula(totals[1], sheetId).toFixed(2)
      : totals[1]
  }</span>
</td>
<td colspan="2"></td>
</tr>`;

  newTbodyHTML += totalRowsHTML;

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
