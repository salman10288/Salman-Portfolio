import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Salman Saeed — Developer Portfolio",
    short_name: "Salman Portfolio",
    description: "A cinematic 3D full-stack developer portfolio.",
    start_url: "/",
    display: "standalone",
    background_color: "#06080b",
    theme_color: "#06080b",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
