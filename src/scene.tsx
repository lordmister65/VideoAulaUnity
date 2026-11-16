import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame} from 'remotion';
import {cueAt,durationFrames} from './lessonScript';
export {durationFrames};

const C={blue:'#3b82f6',green:'#22c55e',orange:'#f97316',yellow:'#facc15',bg:'#202632',panel:'#2b3039',line:'#454e5a'};
const O:React.CSSProperties={position:'absolute'};
function Character({professor,talk,frame}:{professor:boolean;talk:boolean;frame:number}) {
 const bob=Math.sin(frame/17)*5,blink=frame%139>134;
 return <svg width={210} height={262} viewBox="0 0 205 265" style={{transform:`translateY(${bob}px)`}}>
 <rect x="36" y="144" width="136" height="118" rx="15" fill={professor?C.blue:C.orange}/>
 {!professor&&<rect x="8" y="152" width="43" height="92" rx="8" fill="#64748b"/>}
 <circle cx="104" cy="83" r="53" fill={professor?'#f4c7a0':'#dfaa85'}/>
 {professor?<><path d="M51 82a53 53 0 0 1 106 0Z" fill="#222936"/><circle cx="84" cy="94" r="17" fill="none" stroke="#151923" strokeWidth="4"/><circle cx="123" cy="94" r="17" fill="none" stroke="#151923" strokeWidth="4"/><line x1="101" y1="94" x2="106" y2="94" stroke="#151923" strokeWidth="4"/></>:<><polygon points="68,49 84,4 96,49" fill="#1f2937"/><polygon points="88,44 107,0 121,44" fill="#1f2937"/><polygon points="110,49 130,8 142,56" fill="#1f2937"/></>}
 <ellipse cx="84" cy="95" rx="5" ry={blink?1:5} fill="#111827"/><ellipse cx="123" cy="95" rx="5" ry={blink?1:5} fill="#111827"/>
 <rect x="92" y="121" width="25" height={talk&&frame%9<5?15:5} rx="3" fill="#7a2e2e"/>
 {professor&&<><rect x="79" y="182" width="52" height="29" rx="7" fill="#f8fafc"/><circle cx="94" cy="197" r="5" fill="#1e2430"/><circle cx="116" cy="197" r="5" fill={C.orange}/></>}
 </svg>
}
const panel=(name:string,x:number,y:number,w:number,h:number,active:boolean,children:React.ReactNode)=><div key={name} style={{...O,left:x,top:y,width:w,height:h,background:C.panel,border:`2px solid ${active?C.yellow:C.line}`,boxShadow:active?'0 0 22px #facc1540':undefined,overflow:'hidden',borderRadius:3}}>
 <div style={{background:'#242830',height:36,padding:'7px 12px',fontSize:18,fontWeight:700,color:active?'#fff':'#b5bcc9'}}>{name}</div>{children}</div>;
