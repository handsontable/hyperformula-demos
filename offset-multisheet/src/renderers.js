import { hf, revenueSheetId, summarySheetId } from './hyperformulaConfig';
import { ANIMATION_ENABLED } from './ui';

/**
 * Fill a specific HTML table with data from a sheet.
 *
 * @param {string} tableSelector CSS selector for the table.
 * @param {number} sheetId Sheet ID to render data from.
 * @param {boolean} calculated `true` if it should render calculated values, `false` otherwise.
 * @param {number|null} maxRows Maximum number of rows to render, or null for all rows.
 */
function renderTableFromSheet(tableSelector, sheetId, calculated = false, maxRows = null) {
  const tbodyDOM = document.querySelector(`${tableSelector} tbody`);
  const updatedCellClass = ANIMATION_ENABLED ? 'updated-cell' : '';
  const { height, width } = hf.getSheetDimensions(sheetId);
  const rowsToRender = maxRows !== null ? Math.min(maxRows, height) : height;
  let newTbodyHTML = '';

  for (let row = 0; row < rowsToRender; row++) {
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

        const regex = /Revenue!.+/;
        const match = cellValue.match(regex);
        if (match) {
          cellValue = `=OFFSET(Revenue!A1, 9, 2)`;
        }
      }

      newTbodyHTML += `<td class="${
        cellHasFormula ? updatedCellClass : ''
      }"><span>
      ${cellValue}
      </span></td>`;
    }

    newTbodyHTML += '</tr>';
  }

  tbodyDOM.innerHTML = newTbodyHTML;
}

/**
 * Render both tables.
 *
 * @param {boolean} calculated `true` if it should render calculated values, `false` otherwise.
 */
export function renderTables(calculated = false) {
  renderTableFromSheet('.table1', revenueSheetId, calculated);
  renderTableFromSheet('.table2', summarySheetId, calculated);
}

/**
 * Replace formulas with their results.
 */
export function runCalculations() {
  renderTables(true);
}

/**
 * Replace the values in the table with initial data.
 */
export function resetTable() {
  renderTables();
}
