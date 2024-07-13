import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";

interface IStandViewProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  name: string;
  image: string;
  categories: string[];
  visitors: number;
}

export default function StandView(props: IStandViewProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={props.image}
          alt="Stand Image"
          className="h-10 rounded-md w-20 aspect-auto"
          width={192}
          height={108}
        ></Image>
        <h1>
          <b>{props.name}</b> ({props.visitors} Visitante
          {props.visitors == 1 ? "" : "s"})
        </h1>
      </div>

      <div className="flex gap-2">
        {props.categories.map((c) => (
          <Badge key={c}>{c}</Badge>
        ))}
      </div>
    </div>
  );
}
