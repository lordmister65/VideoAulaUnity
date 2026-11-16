import React from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {Aula01, durationFrames} from './scene';
import './style.css';
import {PracticeEditor} from './PracticeEditor';
function App(){const [mode,setMode]=React.useState<'pratica'|'video'>('pratica');return <main><header><p className="eyebrow">PROFESSOR GABRIEL GAMES</p><h1>Unity 2D — Aula 1</h1><p>Prévia animada • Projeto Pixel Adventure</p></header><nav style={{display:"flex",gap:10,margin:"18px 0"}}><button onClick={()=>setMode("pratica")} style={{padding:"10px 16px",borderRadius:7,border:0,background:mode==="pratica"?"#3b82f6":"#374151",color:"#fff",cursor:"pointer"}}>Modo prática — Editor Unity</button><button onClick={()=>setMode("video")} style={{padding:"10px 16px",borderRadius:7,border:0,background:mode==="video"?"#3b82f6":"#374151",color:"#fff",cursor:"pointer"}}>Assistir Aula 1</button></nav>{mode==="pratica"?<PracticeEditor/>:<div className="player"><Player component={Aula01} compositionWidth={1920} compositionHeight={1080} durationInFrames={durationFrames} fps={30} controls style={{width:'100%',aspectRatio:'16/9'}}/></div>}<p className="note">Simulação educativa da interface da Unity. Versão inicial sem narração; use o player para percorrer as cenas.</p></main>}
createRoot(document.getElementById('root')!).render(<App/>);