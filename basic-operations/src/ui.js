import { state, getSampleData } from "./data";
import {
  renderTable,
  updateForm,
  updateSheetDropdown,
  renderError,
  clearError
} from "./renderers";
import { hf } from "./hyperformulaConfig";

/**
 * Bind the events to the buttons.
 */
export function bindEvents() {
  const sheetDropdown = document.querySelector("#sheet-select");
  const actionDropdown = document.querySelector("#action-select");
  const submitButton = document.querySelector("#inputs button");

  sheetDropdown.addEventListener("change", event => {
    state.currentSheet = event.target.value;

    clearError();

    renderTable();
  });

  actionDropdown.addEventListener("change", event => {
    clearError();

    updateForm(event.target.value);
  });

  submitButton.addEventListener("click", event => {
    const action = document.querySelector("#action-select").value;

    doAction(action);
  });
}

/**
 * Perform the wanted action.
 *
 * @param {string} action Action to perform.
 */
export function doAction(action) {
  let cellAddress = null;
  let inputValues = [
    document.querySelector("#input-1").value || void 0,
    document.querySelector("#input-2").value || void 0
  ];

  clearError();

  switch (action) {
    case "add-sheet":
      state.currentSheet = hf.addSheet(inputValues[0]);

      handleError(() => {
        hf.setSheetContent(state.currentSheet, getSampleData(5, 5));
      });

      updateSheetDropdown();
      renderTable();
      break;
    case "remove-sheet":
      handleError(() => {
        hf.removeSheet(inputValues[0]);
      });

      if (state.currentSheet === inputValues[0]) {
        state.currentSheet = hf.getSheetNames()[0];

        renderTable();
      }

      updateSheetDropdown();
      break;
    case "add-rows":
      handleError(() => {
        hf.addRows(hf.getSheetId(state.currentSheet), [
          parseInt(inputValues[0], 10),
          parseInt(inputValues[1], 10)
        ]);
      });

      renderTable();
      break;
    case "add-columns":
      handleError(() => {
        hf.addColumns(hf.getSheetId(state.currentSheet), [
          parseInt(inputValues[0], 10),
          parseInt(inputValues[1], 10)
        ]);
      });

      renderTable();
      break;
    case "remove-rows":
      handleError(() => {
        hf.removeRows(hf.getSheetId(state.currentSheet), [
          parseInt(inputValues[0], 10),
          parseInt(inputValues[1], 10)
        ]);
      });

      renderTable();
      break;
    case "remove-columns":
      handleError(() => {
        hf.removeColumns(hf.getSheetId(state.currentSheet), [
          parseInt(inputValues[0], 10),
          parseInt(inputValues[1], 10)
        ]);
      });

      renderTable();
      break;
    case "get-value":
      const resultDOM = document.querySelector("#input-2");
      cellAddress = handleError(() => {
        return hf.simpleCellAddressFromString(
          inputValues[0],
          hf.getSheetId(state.currentSheet)
        );
      }, "Invalid cell address format.");

      if (cellAddress !== null) {
        resultDOM.value = handleError(() => {
          return hf.getCellValue(cellAddress);
        });
      }

      break;
    case "set-value":
      cellAddress = handleError(() => {
        return hf.simpleCellAddressFromString(
          inputValues[0],
          hf.getSheetId(state.currentSheet)
        );
      }, "Invalid cell address format.");

      if (cellAddress !== null) {
        handleError(() => {
          hf.setCellContents(cellAddress, inputValues[1]);
        });
      }

      renderTable();
      break;
    default:
  }
}

/**
 * Handle the HF errors.
 *
 * @param {Function} tryFunc Function to handle.
 * @param {string} [message] Optional forced error message.
 */
function handleError(tryFunc, message = null) {
  let result = null;

  try {
    result = tryFunc();
  } catch (e) {
    if (e instanceof Error) {
      renderError(message || e.message);
    } else {
      renderError("Something went wrong");
    }
  }

  return result;
}

export const ANIMATION_ENABLED = true;
