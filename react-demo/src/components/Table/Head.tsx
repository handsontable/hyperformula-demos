import { ComponentPropsWithRef, FC } from "react";

type HeadProps = ComponentPropsWithRef<"th">;

export const Head: FC<HeadProps> = props => <th {...props} />;
