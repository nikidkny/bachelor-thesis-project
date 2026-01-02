"use client";

import ImageAsset from "../atoms/ImageAsset";
import Link from "next/link";
import { useEffect, useState } from "react";
import IconButton from "../atoms/IconButton";
import { ISbStoryData, storyblokEditable } from "@storyblok/react/ssr";
import { Settings } from "@/types";
import { resolveLink } from "@/lib/storyblok/resolveLink";
import classNames from "classnames";

export default function NavBar({
  settings,
}: {
  settings: ISbStoryData<Settings>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(()=>{
    if (menuOpen){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const trigger = window.innerHeight * 0.03;
      setScrolled(window.scrollY > trigger);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
    {...storyblokEditable(settings as any)}
      className={classNames(
        "fixed top-0 left-0 z-999 w-full col-span-full flex items-center px-4 py-4 transition-colors duration-200",
        { "bg-white": scrolled, "bg-transparent": !scrolled },
      )}
    >
      <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/">
          <ImageAsset asset={settings.content.navLogo} width={75} height={75} />
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="mr-auto hidden md:block">
        <div className="relative flex gap-8">
          {settings.content.menu.map((menuItem) => {
            const resolvedLink = resolveLink(menuItem.link);
            if (!resolvedLink) return null;
            return (
              <Link
                key={menuItem._uid}
                href={resolvedLink?.href}
                target={resolvedLink?.target}
                rel={resolvedLink?.rel}
                className={classNames("cursor-pointer", {
                  "text-black": scrolled,
                  "text-white": !scrolled,
                })}
              >
                {menuItem.linktText}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 768px down menu */}
      <div className="mr-auto md:hidden">
        <IconButton
        variant="burgerMenu"
          icon="burgerMenuIcon"
          className={classNames("", {
            "!bg-black !text-white": scrolled,
            "!bg-white !text-black": !scrolled,
          })}
          onClick={() => setMenuOpen(true)}
        />

        {menuOpen && (
          <div className="fixed inset-0 z-100 flex h-full w-full flex-col gap-4 bg-white p-4 overflow-y-auto">
            <div className="">
              <IconButton
                icon="closeIcon"
                className=""
                onClick={() => {
                  setMenuOpen(false);
                  setShowOverlay(false);
                }}
              />
            </div>
            {!showOverlay && (
              <div className="flex flex-col items-start gap-2">
                {settings.content.menu.map((menuItem) => {
                  const resolvedLink = resolveLink(menuItem.link);
                  if (!resolvedLink) return null;
                  return (
                    <Link
                      key={menuItem._uid}
                      href={resolvedLink?.href}
                      target={resolvedLink?.target}
                      rel={resolvedLink?.rel}
                      onClick={() => {
                        setMenuOpen(false);
                        setShowOverlay(false);
                      }}
                      className="w-full cursor-pointer border-b py-4 hover:bg-[#ffffff80]"
                    >
                      {menuItem.linktText}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
