const { HyperFormula, AlwaysDense } = require('hyperformula');

// new way
const { enUS } = require('hyperformula/i18n/languages');
const { default: frFR } = require('hyperformula/i18n/languages/frFR');

// legacy way
const { csCZ } = require('hyperformula/commonjs/i18n/languages');
const { default: daDK } = require('hyperformula/commonjs/i18n/languages/daDK');
const { default: deDE } = require('hyperformula/commonjs/i18n/languages/deDE.js');

console.log(HyperFormula != null);
console.log(AlwaysDense != null);
console.log(enUS != null);
console.log(frFR != null);
console.log(csCZ != null);
console.log(daDK != null);
console.log(deDE != null);

HyperFormula.registerLanguage('enUS', enUS);
HyperFormula.registerLanguage('frFR', frFR);
HyperFormula.registerLanguage('csCZ', csCZ);
HyperFormula.registerLanguage('daDK', daDK);
HyperFormula.registerLanguage('deDE', deDE);

// npm i --registry http://localhost:4873 hyperformula@2.7.8-esm
