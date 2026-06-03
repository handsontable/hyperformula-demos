import { ComponentPropsWithRef, FC } from "react";

type TableProps = ComponentPropsWithRef<"table"> & {
  colgroupWidths?: number[];
};

export const Root: FC<TableProps> = ({
  children,
  colgroupWidths,
  ...props
}) => (
  <table {...props}>
    <colgroup>
      {colgroupWidths?.map((width, idx) => (
        <col key={idx} style={{ width: `${width}%` }} />
      ))}
    </colgroup>
    {children}
  </table>
);
