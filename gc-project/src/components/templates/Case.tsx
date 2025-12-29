import type { Case as CaseType } from "@/types";
import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import Richtext from "../atoms/Richtext";
import Tag from "../atoms/Tag";
import { formatDatasourceNames } from "@/utils/formatDatasourceNames";
import AssetBlok from "../atoms/AssetBlok";

export default function Case({ blok }: { blok: CaseType }) {
  // TODO: FORMAT SERVICE NAMES

  return (
    <div {...storyblokEditable(blok as any)} className="relative col-span-full">
      <div className="relative col-span-full aspect-16/12 w-full md:aspect-16/9">
        <AssetBlok blok={blok.coverAsset[0]}  />
      </div>
      <div className="custom-grid col-span-full">
        <div className="col-span-full flex flex-col gap-4 py-8">
          <div className="flex items-baseline gap-2">
            <h2 className="typo-h2">{blok.title}</h2>
            <span className="text-[10px]">({blok.projectYear})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {blok.services.map((service) => {
              if (typeof service === "number") return null;
              return (
                <Tag key={service} label={formatDatasourceNames(service)} />
              );
            })}
          </div>

          {blok.introText && (
            <div className="">
              <Richtext document={blok.introText}></Richtext>
            </div>
          )}
        </div>

        {blok.body?.map((nestedBlok) => (
          <StoryblokServerComponent key={nestedBlok._uid} blok={nestedBlok} />
        ))}
      </div>
    </div>
  );
}
