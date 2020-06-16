import * as React from "react";

export type CellProps = {};

export const CellView: React.FC<CellProps> = ({ children }) => {
  return <td>{children}</td>;
};
