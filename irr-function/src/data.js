/**
 * Initial table data.
 *
 * Cash flows for a business investment (based on Microsoft Excel IRR example),
 * followed by IRR formulas demonstrating different usage patterns.
 */
export const tableData = [
  ['Initial cost', -70000],
  ['Year 1 income', 12000],
  ['Year 2 income', 15000],
  ['Year 3 income', 18000],
  ['Year 4 income', 21000],
  ['Year 5 income', 26000],
  ['', ''],
  ['IRR after 4 years', '=IRR(B1:B5)'],
  ['IRR after 5 years', '=IRR(B1:B6)'],
  ['IRR after 2 years (guess: -10%)', '=IRR(B1:B3, -0.1)'],
];
