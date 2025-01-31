"use client";

import { scanQR } from "@/components/Footer/QRDrawer";
import Page from "@/components/Page";
import StandView from "@/components/StandView";
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
import appendedSearchParams from "@/lib/appendedSearchParams";
import { sleep } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { BadgeCheck, Router } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IStandStats {
  visited: any[];
  unvisited: any[];
}

export default function Home() {
  const searchParams = useSearchParams();
  const referrer = searchParams.get("referrer");
  const router = useRouter();
  const { userdata } = useAuth();

  const [stands, setStands] = useState<IStandStats>();

  useEffect(() => {
    async function getVisits() {
      if (searchParams.has("from", "scan")) {
        const url = new URL(document.location.toString());
        url.pathname = `/api/scan`;
        url.search = `id=${searchParams.get("id")}`;
        await scanQR(
          JSON.parse(localStorage.getItem("userdata") as string),
          url.toString(),
          () => {}
        );

        if (referrer) {
          await sleep(3000);
        }
        router.replace("/home");
      }

      if (referrer) {
        await sleep(3000);
        router.replace("/home");
      }

      const visits = await fetch(
        `/api/stands/visited?email=${
          JSON.parse(localStorage.getItem("userdata") as string).email
        }`
      );
      const visitsJson = await visits.json();

      const stands = await fetch(`/api/stands`);
      const standsJson = await stands.json();

      const k = visitsJson.map((v: string) => standsJson[v]);
      const j = Object.keys(standsJson)
        .filter((objKey) => !visitsJson.includes(objKey))
        .reduce((newObj: any, key: string) => {
          newObj[key] = standsJson[key];
          return newObj;
        }, {});

      const l = Object.keys(j).map((k) => standsJson[k]);

      setStands({ visited: k, unvisited: l });
    }

    getVisits();
  }, [referrer, router, searchParams]);

  if (userdata) {
    return (
      <Page>
        {referrer === "register" && (
          <Alert className="dark:bg-green-700 bg-green-100 border-green-500 rounded-none">
            <BadgeCheck className="h-4 w-4" />
            <AlertTitle>Sucesso!</AlertTitle>
            <AlertDescription>Sua conta foi criada.</AlertDescription>
          </Alert>
        )}
        <Title>Home</Title>

        <main className="overflow-y-auto flex flex-col px-10 h-full ">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex gap-2">
                  <Badge variant="green">{stands?.visited.length || 0}</Badge>{" "}
                  <span className="hover:underline">Estandes visitados</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex gap-2 flex-col max-h-[150px] overflow-y-auto">
                {stands?.visited.map((v, i) => (
                  <StandView {...v} key={i} />
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex gap-2">
                  <Badge variant="yellow">
                    {stands?.unvisited.length || 0}
                  </Badge>{" "}
                  <span className="hover:underline">Estandes para visitar</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex gap-2 flex-col max-h-[150px] overflow-y-auto">
                {stands?.unvisited.map((u, i) => (
                  <StandView {...u} key={i} />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex-1 border-2 my-8 bg-[url('/map.png')] bg-cover rounded-md">
            <div className="backdrop-blur-md w-full h-full flex items-center justify-center">
              <Button
                onClick={() => router.push(`/map${appendedSearchParams()}`)}
              >
                Ver mapa
              </Button>
            </div>
          </div>
        </main>
      </Page>
    );
  } else {
    return <Page></Page>;
  }
}
