
import json, os, subprocess, sys
PART=os.environ.get("PART") or (sys.argv[1] if len(sys.argv)>1 else "lotm-vol3-recap-1")
D="/home/ubuntu/audio-novel-pipeline/out-lotm/"+PART
TITLES={
 "lotm-vol3-recap-1":"Lord of the Mysteries — Volume 3: Traveler · Part 1: The Adventurer",
 "lotm-vol3-recap-2":"Lord of the Mysteries — Volume 3: Traveler · Part 2: Sea God Scepter",
 "lotm-vol3-recap-3":"Lord of the Mysteries — Volume 3: Traveler · Part 3: Marionettist",
 "lotm-vol3-recap-4":"Lord of the Mysteries — Volume 3: Traveler · Part 4: Blood Admiral",
 "lotm-vol3-recap-5":"Lord of the Mysteries — Volume 3: Traveler · Part 5: The Hermit",
 "lotm-vol3-recap-6":"Lord of the Mysteries — Volume 3: Traveler · Part 6: Groselle's Travels",
 "lotm-vol3-recap-7":"Lord of the Mysteries — Volume 3: Traveler · Part 7: Bayam and Amon",
 "lotm-vol3-recap-8":"Lord of the Mysteries — Volume 3: Traveler · Part 8: Grand Finale",
 "lotm-vol4-recap-1":"Lord of the Mysteries — Volume 4: Undying · Part 1: Dwayne Dantes",
 "lotm-vol4-recap-2":"Lord of the Mysteries — Volume 4: Undying · Part 2: The Jacob Vault",
 "lotm-vol4-recap-3":"Lord of the Mysteries — Volume 4: Undying · Part 3: Bizarro Sorcerer Recipe",
}
sc=json.load(open(D+"/_scenes_raw.json"))
WPM=139.5
scenes=[]; tot=0.0; missing=[]
for s in sc:
    words=len(s["narration"].split())
    mp3=D+"/audio/"+s["id"]+".mp3"; real=None
    if os.path.exists(mp3) and os.path.getsize(mp3)>1024:
        out=subprocess.run(["ffprobe","-v","error","-show_entries","format=duration",
                            "-of","csv=p=0",mp3],capture_output=True,text=True).stdout.strip()
        try: real=round(float(out),2)
        except ValueError: real=None
    if real is None: missing.append(s["id"])
    else: tot+=real
    scenes.append({"id":s["id"],"narration":s["narration"],"words":words,
        "estimated_seconds":round(words/WPM*60,2),"real_seconds":real,
        "visual_keywords":s["visual_keywords"],"sound_keywords":s["sound_keywords"],
        "audio_file":"audio/"+s["id"]+".mp3"})
man={"part":PART,"volume":"vol-4" if PART.startswith("lotm-vol4-") else "vol-3","title":TITLES.get(PART,PART),
  "voice":"gemini/gemini-3.1-flash-tts-preview/Puck","language":"id",
  "words":sum(x["words"] for x in scenes),
  "real_duration_minutes":round(tot/60,2),
  "estimated_duration_minutes":round(sum(x["estimated_seconds"] for x in scenes)/60,2),
  "scenes":scenes}
json.dump(man,open(D+"/scenario.json","w"),ensure_ascii=False,indent=1)
with open(D+"/narration.txt","w") as f:
    for x in scenes: f.write("["+x["id"]+"]\n"+x["narration"]+"\n\n")
with open(D+"/keywords.txt","w") as f:
    for x in scenes:
        f.write("["+x["id"]+"] visual: "+", ".join(x["visual_keywords"])+
                " | sfx: "+", ".join(x["sound_keywords"])+"\n")
print(PART,"scenes",len(scenes),"words",man["words"],"real_min",man["real_duration_minutes"],
      "est_min",man["estimated_duration_minutes"],"missing",len(missing),missing[:5])
