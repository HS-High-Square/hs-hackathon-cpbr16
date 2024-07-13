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
import { useState } from "react";
import { IScanRequest } from "@/app/api/scan/route";
import { useAuth } from "@/providers/AuthProvider";
import { User } from "@/dtos/user";

export async function scanQR(
  userdata: User,
  qrUrl: string,
  callback: any,
  callback2?: any
) {
  const url = new URL(qrUrl);
  const target = new URL(document.location.toString());
  target.pathname = url.pathname;
  target.search = url.search;

  const body: IScanRequest = userdata;
  const res = await fetch(target.toString(), {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (res.status !== 200) {
    return res;
  }

  callback(false);
  return res;
}

export default function QRDrawer() {
  const router = useRouter();
  const { userdata } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>();
  const [error, setError] = useState<any>();

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
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
              allowMultiple
              components={{ finder: false }}
              classNames={{ container: "rounded-md" }}
              onScan={async (result) => {
                setError(null);

                const res = await scanQR(
                  JSON.parse(userdata),
                  result[0].rawValue,
                  setIsOpen
                );
                if (res.status === 200) {
                  window.location.reload();
                }

                if (res.status === 404) {
                  setError({
                    level: "error",
                    message: "Estande não encontrado.",
                  });
                }

                if (res.status === 408) {
                  setError({
                    level: "warn",
                    message: "Estande já adicionado.",
                  });
                }
              }}
            />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
          {error && (
            <h1 style={{ color: error.level === "error" ? "red" : "yellow" }}>
              {error.message}
            </h1>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
