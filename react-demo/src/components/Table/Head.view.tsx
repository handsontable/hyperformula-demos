import * as React from "react";

export type HeadProps = {
  children?: React.ReactNode;
};

export const HeadView: React.FC<HeadProps> = ({ children }) => {
  return <th>{children}</th>;
};
