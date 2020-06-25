import { hf } from "./hyperformulaConfig";

/**
 * Sort ascending function.
 *
 * @param {Function} clb The callback function.
 */
export const sortAsc = clb => {
  try {
    for (let x = 0; x < 7 * 7; x++) {
      const k = x % 7;
      const source = { sheet: 0, col: 1, row: k };
      const destination = { sheet: 0, col: 1, row: k + 1 };

      const res1 = hf.getCellValue(source);
      const res2 = hf.getCellValue(destination);
      hf.batch(() => {
        if (res2 - res1 < 0) {
          hf.moveRows(0, k + 1, 1, k);
        }
      });
    }
  } catch (e) {
    console.log(e.toString());
  }
  clb();
};

/**
 * Sort descending function.
 *
 * @param {Function} clb The callback function.
 */
export const sortDesc = clb => {
  try {
    for (let x = 0; x < 7 * 7; x++) {
      const k = x % 7;
      const source = { sheet: 0, col: 1, row: k };
      const destination = { sheet: 0, col: 1, row: k + 1 };

      const res1 = hf.getCellValue(source);
      const res2 = hf.getCellValue(destination);
      if (res2 - res1 > 0) {
        hf.moveRows(0, k + 1, 1, k);
      }
    }
  } catch (e) {
    console.log(e.toString());
  }
  clb();
};
