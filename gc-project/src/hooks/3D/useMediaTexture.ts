import { useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { type Texture } from "three";
import { isImage } from "@/utils/file";
import * as THREE from "three";
import { storyblokImageLoader } from "@/lib/storyblok";
import { CUBEHEIGHT, CUBEWIDTH } from "@/data/constants";

export type MediaTexture = {
  texture: Texture;
  width: number;
  height: number;
};

const DEFAULT_SIZE = 1024;

// function applyObjectContain(
//   texture: Texture,
//   width: number,
//   height: number,
//   padding = 0.9,
// ) {
//   if (!texture || !width || !height) return;
//   const textureAspect = width / height;
//   const planeAspect = CUBEHEIGHT / CUBEWIDTH;
//   if (textureAspect > planeAspect) {
//     // the image is wider than the plane then cropping the sides to fit it
//     //repeat.x = 1, repeat.y = planeAspect / textureAspect , padding to shrink
//     texture.repeat.set(1 * padding, (planeAspect / textureAspect) * padding);
//     // center
//     texture.offset.set((1 - texture.repeat.x) / 2, (1 - texture.repeat.y) / 2);
//   } else {
//     // the image is taller then the plane so croppping the top and bottom to fit
//      texture.repeat.set((textureAspect / planeAspect) * padding, 1 * padding);
//      // centering
//          texture.offset.set((1 - texture.repeat.x) / 2, (1 - texture.repeat.y) / 2);

//   }
//   texture.needsUpdate = true;
// }


// function cenerTextures(texture: Texture,){
//    texture.offset.set((1 - texture.repeat.x) / 2, (1 - texture.repeat.y) / 2);

// }

export function useMediaTexture(
  src: string = "",
  // width = DEFAULT_SIZE,
): MediaTexture {
  const isImg = isImage(src);
  // const optimsedImage = isImg ? storyblokImageLoader(src) : null;
  const encodedSrc = src.replace("a.storyblok", "a2.storyblok");

  const imageTexture = useTexture(
    isImg ? encodedSrc : "/empty/jpeg.jpg",
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
    },
  );

  const { width, height } = useMemo(() => {
    const ImgWidth = imageTexture?.image.width ?? DEFAULT_SIZE;
    const ImgHeight = imageTexture?.image?.height ?? DEFAULT_SIZE;

    return {
      texture: imageTexture,
      width: ImgWidth,
      height: ImgHeight,
    };
  }, [imageTexture]);

  const state = useMemo<MediaTexture>(
    () => ({
      texture: imageTexture,
      width,
      height,
    }),
    [imageTexture, width, height],
  );
  // applyObjectContain(state.texture, state.width, state.height);
  return state;
}

export default useMediaTexture;
