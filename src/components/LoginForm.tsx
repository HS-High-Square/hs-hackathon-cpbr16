"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RefinementCtx, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { PhoneInput } from "./PhoneInput";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "./MultiSelector";
import { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";

function oneOf<
  A,
  K1 extends Extract<keyof A, string>,
  K2 extends Extract<keyof A, string>,
  R extends A &
    (
      | (Required<Pick<A, K1>> & { [P in K2]: undefined })
      | (Required<Pick<A, K2>> & { [P in K1]: undefined })
    )
>(key1: K1, key2: K2): (arg: A, ctx: RefinementCtx) => arg is R {
  return (arg, ctx): arg is R => {
    if ((arg[key1] === undefined) === (arg[key2] === undefined)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Either ${key1} or ${key2} must be filled, but not both`,
      });
      return false;
    }
    return true;
  };
}

const FormSchema = z
  .object({
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Número de telefone inválido." }),
    email: z
      .string({ message: "Esse campo é obrigatório." })
      .email("Esse email não é válido."),
  })
  .superRefine(oneOf("phone", "email"));

const categories = [
  {
    label: "A",
    value: "a",
  },
  {
    label: "B",
    value: "b",
  },
  {
    label: "C",
    value: "c",
  },
];

export default function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const [msValue, setMsValue] = useState<any>([]);
  const [phone, setPhone] = useState<string>();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                {/* <Input placeholder="shadcn" {...field} /> */}
                <PhoneInput {...field} />
              </FormControl>
              <FormDescription>Selecione telefone ou email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Categorias</FormLabel>
              <FormControl>
                <MultiSelector
                  values={msValue}
                  onValuesChange={setMsValue}
                  loop
                  className="w-full"
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Selecione categorias relevantes" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {categories.map((category) => (
                        <MultiSelectorItem
                          value={category.value}
                          key={category.value}
                        >
                          {category.label}
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
