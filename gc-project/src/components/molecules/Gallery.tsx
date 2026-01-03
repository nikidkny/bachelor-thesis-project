import { Gallery as GalleryType } from "@/types";
import AssetBlok from "../atoms/AssetBlok";

export default function Gallery({ blok }: { blok: GalleryType }) {
  return (
    <div className="relative border border-red-500">
      {blok.headline && <h3>{blok.headline}</h3>}
      <div>
        <div className="border border-blue-600">
          {blok.media.map((assetBlok, index) => (
            <div
              key={index}
              className="col-span-1 aspect-240/240 h-auto w-[240px]"
            >
              <AssetBlok blok={assetBlok} objectFit="contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
