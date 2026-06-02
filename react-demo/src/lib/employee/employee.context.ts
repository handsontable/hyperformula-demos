import { createContext, useContext } from "react";
import { EmployeeRow } from "./types";

type EmployeesContextProps = {
  employees: EmployeeRow[];
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
