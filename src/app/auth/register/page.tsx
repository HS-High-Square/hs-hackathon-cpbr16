"use client";

import Title from "@/components/Title";
import RegisterForm from "./RegisterForm";
import Page from "@/components/Page";
import Link from "next/link";
import { useEffect, useState } from "react";
import appendedSearchParams from "@/lib/appendedSearchParams";

export default function Register() {
  const [sp, setSp] = useState<any>();

  useEffect(() => {
    setSp(appendedSearchParams());
  });

  return (
    <Page>
      <Title>
        Cadastrar{" "}
        <span className="text-sm mt-0">
          ou{" "}
          <Link href={`/auth/login${sp}`} className="underline">
            Login
          </Link>
        </span>
      </Title>
      <div className="mx-auto px-10 max-w-[800px] flex w-full">
        <RegisterForm />
      </div>
    </Page>
  );
}
