/**
 * Initial table data.
 */

export const formulas = [
  ["=TRUE()"],
  ["=SUM(Data!A1, Data!A2)"],
  ["=DATE(2020, 06, 05)"],
  ["=DAY(Data!A4)"],
  ["=MONTH(Data!A4)"],
  ["=YEAR(Data!A4)"],
  ["=BIN2DEC(1010101)"],
  ["=DEC2BIN(85)"],
  ["=AND(Data!A5, Data!A6)"],
  ["=OR(Data!A5, Data!A6)"],
  ["=CEILING(Data!A2)"],
  ["=POWER(Data!A2, 2)"],
  ["=AVERAGE(Data!A1:Data!A2)"]
];

export const data = [
  [55],
  [3.45],
  ["HyperFormula"],
  [new Date()],
  ["=TRUE()"],
  ["=FALSE()"]
];
