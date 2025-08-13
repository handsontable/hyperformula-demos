/**
 * Initial table data.
 */
 export const tableData = [
  ["Annual Interest Rate", .08],
  ["Number Of Months", 360],
  ["Loan Amount", 80000],
  ['Monthly Payment', '=PMT(AnnualInterestRate/12, NumberOfMonths, -LoanAmount)'],
];
