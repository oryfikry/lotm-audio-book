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
        label: "Part 1 — Faceless",
        file: "data/lotm-vol2-recap-1.js?v=20260905-part1-conversational-1",
        description: "15-scene Faceless recap in conversational Indonesian, narrated with edge-tts/id-ID-ArdiNeural.",
        voice: "edge-tts/id-ID-ArdiNeural",
        audioBase: "audio/lotm-vol2-recap-1-conversational",
        audioAvailable: true,
        availability: "Audio ready · conversational recap"
      },
      {
        id: "lotm-vol2-recap-2",
        label: "Part 2 — Backlund aftermath",
        file: "data/lotm-vol2-recap-2.js?v=20260904-part2-15min-1",
        description: "15-scene continuation: the True Creator plot, Great Smog aftermath, and Sherlock's departure for the sea.",
        voice: "edge-tts/id-ID-ArdiNeural",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      }
    ]
  }
];
