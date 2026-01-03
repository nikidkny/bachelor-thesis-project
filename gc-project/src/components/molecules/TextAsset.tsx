"use client";
import { TextAsset as TextAssetType } from "@/types";
import AssetBlok from "../atoms/AssetBlok";
import Richtext from "../atoms/Richtext";
import classNames from "classnames";
import { storyblokEditable } from "@storyblok/react";

export default function TextAsset({ blok }: { blok: TextAssetType }) {
  // console.log("TextAsset blok:", blok.alignAsset);
  const isAssetLeft = blok.alignAsset === "alignLeft";
  return (
    <div {...storyblokEditable(blok as any)}  className="custom-grid col-span-full px-4! py-8 gap-x-10! gap-y-4">
      <div className={classNames(
          "flex flex-col justify-center relative col-span-full sm:col-span-2 xl:col-span-6 ",
          isAssetLeft ? "row-1 xl:col-start-1 " : "row-2 xl:col-start-7 sm:row-1",
        )}>
      <div
        className={classNames(
          " aspect-3/4 lg:aspect-3/4 ",
        )}
      >
        <AssetBlok blok={blok.asset[0]} objectFit="fill"  />
      </div>
      </div>
      <div
        className={classNames(
          "col-span-full sm:col-span-2 xl:col-span-6 flex flex-col gap-4 justify-center",
          isAssetLeft ? "row-2 xl:col-start-7 sm:row-1" : "row-1 xl:col-start-1 ",
        )}
      >
        <h3 className="text-[28px] md:text-[32px] ">{blok.title}</h3>
        {blok.richtext && <Richtext document={blok.richtext} />}
      </div>
    </div>
  );
}
