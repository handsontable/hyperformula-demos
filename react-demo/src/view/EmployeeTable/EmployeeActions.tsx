import { FC } from "react";
import { useEmployeesContext } from "../../lib/employee";

import "./EmployeeActions.scss";

export type EmployeeActionsProps = {};

export const EmployeeActions: FC<EmployeeActionsProps> = () => {
  const { runCalculations, resetCalculations } = useEmployeesContext();

  return (
    <>
      <button className="button" onClick={runCalculations}>
        Run calculations
      </button>
      <button className="button button-outline" onClick={resetCalculations}>
        Reset
      </button>
    </>
  );
};
