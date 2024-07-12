import Title from "@/components/Title";
import RegisterForm from "./RegisterForm";
import Page from "@/components/Page";
import Link from "next/link";

export default function Login() {
  return (
    <Page>
      <Title>
        Cadastrar{" "}
        <span className="text-sm mt-0">
          ou{" "}
          <Link href="/auth/login" className="underline">
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
