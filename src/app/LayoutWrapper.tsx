"use client";

import { useEffect, useState } from "react";
import MainNavbar from "./navbar";
import Loading from "./loading";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [attribute, setAttribute] = useState("");
  const [themes, setThemes] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    setIsContentLoaded(true);
    setAttribute("class");
    setThemes(["light", "dark"]);
  }, []);

  return (
    <>
      {!isContentLoaded && <Loading />}
      {isContentLoaded && (
        <NextUIProvider>
          <NextThemesProvider
            attribute={attribute}
            themes={themes}
            defaultTheme="dark"
            enableSystem={false}
          >
            <SessionProvider>
              <MainNavbar />
              <main className="min-h-screen">
                <div className="container">
                  <div className="flex flex-wrap gap-y-4 justify-center">
                    {children}
                  </div>
                </div>
              </main>
            </SessionProvider>
          </NextThemesProvider>
        </NextUIProvider>
      )}
    </>
  );
}
