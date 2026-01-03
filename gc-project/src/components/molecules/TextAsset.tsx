"use client";
import { TextAsset as TextAssetType } from "@/types";
import AssetBlok from "../atoms/AssetBlok";
import Richtext from "../atoms/Richtext";
import classNames from "classnames";
import { storyblokEditable } from "@storyblok/react";

export default function TextAsset({ blok }: { blok: TextAssetType }) {
  const isAssetLeft = blok.alignAsset === "alignLeft";
  console.log(blok.alignAsset);
  return (
    <div
      {...storyblokEditable(blok as any)}
      className="custom-grid col-span-full gap-x-10! gap-y-4 px-4! py-8"
    >
      <div
        className={classNames(
          "relative col-span-full row-2 flex flex-col justify-center sm:col-span-2 xl:col-span-6",
          isAssetLeft
            ? "sm:col-start-1 sm:row-1"
            : "sm:col-start-3 sm:row-1 xl:col-start-7",
        )}
      >
        <div className={classNames("aspect-296/319 h-auto w-full md:aspect-704/796 md:max-w-[704px] xl:aspect-738/796 xl:max-w-[738px]")}>
          <AssetBlok blok={blok.asset[0]} objectFit="contain" />
        </div>
      </div>
      <div
        className={classNames(
          "col-span-full row-1 flex flex-col justify-center gap-4 sm:col-span-2 xl:col-span-6",
          isAssetLeft ? "sm:col-start-3 xl:col-start-7" : "sm:col-start-1",
        )}
      >
        <h3 className="text-[28px] md:text-[32px]">{blok.title}</h3>
        {blok.richtext && <Richtext document={blok.richtext} />}
      </div>
    </div>
  );
}
