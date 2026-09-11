import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const CREAM = '#fffaf2';
const PINK = '#f4c6d7';
const BROWN = '#6f5145';

function Kawaii({ x, y, scale = 1, rotation = 0, face = 'happy', holding = false }: { x:number; y:number; scale?:number; rotation?:number; face?:string; holding?:boolean }) {
  return <div style={{ position:'absolute', left:x, top:y, transform:`translate(-50%,-50%) scale(${scale}) rotate(${rotation}deg)`, width:250, height:250 }}>
    <div style={{ position:'absolute', inset:20, background:CREAM, borderRadius:'46% 46% 42% 42%', border:'5px solid #eadfd6', boxShadow:'0 18px 35px #0002' }} />
    <div style={{ position:'absolute', left:55, top:108, width:24, height:34, background:'#3d332f', borderRadius:20 }} />
    <div style={{ position:'absolute', right:55, top:108, width:24, height:34, background:'#3d332f', borderRadius:20 }} />
    <div style={{ position:'absolute', left:112, top:143, width:28, height:18, borderBottom:'5px solid #3d332f', borderRadius:'0 0 30px 30px' }} />
    <div style={{ position:'absolute', left:45, top:145, width:35, height:18, background:'#f3aebc', borderRadius:50, opacity:.65 }} />
    <div style={{ position:'absolute', right:45, top:145, width:35, height:18, background:'#f3aebc', borderRadius:50, opacity:.65 }} />
    {holding && <><div style={{position:'absolute',left:0,top:150,width:70,height:22,background:CREAM,borderRadius:30,transform:'rotate(-15deg)',border:'4px solid #eadfd6'}}/><div style={{position:'absolute',right:-8,top:145,width:70,height:22,background:CREAM,borderRadius:30,transform:'rotate(15deg)',border:'4px solid #eadfd6'}}/></>}
    {face==='surprised' && <div style={{position:'absolute',left:108,top:137,width:34,height:42,border:'5px solid #3d332f',borderRadius:'50%'}}/>}
  </div>
}

function Scene({children}:{children:React.ReactNode}) { return <AbsoluteFill style={{fontFamily:'Arial, sans-serif', overflow:'hidden'}}>{children}</AbsoluteFill> }

export default function Reel() {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const sec = f/fps;
  const bg = sec < 10 ? '#f8eee7' : '#fff';
  const introX = interpolate(f,[0,45,90],[ -220,540,540],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const dropY = interpolate(f,[90,112,125],[ -180,210,210],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const dragX = interpolate(f,[125,180,225],[540,540,1180],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const danceT = Math.max(0, Math.min(1,(f-225)/75));
  const newsIn = interpolate(f,[300,320],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const finalIn = interpolate(f,[390,420],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const finalX = interpolate(f,[420,510,540],[1150,540,-250],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});

  return <Scene><AbsoluteFill style={{background:bg, transition:'background .2s'}}>
    {sec<7 && <>
      <Kawaii x={introX} y={1080} scale={0.82 + 0.06*Math.sin(f/8)} face={f<105?'surprised':'happy'} />
      {f>=90 && f<225 && <div style={{position:'absolute',left:540,top:dropY,width:480,height:150,background:'#fff',border:'7px solid #2d2622',borderRadius:35,display:'grid',placeItems:'center',fontSize:76,fontWeight:900,color:BROWN,boxShadow:'0 20px 30px #0002'}}>ELåiVA</div>}
      {f>=125 && f<225 && <Kawaii x={dragX} y={1080} scale={.82} rotation={interpolate(f,[125,180,225],[0,-4,3])} />}
    </>}
    {sec>=7 && sec<10.8 && <>
      <div style={{position:'absolute',left:0,right:0,top:0,bottom:0,display:'grid',placeItems:'center',fontSize:130,fontWeight:900,color:BROWN,opacity:.12}}>ELåiVA</div>
      <Kawaii x={220} y={1100+80*Math.sin(f/5)} scale={.65} rotation={8*Math.sin(f/4)} />
      <Kawaii x={540} y={1030+70*Math.sin(f/6+1)} scale={.78} rotation={-7*Math.sin(f/5)} />
      <Kawaii x={850} y={1110+85*Math.sin(f/5+2)} scale={.62} rotation={9*Math.sin(f/4)} />
      <Kawaii x={540} y={1370+55*Math.sin(f/7)} scale={.55} rotation={-5*Math.sin(f/6)} />
      <div style={{position:'absolute',left:0,right:0,bottom:260,textAlign:'center',fontSize:34,fontWeight:800,color:BROWN}}>✨ ELåiVA dance break ✨</div>
    </>}
    {sec>=10 && sec<13.5 && <div style={{position:'absolute',inset:0,background:'#f7f7f7',opacity:newsIn,display:'grid',placeItems:'center',padding:90}}>
      <div style={{width:'100%',border:'5px solid #1f1b19',background:'#fff',boxShadow:'0 30px 80px #0002'}}>
        <div style={{background:'#1f1b19',color:'#fff',padding:'24px 28px',fontSize:34,fontWeight:900}}>BREAKING NEWS</div>
        <div style={{padding:'70px 35px',textAlign:'center'}}><div style={{fontSize:62,fontWeight:900,color:BROWN}}>ELåiVA — T&S COMPANY</div><div style={{marginTop:35,fontSize:31,lineHeight:1.35}}>AI Assistants • Websites • Smart Business Solutions</div></div>
      </div>
    </div>}
    {sec>=13 && <div style={{position:'absolute',inset:0,background:'#fbf4ed'}}>
      <Kawaii x={finalX} y={1120} scale={.9} holding />
      <div style={{position:'absolute',left:80,right:80,top:330,opacity:finalIn,textAlign:'center',fontSize:39,fontWeight:800,color:BROWN,lineHeight:1.25}}>«Θες κι εσύ AI Assistants που μπορούν μέχρι και να χορέψουν;»</div>
      <div style={{position:'absolute',left:100,right:100,top:640,opacity:finalIn,textAlign:'center',fontSize:38,fontWeight:800,color:'#2d2622'}}>«Επισκέψου το site μας.» 😌</div>
      <div style={{position:'absolute',left:0,right:0,bottom:130,textAlign:'center',fontSize:30,fontWeight:900,color:BROWN}}>ELåiVA — T&S COMPANY</div>
      <div style={{position:'absolute',left:0,right:0,bottom:80,textAlign:'center',fontSize:20,color:'#6e625b'}}>AI Assistants • Websites • Smart Business Solutions</div>
      <div style={{position:'absolute',right:35,bottom:35,fontSize:16,color:'#8b7a70'}}>☕ + 🥪</div>
    </div>}
  </AbsoluteFill></Scene>
}