function DemoEditor({focus,action,progress,frame}:{focus:string;action:string;progress:number;frame:number}){
 const move=action==='move'?interpolate(progress,[.1,.85],[0,170],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}):0;
 const scale=action==='scale'?1+progress*.5:1;
 const sceneObjects=action!=='create';
 const showDuplicate=action==='duplicate'&&progress>.45;
 const cursorPoints:Record<string,[number,number,number,number]>={
  select:[440,325,245,287],duplicate:[245,287,265,335],move:[1330,410,1435,405],
  scale:[1350,510,1430,508],folders:[385,690,505,690],save:[370,183,370,183],
  create:[245,290,405,335],ground:[450,470,800,545],overview:[260,290,850,515],inspector:[1440,295,1390,470],game:[1005,380,1140,380]};
 const cp=cursorPoints[action]??[380,260,475,340];
 const cursorX=interpolate(progress,[0,1],[cp[0],cp[2]]);
 const cursorY=interpolate(progress,[0,1],[cp[1],cp[3]]);
 const highlight=focus||((action==='overview')?'Hierarchy':'');
 const left=160,top=153;
 return <div style={{...O,left,top,width:1600,height:720,background:C.bg,border:'4px solid #58606b',borderRadius:7,overflow:'hidden'}}>
 <div style={{height:42,background:'#1d2129',fontSize:18,padding:'11px 17px',color:'#c2c8d0'}}>PixelAdventure - Fase01.unity　 File　 Edit　 Assets　 GameObject　 Component　 Window　 Help</div>
 <div style={{height:40,background:'#363c45',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 18px',fontSize:22}}><span>✋　✥　⟳　⤢　▣</span><span style={{color:'#c4e8ff'}}>▶　Ⅱ　▷▏</span><span style={{fontSize:18}}>2D　Gizmos</span></div>
 {panel('Hierarchy',5,84,255,430,highlight==='Hierarchy',<div style={{padding:'15px 12px',lineHeight:2.1,fontSize:21,color:'#d8dce4'}}>▾ Fase01<br/>　▣ Main Camera{sceneObjects&&<><div style={{background:highlight==='Hierarchy'?'#3f688e':'transparent'}}>　▣ Personagem</div>　▣ Chão<br/>　▣ Obstáculo</>}{showDuplicate&&<div style={{color:C.yellow}}>　▣ Personagem (1)</div>}</div>)}
 {panel('Scene',265,84,590,430,highlight==='Scene',<div style={{position:'relative',height:394,backgroundImage:'linear-gradient(#ffffff10 1px,transparent 1px),linear-gradient(90deg,#ffffff10 1px,transparent 1px)',backgroundSize:'32px 32px'}}>
  <div style={{...O,left:'8%',top:'10%',width:'84%',height:'79%',border:'1px dashed #adb9c585',fontSize:16,color:'#aeb8c5'}}>Main Camera</div>
  {sceneObjects&&<><div style={{...O,left:135+move,top:120,width:80*scale,height:80*scale,background:C.blue,outline:highlight==='Scene'||highlight==='Inspector'?'3px solid #facc15':undefined}}/><div style={{...O,left:30,top:334,width:530,height:35,background:C.green}}/><div style={{...O,left:408,top:267,width:76,height:67,background:C.orange}}/>{showDuplicate&&<div style={{...O,left:225,top:120,width:80,height:80,background:'#648bf5'}}/>}</>}
 </div>)}
 {panel('Game',860,84,400,430,highlight==='Game',<div style={{position:'relative',height:394,background:'#26384a'}}><div style={{...O,left:77+move*.6,top:135,width:60*scale,height:60*scale,background:C.blue}}/><div style={{...O,left:0,bottom:16,width:'100%',height:34,background:C.green}}/><div style={{...O,right:55,bottom:50,width:54,height:60,background:C.orange}}/></div>)}
 {panel('Inspector',1265,84,323,430,highlight==='Inspector',<div style={{fontSize:19,padding:'10px 14px',lineHeight:1.8}}>
 <div style={{borderBottom:'1px solid #444c58',paddingBottom:6}}>☑ Personagem</div><b>▾ Transform</b>
 {['Position','Rotation','Scale'].map((field,i)=><div key={field} style={{display:'flex',justifyContent:'space-between',background:highlight==='Inspector'&&((action==='move'&&i===0)||(action==='scale'&&i===2))?'#3a5b7d':undefined,fontSize:17,padding:'5px 0'}}><span>{field}</span><span style={{fontFamily:'monospace'}}>X {i===0?(move/55).toFixed(1):i===2?scale.toFixed(1):'0'}　Y {i===2?'1':'0'}</span></div>)}
 <div style={{borderTop:'1px solid #4b5563',marginTop:11,paddingTop:9}}>▾ Sprite Renderer</div><div style={{fontSize:17}}>Sprite　Square</div><div style={{background:'#4a505c',textAlign:'center',marginTop:18,padding:8,borderRadius:5}}>Add Component</div>
 </div>)}
 {panel('Project',5,519,1583,189,highlight==='Project',<div style={{padding:20,fontSize:26}}>📁 Assets　　 📁 Scenes　　 📁 Sprites　　 📁 Scripts　　{action==='save'&&<span style={{color:C.green}}>✓ Fase01.unity</span>}</div>)}
 {action!=='title'&&<div style={{...O,left:cursorX-left,top:cursorY-top,fontSize:36,pointerEvents:'none',color:'#fff',textShadow:'1px 2px 3px #000',transform:'rotate(-17deg)'}}>➤{frame%18<7&&<span style={{fontSize:22,color:C.yellow}}>◌</span>}</div>}
 </div>
}
export function Aula01(){
 const frame=useCurrentFrame();const {cue,local,frames,index}=cueAt(frame);
 const progress=frames?local/frames:0;
 const intro=cue.action==='title';const fade=interpolate(local,[0,12],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const speaking=local>6&&local<frames-12;
 return <AbsoluteFill style={{background:'#1e2430',fontFamily:'Arial,sans-serif',color:'#f8fafc'}}>
 <div style={{...O,left:85,top:42,fontSize:28,fontWeight:800,color:C.yellow}}>PROFESSOR GABRIEL GAMES　•　AULA 1</div>
 <div style={{...O,left:85,top:92,fontSize:49,fontWeight:900}}>{cue.title}</div>
 {intro?<div style={{...O,top:330,width:'100%',textAlign:'center',fontSize:92,fontWeight:900,opacity:fade}}>Unity 2D<div style={{fontSize:54,color:C.yellow,marginTop:10}}>Projeto Pixel Adventure</div></div>:<DemoEditor focus={cue.focus} action={cue.action} progress={progress} frame={frame}/>}
 <div style={{...O,left:20,bottom:22}}><Character professor talk={cue.speaker==='professor'&&speaking} frame={frame}/></div>
 <div style={{...O,right:20,bottom:22}}><Character professor={false} talk={cue.speaker==='caua'&&speaking} frame={frame}/></div>
 <div style={{...O,left:260,right:260,bottom:24,background:'#0a1020f0',border:'2px solid #455573',borderRadius:13,padding:'16px 27px',fontSize:35,textAlign:'center',lineHeight:1.2,opacity:fade}}>
 <strong style={{color:cue.speaker==='professor'?'#93c5fd':'#fdba74'}}>{cue.speaker==='professor'?'Professor Gabriel':'Cauã'}: </strong>{cue.text}
 </div>
 <div style={{...O,right:79,top:88,fontSize:19,color:'#94a3b8'}}>Cena {index+1} de 29</div>
 </AbsoluteFill>;
}
