import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import HyperFormula from "hyperformula";
import { EmployeesContext } from "./employee.context";
import {
  initializeHF,
  initializeNamedExpressions,
  initHFValues,
  formatCellValues,
} from "./employee.hf";

/** input data */
import { tableData } from "./fixtures/data";
import { EmployeeRow } from "./types";

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
  const [employees, setEmployees] = useState<EmployeeRow[]>([]);
  const [totals, setTotals] = useState<string[]>([]);

  const runCalculations = useCallback(() => {
    if (!hfReference.current) return;

    const { hf, sheetId } = hfReference.current;
    const calculated = hf.getSheetValues(sheetId);
    const formatted = formatCellValues(calculated);
    setEmployees(formatted);
    setTotals(
      TOTAL_EXPRESSIONS.map(
        expression =>
          hf.calculateFormula(expression, sheetId)?.toString() ?? "",
      ),
    );
  }, []);

  const resetCalculations = useCallback(() => {
    if (!hfReference.current) return;

    const { hf, sheetId } = hfReference.current;

    const serialized = hf.getSheetSerialized(sheetId);
    const formatted = formatCellValues(serialized);
    setEmployees(formatted);
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
