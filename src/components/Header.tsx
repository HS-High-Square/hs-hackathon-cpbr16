import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2 w-full">
      <div className="flex items-center">
        <a href="/">
          <Image
            src="/logo.svg"
            alt="High Square Logo"
            className="w-12 h-auto mr-4 "
            width={128}
            height={128}
          />
        </a>
        <h1 className="text-lg">
          <b>Hackathon CPBR16</b>
        </h1>
      </div>
      <ThemeToggle />
    </div>
  );
}
