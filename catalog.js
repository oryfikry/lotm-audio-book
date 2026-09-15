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
        label: "Part 1 — Kembalinya ke Backlund & Debut Dantès",
        file: "data/lotm-vol4-recap-1.js?v=20260911-vol4-15part-1",
        description: "21-scene canonical opener (ch. 733–746): Klein returns to Backlund, sells his bike shares, investigates the Williams Street ruins with Sharron, and Dwayne Dantès is born — butler interviews, 160 Böklund Street, the Roselle diary page, and the Tarot Club's biggest sale.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol4-recap-2",
        label: "Part 2 — Sang Butler, Buku Harian & Misa Agung",
        file: "data/lotm-vol4-recap-2.js?v=20260910-vol4-part2-final-canonical-3",
        description: "Placeholder — naskah 15-part Part 2 (ch. 747–760) sedang diproduksi; entri ini memuat data lama sementara.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "In production"
      },
      {
        id: "lotm-vol4-recap-3",
        label: "Part 3 — Nation Reestablishment Society",
        file: "data/lotm-vol4-recap-3.js?v=20260910-vol4-part3-canonical-1",
        description: "Placeholder — naskah 15-part Part 3 (ch. 761–774) sedang diproduksi; entri ini memuat data lama sementara.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "In production"
      },
      {
        id: "lotm-vol4-recap-4",
        label: "Part 4 — Pembunuhan Karakter & Akhir Buku Harian",
        file: "data/lotm-vol4-recap-4.js?v=20260911-vol4-part4-2",
        description: "21-scene canonical (ch. 775-788): Trissy's lead on Viscount Stratford, infiltrating Mr. X's gathering above the mist, the Oracle's death by a single shot, Uskup Elektra's hospital visit, the Portland Moment party and the 'karakter' murder of Sherlock Moriarty, Hazel in the garden, Dorian's warning, and the secret passage to the party congress.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol4-recap-5",
        label: "Part 5 — Tamu Tak Terduga & Tim Arkeologi",
        file: "data/lotm-vol4-recap-5.js",
        description: "19-scene canonical (ch. 789-802): Roselle's final diary pages ('All the mausoleums have been built... beware of the moon!'), Fors's Leymano's Travels rental business, Ma'am Mary's Coim Company share offer, Emlyn's vampire hunt (two charred heads, Lilith's Ring), the Keeper's corruption at Saint Samuel Cathedral, and Klein cleansing his tainted soul with the Mental Terror Candle and Sea God Scepter.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol4-recap-6",
        label: "Part 6 — Ekspedisi Pulau: Kekuatan Tyrant",
        file: "data/lotm-vol4-recap-6.js",
        description: "18-scene canonical (ch. 803-814): Lilith's Ring and the Sanguine champion, the Hartlarkh archaeology tragedy and the mind dragon, meeting Alger at the Bayam cemetery, the primitive island expedition — the demigod feathered serpent, the Illusory Chime Tree, Alger's dreadful singing, the black baboon of Disorder, the cathedral ruins, the forbidden catacomb painting (the three Kings of Angels devouring the Creator), the six-winged gargoyle battle, the Tyrant Card of Blasphemy, and the island that vanished.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol4-recap-7",
        label: "Part 7 — Sidik Jiwa & Pergerakan Malam",
        file: "data/lotm-vol4-recap-7.js",
        description: "20-scene canonical (ch. 815-828): after-action review of the Tyrant card and the Twilight Hermit Order deduction, Fors's Interrogator transaction, Dantès's first ball, Will Auceptin and the too-sweet ice cream, the dream trap for Hazel, Trissy next door to Xio, the stolen thoughts of the sewer demigod, the Tarot Gathering that shattered Derrick's faith, and the poetic meeting with Queen Mystic.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol4-recap-8",
        label: "Part 8 — Kota Berkabut: Pencurian Antigonus",
        file: "data/lotm-vol4-recap-8.js",
        description: "16-scene canonical (ch. 829-842): the perfect infiltration of Saint Samuel Cathedral's Chanis Gate, the erasing angel, the foggy town prison of the Goddess, Lady Despair Panatiya and the death of Wraith Senor, Mr. A surviving as a shadow, the hanging-corpse cathedral, Zaratul's projection from history, the Antigonus bloodline revelation, the three-killers stand-off, Panatiya's betrayal — and the Sequence 0: The Fool card at the throne of maggots.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol4-recap-9",
        label: "Part 9 — Formula Bizarro Sorcerer",
        file: "data/lotm-vol4-recap-9.js",
        description: "14-scene canonical (ch. 843-856): the magical mushroom battle, the escape via the Dark Sacred Emblem, the upgraded seven-soul Creeping Hunger, the verified Bizarro Sorcerer formula and its demigod-killing performance ritual, Saint Anthony's investigation, Red Gloves closing in, Leonard's brilliant deduction to the empty grave of Klein Moretti, the dream confrontation and unwritten truce, the arms-dealing confession, Baron Syndras's offer, Xio and Fors as secret bodyguards — and the Cuarón suicide trap.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol4-recap-10",
        label: "Part 10 — Bisnis Baru & Laporan ke Atasan",
        file: "data/lotm-vol4-recap-10.js?v=20260913-canonfix-1",
        description: "12-scene canonical (ch. 857-870): the Cuarón trap and the mastermind behind Baron Syndras, the 15,000-pound charity donation and the Loen Charity Bursary Foundation, the runaway-horse assassination attempt on Macht, the mushroom negotiations with Creeping Hunger, the charity party where Mr. World and Miss Justice finally stand in the same hall, Earl Hall's 10,000-pound check, the Roselle diary 'Home' (故乡) pages and Bernadette's protective symbols, the Tarot Gathering revelation that Dwayne Dantès is a shared identity, and the mirror-exorcism of the Marauder demigod rat.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol4-recap-11",
        label: "Part 11 — Amon Datang & Pencurian Mumi",
        file: "data/lotm-vol4-recap-11.js?v=20260913-part11-audit",
        description: "12-scene canonical (ch. 871-886, ~68 min): the charred Marauder-demigod rat and Arrodes's silver lightning, Dantès takes the bursary foundation director seat with two reform proposals, Vice Admiral Iceberg briefs Danitz on West Balam, Daly mediumship plus Leonard cracks the frame-up logic behind Cuaron's suicide, Sharron's letter on the Tutanssess II mummy, Blasphemer Amon arrives in Backlund hunting believers of The Fool, Arrodes interrogates the Chained God and the Mother Tree of Desire, the Pritz Harbor heist under demigod noses, the soil-into-Groselle's-Travels trick, Sharron's letter on Spirit World Plunderers and Calderón City, the Red Gloves meeting and Amon stealing Zatwen's glove.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready \u00b7 audio pending"
      },
      {
        id: "lotm-vol4-recap-12",
        label: "Part 12 \u2014 Peringatan & Probe Daly",
        file: "data/lotm-vol4-recap-12.js?v=20260914-part12-restyle",
        description: "12-scene canonical (ch. 887-900): Will Auceptin warns Amon hates the True Creator while Ouroboros stays loyal, the Black Emperor-pathway demigod at Veterans Mess, Richardson volunteers Dutanese, Arrodes on the Mother Tree of Desire, Ignore Him warning to the Tarot Club, Roselle diary Neither answer on the soul homeland, Calder\u00f3n City commission and the ancient wraith, Hvin Rambis and Qonas Kilgor named, mausoleum hair-plants, Danitz meets Anderson Hood in Behrens, Leonard stares on airship 1345, Daly probes Dantes plus Azik letter on Spirit World Plunderers and Aiur Moria, Colin tests The Fool ritual, Berserk Sea spirit world, Black Emperor vs Pritz, and the Ferryman boat.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready \u00b7 audio pending"
      },
      {
        id: "lotm-vol4-recap-13",
        label: "Part 13 \u2014 Peringatan Leonard & Jalur Makam",
        file: "data/lotm-vol4-recap-13.js",
        description: "6-scene canonical (ch. 901-906, ~45 min): Azik's copper-whistle projection divination and the mutated paper figurine, Colin vs the feathered former Chief, Alger's Sonia wine visit and the cellar whispers controlling Artisan Cielf, the scholar-type bishop and Anderson's two-year reading list, the scarfed passenger and Ince Zangwill's trail on Waypoint Island, Leonard's warning and the 0-08 hint.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready \u00b7 audio pending"
      },
      {
        id: "lotm-vol4-recap-14",
        label: "Part 14 \u2014 Umpan Winner & Panggilan Mausoleum",
        file: "data/lotm-vol4-recap-14.js",
        description: "6-scene canonical (ch. 907-914): coffin-city Kolain and the first marionette Oaf, the Ulika raid at 13 Canine Street with Soest's grade-1 sunlight, capturing Enzo the Winner via Flesh Bomb, the Monster pathway lore (Sequence 9 Monster to Sequence 5 Winner), the self-viewing strange scene plus Artisan Cielf's origins, Azik sealing Creeping Hunger, Ludwell's one-year marionette oath, and the calling deep inside the mausoleum.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready \u00b7 audio pending"
      },
      {
        id: "lotm-vol4-recap-15",
        label: "Part 15 \u2014 Kota Calder\u00f3n & Tubuh Jiwa Sejati",
        file: "data/lotm-vol4-recap-15.js",
        description: "8-scene canonical (ch. 915-929): Azik's past life as Baron Lamud and the feathered serpent other-self, the three choices and golden-bird soul split, the 0-17 Angel of Concealment telegram, Dantes meets Leonard and Pallez with Fate Siphon charm, Calderon City origins under Death Gregrace, the Sea God domain ritual with mushroom and fish, Groselle's rescue and Cattleya's letter, the rotating-city raid vs Spirit World Plunderer, and the True Soul Body kill for the Bizarro Sorcerer ritual.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready \u00b7 audio pending"
      },
      {
        id: "lotm-vol4-recap-16",
        label: "Part 16 \u2014 Pentas Akhir Revival Square",
        file: "data/lotm-vol4-recap-16.js",
        description: "9-scene canonical (ch. 930-946): Ince Zangwill possessed by the Red Angel evil spirit, the Goddess revelation and Fate Siphon charm, Derrick's Nois City bait with the Spirit World Plunderer soul, Arrodes and Will Ceres naming Medici, Leonard and Daly's Hunter-path deduction, Anderson's chrysalis and Ouroboros at Cookawa, the deity's curse of Misfortune, the Fate swap via Creeping Hunger and Lightning Storm, and Klein's Bizarro Sorcerer advancement dance with Dunn.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready \u00b7 audio pending"
      }
    ]
  }
];