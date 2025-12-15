import { CaseOverviewType } from "@/types/storyblok/components/caseOverviewType";
import type { Case as CaseType } from "@/types";
import { ISbStoryData } from "storyblok-js-client";

export default function CaseOverview({ blok }: { blok: CaseOverviewType }) {
  return (
    <div>
      {blok.cases.map((caseItem: ISbStoryData<CaseType>) => (
        <div key={caseItem.id} className="">
          <a className="font-red" href={`/${caseItem.full_slug}`}>
            {caseItem.content.title}
          </a>
        </div>
      ))}
    </div>
  );
}
