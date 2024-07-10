import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="">
      <h1 className="text-4xl mx-8 mt-8">
        <b>Login</b>
      </h1>
      <div className="flex-1 p-20">
        <LoginForm />
      </div>
    </div>
  );
}
