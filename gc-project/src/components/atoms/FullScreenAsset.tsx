import { FullScreenAsset as FullScreenAssetType } from "@/types";
import AssetBlok from "./AssetBlok";

export default function FullScreenAsset({
  blok,
}: {
  blok: FullScreenAssetType;
}) {
  return (
    <div className="relative col-span-full aspect-[1280/876] size-full max-h-dvh">
      <AssetBlok blok={blok.asset[0]} objectFit="cover"></AssetBlok>
    </div>
  );
}
