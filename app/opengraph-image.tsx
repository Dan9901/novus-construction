import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-config";

export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  const logoBase64 = readFileSync(join(process.cwd(), "public", "logo-dark.png")).toString("base64");
  const logoSrc = `data:image/png;base64,${logoBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1b1712",
          color: "#f7f4ee",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(128deg, rgba(247,244,238,0.06) 0px, rgba(247,244,238,0.06) 1px, transparent 1px, transparent 26px)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={420} height={227} style={{ display: "flex" }} alt="" />
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 22,
              color: "rgba(247,244,238,0.65)",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>
      </div>
    ),
    size
  );
}
