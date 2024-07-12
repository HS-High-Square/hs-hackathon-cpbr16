"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ILoginData } from "@/app/api/auth/login/route";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

const form = z.object({
  email: z
    .string({ message: "Esse campo é obrigatório." })
    .email("Esse email não é válido."),
});

export type TLoginForm = z.infer<typeof form>;

export default function RegisterForm() {
  const [error, setError] = useState<string | null>();
  const router = useRouter();
  const { userdata, setUserdata } = useAuth();

  const multiForm = useForm<TLoginForm>({
    resolver: zodResolver(form),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: TLoginForm) => {
    setError(null);
    const body: ILoginData = {
      email: data.email,
    };
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (res.status !== 200) {
      setError("Login inválido");
      return;
    }

    const json = await res.json();
    localStorage.setItem("userdata", JSON.stringify(json));

    router.push("/home?from=login");
  };

  return (
    <>
      <Form {...multiForm}>
        <form
          onSubmit={multiForm.handleSubmit(onSubmit)}
          className="space-y-3 grid gap-3 flex-1"
        >
          <FormField
            control={multiForm.control}
            name="email"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
          {error && <h1 className="text-red-500">{error}</h1>}
        </form>
      </Form>
    </>
  );
}
