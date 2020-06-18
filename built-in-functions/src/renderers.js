import { hf } from "./hyperformulaConfig";

/**
 * Fill the HTML table with data.
 *
 * @param {string} sheetName Sheet name.
 * @param {number|boolean} [resultColumnSource] Index of a column to be have its formulas calculated and added as an additional last column in the table.
 */
export function renderTable(sheetName, resultColumnSource = false) {
  const sheetId = hf.getSheetId(sheetName);
  const tbodyDOM = document.querySelector(`#${sheetName}-container tbody`);
  const additionalColumnNumber = resultColumnSource === false ? 0 : 1;
  const { height, width } = hf.getSheetDimensions(sheetId);
  let newTbodyHTML = "";

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width + additionalColumnNumber; col++) {
      let cellAddress = null;
      let cellHasFormula = null;
      let cellValue = "";

      if (resultColumnSource === false || col < width) {
        cellAddress = { sheet: sheetId, col, row };
        cellHasFormula = hf.doesCellHaveFormula(cellAddress);

        if (!hf.isCellEmpty(cellAddress) && !cellHasFormula) {
          cellValue = hf.getCellValue(cellAddress);
        } else {
          cellValue = hf.getCellFormula(cellAddress);
        }
      } else if (resultColumnSource !== false && col === width) {
        cellAddress = { sheet: sheetId, col: resultColumnSource, row };
        cellHasFormula = hf.doesCellHaveFormula(cellAddress);

        if (!hf.isCellEmpty(cellAddress) && cellHasFormula) {
          cellValue = hf.getCellValue(cellAddress);
        }
      }

      newTbodyHTML += `<td><span>${cellValue}</span></td>`;
    }

    newTbodyHTML += "</tr>";
  }

  tbodyDOM.innerHTML = newTbodyHTML;
}
