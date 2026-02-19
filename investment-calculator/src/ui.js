const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

const formatPercent = (value) =>
  new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

const isNumber = (v) => typeof v === 'number';

export function setupUI() {
  new AutoNumeric.multiple('#initial, #y1, #y2, #y3, #y4, #y5', {
    currencySymbol: '$',
    decimalPlaces: 0,
    digitGroupSeparator: ',',
  });

  new AutoNumeric('#discount', {
    suffixText: ' %',
    decimalPlaces: 2,
    minimumValue: '0',
    maximumValue: '100',
    digitGroupSeparator: '',
    decimalCharacter: '.',
  });
}

/**
 * Read raw numeric values from all AutoNumeric-formatted inputs.
 * @returns {{ initial: number, y1: number, y2: number, y3: number, y4: number, y5: number, discount: number }}
 */
export function getInputValues() {
  const get = (id) => AutoNumeric.getAutoNumericElement(id).getNumber();
  return {
    initial: get('#initial'),
    y1: get('#y1'),
    y2: get('#y2'),
    y3: get('#y3'),
    y4: get('#y4'),
    y5: get('#y5'),
    discount: get('#discount') / 100,
  };
}

/** Format and display computed results in the UI. */
export function displayResults({ irr3y, irr5y, npv, paybackYear }) {
  document.getElementById('resullt3y').value = isNumber(irr3y) ? formatPercent(irr3y) : 'Error';
  document.getElementById('resullt5y').value = isNumber(irr5y) ? formatPercent(irr5y) : 'Error';
  document.getElementById('npv').value = isNumber(npv) ? formatCurrency(npv) : 'Error';
  document.getElementById('payback').value = isNumber(paybackYear) && paybackYear <= 5
    ? `Year ${paybackYear}`
    : 'N/A';
}
