import { ComponentPropsWithRef, FC } from "react";

type CellProps = ComponentPropsWithRef<"td">;

const formatChildren = (children: CellProps["children"]) => {
  const numChildren = Number(children);
  if (!isNaN(numChildren)) return numChildren.toFixed(2);

  return children;
};

export const Cell: FC<CellProps> = ({ children, ...props }) => (
  <td {...props}>
    <span>{formatChildren(children)}</span>
  </td>
);
