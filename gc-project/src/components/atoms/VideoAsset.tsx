import classNames from "classnames";
import { forwardRef, memo } from "react";

export type VideoAssetProps = Omit<
  React.ComponentProps<"video">,
  "src" | "children"
> & {
  src: string;
  lazy?: boolean;
  className?: string;
};

const VideoAsset = forwardRef<HTMLVideoElement, VideoAssetProps>(
  ({ src, className, lazy = false, ...props }: VideoAssetProps, ref) => {
    if (typeof src === "undefined") return null;

    const preload = lazy ? "none" : "auto";
    return (
      <video
        ref={ref}
        src={src}
        preload={preload}
        autoPlay
        loop
        muted
        playsInline
        className={classNames("col-span-full object-cover", className)}
        {...props}
      />
    );
  },
);
VideoAsset.displayName = "VideoAsset";

export default memo(VideoAsset);
