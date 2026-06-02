import { createContext, useContext } from "react";
import { EmployeeOutputRow } from "./types";

export type EmployeesContextProps = {
  employees: EmployeeOutputRow[];
  totals: string[];
  runCalculations: () => void;
  resetCalculations: () => void;
};

export const EmployeesContext = createContext<EmployeesContextProps | null>(
  null,
);

export const useEmployeesContext = () => {
  const ctx = useContext(EmployeesContext);

  if (!ctx)
    throw new Error(
      "useEmployeesContext must be used within a EmployeesStateProvider",
    );

  return ctx;
};
