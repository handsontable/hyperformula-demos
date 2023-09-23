/**
 * Initial table data.
 */
 export const tableData = Array(Math.ceil(1000000/5)).fill(0).map((_, i) => Array(5).fill(0).map((_, j) => `Data$${i}${j}`));
