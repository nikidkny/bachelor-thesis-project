"use client";

import ImageAsset from "../atoms/ImageAsset";
import Link from "next/link";
import { useEffect, useState } from "react";
import IconButton from "../atoms/IconButton";
import { ISbStoryData, storyblokEditable } from "@storyblok/react/ssr";
import { Settings } from "@/types";
import { resolveLink } from "@/lib/storyblok/resolveLink";
import classNames from "classnames";
import Button from "../atoms/Button";
import { useRouter } from "next/navigation";

export default function NavBar({
  settings,
}: {
  settings: ISbStoryData<Settings>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
        "fixed top-0 left-0 z-999 col-span-full flex w-full items-center px-8 py-4 transition-colors duration-200",
        { "bg-white": scrolled, "bg-transparent": !scrolled },
      )}
    >
      <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/">
          <ImageAsset
            asset={settings.content.headerLogo}
            width={75}
            height={75}
            lazy={true}
            aria-label="Navigate to homepage"
          />
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="mr-auto hidden md:block">
        <div className="relative flex gap-8">
          {settings.content.headerNav.map((menuItem) => {
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
                {menuItem.linkText}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 768px down menu */}
      <div className="mr-auto w-full md:hidden">
        <div className="flex justify-between">
          <div>
            <IconButton
              variant="burgerMenu"
              icon="burgerMenuIcon"
              className={classNames("", {
                "!bg-black !text-white": scrolled,
                "!bg-white !text-black": !scrolled,
              })}
              onClick={() => setMenuOpen(true)}
              aria-label="Open Menu"
            />
          </div>
          <div className="flex items-center justify-center">
            <IconButton
              iconHeight={30}
              iconWidth={30}
              icon="contactIcon"
              variant="iconOnly"
              className={classNames("", {
                "!text-black": scrolled,
                "!text-white": !scrolled,
              })}
            onClick={() => router.push("/contact")}
            aria-label="Navigate to contact page"
            />
          </div>
        </div>
        {menuOpen && (
          <div className="fixed inset-0 z-100 flex h-full w-full flex-col gap-4 overflow-y-auto bg-white p-4">
            <div className="">
              <IconButton
                icon="closeIcon"
                className=""
                onClick={() => {
                  setMenuOpen(false);
                  setShowOverlay(false);
                }}
                aria-label="Close Menu"
              />
            </div>
            {!showOverlay && (
              <div className="flex flex-col items-start gap-2">
                {settings.content.headerNav.map((menuItem) => {
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
                      {menuItem.linkText}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="hidden md:block" onClick={() => router.push("/contact")}>
        <Button variant="getInTouch">Get in touch</Button>
      </div>
    </nav>
  );
}
