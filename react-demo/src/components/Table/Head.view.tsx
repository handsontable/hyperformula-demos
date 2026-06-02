import { FC, ReactNode } from "react";

export type HeadProps = {
  children?: ReactNode;
};

export const HeadView: FC<HeadProps> = ({ children }) => {
  return <th>{children}</th>;
};
