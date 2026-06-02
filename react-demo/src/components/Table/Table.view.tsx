import { FC, ReactNode } from "react";
import { HeadView } from "./Head.view";
import { RowView } from "./Row.view";
import { CellView } from "./Cell.view";

export type TableProps = {
  children?: ReactNode;
  colgroupWidths?: number[];
};

export const TableView: FC<TableProps> & {
  Head: typeof HeadView;
  Row: typeof RowView;
  Cell: typeof CellView;
} = ({ children, colgroupWidths }) => {
  return (
    <table>
      <colgroup>
        {colgroupWidths?.map((width, idx) => (
          <col key={idx} style={{ width: `${width}%`}} />
        ))}
      </colgroup>
      {children}
    </table>
  );
};

TableView.Row = RowView;
TableView.Head = HeadView;
TableView.Cell = CellView;
