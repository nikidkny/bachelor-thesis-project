import StoryblokProvider from "@/providers/StoryblokProvider";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoryblokProvider>{children}</StoryblokProvider>
      </body>
    </html>
  );
}
