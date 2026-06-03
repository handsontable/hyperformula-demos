import { FC } from "react";
import { useEmployeesContext } from "../../lib/employee";

import "./EmployeeActions.scss";

export const EmployeeActions: FC = () => {
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
