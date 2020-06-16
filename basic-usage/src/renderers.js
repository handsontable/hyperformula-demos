import { hf, sheetId } from "./hyperformulaConfig";

/**
 * Fill the HTML table with data.
 */
export function renderTable() {
  const tbodyDOM = document.querySelector(".example tbody");
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

      newTbodyHTML += `<td><span>
      ${cellValue}
      </span></td>`;
    }

    newTbodyHTML += "</tr>";
  }

  tbodyDOM.innerHTML = newTbodyHTML;
}
