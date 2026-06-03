import { ComponentPropsWithRef, FC } from "react";

type RowProps = ComponentPropsWithRef<"tr">;

export const Row: FC<RowProps> = props => <tr {...props} />;
