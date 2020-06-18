/**
 * Initial table data.
 */

// first column represents players' IDs
// second column represents players' scores
export const playersAData = [
  ["1", "2"],
  ["2", "3"],
  ["3", "5"],
  ["4", "7"],
  ["5", "13"],
  ["6", "17"]
];
export const playersBData = [
  ["7", "19"],
  ["8", "31"],
  ["9", "61"],
  ["10", "89"],
  ["11", "107"],
  ["12", "127"]
];

// in a cell A1 a formula checks which team is a winning one
// in cells A2 and A3 formulas calculate the average score of players
export const formulasData = [
  ['=IF(Formulas!A2>Formulas!A3,"TeamA","TeamB")'],
  ["=AVERAGE(TeamA!B1:B6)"],
  ["=AVERAGE(TeamB!B1:B6)"]
];
