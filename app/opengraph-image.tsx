import { ImageResponse } from "next/og";
import { reversedMarkDataUri } from "@/lib/brand-image";
import { site } from "@/lib/site";

export const alt = `${site.name}: custom software, web and mobile applications, and cloud systems`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#3B1C5A",
          color: "#FBF4F8",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={reversedMarkDataUri} width={72} height={72} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>{site.name}</span>
            <span style={{ fontSize: 16, letterSpacing: 4, textTransform: "uppercase", color: "#CDBBD8" }}>
              {site.tagline}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <span style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -3 }}>
            We design and build software your business can
          </span>
          <span style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -3, color: "#FF6B57" }}>
            run on.
          </span>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 22, color: "#CDBBD8" }}>
          <span>Custom software</span>
          <span style={{ color: "#FF6B57" }}>·</span>
          <span>Web &amp; mobile apps</span>
          <span style={{ color: "#FF6B57" }}>·</span>
          <span>Cloud &amp; IT support</span>
        </div>
      </div>
    ),
    size,
  );
}
