import { LogOut, LucideProps } from "lucide-react";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

interface IFooterButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: ReactNode;
}

export default function FooterButton(props: IFooterButtonProps) {
  return (
    <button
      className="flex flex-col items-center text-sm justify-center text-center"
      {...props}
    >
      {props.icon}
      {props.children}
    </button>
  );
}
