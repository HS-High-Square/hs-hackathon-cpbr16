import Title from "@/components/Title";
import RegisterForm from "./RegisterForm";
import Page from "@/components/Page";

export default function Login() {
  return (
    <Page>
      <Title>Cadastrar</Title>
      <div className="mx-auto px-10 max-w-[800px] flex w-full">
        <RegisterForm />
      </div>
    </Page>
  );
}
