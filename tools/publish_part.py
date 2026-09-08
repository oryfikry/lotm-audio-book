
import json, os, shutil, sys
PART=os.environ.get("PART") or (sys.argv[1] if len(sys.argv)>1 else "lotm-vol3-recap-1")
SRC="/home/ubuntu/audio-novel-pipeline/out-lotm/"+PART
DST="/var/www/yt"
d=json.load(open(SRC+"/scenario.json"))
ad=DST+"/audio/"+PART
os.makedirs(ad,exist_ok=True); os.makedirs(DST+"/assets/"+PART,exist_ok=True)
copied=0
for s in d["scenes"]:
    f=SRC+"/audio/"+s["id"]+".mp3"
    if os.path.exists(f) and os.path.getsize(f)>1024 and s.get("real_seconds"):
        shutil.copy2(f, ad+"/"+s["id"]+".mp3"); copied+=1
for f in ("narration.txt","keywords.txt"):
    shutil.copy2(SRC+"/"+f, DST+"/assets/"+PART+"/"+f)
payload={"part":PART,"title":d["title"],"voice":d["voice"],
 "totalMinutes":d["real_duration_minutes"],
 "scenes":[{k:s[k] for k in ("id","narration","estimated_seconds","real_seconds",
   "visual_keywords","sound_keywords","audio_file") if k in s} for s in d["scenes"]]}
open(DST+"/data/"+PART+".js","w",encoding="utf-8").write(
  "window.LOTM_DATA = "+json.dumps(payload,ensure_ascii=False)+";\n")
print(PART,"copied",copied,"of",len(d["scenes"]),"min",d["real_duration_minutes"])
