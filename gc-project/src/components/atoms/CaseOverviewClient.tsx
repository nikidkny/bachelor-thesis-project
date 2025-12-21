"use client";

import { CaseOverview as CaseOverviewType } from "@/types";
import Link from "next/dist/client/link";
export default function CaseOverview({ blok }: { blok: CaseOverviewType }) {
  console.log("blok.cases in CaseOverviewClient:", blok.cases);
  /* TODO: ADD CANVAS WITH 3D CARDS WITH THE IMAGE OF PRODUCT RENDERED AS A KINDA PYRAMID THEN IT CRUMBLES AND SCATTERS AND WHEN HOVERED THE CARD FLIPS AND SHOWS THE CATEGORIES IT IS IN AND THE NAME OF THE COPANY AS WELL */
  
  return (
    <div className="flex flex-col pt-[10vh]">
      {blok.cases?.map((caseItem) => {
        if (typeof caseItem === "string") return null;

        return (
          <div key={caseItem.uuid}>
            <Link href={`/cases/${caseItem.slug}`} className="typo-h2">
              {caseItem.name}
            </Link>
            <p>{caseItem.content.services}</p>
          </div>
        );
      })}
    </div>
  );
}
