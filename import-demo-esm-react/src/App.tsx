import * as React from "react";
import "milligram";
import "./view/App/App.scss";

import { HyperFormula, AlwaysDense } from 'hyperformula';
import frFR from "hyperformula/es/i18n/languages/frFR";
import { enUS } from "hyperformula/es/i18n/languages"; 

console.log(HyperFormula != null);
console.log(AlwaysDense != null);
console.log(frFR != null);
console.log(enUS != null);

HyperFormula.registerLanguage('frFR', frFR);
HyperFormula.registerLanguage('enUS', enUS);

// npm i --registry http://localhost:4873 hyperformula@2.7.5-esm


export default function App() {
  return (
    <>
      <main className="App">
        Open console
      </main>
    </>
  );
}
