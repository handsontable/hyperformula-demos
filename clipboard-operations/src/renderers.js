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
<td colspan="2"></td>
</tr>`;

  newTbodyHTML += totalRowsHTML;

  tbodyDOM.innerHTML = newTbodyHTML;
}

/**
 * Replace formulas with their results.
 */
export function runCalculations() {
  // renderTable(true);
  const copied = hf.copy({ sheet: 0, col: 0, row: 1 }, 3, 1);
  return copied;
}

/**
 * Replace the values in the table with initial data.
 */
export function resetTable() {
  hf.paste({ sheet: 0, col: 0, row: 0 });
  renderTable();
}

window.onload = function() {
  return renderTable(true);
};

window.onload();
