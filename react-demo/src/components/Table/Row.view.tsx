import { FC, ReactNode } from "react";

export type RowProps = {
  children?: ReactNode;
  className?: string;
};

export const RowView: FC<RowProps> = ({ children, className = "" }) => {
  return <tr className={className}>{children}</tr>;
};
