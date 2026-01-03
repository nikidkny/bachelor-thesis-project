import { GalleryText as GalleryTextType } from "@/types";
import { storyblokEditable } from "@storyblok/react";
import AssetBlok from "../atoms/AssetBlok";
import Richtext from "../atoms/Richtext";
import classNames from "classnames";

export default function GalleryText({ blok }: { blok: GalleryTextType }) {
  const isMediaLeftAlign = blok.alignMedia === "alignLeft";
  return (
    <div
      {...storyblokEditable(blok as any)}
      className="custom-grid col-span-full px-5! py-10! gap-x-5!"
    >
      <div
        className={classNames(
          "relative col-span-full row-1 md:col-span-2 md:pb-10 xl:col-span-6",
          isMediaLeftAlign ? "md:col-start-3" : "md:col-start-1",
        )}
      >
        <div
          className={classNames(
            "flex flex-col gap-5 py-5 md:py-0 md:gap-20 self-start  md:sticky md:top-25",
          )}
        >
          {blok.headline && (
            <h3 className="text-[24px] md:text-[48px]">{blok.headline}</h3>
          )}
          {blok.text && (
            <div className="text-[16px] md:text-[20px]">
              <Richtext document={blok.text} />
            </div>
          )}
        </div>
      </div>
      <div
        className={classNames(
          "col-span-full row-2 flex flex-1 flex-col gap-4  md:col-span-2 md:row-1 xl:col-span-6",
          isMediaLeftAlign ? "md:col-start-1" : "md:col-start-3",
        )}
      >
        {blok.media.map((assetBlok, index) => (
          <div
            key={index}
            className="mb-4 aspect-296/319 h-auto w-full md:aspect-704/796 md:max-w-[704px] xl:aspect-738/796 xl:max-w-[738px]"
          >
            <AssetBlok blok={assetBlok} objectFit="contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
