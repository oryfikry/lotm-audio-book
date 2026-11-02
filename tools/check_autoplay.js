#!/usr/bin/env node
/* Test site's real app.js: default autoplay, scene advance, part boundary, gaps, opt-out. */
"use strict";
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = '/var/www/yt';
function el(id) {
  return { id, _text:'', _attrs:{}, _classes:new Set(), children:[], hidden:true,
    value:'', max:0, src:'', handlers:{},
    get textContent(){return this._text;}, set textContent(v){this._text=String(v); if(id==='h3')this.sceneId=String(v);},
    addEventListener(t,f){(this.handlers[t]=this.handlers[t]||[]).push(f);},
    fire(t,e){return Promise.all((this.handlers[t]||[]).map(f=>f(e||{})));},
    setAttribute(k,v){this._attrs[k]=v;}, getAttribute(k){return this._attrs[k];},
    classList:null, replaceChildren(...x){this.children=x.flat();},
    append(...x){this.children.push(...x);}, prepend(){}, insertBefore(){},
    querySelector(){return null;}, scrollIntoView(){}, play(){this.playing=true;return Promise.resolve();},
    pause(){this.playing=false;}, focus(){} };
}
const nodes=new Map();
function get(sel){
  if(!nodes.has(sel)){const n=el(sel);n.classList={toggle:(k,v)=>v?n._classes.add(k):n._classes.delete(k),add:k=>n._classes.add(k),contains:k=>n._classes.has(k)};
    n.querySelector=q=>q==='h3'?{textContent:n.children.find(c=>c.id==='h3')?.textContent||''}:null;
    nodes.set(sel,n);}
  return nodes.get(sel);
}
const store={};
const ctx={console,window:{addEventListener(){},requestAnimationFrame:f=>f(),innerHeight:800,scrollY:0,scrollTo(){}},requestAnimationFrame:f=>f(),
  MediaMetadata:function(x){Object.assign(this,x);},localStorage:{getItem:k=>k in store?store[k]:null,setItem:(k,v)=>store[k]=String(v)},
  navigator:{clipboard:{writeText:()=>Promise.resolve()}},document:{documentElement:{dataset:{}},querySelector:get,getElementById:id=>get(`#${id}`),createElement:t=>el(t),createDocumentFragment:()=>el('frag'),body:el('body'),title:''},
  URL:{createObjectURL:()=>'',revokeObjectURL(){}},Blob:function(){},TextEncoder:function(){this.encode=s=>Buffer.from(s)},Uint32Array,Uint8Array,DataView,Promise,Number,Math,String,Boolean,JSON,Array,setTimeout,fetch:null};
ctx.self=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT,'catalog.js'),'utf8'),ctx);
ctx.window.LOTM_CATALOG.splice(0,ctx.window.LOTM_CATALOG.length,{id:'vol-3',label:'Volume 3',parts:[
  {id:'lotm-vol3-recap-1',label:'Part 1',file:'data/lotm-vol3-recap-1.js',audioAvailable:true},
  {id:'lotm-vol3-recap-2',label:'Part 2',file:'data/lotm-vol3-recap-2.js',audioAvailable:true}
]});
ctx.fetch=url=>{const file=path.join(ROOT,String(url).split('?')[0]);return Promise.resolve({ok:true,status:200,text:()=>Promise.resolve(fs.readFileSync(file,'utf8'))});};
vm.runInContext(fs.readFileSync(path.join(ROOT,'app.js'),'utf8'),ctx);
let failures=0;function check(label,got,want){const ok=got===want;console.log(`${ok?'PASS':'FAIL'} ${label}: ${JSON.stringify(got)}${ok?'':` (want ${JSON.stringify(want)})`}`);if(!ok)failures++;}
const delay=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 await delay(80);
 const auto=get('#p-auto'), audio=get('#p-audio'), title=get('#p-title'), jump=get('#scene-jump');
 check('autoplay defaults on',auto.getAttribute('aria-pressed'),'true');
 let d=ctx.window.LOTM_DATA, playable=d.scenes.filter(s=>s.real_seconds);
 const setScene=async s=>{jump.value=String(d.scenes.indexOf(s)+1);await jump.fire('change',{target:{value:jump.value}});};
 await setScene(playable[0]); const seq=[title.textContent.split(' ')[0]];
 for(let i=0;i<3;i++){await audio.fire('ended');seq.push(title.textContent.split(' ')[0]);}
 check('advances through scenes',seq.join(','),playable.slice(0,4).map(s=>s.id).join(','));
 await setScene(playable.at(-1)); await audio.fire('ended'); await delay(30);
 check('crosses to next part',audio.src.includes('lotm-vol3-recap-2/scene-001.mp3'),true);
 check('updates active part scene',title.textContent.startsWith('scene-001'),true);
 d=ctx.window.LOTM_DATA; playable=d.scenes.filter(s=>s.real_seconds);
 const saved=playable[2].real_seconds; playable[2].real_seconds=null;
 await setScene(playable[1]); await audio.fire('ended');
 check('skips scene without audio',title.textContent.split(' ')[0],playable[3].id); playable[2].real_seconds=saved;
 auto.fire('click'); check('explicit off persists',store['lotm.autoplayNext'],'0');
 const before=title.textContent; await audio.fire('ended'); check('does not advance when off',title.textContent,before);
 process.exit(failures?1:0);
})().catch(e=>{console.error(e);process.exit(1);});
