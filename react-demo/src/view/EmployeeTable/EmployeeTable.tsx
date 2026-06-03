import { FC } from "react";
import * as Table from "../../components/Table";
import { useEmployeesContext } from "../../lib/employee";

import "./EmployeeTable.scss";

export const EmployeeTable: FC = () => {
  const { employees, totals } = useEmployeesContext();

  return (
    <Table.Root colgroupWidths={[22, 15, 23, 20, 20]}>
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
        {employees.map((item, rowIndex) => (
          <Table.Row key={rowIndex}>
            {item.map((cellValue, colIndex) => (
              <Table.Cell key={`${rowIndex},${colIndex}`}>
                {cellValue}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
        <Table.Row className="bold">
          <Table.Cell>Total</Table.Cell>
          {totals.map((value, colIndex) => (
            <Table.Cell key={`5,${colIndex + 1}`}>{value}</Table.Cell>
          ))}
          <Table.Cell />
          <Table.Cell />
        </Table.Row>
      </tbody>
    </Table.Root>
  );
};
