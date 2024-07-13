"use client";

import Title from "@/components/Title";
import LoginForm from "./LoginForm";
import Page from "@/components/Page";
import Link from "next/link";
import appendedSearchParams from "@/lib/appendedSearchParams";
import { useEffect, useState } from "react";

export default function Login() {
  const [sp, setSp] = useState<any>();

  useEffect(() => {
    setSp(appendedSearchParams());
  });

  return (
    <Page>
      <Title>
        Login{" "}
        <span className="text-sm mt-0">
          ou{" "}
          <Link href={`/auth/register${sp}`} className="underline">
            Cadastrar
          </Link>
        </span>
      </Title>
      <div className="mx-auto px-10 max-w-[800px] flex w-full">
        <LoginForm />
      </div>
    </Page>
  );
}
