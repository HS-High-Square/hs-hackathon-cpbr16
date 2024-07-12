"use client";

import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "@/providers/AuthProvider";
import { usePathname, useRouter } from "next/navigation";

export default function Page(props: React.PropsWithChildren) {
  const { userdata, setUserdata } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const inLoggedArea = ["/home", "/map"].includes(pathname);
    const ud = localStorage.getItem("userdata");
    setUserdata(ud);
    if (inLoggedArea && !ud) {
      router.replace("/auth/register");
    }
    if (!inLoggedArea && ud) {
      router.replace("/home");
    }
  });

  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex flex-col flex-1 max-h-full">{props.children}</div>
      <Footer />
    </div>
  );
}
