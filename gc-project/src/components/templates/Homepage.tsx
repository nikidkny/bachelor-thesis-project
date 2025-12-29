"use client";

import { storyblokEditable } from "@storyblok/react";
import ModelAsset from "../atoms/3DAsset";

export default function Homepage() {
  /*TODO: ADJUST 3D MODEL TO LOOK EXACTLY LIKE THE LOGO */
  /*TODO: FORM VALIDATION */
  /*TODO: CREATE 3D CARD */
  /*TODO: CREATE 3D CANVAS*/
  /*TODO: ADD RENDERING LOOP*/
  /*TODO: ADD TEXTURE COMPRESSION UTIL*/
  /*TODO: ADD PRELOADING 3D UTIL*/
  /*TODO: ADD LAZY LOADING*/
  /*TODO: ADD EDGE CASES*/
  /*TODO: CREATE CONTACT STRUCTURE*/
  /*TODO: CREATE DB IN POSTGRES*/
  /*TODO: CREATE REL CRUD*/
  /*TODO: INVESTIGATE EMAIL SENDING*/
  /*TODO: ADD SCROLL ANIMATION TO 3D SPACE*/
  /*TODO: FINISH PREVIEW/PUBLISHED, DEV/PROD SETUP*/
  /*TODO: EDIT NOT-FOUND PAGE*/
  return (
    <div {...storyblokEditable(blok as any)} className="h-[75vh]">
      <ModelAsset url="/gc-high-processed.gltf" env="/env.exr" />
    </div>
  );
}

/* EXTRA TODO: COULD THE ICONS BE GENERATED FROM A DATASOURCE */
