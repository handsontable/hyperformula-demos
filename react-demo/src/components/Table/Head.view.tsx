import * as React from "react";

export type HeadProps = {};

export const HeadView: React.FC<HeadProps> = ({ children }) => {
  return <th>{children}</th>;
};
