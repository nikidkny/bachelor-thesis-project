import StoryblokProvider from "@/providers/StoryblokProvider";
import "../styles/globals.css";

export const metadata = {
  title: "Good City portfolio platform",
  description:
    "Good City portfolio platform built with Next.js, Storyblok, Three.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoryblokProvider>{children}</StoryblokProvider>
      </body>
    </html>
  );
}
