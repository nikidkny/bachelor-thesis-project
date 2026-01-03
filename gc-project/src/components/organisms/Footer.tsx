"use client";
import { useData } from "@/providers/DataProvider";
import Button from "../atoms/Button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { resolveLink } from "@/lib/storyblok/resolveLink";
import ImageAsset from "../atoms/ImageAsset";

export default function Footer() {
  const { settings } = useData();
  const router = useRouter();
  const pathname = usePathname()


  // if the page has (/contact) route, do not render the footer contact section
  const isContact = pathname.includes("/contact");
  return (
    <footer className="text-center">

      {!isContact && <div className="flex flex-col gap-2 p-10 md:p-15 text-white">
        <div className="text-[36px] font-bold md:text-[60px]">
          {settings?.footerContactHeadline}
        </div>
        <div className="flex flex-col gap-8">
          <div>{settings?.footerContactTagline}</div>
          <div>
            <Button variant="primary" onClick={() => router.push("/contact")}>
              Get in touch
            </Button>
          </div>
        </div>
      </div>}
      <div className="px-[20px]">
        <div className="relative flex flex-col items-center gap-4 rounded-t-md bg-white py-10 pt-5 md:pt-15 pb-5">
          <div className="flex flex-col gap-8">
            <div className="text-[16px] px-4">{settings?.footerTagline}</div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-center gap-4">
                {settings.footerSocials?.map((social, index) => {
                  const resolvedLink = resolveLink(social.link);
                  if (!resolvedLink) return null;
                  return (
                    <Link
                      key={index}
                      href={resolvedLink?.href}
                      target={resolvedLink?.target}
                      rel={resolvedLink?.rel}
                      className="text-[16px] underline"
                    >
                      {social.linkText}
                    </Link>
                  );
                })}
              </div>
              <div>{settings.footerPhone}</div>
            </div>
          </div>
          <div>
            <Link href="/" className="relative w-20">
              <ImageAsset
                asset={settings.footerLogo}
                width={180}
                height={120}
                lazy={true}
              />
            </Link>
          </div>
        </div>
        <div>
            <span className="text-[12px]">{settings.footerCopywrite}</span>
        </div>
      </div>
    </footer>
  );
}
