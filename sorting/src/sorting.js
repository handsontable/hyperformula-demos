import { hf, sheetId } from "./hyperformulaConfig";

/**
 * Sort the HF's dataset.
 *
 * @param {boolean} ascending `true` if sorting in ascending order, `false` otherwise.
 * @param {Function} callback The callback function.
 */
export function sort(ascending, callback) {
  const rowCount = hf.getSheetDimensions(sheetId).height;
  const colValues = [];
  let newOrder = null;
  let newOrderMapping = [];

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    colValues.push({
      rowIndex,
      value: hf.getCellValue({
        sheet: sheetId,
        col: 1,
        row: rowIndex
      })
    });
  }

  colValues.sort((a, b) => {
    return ascending ? a.value > b.value : a.value < b.value;
  });

  newOrder = colValues.map((el) => el.rowIndex);

  newOrder.forEach((orderIndex, arrIndex) => {
    newOrderMapping[orderIndex] = arrIndex;
  });

  hf.setRowOrder(sheetId, newOrderMapping);

  callback();
}
