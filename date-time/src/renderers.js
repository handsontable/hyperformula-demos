import { tableData } from "./data";
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

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const cellAddress = { sheet: sheetId, col, row };
      const cellHasFormula = hf.doesCellHaveFormula(cellAddress);
      const showFormula = calculated || !cellHasFormula;
      let cellValue = displayValue(cellAddress, showFormula);

      newTbodyHTML += `<td class="${
        cellHasFormula ? updatedCellClass : ""
      }"><span>
      ${cellValue}
      </span></td>`;
    }
  }

  tbodyDOM.innerHTML = newTbodyHTML;
}

/**
 * Force the table to display either the formula, the value or a raw source data value.
 *
 * @param {SimpleCellAddress} cellAddress Cell address.
 * @param {boolean} showFormula `true` if the formula should be visible.
 */
function displayValue(cellAddress, showFormula) {
  // Declare which columns should display the raw source data, instead of the data from HyperFormula.
  let sourceDataColumns = [0, 1];
  let cellValue = "";

  if (sourceDataColumns.includes(cellAddress.col)) {
    cellValue = tableData[cellAddress.row][cellAddress.col];
  } else {
    if (!hf.isCellEmpty(cellAddress) && showFormula) {
      cellValue = hf.getCellValue(cellAddress);
    } else {
      cellValue = hf.getCellFormula(cellAddress);
    }
  }

  return cellValue;
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
