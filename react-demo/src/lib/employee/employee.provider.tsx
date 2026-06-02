import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import HyperFormula from "hyperformula";
import { EmployeesContext } from "./employee.context";
import { isNumber } from "./employee.utils";
import {
  initializeHF,
  initializeNamedExpressions,
  initHFValues,
  formatCellValues,
} from "./employee.hf";
import { EmployeeOutputRow } from "./types";

/** input data */
import { tableData } from "./fixtures/data";

type EmployeesProviderProps = PropsWithChildren<{}>;

const TOTAL_EXPRESSIONS = ["=SUM(Year_1)", "=SUM(Year_2)"];
const EMPLOYEE_SHEET_ID = "employeeSheet";

export const EmployeesStateProvider = ({
  children,
}: EmployeesProviderProps) => {
  const hfReference = useRef<{
    hf: HyperFormula;
    sheetId: number;
    sheetName: string;
  }>(null);
  const [employees, setEmployees] = useState<EmployeeOutputRow[]>([]);
  const [totals, setTotals] = useState<string[]>([]);

  const runCalculations = useCallback(() => {
    if (!hfReference.current) return;

    const { hf, sheetId } = hfReference.current;
    const calculatedValues = hf.getSheetValues(sheetId);
    setEmployees(formatCellValues(calculatedValues));
    setTotals(
      TOTAL_EXPRESSIONS.map(expression => {
        const calculatedValue = hf.calculateFormula(expression, sheetId);
        if (!isNumber(calculatedValue))
          throw new Error("Calculated value is not a number");

        return calculatedValue.toFixed(2);
      }),
    );
  }, []);

  const resetCalculations = useCallback(() => {
    if (!hfReference.current) return;

    const { hf, sheetId } = hfReference.current;
    setEmployees(formatCellValues(hf.getSheetSerialized(sheetId)));
    setTotals(TOTAL_EXPRESSIONS);
  }, []);

  /** INITIALIZE */
  useEffect(() => {
    const { hf, sheetId, sheetName } = initializeHF(EMPLOYEE_SHEET_ID);
    hfReference.current = { hf, sheetId, sheetName };

    // Fill the HyperFormula sheet with data.
    initHFValues(hf, sheetId, tableData);

    // Add named expressions
    initializeNamedExpressions(hf, sheetName);

    // Initialize the state
    resetCalculations();
  }, [resetCalculations]);

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        totals,
        runCalculations,
        resetCalculations,
      }}>
      {children}
    </EmployeesContext.Provider>
  );
};
