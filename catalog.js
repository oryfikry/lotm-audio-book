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
  },
  {
    id: "vol-3",
    label: "Volume 3",
    parts: [
      {
        id: "lotm-vol3-recap-1",
        label: "Part 1 — The Adventurer",
        file: "data/lotm-vol3-recap-1.js?v=20260908-vol3-part2-1",
        description: "42-scene Vol. 3 opener: Gehrman Sparrow, the White Agate voyage, Bansy Harbor, and Bayam. Narrated with gemini Puck.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioBase: "audio/lotm-vol3-recap-1",
        audioAvailable: true,
        availability: "Audio ready · 42 scenes"
      },
      {
        id: "lotm-vol3-recap-2",
        label: "Part 2 — Sea God Scepter",
        file: "data/lotm-vol3-recap-2.js?v=resume-20260908-1524",
        description: "39-scene continuation: Arrodes on the radio, the dying Sea God Kalvetua, the Rose School assassins, and the scepter that saves Bayam.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioBase: "audio/lotm-vol3-recap-2",
        audioAvailable: true,
        availability: "Audio ready · 39 scenes"
      }
    ]
  }
];
