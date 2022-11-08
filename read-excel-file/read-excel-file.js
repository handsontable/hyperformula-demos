const ExcelJS = require('exceljs');
const { HyperFormula } = require('hyperformula');

(async () => {
  const filename = 'simple.xlsx';
  const data = await readXlsxData(filename);
  const hfInstance = HyperFormula.buildFromSheets(data, { licenseKey: 'gpl-v3' });

  console.log('Formulas:', hfInstance.getSheetSerialized(0));
  console.log('Values:  ', hfInstance.getSheetValues(0));
})();


async function readXlsxData(filename) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filename);
  return getWorkbookData(workbook);
} 

function getWorkbookData(workbook) {
  const workbookData = {};

  workbook.eachSheet((worksheet) => {
    const sheetData = [];

    worksheet.eachRow((row) => {
      const rowData = [];

      row.eachCell((cell) => {
        const cellData = cell.value.formula ? `=${cell.value.formula}` : cell.value;
        rowData.push(cellData);
      });

      sheetData.push(rowData);
    });

    workbookData[worksheet.name] = sheetData;
  })

  return workbookData;
}
