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
      className="custom-grid col-span-full gap-x-5! px-5! py-10!"
    >
      <div
        className={classNames(
          "relative col-span-full row-1 md:col-span-2 md:pb-10 xl:col-span-7",
          isMediaLeftAlign ? "md:col-start-3" : "md:col-start-1",
        )}
      >
        <div
          className={classNames(
            "flex flex-col gap-5 self-start py-5 md:sticky md:top-25 md:gap-4 md:py-0",
          )}
        >
          {blok.headline && (
            <h3 className="text-[28px] md:text-[32px]">{blok.headline}</h3>
          )}
          {blok.text && (
            <div className="text-[16px]">
              <Richtext document={blok.text} />
            </div>
          )}
        </div>
      </div>
      <div
        className={classNames(
          "col-span-full row-2 flex flex-1 justify-center flex-col gap-4 md:col-span-2 md:row-1 xl:col-span-5",
          isMediaLeftAlign ? "md:col-start-1" : "md:col-start-3",
        )}
      >
        {blok.media.map((assetBlok, index) => (
          <div
            key={index}
            className="relative mb-4 aspect-240/319 h-auto w-full md:aspect-597/796 md:max-w-[597px]"
          >
            <AssetBlok blok={assetBlok} objectFit="contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
