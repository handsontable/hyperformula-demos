const { HyperFormula, AlwaysDense } = require('hyperformula');
const { enUS } = require('hyperformula/commonjs/i18n/languages');
const { default: frFR } = require('hyperformula/commonjs/i18n/languages/frFR');

console.log(HyperFormula != null);
console.log(AlwaysDense != null);
console.log(frFR != null);
console.log(enUS != null);

HyperFormula.registerLanguage('frFR', frFR);
HyperFormula.registerLanguage('enUS', enUS);

// npm i --registry http://localhost:4873 hyperformula@2.7.5-esm
