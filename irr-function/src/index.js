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
