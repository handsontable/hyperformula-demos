import { hf, sheetId } from "./hyperformulaConfig";
import { ANIMATION_ENABLED } from "./ui";

/**
 * Fill the HTML table with data.
 */
export function renderTable() {
  const tbodyDOM = document.querySelector(".example tbody");
  const updatedCellClass = ANIMATION_ENABLED ? "updated-cell" : "";
  const { height, width } = hf.getSheetDimensions(sheetId);
  let newTbodyHTML = "";

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const cellAddress = { sheet: sheetId, col, row };
      const cellHasFormula = hf.doesCellHaveFormula(cellAddress);
      const showFormula = cellHasFormula;
      let cellValue = "";

      if (!hf.isCellEmpty(cellAddress) && !showFormula) {
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

  tbodyDOM.innerHTML = newTbodyHTML;
}

/**
 * Update the information about the copy/paste action.
 *
 * @param {string} message Message to display.
 */
export function updateCopyInfo(message) {
  const copyInfoDOM = document.querySelector("#copyInfo");

  copyInfoDOM.innerText = message;
}
