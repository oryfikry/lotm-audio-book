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
        file: "data/lotm-vol3-recap-5.js?v=resume-20260919-1504",
        description: "Revised 35-scene cut: Cattleya joins the Tarot Club as The Hermit, Roselle's Outer Deities diary, the sunken pyramid and Card of the Tyrant, and the Black Tulip standoff.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioBase: "audio/lotm-vol3-recap-5",
        audioAvailable: false,
        availability: "Audio ready · 35 scenes"
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
  },
  {
    id: "vol-5",
    label: "Volume 5 \u2014 Red Priest",
    parts: [
      {
        id: "lotm-vol5-recap-1",
        label: "Part 1 \u2014 Kunjungan Pulang & Kastil Kuno",
        file: "data/lotm-vol5-recap-1.js",
        description: "8-scene canonical (ch. 947-960): Mr. A's death and the East Borough murder, Audrey's therapy of Gehrman Sparrow and the transmigrator hypothesis, Xio's witness quest for the MI9 confession, Sharron's secret-guard deal, the drawing of the Black Emperor card and the exiled ancients, Groselle's small world with its black door, the strange abandoned castle of Nast the sage-artisan, doors and dreams in Backlund, and the Tarot Club labeling of Tinder plus Adam one step from the divine throne.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready \u00b7 audio pending"
      },
      {
        id: "lotm-vol5-recap-2",
        label: "Part 2 \u2014 Peringatan Adam & Malaikat Baru",
        file: "data/lotm-vol5-recap-2.js",
        description: "13-scene canonical (ch. 961-973): the Tarot warning about Adam and the Red Angel return, Pallez on Medici's death and the Blood Emperor, the arms deal and the sprung crisis, the railway ride and the Revelation doll, the angel's descent and Duke Olmer's Rose School mission, Audrey's donation talent and the Dreamwalker formula, the Black Emperor's restraint and Nast's memories of Roselle, and the new twelve-winged angel before Hvin Rambis.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready \u00b7 audio pending"
      },
      {
        id: "lotm-vol5-recap-3",
        label: "Part 3 \u2014 Zealot, Khotbah & Parasite",
        file: "data/lotm-vol5-recap-3.js",
        description: "10-scene canonical (ch. 974-983): Hvin Rambis infiltrates Audrey's mind world and plants hypnosis, Dwayne Dantes returns to Backlund, Patrick Bryan of the Numinous Episcopate receives the Artificial Death revelation, Klein's first sermon on literacy, the Trissy contact via rat puppet and the feathered-serpent gift, Leonard on parasite targets with Pallez, Hazel's decision, and the Bizarro Sorcerer vs Marauder Parasite battle ending with Amon's avatar.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready \u00b7 audio pending"
      },
      {
        id: "lotm-vol5-recap-4",
        label: "Part 4 — Respon Aktif, Operasi Gabungan & Berkah Kerahasiaan",
        file: "data/lotm-vol5-recap-4.js",
        description: "Full-flow rewrite 10 scene (ch. 984-993, 1 scene per bab): Red Priest card plus Paper Angel war-shield after the Amon encounter, secret conclave with Leonard and Pallez Zoroast plague-like parasitism lecture, Tarot Gathering with warehouse clearance and Emlyn's Sanguine test confession, four-step deception joint operation against Ernes Boyar by mentor Alger, Audrey inner-fear talk, Will Auceptin dream and unanswered ritual, Arianna Servant of Concealment with the Evernight emblem, Arrodes fireworks revealing Zaratul's disappearance and Control Spirit Bullets.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol5-recap-5",
        label: "Part 5 — Dewa Judi Dwayne & Eliminasi Avatar Amon",
        file: "data/lotm-vol5-recap-5.js",
        description: "Full-flow rewrite 15 scene (ch. 994-1008, 1 scene per bab): Reinette letter on Blessed of Concealment and Fate, Emlyn recruits Ian Wright for Ernes Boyar and Rose School of Thought, conjoined Cielf in Bayam, Gambling God Dwayne wins blind at Texas Hold'em against Admiral Amyrius and Qonas Kilgor, Saint Hierländ Square punishment operation from First Movement to Ritornello forcing Ernes Boyar into Harvest Church, gray-rat Amon at 39 Boklund, four-movement battle where Amon steals six powers before Will Auceptin's Reboot and Leonard's stone-clock banishment, Audrey heals the parasitized, Worms of Time split for Arianna and Pallez, and the hidden Jacob family treasure.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol5-recap-6",
        label: "Part 6 — Peringatan Roselle, Pawai Perang & Maygur Manor",
        file: "data/lotm-vol5-recap-6.js",
        description: "14-scene canonical (ch. 1009-1022, 1 scene per bab): Pallez names the giant serpent as Sequence 1 Snake of Fate under Mr. Fool, Emlyn flexes viscount rank on Ernes, Bernadette reveals nine Black Emperor mausoleums and Roselle's warning to beware the Spectator, Klein's Yesterday Once More charm confirms his transmigration cocoon above the light door, club-wide growth (Fors Scribe, Alger Sequence 6, Derrick Priest of Light ritual, Cattleya hidden demigod), Audrey tasked to map nobles' war stance as March of War looms, Numinous Episcopate ritual to heal angel Haiter, Maygur Manor opening hunt with secret-departing Qonas Kilgor tailing into the Tussock south bank, Xio reunites with Sherman now Shermane, and the bronze cross trap devours Trissy before the loyalty answer: His Majesty.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol5-recap-7",
        label: "Part 7 — Reruntuhan No. 1, Pemurni Kuat & Jadilah Terang",
        file: "data/lotm-vol5-recap-7.js",
        description: "14-scene canonical (ch. 1023-1036, 1 scene per bab): Viscount Stratford's final words explode into a blood-red firework, Klein concludes King George III III stands behind the Great Smog, Arrodes maps Earl of The Fallen's full arsenal, the Maygur Manor demigod battle of random anomalies ends with Parasite and Deceit bullets, the soul interrogation reveals Ruins No. 1 of the Blood Emperor under Sterlewen with Prince Grove and Duchess Georgina, the joint three-archbishop raid with Arianna returns empty and Klein theorizes the ruins are imagined, the Unshadowed Crucifix opens a screen to the City of Silver Creator with Let There Be Light and the word Mysteries, Audrey receives the George III report, and Roselle's diary page exposes the Spectator's godhood ritual: making the era follow one's expectations.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol5-recap-8",
        label: "Part 8 — Masalah Gehrman, Dreamwalker & Ujian Audrey",
        file: "data/lotm-vol5-recap-8.js",
        description: "14-scene canonical (ch. 1037-1050, 1 scene per bab): The Tarot Club learns Silver City may hold an adult mind-dragon brain for Audrey's Dreamwalker potion, Gehrman's Church of Evernight intel exposes George III and a traitor among the three Churches' upper echelons, Pallez confirms the Angel King Adam seized the second Blasphemy Slate, Derrick reports the Creator's relic to Colin Iliad, Sharon reveals Reinette Tinekerr is her angel mentor, the Sanguine hunt targets the Rose School stronghold and Lilith's sacred artifact, Trissy discovers Gehrman's messenger is an angel, Xio baits the king's faction inside a controlled dream, and Hvin Rambis hypnosis ambush on Audrey reverses into her own trap via the Fate Siphon charm, Manor Under the Moon, and a burning feather - ending with Gehrman Sparrow arriving under a giant red moon.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol5-recap-9",
        label: "Part 9 — Naga Spectator, Presiden & Mimpi Zaman Kuno",
        file: "data/lotm-vol5-recap-9.js",
        description: "14-scene canonical (ch. 1051-1064, 1 scene per bab): Hvin Rambis unleashes his incomplete Mythical Creature dragon form but falls into Klein's prepared trap - Lightning Storm, Slow, double Magnify through marionette Qonas Kilgor, and Control Spirit Bullets defeat the Mind Plague he planted, making the demigod a marionette. Arianna's interrogation extracts the three great contracts limiting kings, the tide-trend of world war pushed by the Twilight Hermit Order, and the identity of the Psychology Alchemists' president: Pirate King Barros Hopkins. The Manipulator characteristic becomes Audrey's Dreamwalker potion, the Botol Perbudakan mutates, the Sanguine raid hits an empty trap under a corrupted Blood Moon authority, and the first Groselle's Travels dream expedition meets hermit Snowman, the eight King of Angels canon, and Mobet Zoroast in the Fourth Epoch.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol5-recap-10",
        label: "Part 10 — Pengembara Kosmos, Hall of Truth & Empat Pilihan",
        file: "data/lotm-vol5-recap-10.js",
        description: "14-scene canonical (ch. 1065-1078, 1 scene per bab): Mobet Zoroast unrolls the Solomon Empire's history - Worm of Time, the three ducal families, Bethel Abraham's cosmos travels and its three laws - while the elf dream reveals King Soniathrym's betrayal charge against Aurmir and the deaths of the ancient gods' supporters including Salinger and Auernia. The expedition crosses the collective unconscious sea, finds sunken Liveseyd - possibly imagined twice - enters the Hall of Truth where thoughts echo aloud, discovers 0-08's feather quill murals, and is repelled by the bronze door behind the throne where countless eyes open. Arianna-verified secrets, Arrodes confessing it came from underground, Dorian's Traveler inheritance for Fors, Botis stalking Backlund, and Derrick choosing among four Sealed Artifacts round out the part.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol5-recap-11",
        label: "Part 11 — Malaikat yang Kembali, Perang & Orang Konyol",
        file: "data/lotm-vol5-recap-11.js",
        description: "14-scene canonical (ch. 1079-1092, 1 scene per bab): Silver City trades for the Creator's Unshadowed Crucifix as Colin accepts his punishment, Life's Cane turns Dwayne Dantes' garden into a midnight forest tended by faceless gardeners, and Klein discovers his Bizarro Sorcerer acting key - horror film director. The fake Angel Embrace ritual lets Klein impersonate the sleeping Artificial Death, only for Sauron Einhorn Medici to return as a Gatekeeper assistant. Klein makes pirates his first horror film cast just as Feysac's air fleet bombs Backlund and the kingdom declares war. A parlor conversation with the Red Angel exposes George III's Black Emperor mausoleum plan and the seven gods' ambiguous stance, the war claims Melissa's university, Klein stars as the midnight Gardener healing hospitals, an Iron-blooded Knight admiral flees after a faceless knock, and Bernadette Gustav agrees to ally with Gehrman Sparrow against George III - two fools against the tide.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol5-recap-12",
        label: "Part 12 — Empat Kemungkinan, 1368 & Nubuat Bulan",
        file: "data/lotm-vol5-recap-12.js",
        description: "14-scene canonical (ch. 1093-1106, 1 scene per bab): Gehrman Sparrow and Queen Mystic Bernadette forge a secret alliance with four paths against George III - sabotage, assassination, Roselle's revival, or inaction - and the Tarot Club learns the Spectator prophecy: Adam's potion ritual brews whenever the era follows his imagination, and the world war is his design. Derrick's team departs for Afternoon Town as Elder Lovia covets the Creator's crucifix; Xio collects her MI9 bounty while the gold-masked agent reveals the Church of Evernight secretly consented; Bartz is captured twice by the hunter duo who then obtain the mirror-contact to Vice Admiral Ailment. Audrey hypnosis-erases six hours on Theros as her contribution, then heals the mad Mythical Creature demigod Lucca Brewster who reveals the Knowledge God's prophecy of apocalypse in year 1368. Roselle's complete diary exposes his Knowledge Emperor ascension, the red moon landing plan, the second Blasphemy Slate contradiction, and the unnamed island of cosmic corruption as the ninth mausoleum - and Bernadette agrees: two fools against the tide.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol5-recap-13",
        label: "Part 13 — Perburuan Putri, Nenek Moyang & Aula Raja",
        file: "data/lotm-vol5-recap-13.js",
        description: "14-scene canonical (ch. 1107-1120, 1 scene per bab): Gehrman Sparrow isolates Vice Admiral Ailment Tracy aboard the Black Death and learns the target is Katarina - her own mother who was once her father; a midnight stakeout at Bell of Order ends with the Red Angel slaughtering Katarina inside the mirror world while Klein watches, and the soul-channeling of the surviving Demoness reveals the eight mausoleums guarded by Hand of Order William I and Balancer Dlink Augustus plus the Red Priest Conqueror characteristic. The Silver City expedition enters Giant King Court - two Silver Knight demigods guard the gate, the Waning Forest yields giant ghost Aurmir and human-sized skeletons of the Giant King's parents, Joshua self-strangles under True Creator's watching gaze, and the blood-red table hall exposes the eleven-member Rose Redemption including six of today's seven gods. Court Chaser leader Light Culler Murskogan awakens before the sealed door of sleeping Lord Sasrir.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol5-recap-14",
        label: "Part 14 — Kematian Pemburu, Jamur Frank & Pintu dari Segala Pintu",
        file: "data/lotm-vol5-recap-14.js",
        description: "14-scene canonical (ch. 1121-1134, 1 scene per bab): Light Culler Murskogan falls as Colin Iliad breaks the life-bound statues, dying with a final cry of 'Raja...' while his soul gifts Klein the Silver Knight ritual from the first Blasphemy Slate and the truth that the door never opened after Sasrir entered; Chief Colin asks Derrick's opinion for the first time and warns 'Hati-hati dengan Lovia.' Amon grazes Hazel on Böklund Street while his familiars whisper 'Untuk Parasit... Untuk Bukan Parasit'; Will Auceptin explains the three ways to accommodate a Uniqueness; Klein pays for Scholar of Yore ingredients with Life's Cane; Hounds of Fulgrim wag their tails and offer their own eyes - revealing Sefirah Castle is the gray-fog space itself. Emlyn joins Utravsky in 'perlindungan tahanan'; Frank Lee's eleven edible mushrooms reach Silver City for the price of the Classical Metallurgist formula; the Tarot Club learns Rose Redemption was co-founded by Goddess Evernight Amanises and that humans are the ancestors of giants. On the full moon, Trissy contacts Mr. Door - the Great Door of All Doors - who reveals the secret mausoleum symbol mixing the blood of all twenty-two pathways, and a liberation ritual demanding demigod sacrifices from Seer, Apprentice, and Marauder.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol5-recap-15",
        label: "Part 15 — Scholar of Yore & Ritual Black Emperor (Final)",
        file: "data/lotm-vol5-recap-15.js",
        description: "Final part of Volume 5 - 16-scene canonical (ch. 1135-1150, 1 scene per bab): Frank Lee's mushrooms feed all of Silver City while Klein finishes digesting the Bizzaro Sorcerer potion; Arrodes reveals Sefirah Castle is one of nine entities left by the original Creator and Sasrir was born from the Ancient Sun God's rib. On a deserted Berserk Sea island Klein brews and drinks the Scholar of Yore potion, journeying through the mist of history past every era back to the meadow where Giant King Aurmir buried his parents - and the word 'Sefirah Castle' echoes through Amon's monocular, the Abraham apartment, and old Pallez Zoroast. Klein forges his honorific name, loans the Master Key from the Historical Void, collects blood from Sharron, and with Trissy's Shermane blood completes all twenty-two pathways. A divination screams danger - he cancels the Mr. Door ritual - but 0-08, pulled from the Historical Void, writes the 'natural development' that baits nobody: George III swaps himself with an illusion mid-speech and drinks the Black Emperor potion in Ruins No. 1. Three arrows fire at once - Death Consul Azik's projection, Klein under the Tussock River, Trissy at Ruins No. 1, Queen Mystic wielding 0-05's second wish - until Zaratul's true body springs the real trap and Adam appears inside the Hall of Truth asking whether Klein can accept a world war. George III explodes on the podium, Trissy smothers the chaotic shadow with serpent hair, Klein outruns the tide of Zaratul's transparent worms through eras of history, and Arianna's real body buys him his escape - only for the lost puppet Enuni to be sitting in his hotel room, crystal monocle rising to its eye. Amon. (End of Volume 5 - Red Priest.)",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
    ]
  },
  {
    id: "vol-6",
    volume: "Volume 6",
    label: "Volume 6 — Lightseeker",
    parts: [
      {
        id: "lotm-vol6-recap-1",
        label: "Part 1 — Parasit, Error & Chernobyl",
        file: "data/lotm-vol6-recap-1.js",
        description: "Volume 6 opening - 16-scene canonical (ch. 1151-1166, 1 scene per bab): Amon's deep parasitization leaves Klein a statue in his own body; the deal for Sefirah Castle is exposed as a trap - agreeing means Klein must personally grant permission above the gray fog, and the 'agreement' itself is the switch. Amon steals the day of the god-warring ruins, drags Klein through dream short-cuts past the golden sea of the Ancient Sun God's final dream, and enters the Forsaken Land of the Gods - where the real body has been waiting all along. Klein's escape attempts stack hope upon heartbreak: the 100-marionette Reinette gamble, throwing Master Key and Scarlet Lunar Corona into Mr. Door's light door, the queue-memory trick that summons Zaratul in one try, Arianna's bone sword, and five angel projections raining on Amon - all stolen and redirected onto Medici's knight by a clock of Worms of Time. Meanwhile Silver City loses prayer contact, Queen Mystic's Clairvoyant reads 'darkness devours light, only a sliver of hope remains', and the walk ends at a buried white building whose ancient name Amon stole from Earth: Chernobyl.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol6-recap-2",
        label: "Part 2 — Jangkarku & Kebangkitan",
        file: "data/lotm-vol6-recap-2.js",
        description: "16-scene canonical (ch. 1167-1182, 1 scene per bab): Amon's Chernobyl reveal detonates Klein's greatest realization - this world IS Earth, the stars are wrong, and 'beware the moon' was never a random prophecy - and the moment his relationship with Sefirah Castle deepens, Amon springs the true trap: the whole journey was a gift of time to digest the potion, and the 'body' that walked beside Klein all along was another puppet. Bladel's twilight sword and the Goddess's secret grip on Artificial Death slam the gray-fog door shut; Klein reaches Sefirah Castle, kills himself with Sea God lightning, and claims 'Inilah jangkarku' - one resurrection left, three days to escape. The Tarot Club reunion reads every truth wrong in the right direction; George III's death is explained as seven gods' silent consent vetoed by Mr. Fool; the hunting party for Saint of Secrets Botis assembles (Cattleya, Fors the bait, Audrey if she digests Dreamwalker); Colin Iliad becomes Silver Knight under The Fool's blessing; a Deceit bullet plus the Castle's angel-level power fools the rules into a fake respawn point - Derrick's vial births Gehrman Sparrow anew. Will Auceptin's silver snake exposes the six-Miracle-Invoker quota and the vanished third Attendant of Mysteries; Aurora Order enters the agenda again; and in the dead theater of ancient Nois, Angel of the Evil Word Steph answers words with words - until 'Leodero!' - and a charred corpse rises wearing a crystal monocle on the wrong eye: 'Maaf, aku memakainya di sisi yang salah.'",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol6-recap-3",
        label: "Part 3 — Perburuan Saint of Secrets",
        file: "data/lotm-vol6-recap-3.js",
        description: "16-scene canonical (ch. 1183-1198, 1 scene per bab): Klein discovers his best advantage is being WEAK - bait for the Dark Demonic Wolf Kotar, whose habits the Evernight Goddess reveals while Amon haunts every hiding spot one step ahead; a Game-of-Mischief offer (trade Miracle Invoker characteristic for the Castle) is refused. Queen of Calamity Cohinem rises from a dream-song: elf blood, a demigod promise, a golden wine cup that seals the deal, and the lost Western Continent that will re-emerge at the apocalypse. The Club levels up - Fors survives the Scribe 'class' and Traveler ritual; Audrey drinks Manipulator amid ten thousand grieving hearts at Winter Gifts Day ('Susie, aku masih bisa merasakan kesedihan mereka'); Xio wears the Paranormal Court bench; Cattleya receives prepaid Mysticism. The Botis hunt assembles: a fabricated Mr. Door letter hooks Dorian Gray Abraham, Miss Magician leaks Abraham ties at gatherings, Leonard pressures Aurora Order, and Judgment pins a Prohibition - until Saint of Secrets springs the Box of the Great Old Ones, a Class-0 jewelry box from an angel who died mid-scream. Cinderella, The Little Match Girl, the Betrayal Feast, The Ugly Duckling, the Horn of Destruction, Spear of Longinus, Reboot of Fate, and Audrey's Mental Plague collide in a demonic fairytale duel - ending with Botis catching the box to open its THIRD level.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
      {
        id: "lotm-vol6-recap-4",
        label: "Part 4 — Kotak yang Tidak Menguntungkan",
        file: "data/lotm-vol6-recap-4.js",
        description: "16-scene canonical (ch. 1199-1214, 1 scene per bab): Box of the Great Old Ones kills its own master - Botis dies before the third level, eyes frozen in terror, and Cattleya sacrifices the Class-0 artifact to Mr. Fool in ten seconds. Klein decodes the box (24-hour toy curse, random Exile recordings, 'do not ask, describe, or touch'), numbers it 0-61, and the loot split hands Fors Botis's eyes, Xio the Traveler's Bag, and Cattleya the Secrets Sorcerer characteristic. Backlund's four demigods find the Hermit card and name the tarot-code organization 'Klub Tarot' - Leonard leads the hunt while Kisma repents and Dorian Gray learns his student's circle killed the Saint. Then the true body: Amon springs the Jacob-vault trap after 1,000 years, takes Pallez Zoroast's Sequence-1 characteristic, and slips out under the Lord of Storms' thunderfall through the death-cathedral door - the godhood ritual 'to replace another' begins. Dorian wagers his life on faith; the red moon passes silent, Planeswalker is traded, and its advancement ritual demands legends left in nine places beyond the planet. In the Forsaken Land, Moon City's hunters meet a lantern-carrying 'missionary': Unshadowed Crucifix and Life's Cane purge generations of poison, the 3,722-year vigil of the white-gray mist is revealed, and the ritual finally answers - a thousand voices calling 'The Celestial Worthy of Heaven and Earth for Blessings'.",
        voice: "gemini/gemini-3.1-flash-tts-preview/Puck",
        audioAvailable: false,
        availability: "Script ready · audio pending"
      },
    ]
  }
];
