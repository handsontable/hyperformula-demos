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
      let cellValue = hf.getCellValue(cellAddress);

      newTbodyHTML += `<td class="${updatedCellClass}"><span>
      ${cellValue}
      </span></td>`;
    }

    newTbodyHTML += "</tr>";
  }

  tbodyDOM.innerHTML = newTbodyHTML;
}

/**
 * Clear the existing information.
 */
export function clearInfo() {
  const infoBoxDOM = document.querySelector("#info-box");

  infoBoxDOM.innerHTML = "&nbsp;";
}

/**
 * Display the provided message in the info box.
 *
 * @param {string} message Message to display.
 */
export function displayInfo(message) {
  const infoBoxDOM = document.querySelector("#info-box");

  infoBoxDOM.innerText = message;
}
