import * as React from "react";
import "milligram";

import { EmployeeActions, EmployeeTable } from "./view/EmployeeTable";
import { EmployeesStateProvider } from "./lib/employee";

export default function App() {
  return (
    <>
      <main className="App">
        <h4>HyperFormula for React demo</h4>
        <EmployeesStateProvider>
          <EmployeeActions />
          <EmployeeTable />
        </EmployeesStateProvider>
      </main>
    </>
  );
}
