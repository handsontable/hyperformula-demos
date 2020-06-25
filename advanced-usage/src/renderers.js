import { hf, sheetInfo } from "./hyperformulaConfig";

/**
 * Fill the HTML table with data.
 *
 * @param {string} sheetName Sheet name.
 */
export function renderTable(sheetName) {
  const sheetId = hf.getSheetId(sheetName);
  const tbodyDOM = document.querySelector(`#${sheetName}-container tbody`);
  const { height, width } = hf.getSheetDimensions(sheetId);
  let newTbodyHTML = "";

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const cellAddress = { sheet: sheetId, col, row };
      const cellHasFormula = hf.doesCellHaveFormula(cellAddress);
      let cellValue = "";

      if (!hf.isCellEmpty(cellAddress) && !cellHasFormula) {
        cellValue = hf.getCellValue(cellAddress);
      } else {
        cellValue = hf.getCellFormula(cellAddress);
      }

      newTbodyHTML += `<td><span>${cellValue}</span></td>`;
    }

    newTbodyHTML += "</tr>";
  }

  tbodyDOM.innerHTML = newTbodyHTML;
}

/**
 * Render the result block.
 */
export function renderResult() {
  const resultOutputDOM = document.querySelector("#result .output");
  const cellAddress = hf.simpleCellAddressFromString(
    `${sheetInfo.formulas.sheetName}!A1`
  );

  resultOutputDOM.innerHTML = `<span>
  <strong>${hf.getCellValue(cellAddress)}</strong> won!
  </span>`;
}
