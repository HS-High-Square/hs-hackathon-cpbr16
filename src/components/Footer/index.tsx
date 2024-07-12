"use client";

import { Info, LogOut } from "lucide-react";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import FooterButton from "./FooterButton";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import QRDrawer from "./QRDrawer";
import AboutDialog from "./AboutDialog";

interface IFooterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function Footer(props: IFooterProps) {
  const router = useRouter();
  const { userdata, setUserdata } = useAuth();

  return (
    <div
      className="text-center w-full flex gap-4 justify-around pb-2 pt-3 border-t-2"
      {...props}
    >
      {userdata && <QRDrawer />}
      <AboutDialog />
      {userdata && (
        <FooterButton
          icon={<LogOut />}
          onClick={() => {
            localStorage.removeItem("userdata");
            setUserdata(null);
            router.push("/");
          }}
        >
          Sair
        </FooterButton>
      )}
    </div>
  );
}
