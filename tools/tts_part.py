import json,os,urllib.request,sys,time,re
D="/home/ubuntu/audio-novel-pipeline/out-lotm/"+os.environ.get("PART","lotm-vol3-recap-1")
env={}
for ln in open("/home/ubuntu/audio-novel-pipeline/.env"):
    ln=ln.strip()
    if "=" in ln and not ln.startswith("#"):
        k,v=ln.split("=",1); env[k]=v
KEY=env["TTS_API_KEY"]; BASE=env.get("TTS_BASE_URL","https://9router.oryfikry.my.id/v1")
MODEL="gemini/gemini-3.1-flash-tts-preview/Puck"
TMPL=open("/home/ubuntu/audio-novel-pipeline/vol3_style.txt").read()
scenes=json.load(open(D+"/_scenes_raw.json"))
ids=sys.argv[1:] or ["scene-001"]
for s in scenes:
    if s["id"] not in ids: continue
    body=json.dumps({"model":MODEL,"input":TMPL.replace("{TEXT}",s["narration"])}).encode()
    req=urllib.request.Request(BASE.rstrip("/")+"/audio/speech",data=body,
        headers={"Authorization":"Bearer "+KEY,"Content-Type":"application/json"})
    for attempt in range(3):
        try:
            r=urllib.request.urlopen(req,timeout=600); data=r.read()
            if len(data)<1024: raise RuntimeError("tiny response "+str(len(data)))
            open(D+"/audio/"+s["id"]+".mp3","wb").write(data)
            print("OK",s["id"],len(data)); break
        except Exception as e:
            msg=str(e)
            try: msg+=" | "+e.read().decode()[:400]
            except Exception: pass
            print("ERR",s["id"],msg[:500])
            m=re.search(r"reset after (?:(\d+)m )?(\d+)s",msg)
            w=(int(m.group(1) or 0)*60+int(m.group(2))+2) if m else 8
            if attempt<2: time.sleep(w)
