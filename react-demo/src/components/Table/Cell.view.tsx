import { FC } from "react";

export type CellProps = {
  children?: string | number;
};

export const CellView: FC<CellProps> = ({ children }) => {
  let numericValue: number = Number(children);
  let value: number | string = children == null ? "" : children;

  if (!isNaN(numericValue)) {
    value = numericValue.toFixed(2);
  }

  return (
    <td>
      <span>{value}</span>
    </td>
  );
};
