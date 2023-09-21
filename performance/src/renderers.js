import { hf, sheetId, loadSpreadsheet } from "./hyperformulaConfig";
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
  const { width } = hf.getSheetDimensions(sheetId);
  let newTbodyHTML = "";

  for (let row = 0; row < 50; row++) {
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

export function toggleLoader(showLoader = true) {
  const runButtonLabel = document.querySelector("#run-button-label");
  runButtonLabel.innerHTML = showLoader ? '' : 'Reload 1M data cells';
  if (showLoader) {
    runButtonLabel.classList.add("loader");
    return;
  }

  runButtonLabel.classList.remove("loader");
}

export function redraw() {
  return new Promise(resolve => setTimeout(() => resolve(), 0));
}

export async function run() {
  toggleLoader(true);
  await redraw();

  const ty1 = (new Date()).getTime();
  loadSpreadsheet();
  const ty2 = (new Date()).getTime();
  renderTable(true);

  const loadingTimeMessageContainer = document.querySelector("#message");
  loadingTimeMessageContainer.innerHTML = `Loading time: ${(ty2 - ty1)/1000} seconds.`;

  toggleLoader(false);
  await redraw();
}
