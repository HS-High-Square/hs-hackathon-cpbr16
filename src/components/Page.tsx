"use client";

import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "@/providers/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import appendedSearchParams from "@/lib/appendedSearchParams";

interface IPageProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export default function Page(props: IPageProps) {
  const { setUserdata } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const sp = appendedSearchParams();
    const inLoggedArea = ["/home", "/map"].includes(pathname);
    const ud = localStorage.getItem("userdata");
    setUserdata(ud);
    if (inLoggedArea && !ud) {
      router.replace(`/auth/register${sp}`);
    }
    if (!inLoggedArea && ud) {
      router.replace(`/home${sp}`);
    }
  });

  return (
    <div className="flex flex-col h-full" {...props}>
      <Header />
      <div className="flex flex-col flex-1 max-h-full">{props.children}</div>
      <Footer />
    </div>
  );
}
