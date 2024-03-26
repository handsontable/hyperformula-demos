import { setupHyperFormula, getMonthlyPayment, updateParameter } from "./calculator";

const annualInterestRateInput = document.getElementById('annual-interest-rate');
const numberOfMonthsInput = document.getElementById('number-of-months');
const loanAmountInput = document.getElementById('loan-amount');
const monthlyPaymentPlaceholder = document.getElementById('monthly-payment-placeholder');

annualInterestRateInput.addEventListener('input', () => {
  const annualInterestRate = parseFloat(annualInterestRateInput.value) / 100;
  updateParameter('AnnualInterestRate', annualInterestRate);
  displayMonthlyPayment();
});

numberOfMonthsInput.addEventListener('input', () => {
  const numberOfMonths = parseInt(numberOfMonthsInput.value);
  updateParameter('NumberOfMonths', numberOfMonths);
  displayMonthlyPayment();
});

loanAmountInput.addEventListener('input', () => {
  const loanAmount = parseFloat(loanAmountInput.value);
  updateParameter('LoanAmount', loanAmount);
  displayMonthlyPayment();
});

function displayMonthlyPayment() {
  const monthlyPayment = getMonthlyPayment();
  monthlyPaymentPlaceholder.textContent = monthlyPayment.toFixed(2);
}

setupHyperFormula();
displayMonthlyPayment();
