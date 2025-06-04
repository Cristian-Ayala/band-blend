import { VitePWAOptions } from "vite-plugin-pwa";

const pwaManifest: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  manifest: {
    id: "3.0.0",
    name: "Band Blend",
    short_name: "Band Blend",
    description:
      "Is the perfect solution for bands to create playlists for their upcoming events! Collaborate in real time and organize your repertoire with ease - make your performances unforgettable with band blend",
    icons: [
      {
        src: "pwa_icons/icon-36x36.png",
        sizes: "36x36",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "pwa_icons/icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "pwa_icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "pwa_icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "pwa_icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "pwa_icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "pwa_icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "pwa_icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "pwa_icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "pwa_icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any",
      },
    ],
    theme_color: "#171717",
    background_color: "#171717",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

export default pwaManifest;
