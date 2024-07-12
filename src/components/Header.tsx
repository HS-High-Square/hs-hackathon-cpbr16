import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2 w-full">
      <div className="flex items-center">
        <a href="/">
          <img src="/logo.svg" className="w-12 h-auto mr-4 " />
        </a>
        <h1 className="text-lg">
          <b>Hackathon CPBR16</b>
        </h1>
      </div>
      <ThemeToggle />
    </div>
  );
}
