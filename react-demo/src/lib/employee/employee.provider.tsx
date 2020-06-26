import React, { useState } from "react";
import HyperFormula from 'hyperformula';
import { EmployeesContext } from "./employee.context";
import {
  initializeHF,
  initializeNamedExpressions,
  initHFValues
} from "./employee.hf";
import { EmployeeRow } from "./types";

/** input data */
import { tableData } from "./fixtures/data";

export type EmployeesProviderProps = React.PropsWithChildren<{}>;

const TOTAL_EXPRESSIONS = ["=SUM(Year_1)", "=SUM(Year_2)"];
const EMPLOYEE_SHEET_ID = "employeeSheet";

export const EmployeesStateProvider = ({
  children
}: EmployeesProviderProps) => {
  const hfReference = React.useRef<{
    hf: typeof HyperFormula;
    sheetId: string;
    sheetName: string;
  }>();
  const [withCalculations, setWithCalculations] = useState<boolean>();
  const [employees, setEmployees] = useState<EmployeeRow[]>([]);
  const [totals, setTotals] = useState<React.ReactText[]>([]);

  const setCalculationsFlag = (calculationsFlag: boolean) => {
    setWithCalculations(calculationsFlag);
  };

  /** INITIALIZE */
  React.useEffect(() => {
    const { hf, sheetId, sheetName } = initializeHF(EMPLOYEE_SHEET_ID);
    hfReference.current = { hf, sheetId, sheetName };

    // Fill the HyperFormula sheet with data.
    initHFValues(hf, sheetId, tableData);

    // Add named expressions
    initializeNamedExpressions(hf, sheetName);
  }, []);

  React.useEffect(() => {
    if (!hfReference.current) {
      return;
    }

    const { hf, sheetId, sheetName } = hfReference.current;

    if (withCalculations) {
      const calculatedValues = hf.getSheetValues(sheetId);
      // format the display of numbers
      const formmatedValues = calculatedValues.map((row: []) => {
        return row.map((cell: number) => {
          if (!isNaN(cell)) return cell.toFixed(2);
          return cell;
        });
      });
      setEmployees(formmatedValues);
      setTotals(
        TOTAL_EXPRESSIONS.map(expression =>
          hf.calculateFormula(expression, sheetName).toFixed(2)
        )
      );
    } else {
      setEmployees(hf.getSheetSerialized(sheetId));
      setTotals(TOTAL_EXPRESSIONS);
    }
  }, [hfReference, withCalculations]);

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        totals,
        setCalculationsFlag
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};
