import { hf, sheetId } from './hyperformulaConfig';
import { ANIMATION_ENABLED } from './ui';

/**
 * @param {{ sheet: number, col: number, row: number }} cellAddress
 * @returns {boolean} `true` if the cell holds a plain number (editable cash-flow field).
 */
function isEditableNumber(cellAddress) {
  if (cellAddress.col !== 1) return false;
  if (hf.isCellEmpty(cellAddress)) return false;
  if (hf.doesCellHaveFormula(cellAddress)) return false;

  return typeof hf.getCellValue(cellAddress) === 'number';
}

/**
 * Render the table from sheet data.
 *
 * @param {boolean} calculated `true` to show computed values, `false` to show formulas.
 */
export function renderTable(calculated = false) {
  const tbodyDOM = document.querySelector('.example tbody');
  const updatedCellClass = ANIMATION_ENABLED ? 'updated-cell' : '';
  const { height, width } = hf.getSheetDimensions(sheetId);
  let newTbodyHTML = '';

  for (let row = 0; row < height; row++) {
    newTbodyHTML += '<tr>';

    for (let col = 0; col < width; col++) {
      const cellAddress = { sheet: sheetId, col, row };
      const cellHasFormula = hf.doesCellHaveFormula(cellAddress);
      const showFormula = calculated || !cellHasFormula;
      let cellValue = '';

      if (!hf.isCellEmpty(cellAddress) && showFormula) {
        cellValue = hf.getCellValue(cellAddress);
      } else {
        cellValue = hf.getCellFormula(cellAddress);
      }

      const editable = !calculated && isEditableNumber(cellAddress);

      if (editable) {
        newTbodyHTML += `<td><input type="number" value="${cellValue}" data-row="${row}" data-col="${col}" /></td>`;
      } else {
        newTbodyHTML += `<td class="${
          cellHasFormula ? updatedCellClass : ''
        }"><span>${cellValue}</span></td>`;
      }
    }

    newTbodyHTML += '</tr>';
  }

  tbodyDOM.innerHTML = newTbodyHTML;
  bindInputEvents(tbodyDOM);
}

/**
 * Attach change listeners to editable inputs so they update HyperFormula in real time.
 *
 * @param {HTMLElement} container
 */
function bindInputEvents(container) {
  container.querySelectorAll('input[data-row]').forEach((input) => {
    input.addEventListener('change', (e) => {
      const row = parseInt(e.target.dataset.row, 10);
      const col = parseInt(e.target.dataset.col, 10);
      const value = parseFloat(e.target.value) || 0;

      hf.setCellContents({ sheet: sheetId, row, col }, [[value]]);
    });
  });
}

/**
 * Replace formulas with their computed results.
 */
export function runCalculations() {
  renderTable(true);
}

/**
 * Restore the table to show formulas instead of results.
 */
export function resetTable() {
  renderTable();
}
