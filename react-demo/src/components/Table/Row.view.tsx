import * as React from "react";

export type RowProps = {
  children?: React.ReactNode;
  className?: string;
};

export const RowView: React.FC<RowProps> = ({ children, className = "" }) => {
  return <tr className={className}>{children}</tr>;
};
