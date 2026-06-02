import { FC, useContext } from "react";
import { EmployeesContext } from "../../lib/employee";

import "./EmployeeActions.scss";

export type EmployeeActionsProps = {};

export const EmployeeActions: FC<EmployeeActionsProps> = () => {
  const { setCalculationsFlag } = useContext(EmployeesContext);

  const handleClickRunCalculations = () => {
    setCalculationsFlag(true);
  };
  const handleClickResetCalculations = () => {
    setCalculationsFlag(false);
  };

  return (
    <>
      <button className="button" onClick={handleClickRunCalculations}>
        Run calculations
      </button>
      <button
        className="button button-outline"
        onClick={handleClickResetCalculations}
      >
        Reset
      </button>
    </>
  );
};
