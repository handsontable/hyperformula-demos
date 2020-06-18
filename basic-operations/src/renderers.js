import { hf } from "./hyperformulaConfig";
import { state } from "./data";
import { ANIMATION_ENABLED } from "./ui";
import { inputConfig } from "./actionConfig";

/**
 * Fill the HTML table with data.
 *
 * @param {string} sheetName Sheet name.
 */
export function renderTable(sheetName) {
  const sheetId = hf.getSheetId(state.currentSheet);
  const tbodyDOM = document.querySelector(".example tbody");
  const updatedCellClass = ANIMATION_ENABLED ? "updated-cell" : "";
  const { height, width } = hf.getSheetDimensions(sheetId);
  let newTbodyHTML = "";

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const cellAddress = { sheet: sheetId, col, row };
      const isEmpty = hf.isCellEmpty(cellAddress);
      const cellHasFormula = hf.doesCellHaveFormula(cellAddress);
      const showFormula = cellHasFormula;
      let cellValue = "";

      if (isEmpty) {
        cellValue = "";
      } else if (!showFormula) {
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
 * Updates the sheet dropdown.
 */
export function updateSheetDropdown() {
  const sheetNames = hf.getSheetNames();
  const sheetDropdownDOM = document.querySelector("#sheet-select");
  let dropdownContent = "";

  sheetDropdownDOM.innerHTML = "";

  sheetNames.forEach(sheetName => {
    const isCurrent = sheetName === state.currentSheet;
    dropdownContent += `<option value="${sheetName}" ${
      isCurrent ? "selected" : ""
    }>${sheetName}</option>`;
  });

  sheetDropdownDOM.innerHTML = dropdownContent;
}

/**
 * Update the form to the provided action.
 *
 * @param {string} action Action chosen from the dropdown.
 */
export function updateForm(action) {
  const inputsDOM = document.querySelector("#inputs");
  const submitButtonDOM = document.querySelector("#inputs button");
  const allInputsDOM = document.querySelectorAll("#inputs input");
  const disclaimerDOM = document.querySelector("#disclaimer");

  // Hide all inputs
  allInputsDOM.forEach(input => {
    input.style.display = "none";
    input.value = "";
    input.disabled = false;
  });

  inputConfig[action].inputs.forEach((inputCfg, index) => {
    const inputDOM = document.querySelector(`#input-${index + 1}`);

    // Show only those needed
    inputDOM.style.display = "block";

    for (const [attribute, value] of Object.entries(inputCfg)) {
      inputDOM.setAttribute(attribute, value);
    }
  });

  submitButtonDOM.innerText = inputConfig[action].buttonText;

  if (inputConfig[action].disclaimer) {
    disclaimerDOM.innerHTML = inputConfig[action].disclaimer;
  } else {
    disclaimerDOM.innerHTML = "&nbsp;";
  }

  inputsDOM.style.display = "block";
}

/**
 * Add the error overlay.
 *
 * @param {string} message Error message.
 */
export function renderError(message) {
  const inputsDOM = document.querySelector("#inputs");
  const errorDOM = document.querySelector("#error-message");

  if (inputsDOM.className.indexOf("error") === -1) {
    inputsDOM.className += " error";
  }

  errorDOM.innerText = message;
  errorDOM.style.display = "block";
}

/**
 * Clear the error overlay.
 */
export function clearError() {
  const inputsDOM = document.querySelector("#inputs");
  const errorDOM = document.querySelector("#error-message");

  inputsDOM.className = inputsDOM.className.replace(" error", "");

  errorDOM.innerText = "";
  errorDOM.style.display = "none";
}
