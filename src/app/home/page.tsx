"use client";

import Page from "@/components/Page";
import Title from "@/components/Title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { BadgeCheck, Router } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const router = useRouter();
  const { userdata } = useAuth();

  if (userdata) {
    return (
      <Page>
        {from === "register" && (
          <Alert className="bg-green-100 border-green-500 rounded-none">
            <BadgeCheck className="h-4 w-4" />
            <AlertTitle>Sucesso!</AlertTitle>
            <AlertDescription>Sua conta foi criada.</AlertDescription>
          </Alert>
        )}
        <Title>Home</Title>

        {userdata}

        <main className="overflow-y-scroll flex flex-col px-10 h-full ">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex gap-2">
                  <Badge variant="green">123</Badge>{" "}
                  <span className="hover:underline">Estandes visitados</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>Lista de estandes visitados</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex gap-2">
                  <Badge variant="yellow">321</Badge>{" "}
                  <span className="hover:underline">Estandes para visitar</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Lista de estandes para visitar
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex-1 border-2 my-8 bg-[url('/map.png')] bg-cover rounded-md">
            <div className="backdrop-blur-md w-full h-full flex items-center justify-center">
              <Button onClick={() => router.push("/map")}>Ver mapa</Button>
            </div>
          </div>
        </main>
      </Page>
    );
  } else {
    return <Page></Page>;
  }
}
