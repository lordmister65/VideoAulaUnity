import React, {useEffect,useMemo,useRef,useState} from 'react';
import './practice.css';

type Object2D={id:string;name:string;x:number;y:number;rotation:number;sx:number;sy:number;color:string;shape:'square'|'rect';visible:boolean;collider:boolean;rigidbody:boolean};
const initial:Object2D[]=[
 {id:'player',name:'Personagem',x:-1.5,y:0.2,rotation:0,sx:1,sy:1,color:'#3b82f6',shape:'square',visible:true,collider:false,rigidbody:false},
 {id:'ground',name:'Chão',x:0,y:-2.5,rotation:0,sx:7.5,sy:.6,color:'#22c55e',shape:'rect',visible:true,collider:false,rigidbody:false},
 {id:'obstacle',name:'Obstáculo',x:2.2,y:-1.8,rotation:0,sx:1,sy:1,color:'#f97316',shape:'square',visible:true,collider:false,rigidbody:false}
];
const dirs=['File','Edit','Assets','GameObject','Component','Window','Help'];
type Tab='Scene'|'Game';
const worldToScreen=(o:Object2D)=>({left:(50+o.x*10)+'%',top:(50-o.y*13)+'%',width:(o.shape==='rect'?54:54)*o.sx,height:54*o.sy,background:o.color,transform:'translate(-50%,-50%) rotate('+o.rotation+'deg)'});
export function PracticeEditor(){
 const [objects,setObjects]=useState<Object2D[]>(initial); const [selected,setSelected]=useState('player');
 const [tab,setTab]=useState<Tab>('Scene'); const [playing,setPlaying]=useState(false); const [log,setLog]=useState<string[]>(['Editor iniciado — Pixel Adventure']);
 const [folder,setFolder]=useState('Assets');const [tool,setTool]=useState('Move');
 const [menu,setMenu]=useState<string|null>(null);
 const [saved,setSaved]=useState(false);
 const drag=useRef<{id:string;startX:number;startY:number;x:number;y:number;w:number;h:number}|null>(null);
 const storageKey='professor-gabriel-games:pixel-adventure:fase01:v1';
 const restore=()=>{try{const value=localStorage.getItem(storageKey);if(!value){notify('Nenhuma cena salva neste navegador');return}const parsed=JSON.parse(value) as Object2D[];if(!Array.isArray(parsed)||!parsed.every(o=>typeof o.id==='string'&&typeof o.x==='number'&&typeof o.y==='number'))throw Error('Formato inválido');setObjects(parsed);setSelected(parsed[0]?.id??'');setSaved(true);notify('Cena Fase01 carregada do navegador')}catch{notify('Não foi possível recuperar a cena salva')}};
 const reset=()=>{setObjects(initial.map(o=>({...o})));setSelected('player');setSaved(false);notify('Cena restaurada para o exemplo inicial')};
 const current=useMemo(()=>objects.find(o=>o.id===selected),[objects,selected]);
 const update=(patch:Partial<Object2D>)=>{setObjects(old=>old.map(o=>o.id===selected?{...o,...patch}:o));setSaved(false)};
 const notify=(msg:string)=>setLog(old=>[msg,...old].slice(0,14));
 const add=()=>{const id='obj-'+Date.now();setObjects(old=>[...old,{id,name:'Square',x:0,y:0,rotation:0,sx:1,sy:1,color:'#a855f7',shape:'square',visible:true,collider:false,rigidbody:false}]);setSelected(id);notify('Objeto criado: Square')};
 const duplicate=()=>{if(!current)return;const id='obj-'+Date.now();setObjects(old=>[...old,{...current,id,name:current.name+' (1)',x:current.x+.6}]);setSelected(id);notify('Objeto duplicado')};
 const remove=()=>{if(!current)return;setObjects(old=>old.filter(o=>o.id!==selected));setSelected('');notify('Objeto excluído: '+current.name)};
 const save=()=>{try{localStorage.setItem(storageKey,JSON.stringify(objects));setSaved(true);notify('Cena Fase01 salva neste navegador')}catch{notify('Falha ao salvar: armazenamento indisponível')}};
 useEffect(()=>{
  const onKey=(e:KeyboardEvent)=>{
   const target=e.target as HTMLElement|null;
   if(target?.closest('input,textarea,[contenteditable="true"]'))return;
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();save()}
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='d'){e.preventDefault();duplicate()}
   if((e.key==='Delete'||e.key==='Backspace')&&current){e.preventDefault();remove()}
  };
  window.addEventListener('keydown',onKey);
  return ()=>window.removeEventListener('keydown',onKey);
 },[objects,current,selected]);
 const startDrag=(e:React.PointerEvent<HTMLButtonElement>,o:Object2D)=>{
  setSelected(o.id);
  if(tool!=='Move'||tab!=='Scene'||playing)return;
  const scene=e.currentTarget.closest('.ue-scene')?.getBoundingClientRect();
  if(!scene)return;
  drag.current={id:o.id,startX:e.clientX,startY:e.clientY,x:o.x,y:o.y,w:scene.width,h:scene.height};
  e.currentTarget.setPointerCapture(e.pointerId);
 };
 const moveDrag=(e:React.PointerEvent<HTMLButtonElement>)=>{
  const d=drag.current;if(!d)return;
  const x=Math.round((d.x+(e.clientX-d.startX)/d.w*10)*10)/10;
  const y=Math.round((d.y-(e.clientY-d.startY)/d.h*100/13)*10)/10;
  setObjects(old=>old.map(o=>o.id===d.id?{...o,x,y}:o));
  setSaved(false);
 };
 const endDrag=()=>{if(drag.current){notify('Posição atualizada pela ferramenta Move');drag.current=null}};

 const setNumber=(key:'x'|'y'|'rotation'|'sx'|'sy',value:string)=>{const n=Number(value);if(Number.isFinite(n))update({[key]:n})};
 const objectsView=objects.filter(o=>o.visible);
 const hasPersonagem=objects.some(o=>o.name.toLowerCase().includes('personagem'));
 const hasChao=objects.some(o=>o.name.toLowerCase().includes('chão'));
 const hasObstaculo=objects.some(o=>o.name.toLowerCase().includes('obstáculo'));
 const movedPersonagem=objects.some(o=>o.id==='player'&&(Math.abs(o.x+1.5)>.01||Math.abs(o.y-.2)>.01));
 const missions=[{name:'Identificar Personagem, Chão e Obstáculo na Hierarchy',done:hasPersonagem&&hasChao&&hasObstaculo},{name:'Mover o Personagem na Scene ou no Inspector',done:movedPersonagem},{name:'Salvar a cena no navegador (Ctrl+S)',done:saved}];
 const completed=missions.filter(m=>m.done).length;
 const numberField=(label:string,key:'x'|'y'|'rotation'|'sx'|'sy')=><label className="ue-field" key={key}><span>{label}</span><input type="number" step=".1" value={current?.[key]??0} onChange={e=>setNumber(key,e.target.value)} disabled={!current}/></label>;
 return <section className="ue-shell" aria-label="Simulador didático do editor Unity 2D">
  <div className="ue-missionbar"><div><strong>Missão da Aula 1</strong><span>Explore a interface e conclua as tarefas no modo prática.</span></div><div className="ue-missions">{missions.map((m,i)=><span key={i} className={m.done?'complete':''}>{m.done?'✓':'○'} {m.name}</span>)}</div><small>{completed}/3</small></div>
  <div className="ue-titlebar"><span className="ue-mark">◈</span> PixelAdventure - Fase01.unity <span className="ue-version">Unity 6 · Simulação educativa</span></div>
  <div className="ue-menubar">{dirs.map(d=><div className="ue-menuitem" key={d}><button onClick={()=>setMenu(menu===d?null:d)}>{d}</button>{menu===d&&<div className="ue-dropdown">{(d==='File'?['Save Scene','Open Saved Scene','Reset Scene']:d==='GameObject'?['2D Object > Sprites > Square','Duplicate','Delete']:['Tools (demonstração)']).map((x,i)=><button key={x} onClick={()=>{setMenu(null);if(x.startsWith('Save'))save();else if(x==='Open Saved Scene')restore();else if(x==='Reset Scene')reset();else if(x.includes('Square'))add();else if(x==='Duplicate')duplicate();else if(x==='Delete')remove();else notify(x)}}>{x}</button>)}</div>}</div>)}<span className="ue-spacer"/><span className="ue-badge">{saved?'Cena salva':'Alterações não salvas'}</span></div>
  <div className="ue-toolbar"><div className="ue-tools">{['Hand','Move','Rotate','Scale','Rect'].map((t,i)=><button key={t} className={tool===t?'active':''} onClick={()=>setTool(t)} title={t}>{['✋','✥','⟳','⤢','▣'][i]}</button>)}</div><div className="ue-play"><button className={playing?'active':''} onClick={()=>{setPlaying(!playing);notify(!playing?'Play Mode iniciado':'Play Mode encerrado')}} title="Play">▶</button><button onClick={()=>notify('Pausar simulação')} title="Pause">Ⅱ</button><button onClick={()=>notify('Step: avançar um quadro')} title="Step">▷▏</button></div><div className="ue-righttools">2D　☷　Gizmos</div></div>
  <div className="ue-grid">
   <aside className="ue-panel ue-hierarchy"><div className="ue-tab">Hierarchy <button onClick={add} title="Criar objeto">＋</button></div><div className="ue-content"><div className="ue-tree-root">▾ Fase01{saved?'':'*'}</div><button className="ue-tree-item camera" onClick={()=>{setSelected('');notify('Main Camera selecionada')}}>▣ Main Camera</button>{objects.map(o=><button key={o.id} className={'ue-tree-item '+(selected===o.id?'selected':'')} onClick={()=>setSelected(o.id)}><span>▣</span> {o.name}</button>)}</div><div className="ue-panel-footer"><button onClick={add}>＋ Criar</button><button onClick={duplicate} disabled={!current}>Duplicar</button><button onClick={remove} disabled={!current}>Excluir</button></div></aside>
   <div className="ue-center"><div className="ue-panel ue-viewport"><div className="ue-tabs">{(['Scene','Game'] as const).map(t=><button key={t} className={tab===t?'selected':''} onClick={()=>setTab(t)}>{t}</button>)}<span className="ue-tabhint">{tab==='Scene'?'Shaded · 2D':'Display 1 · Free Aspect'}</span></div><div className={'ue-scene '+(tab==='Game'?'game':'')}><div className="ue-axis">Y ↑<br/>　X →</div>{tab==='Scene'&&<div className="ue-cameraoutline">Main Camera</div>}{objectsView.map(o=><button title={o.name} key={o.id} className={'ue-object '+(o.id===selected&&tab==='Scene'?'selected':'')} style={worldToScreen(o)} onClick={()=>setSelected(o.id)} onPointerDown={e=>startDrag(e,o)} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} aria-label={'Selecionar '+o.name}>{o.collider&&<span className="ue-collider"/>}</button>)}{playing&&<div className="ue-playmark">▶ PLAY MODE</div>}</div><div className="ue-status">Tool: {tool}　•　{tab}　•　{objects.length} objetos　•　Grid 1 unit</div></div>
   <div className="ue-panel ue-bottom"><div className="ue-tabs"><button className={folder!=='Console'?'selected':''} onClick={()=>setFolder('Assets')}>Project</button><button className={folder==='Console'?'selected':''} onClick={()=>setFolder('Console')}>Console ({log.length})</button></div>{folder==='Console'?<div className="ue-console">{log.map((s,i)=><p key={i}>ⓘ {s}</p>)}</div>:<div className="ue-project"><div className="ue-folders"><button onClick={()=>setFolder('Assets')}>▾ Assets</button>{['Scenes','Sprites','Scripts','Materials','Audio'].map(f=><button key={f} className={folder===f?'selected':''} onClick={()=>setFolder(f)}>📁 {f}</button>)}</div><div className="ue-assets"><div className="ue-crumb">Assets / {folder==='Assets'?'':folder}</div>{(folder==='Assets'?['Scenes','Sprites','Scripts','Materials','Audio']:folder==='Scenes'?['Fase01.unity']:folder==='Sprites'?['Personagem.png','Chao.png','Obstaculo.png']:folder==='Scripts'?['MovimentoPersonagem.cs']:[]).map(f=><button key={f} onClick={()=>{if(!f.includes('.'))setFolder(f);else notify('Arquivo selecionado: '+f)}}><span>{f.includes('.')?'▤':'📁'}</span>{f}</button>)}</div></div>}</div></div>
   <aside className="ue-panel ue-inspector"><div className="ue-tab">Inspector <span>⚙</span></div>{current?<div className="ue-inspectorbody"><div className="ue-objhead"><input type="checkbox" checked={current.visible} onChange={e=>update({visible:e.target.checked})}/><input aria-label="Nome do objeto" value={current.name} onChange={e=>update({name:e.target.value})}/></div><div className="ue-meta">Tag: Untagged　 Layer: Default</div><div className="ue-comp"><h4>▾ Transform</h4><div className="ue-vector"><strong>Position</strong>{numberField('X','x')}{numberField('Y','y')}</div><div className="ue-vector"><strong>Rotation</strong>{numberField('Z','rotation')}</div><div className="ue-vector"><strong>Scale</strong>{numberField('X','sx')}{numberField('Y','sy')}</div></div><div className="ue-comp"><h4>▾ Sprite Renderer</h4><label className="ue-colorlabel">Color <input type="color" value={current.color} onChange={e=>update({color:e.target.value})}/></label><p>Sprite: {current.shape==='square'?'Square':'Rectangle'}</p><p>Sorting Layer: Default</p></div>{current.collider&&<div className="ue-comp"><h4>▾ Box Collider 2D</h4><p>Is Trigger　☐</p><button onClick={()=>update({collider:false})}>Remove Component</button></div>}{current.rigidbody&&<div className="ue-comp"><h4>▾ Rigidbody 2D</h4><p>Body Type: Dynamic</p><p>Gravity Scale: 1</p><button onClick={()=>update({rigidbody:false})}>Remove Component</button></div>}<div className="ue-adds"><button onClick={()=>{update({collider:true});notify('Box Collider 2D adicionado')}}>+ Box Collider 2D</button><button onClick={()=>{update({rigidbody:true});notify('Rigidbody 2D adicionado')}}>+ Rigidbody 2D</button></div></div>:<div className="ue-noobj">Selecione um objeto na Hierarchy ou Scene para editar suas propriedades.</div>}</aside>
  </div><div className="ue-footnote"><button type="button" onClick={save}>Salvar cena</button><button type="button" onClick={restore}>Carregar cena</button><button type="button" onClick={reset}>Recomeçar</button><span>Modo prática • Arraste com Move. Ctrl+S salva, Ctrl+D duplica, Delete exclui. A cena é salva apenas neste navegador.</span></div>
 </section>
}
