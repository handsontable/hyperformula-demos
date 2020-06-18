import { hf, sheetId } from "./hyperformulaConfig";

/**
 * Fill the HTML table with data.
 */
export function renderTable() {
  const theadDOM = document.querySelector(".example thead");
  const tbodyDOM = document.querySelector(".example tbody");
  const { height, width } = hf.getSheetDimensions(sheetId);
  let newTheadHTML = "";
  let newTbodyHTML = "";

  for (let row = -1; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (row === -1) {
        newTheadHTML += `<th><span></span></th>`;
        continue;
      }

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

  tbodyDOM.innerHTML = `<tr>${newTbodyHTML}</tr>`;
  theadDOM.innerHTML = newTheadHTML;
}
