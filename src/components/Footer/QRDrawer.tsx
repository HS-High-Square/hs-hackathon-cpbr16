"use client";

import { Scanner } from "@yudiel/react-qr-scanner";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import FooterButton from "./FooterButton";
import { ScanLine } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QRDrawer() {
  const router = useRouter();

  return (
    <Drawer>
      <DrawerTrigger>
        <FooterButton icon={<ScanLine />}>Ler QR</FooterButton>
      </DrawerTrigger>
      <DrawerContent className="min-h-[550px] flex items-center text-center">
        <DrawerHeader>
          <DrawerTitle className="text-center w-full">
            Escanear Código QR
          </DrawerTitle>
          <DrawerDescription className="mt-4 max-w-[400px]">
            <Scanner
              onScan={async (result) => {
                const url = new URL(result[0].rawValue);
                console.log(url);
                const res = await fetch(url.pathname);
                console.log(res);
                const json = await res.json();

                console.log(json);
              }}
            />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
