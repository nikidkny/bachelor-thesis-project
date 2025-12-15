import type { Case as CaseType } from "@/types";

export default function Case({ blok }: { blok: CaseType }) {
  return (
    <div>
      <h1>{blok.title}</h1>
    </div>
  );
}
