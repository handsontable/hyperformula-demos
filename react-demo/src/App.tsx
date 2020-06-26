import * as React from "react";
import "milligram";

import "./view/App/App.scss";

import { EmployeeActions, EmployeeTable } from "./view/EmployeeTable";
import { EmployeesStateProvider } from "./lib/employee";

export default function App() {
  return (
    <>
      <main className="App">
        <EmployeesStateProvider>
          <EmployeeActions />
          <EmployeeTable />
        </EmployeesStateProvider>
      </main>
    </>
  );
}
