import { ImageResponse } from "next/og";

export const size = {
  width: 48,
  height: 48,
};

export const contentType = "image/png";

export default function Icon() {
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
          color: "#b8281e",
          fontSize: 26,
          fontWeight: 600,
          fontFamily: "Georgia, serif",
        }}
      >
        N
      </div>
    ),
    size
  );
}
