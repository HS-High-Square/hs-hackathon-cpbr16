import { DetailedHTMLProps, HTMLAttributes } from "react";

interface ITitleProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

export default function Title(props: ITitleProps) {
  return (
    <h1 className="text-4xl mx-8 mt-6 mb-6" {...props}>
      <b>{props.children}</b>
    </h1>
  );
}
