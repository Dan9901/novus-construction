import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = {
  width: 48,
  height: 48,
};

export const contentType = "image/png";

export default function Icon() {
  const iconBase64 = readFileSync(join(process.cwd(), "public", "logo-icon.png")).toString("base64");
  const iconSrc = `data:image/png;base64,${iconBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1b1712",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} width={40} height={20} alt="" />
      </div>
    ),
    size
  );
}
