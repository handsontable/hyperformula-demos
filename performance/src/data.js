/**
 * Initial table data.
 */
 export const tableData = Array(Math.ceil(1000000/3)).fill(0).map((_, i) => Array(3).fill(0).map((_, j) => `Data$${i}${j}`));
