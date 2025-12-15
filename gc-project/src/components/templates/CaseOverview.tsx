import { storyblokEditable } from "@storyblok/react/rsc";
import type { CaseOverview as CaseOverviewType } from "@/types";
import CaseOverviewClient from "@/components/core/CaseOverviewClient";

export default function CaseOverview({ blok }: { blok: CaseOverviewType }) {
  return (
    <main {...storyblokEditable(blok as any)}>
      <CaseOverviewClient blok={blok} />
    </main>
  );
}
