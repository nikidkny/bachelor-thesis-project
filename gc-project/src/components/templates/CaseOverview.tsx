"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import type { CaseOverview as CaseOverviewType } from "@/types";
import CaseOverviewClient from "@/components/atoms/CaseOverviewClient";
import IconButton from "../atoms/IconButton";
import { useEffect, useState } from "react";
import classNames from "classnames";

export default function CaseOverview({ blok }: { blok: CaseOverviewType }) {
  const [showOverlay, setShowOverlay] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <main {...storyblokEditable(blok as any)}>
      <div
        className={classNames(
          `fixed top-1/2 left-1/2 z-999 h-50 w-50 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-6 shadow-md transition-opacity duration-500`,
          showOverlay ? "opacity-0 z-[-999]" : "opacity-100",
        )}
      >
        <div className="flex justify-end">
          <IconButton
            icon="closeIcon"
            variant="secondary"
            aria-label="Close "
            onClick={() => setShowOverlay(true)}
          />
        </div>
        <div>
          <h2 className="">Tap a cube to explore our cases</h2>
        </div>
      </div>

      <CaseOverviewClient blok={blok} />
    </main>
  );
}
