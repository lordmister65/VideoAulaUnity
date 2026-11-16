import React from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {Aula01, durationFrames} from './scene';
import './style.css';
function App(){return <main><header><p className="eyebrow">PROFESSOR GABRIEL GAMES</p><h1>Unity 2D — Aula 1</h1><p>Prévia animada • Projeto Pixel Adventure</p></header><div className="player"><Player component={Aula01} compositionWidth={1920} compositionHeight={1080} durationInFrames={durationFrames} fps={30} controls style={{width:'100%',aspectRatio:'16/9'}}/></div><p className="note">Simulação educativa da interface da Unity. Versão inicial sem narração; use o player para percorrer as cenas.</p></main>}
createRoot(document.getElementById('root')!).render(<App/>);