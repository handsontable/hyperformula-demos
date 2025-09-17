const ExcelJS = require('exceljs');
const { HyperFormula } = require('hyperformula');

async function run(filename) {
  const xlsxWorkbook = await readXlsxWorkbookFromFile(filename);
  const sheetsAsJavascriptArrays = convertXlsxWorkbookToJavascriptArrays(xlsxWorkbook)
  const hf = HyperFormula.buildFromSheets(sheetsAsJavascriptArrays, { licenseKey: 'gpl-v3' });

  console.log('Formulas:', hf.getSheetSerialized(0));
  console.log('Values:  ', hf.getSheetValues(0));
}

async function readXlsxWorkbookFromFile(filename) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filename);
  return workbook;
}

function convertXlsxWorkbookToJavascriptArrays(workbook) {
  const workbookData = {};

  workbook.eachSheet((worksheet) => {
    const sheetDimensions = worksheet.dimensions
    const sheetData = [];

    for (let rowNum = sheetDimensions.top; rowNum <= sheetDimensions.bottom; rowNum++) {
      const rowData = [];

      for (let colNum = sheetDimensions.left; colNum <= sheetDimensions.right; colNum++) {
        const cell = worksheet.getCell(rowNum, colNum)

        const cellData = cell.formula ? `=${cell.formula}` : cell.value;
        rowData.push(cellData);
      }

      sheetData.push(rowData);
    }

    workbookData[worksheet.name] = sheetData;
  })

  return workbookData;
}

run('sample_file.xlsx');
