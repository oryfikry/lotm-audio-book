/* Part catalog. Audio availability is intentional: Vol. 2 is script-only. */
window.LOTM_CATALOG = [
  {
    id: "vol-1",
    label: "Volume 1",
    parts: [
      {
        id: "lotm-vol1-recap-1",
        label: "Part 1 — Full recap",
        file: "data/lotm-vol1-recap-1.js?v=20260904-library-1",
        description: "The complete first-volume recap, ready to read or play.",
        voice: "Fenrir",
        audioAvailable: true,
        availability: "Audio ready"
      }
    ]
  },
  {
    id: "vol-2",
    label: "Volume 2",
    parts: [
      {
        id: "lotm-vol2-recap-1",
        label: "Part 1 — Scene plan",
        file: "data/lotm-vol2-recap-1.js?v=20260904-part1-15min-1",
        description: "15-scene script plan. Audio has not been published or generated from this screen yet.",
        voice: "edge-tts/id-ID-ArdiNeural",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      }
    ]
  }
];
