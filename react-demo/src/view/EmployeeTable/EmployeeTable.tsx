import * as React from "react";
import { Table } from "../../components/Table";
import { EmployeesContext } from "../../lib/employee";

import "./EmployeeTable.scss";

export type EmployeeTableProps = {};

export const EmployeeTable: React.FC<EmployeeTableProps> = () => {
  const {
    employees,
    totals,
  } = React.useContext(EmployeesContext)

  return (
    <Table colgroupWidths={[25, 15, 20, 20, 20]}>
      <colgroup>
        <col style="width:22%"/>
        <col style="width:15%"/>
        <col style="width:23%"/>
        <col style="width:20%"/>
        <col style="width:20%"/>
      </colgroup>
      <thead>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Year_1</Table.Head>
          <Table.Head>Year_2</Table.Head>
          <Table.Head>Average</Table.Head>
          <Table.Head>Sum</Table.Head>
        </Table.Row>
      </thead>
      <tbody>
        {employees?.map((item, rowNumber) =>
          <Table.Row key={rowNumber}>
            {item.map((cellValue, cellNumber) => <Table.Cell key={`${cellNumber + 1},${rowNumber}`}>{cellValue}</Table.Cell>)}
          </Table.Row>
        )}
        <Table.Row className="bold">
          <Table.Cell>Total</Table.Cell>
          {totals?.map((value, rowNumber) => (
              <Table.Cell key={`0,${rowNumber}`}>{value}</Table.Cell>
            )
          )}
          <Table.Cell/>
          <Table.Cell/>
        </Table.Row>
      </tbody>
    </Table>
  );
};
