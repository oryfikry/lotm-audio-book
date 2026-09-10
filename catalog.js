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
      },
      {
        id: "lotm-vol3-recap-3",
        label: "Part 3 — Marionettist",
        file: "data/lotm-vol3-recap-3.js?v=resume-20260909-1518",
        description: "39-scene continuation: boarding the Golden Dream, Edwina Edwards and Frank Lee, the sunken Elf temple, the mermaid song, and Klein's promotion to Sequence 5 Marionettist.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioBase: "audio/lotm-vol3-recap-3",
        audioAvailable: true,
        availability: "Audio ready · 39 scenes"
      },
      {
        id: "lotm-vol3-recap-4",
        label: "Part 4 — Blood Admiral",
        file: "data/lotm-vol3-recap-4.js?v=resume-20260910-1518",
        description: "37-scene continuation: hunting Blood Admiral Senor aboard the Tree of Flesh, the first humanoid Marionette, the Balam tomb, and Danitz's wardrobe nightmare.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioBase: "audio/lotm-vol3-recap-4",
        audioAvailable: false,
        availability: "Audio ready · 37 scenes"
      },
      {
        id: "lotm-vol3-recap-5",
        label: "Part 5 — The Hermit",
        file: "data/lotm-vol3-recap-5.js?v=resume-20260910-1555",
        description: "Revised 35-scene cut: Cattleya joins the Tarot Club as The Hermit, Roselle's Outer Deities diary, the sunken pyramid and Card of the Tyrant, and the Black Tulip standoff.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioBase: "audio/lotm-vol3-recap-5",
        audioAvailable: false,
        availability: "Audio 17/35 · quota pending"
      },
      {
        id: "lotm-vol3-recap-6",
        label: "Part 6 — Groselle's Travels",
        file: "data/lotm-vol3-recap-6.js?v=20260909-vol3-part6-1",
        description: "33-scene continuation: the sealed book world, the cross-era heroes Groselle, Longsan, Mobius and Snowman, the Frost Dragon King, and the farewell as time resumes.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioBase: "audio/lotm-vol3-recap-6",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol3-recap-7",
        label: "Part 7 — Bayam and Amon",
        file: "data/lotm-vol3-recap-7.js?v=20260909-vol3-part7-1",
        description: "34-scene continuation: Bayam, the new Sea God faith, Amon's Time Worm intrusion, the Tarot Club meeting, Danitz's farewell, and Klein's departure for Backlund.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioBase: "audio/lotm-vol3-recap-7",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol3-recap-8",
        label: "Part 8 — Grand Finale",
        file: "data/lotm-vol3-recap-8.js?v=20260909-vol3-part8-1",
        description: "26-scene finale: the White Pelican voyage, Pritz Harbor, Klein's divination and artifacts, the Dwayne Dantes transformation, and his arrival in Backlund.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioBase: "audio/lotm-vol3-recap-8",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      }
    ]
  },
  {
    id: "vol-4",
    label: "Volume 4 — Undying",
    parts: [
      {
        id: "lotm-vol4-recap-1",
        label: "Part 1 — Dwayne Dantes",
        file: "data/lotm-vol4-recap-1.js?v=20260910-vol4-part1-1",
        description: "30-scene canonical opener: Dwayne Dantes arrives in Backlund, builds his household, enters the Evernight social circle, and establishes his position among Backlund's elite.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol4-recap-2",
        label: "Part 2 — The Jacob Vault",
        file: "data/lotm-vol4-recap-2.js?v=20260910-vol4-part2-final-canonical-3",
        description: "31-scene final canonical continuation: the Mayfair Club, Enuni, Hazel's mutant rat, the Jacob family vault, Amon's curse, Azik's warning, Tarot Club intelligence, Red Gloves, Leonard, and the Bizarro Sorcerer plan.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol4-recap-3",
        label: "Part 3 — Bizarro Sorcerer Recipe",
        file: "data/lotm-vol4-recap-3.js?v=20260910-vol4-part3-canonical-1",
        description: "29-scene canonical continuation: the aristocratic hunt, Emlyn's pursuit of Ernes Boyar, the Red Gloves inspection, Klein's meeting with Leonard, Hazel's rat mentor, and the Bizarro Sorcerer formula.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      }
    ]
  }
];
