"use client";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/MultiSelector";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/PhoneInput";
import { Input } from "@/components/ui/input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useRouter } from "next/navigation";

const form = z.object({
  phone: z
    .string({ message: "Esse campo é obrigatório." })
    .refine(isValidPhoneNumber, { message: "Número de telefone inválido." }),
  email: z
    .string({ message: "Esse campo é obrigatório." })
    .email("Esse email não é válido."),
  categories: z.array(z.string()),
});

export type TRegisterForm = z.infer<typeof form>;

const categories = [
  {
    value: "robotica",
    label: "Robótica",
  },
  {
    value: "ia",
    label: "Inteligência Artificial",
  },
  {
    value: "nuvem",
    label: "Nuvem",
  },
];

export default function RegisterForm() {
  const router = useRouter();

  const multiForm = useForm<TRegisterForm>({
    resolver: zodResolver(form),
    defaultValues: {
      categories: [],
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: TRegisterForm) => {
    localStorage.setItem("userdata", JSON.stringify(data));

    router.push("/home?from=register");
  };

  return (
    <Form {...multiForm}>
      <form
        onSubmit={multiForm.handleSubmit(onSubmit)}
        className="space-y-3 grid gap-3 flex-1"
      >
        <FormField
          control={multiForm.control}
          name="phone"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <PhoneInput {...field} />
              </FormControl>
              {/* <FormDescription>Selecione telefone ou email.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={multiForm.control}
          name="categories"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Interesses</FormLabel>
              <MultiSelector
                onValuesChange={field.onChange}
                values={field.value}
              >
                <MultiSelectorTrigger>
                  <MultiSelectorInput placeholder="Selecione interesses" />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                  <MultiSelectorList>
                    {categories.map((category) => (
                      <MultiSelectorItem
                        key={category.value}
                        value={category.value}
                      >
                        {category.label}
                      </MultiSelectorItem>
                    ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
              </MultiSelector>
              {/* <FormDescription>
                Select people to invite to this event
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Cadastrar</Button>
      </form>
    </Form>
  );
}
