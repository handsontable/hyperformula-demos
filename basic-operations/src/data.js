/**
 * Return sample data for the provided number of rows and columns.
 *
 * @param {number} rows Amount of rows to create.
 * @param {number} columns Amount of columns to create.
 * @returns {string[][]}
 */
export function getSampleData(rows, columns) {
  const data = [];

  for (let r = 0; r < rows; r++) {
    data.push([]);

    for (let c = 0; c < columns; c++) {
      data[r].push(`${Math.floor(Math.random() * 999) + 1}`);
    }
  }

  return data;
}

export const state = {
  currentSheet: null
};
