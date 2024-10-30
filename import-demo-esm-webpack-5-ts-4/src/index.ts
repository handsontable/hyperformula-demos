import { HyperFormula, AlwaysDense, RawTranslationPackage } from 'hyperformula';

// new way
import { enUS } from "hyperformula/i18n/languages"; 
import frFR from "hyperformula/i18n/languages/frFR";

// legacy way
import { csCZ } from "hyperformula/es/i18n/languages"; 
import daDK from "hyperformula/es/i18n/languages/daDK";
import deDE from "hyperformula/es/i18n/languages/deDE.js";

console.log(HyperFormula != null);
console.log(AlwaysDense != null);
console.log(enUS != null);
console.log(frFR != null);
console.log(csCZ != null);
console.log(daDK != null);
console.log(deDE != null);

HyperFormula.registerLanguage('enUS', enUS as RawTranslationPackage);
HyperFormula.registerLanguage('frFR', frFR);
HyperFormula.registerLanguage('csCZ', csCZ);
HyperFormula.registerLanguage('daDK', daDK);
HyperFormula.registerLanguage('deDE', deDE);

// npm i --registry http://localhost:4873 hyperformula@2.7.9-esm