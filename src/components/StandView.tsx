import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Badge } from "./ui/badge";

interface IStandViewProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  name: string;
  image: string;
  categories: string[];
}

export default function StandView(props: IStandViewProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={props.image} className="h-10 rounded-md"></img>
        <h1>{props.name}</h1>
      </div>

      <div className="flex gap-2">
        {props.categories.map((c) => (
          <Badge key={c}>{c}</Badge>
        ))}
      </div>
    </div>
  );
}
