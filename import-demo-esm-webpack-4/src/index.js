import { HyperFormula, AlwaysDense } from 'hyperformula';

// Webpack 4 works only with actual paths. Does not support the "exports" field.
// https://github.com/webpack/webpack/issues/9509#issuecomment-1381896299

import { csCZ } from "hyperformula/es/i18n/languages"; 
import daDK from "hyperformula/es/i18n/languages/daDK";

console.log(HyperFormula != null);
console.log(AlwaysDense != null);
console.log(csCZ != null);
console.log(daDK != null);

HyperFormula.registerLanguage('csCZ', csCZ);
HyperFormula.registerLanguage('daDK', daDK);

// npm i --registry http://localhost:4873 hyperformula@2.7.8-esm
