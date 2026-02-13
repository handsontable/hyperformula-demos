const ExcelJS = require('exceljs');
const { HyperFormula } = require('hyperformula');

async function run(filename) {
  const hf = HyperFormula.buildEmpty({
    licenseKey: 'gpl-v3',
    maxRows: 1000000,
  });

  const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(filename);

  for await (const worksheetReader of workbookReader) {
    const sheetName = worksheetReader.name;
    const actualSheetName = hf.addSheet(sheetName);
    const sheetId = hf.getSheetId(actualSheetName);

    let rowIndex = 0;
    for await (const row of worksheetReader) {
      const rowData = extractRowData(row);
      if (rowData.length > 0) {
        hf.setCellContents({ sheet: sheetId, row: rowIndex, col: 0 }, [rowData]);
      }
      rowIndex++;
    }
  }

  console.log(hf.getSheetNames());
}

/**
 * Extracts cell values from a streaming row object.
 * @param {ExcelJS.Row} row - The row from ExcelJS streaming reader
 * @returns {Array} Array of cell values (formulas prefixed with '=')
 */
function extractRowData(row) {
  const rowData = [];

  row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
    // Expand array to fill gaps (ExcelJS skips empty cells by default)
    while (rowData.length < colNumber - 1) {
      rowData.push(null);
    }
    const cellData = cell.formula ? `=${cell.formula}` : cell.value;
    rowData.push(cellData);
  });

  return rowData;
}

run('big.xlsx');
