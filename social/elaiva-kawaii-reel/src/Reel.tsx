import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

const CREAM = '#fffaf2';
const PINK = '#f4c6d7';
const BROWN = '#6f5145';
const DARK = '#3d332f';
const SHADOW = '#d9c8bd';

type KawaiiProps = {
  x:number; y:number; scale?:number; rotation?:number;
  face?:'happy'|'surprised'|'squished'; sweat?:boolean;
  coffee?:boolean; sandwich?:boolean; walkPhase?:number;
  mouthOpen?:boolean; armsAround?:boolean; bodyColor?:string;
  humanSteps?:boolean;
};

function Ear({side, bodyColor=CREAM}:{side:'left'|'right';bodyColor?:string}) {
  return <div style={{position:'absolute',left:side==='left'?48:158,top:-35,width:52,height:125,
    background:`linear-gradient(135deg,${bodyColor} ${side==='left'?'18%':'72%'},${bodyColor} 55%,#d9c9bf 100%)`,
    border:'5px solid #eadfd6',borderRadius:'58% 58% 45% 45%',
    transform:`rotateY(${side==='left'?-8:8}deg) rotate(${side==='left'?-15:15}deg)`,zIndex:0,
    boxShadow:'inset -9px -13px 0 rgba(185,160,145,.28), 4px 8px 14px rgba(55,40,32,.14)',
    transformStyle:'preserve-3d'}}>
    <div style={{position:'absolute',inset:11,borderRadius:'inherit',background:PINK,opacity:.72,boxShadow:'inset 3px 4px 7px rgba(120,70,70,.12)'}} />
  </div>;
}

function Coffee(){return <div style={{position:'absolute',left:-48,top:118,width:72,height:76,zIndex:8,transform:'translateZ(12px)'}}>
  <div style={{position:'absolute',left:5,top:12,width:47,height:52,background:'linear-gradient(90deg,#fff 0%,#f7f1eb 48%,#d8c5ba 100%)',border:'4px solid #8a6a5a',borderRadius:'8px 8px 14px 14px',boxShadow:'inset -7px -6px 0 #d8c5ba, 5px 8px 12px rgba(55,40,32,.16)'}}/>
  <div style={{position:'absolute',left:44,top:23,width:23,height:26,border:'4px solid #8a6a5a',borderLeft:0,borderRadius:'0 15px 15px 0'}}/>
  <div style={{position:'absolute',left:12,top:5,width:35,height:15,background:'#6d4b3a',borderRadius:'50%',boxShadow:'inset 0 3px 3px rgba(255,255,255,.18)'}}/>
  <div style={{position:'absolute',left:18,top:-14,width:5,height:24,background:'#c7a38f',borderRadius:10,transform:'rotate(-8deg)'}}/>
  <div style={{position:'absolute',left:31,top:-17,width:5,height:27,background:'#c7a38f',borderRadius:10,transform:'rotate(8deg)'}}/>
</div>}

function Sandwich(){return <div style={{position:'absolute',right:-72,top:120,width:78,height:58,zIndex:8,transform:'rotate(-8deg) translateZ(12px)',filter:'drop-shadow(5px 8px 7px rgba(55,40,32,.14))'}}>
  <div style={{position:'absolute',left:0,top:7,width:74,height:27,background:'linear-gradient(180deg,#f7d89d,#d99f56)',border:'4px solid #9b6d42',borderRadius:'13px 13px 5px 5px'}}/>
  <div style={{position:'absolute',left:5,top:29,width:64,height:14,background:'#79a85c',borderRadius:5}}/>
  <div style={{position:'absolute',left:3,top:40,width:68,height:13,background:'linear-gradient(180deg,#efc1b0,#e0a18e)',border:'3px solid #9b6d42',borderRadius:'4px 4px 10px 10px'}}/>
</div>}

function Kawaii({x,y,scale=1,rotation=0,face='happy',sweat=false,coffee=false,sandwich=false,walkPhase=0,mouthOpen=false,armsAround=false,bodyColor=CREAM,humanSteps=false}:KawaiiProps){
  const originalLegA = Math.sin(walkPhase)*18;
  const originalLegB = -originalLegA;

  // Natural alternating gait with weight shift, foot planting and subtle body follow-through.
  const gait = Math.sin(walkPhase);
  const gaitA = humanSteps ? gait*10 : originalLegA;
  const gaitB = humanSteps ? -gait*10 : originalLegB;
  const liftA = humanSteps ? Math.max(0,-gait)*7 : 0;
  const liftB = humanSteps ? Math.max(0,gait)*7 : 0;
  const footXA = humanSteps ? gait*16 : 0;
  const footXB = humanSteps ? -gait*16 : 0;
  const weight = humanSteps ? Math.sin(walkPhase*2)*2.2 : Math.sin(walkPhase*.75)*.7;
  const bodySway = humanSteps ? Math.sin(walkPhase)*1.6 : Math.sin(walkPhase*.8)*.55;
  const headSway = humanSteps ? Math.sin(walkPhase+.65)*1.2 : Math.sin(walkPhase*.8+.4)*.35;
  const armSwing = humanSteps ? Math.sin(walkPhase)*5 : Math.sin(walkPhase*.75)*1.5;
  const squash = humanSteps ? 1 + Math.abs(Math.sin(walkPhase*2))*.012 : 1;

  return <div style={{position:'absolute',left:x,top:y,transform:`translate(-50%,-50%) scale(${scale}) rotate(${rotation+bodySway}deg) rotateX(${weight}deg)`,width:250,height:310,zIndex:2,perspective:900,transformStyle:'preserve-3d',filter:'drop-shadow(0 22px 18px rgba(62,45,38,.14))'}}>
    <Ear side="left" bodyColor={bodyColor}/><Ear side="right" bodyColor={bodyColor}/>
    <div style={{position:'absolute',left:20,top:38,width:210,height:205,
      background:`radial-gradient(circle at 30% 18%,#ffffff 0,${bodyColor} 38%,${bodyColor} 62%,#d7c7bd 100%)`,
      border:'5px solid #eadfd6',borderRadius:'46% 46% 42% 42%',
      boxShadow:'inset -20px -24px 0 rgba(170,145,130,.20), inset 7px 8px 14px rgba(255,255,255,.72), 0 22px 30px rgba(55,40,32,.18)',zIndex:1,
      transform:`translateZ(8px) rotateX(4deg) rotateY(${headSway}deg) scaleY(${squash})`,transformOrigin:'50% 100%',transformStyle:'preserve-3d'}}/>
    <div style={{position:'absolute',left:55,top:118,width:24,height:34,background:DARK,borderRadius:20,zIndex:2,boxShadow:'3px 4px 0 #241d1a, inset 2px 2px 3px rgba(255,255,255,.12)',transform:`translateZ(13px) rotate(${headSway*.35}deg)`}}/>
    <div style={{position:'absolute',right:55,top:118,width:24,height:34,background:DARK,borderRadius:20,zIndex:2,boxShadow:'3px 4px 0 #241d1a, inset 2px 2px 3px rgba(255,255,255,.12)',transform:`translateZ(13px) rotate(${headSway*.35}deg)`}}/>
    <div style={{position:'absolute',left:112,top:153,width:mouthOpen?34:28,height:mouthOpen?28:18,background:mouthOpen?DARK:'transparent',borderBottom:mouthOpen?'0':'5px solid #3d332f',borderRadius:'0 0 30px 30px',zIndex:3,transform:'translateZ(15px)'}}/>
    <div style={{position:'absolute',left:45,top:155,width:35,height:18,background:'#f3aebc',borderRadius:50,opacity:.65,zIndex:2,transform:'translateZ(11px)'}}/>
    <div style={{position:'absolute',right:45,top:155,width:35,height:18,background:'#f3aebc',borderRadius:50,opacity:.65,zIndex:2,transform:'translateZ(11px)'}}/>
    {face==='surprised'&&<div style={{position:'absolute',left:108,top:147,width:34,height:42,border:'5px solid #3d332f',borderRadius:'50%',zIndex:3,transform:'translateZ(15px)'}}/>}
    {face==='squished'&&<><div style={{position:'absolute',left:58,top:132,width:28,height:8,background:DARK,borderRadius:8,transform:`translateZ(15px) rotate(${18+headSway*.2}deg)`,zIndex:3}}/><div style={{position:'absolute',right:58,top:132,width:28,height:8,background:DARK,borderRadius:8,transform:`translateZ(15px) rotate(${-18+headSway*.2}deg)`,zIndex:3}}/></>}

    <div style={{position:'absolute',left:-12,top:166,width:86,height:25,background:`linear-gradient(180deg,#fff,${bodyColor} 70%,#d5c4ba)`,border:'4px solid #eadfd6',borderRadius:30,transform:`translateZ(5px) rotate(${armsAround?-8-armSwing:-12-armSwing}deg)`,zIndex:4,boxShadow:'0 7px 10px rgba(55,40,32,.10)'}}/>
    <div style={{position:'absolute',right:-12,top:166,width:86,height:25,background:`linear-gradient(180deg,#fff,${bodyColor} 70%,#d5c4ba)`,border:'4px solid #eadfd6',borderRadius:30,transform:`translateZ(5px) rotate(${armsAround?8-armSwing:12-armSwing}deg)`,zIndex:4,boxShadow:'0 7px 10px rgba(55,40,32,.10)'}}/>
    <div style={{position:'absolute',left:-5,top:166,width:25,height:25,background:bodyColor,border:'4px solid #eadfd6',borderRadius:'50%',zIndex:5,transform:`translateZ(9px) rotate(${armSwing}deg)`}}/>
    <div style={{position:'absolute',right:-5,top:166,width:25,height:25,background:bodyColor,border:'4px solid #eadfd6',borderRadius:'50%',zIndex:5,transform:`translateZ(9px) rotate(${-armSwing}deg)`}}/>

    <div style={{position:'absolute',left:73,top:229,width:30,height:62,background:`linear-gradient(90deg,#fff,${bodyColor} 58%,#cdbdb3)`,border:'4px solid #eadfd6',borderRadius:20,transform:`translate3d(${footXA}px,${-liftA}px,2px) rotate(${4+gaitA}deg)`,transformOrigin:'top center',zIndex:0,boxShadow:'5px 7px 10px rgba(55,40,32,.13)'}}/>
    <div style={{position:'absolute',right:73,top:229,width:30,height:62,background:`linear-gradient(90deg,#fff,${bodyColor} 58%,#cdbdb3)`,border:'4px solid #eadfd6',borderRadius:20,transform:`translate3d(${footXB}px,${-liftB}px,2px) rotate(${-4+gaitB}deg)`,transformOrigin:'top center',zIndex:0,boxShadow:'5px 7px 10px rgba(55,40,32,.13)'}}/>
    <div style={{position:'absolute',left:53,top:276,width:63,height:26,background:'linear-gradient(180deg,#9b7a69,#765848)',borderRadius:'50%',transform:`translate3d(${footXA}px,${-liftA}px,4px) rotate(${gaitA/2}deg)`,zIndex:0,boxShadow:'4px 7px 8px rgba(55,40,32,.15)'}}/>
    <div style={{position:'absolute',right:53,top:276,width:63,height:26,background:'linear-gradient(180deg,#9b7a69,#765848)',borderRadius:'50%',transform:`translate3d(${footXB}px,${-liftB}px,4px) rotate(${gaitB/2}deg)`,zIndex:0,boxShadow:'4px 7px 8px rgba(55,40,32,.15)'}}/>

    {sweat&&<><div style={{position:'absolute',right:25,top:76,fontSize:28,zIndex:6,transform:`translateZ(18px) rotate(${Math.sin(walkPhase*1.7)*4}deg)`}}>💦</div><div style={{position:'absolute',right:0,top:105,fontSize:20,zIndex:6,transform:`translateZ(18px) rotate(${Math.sin(walkPhase*1.7+1)*5}deg)`}}>💦</div></>}
    {coffee&&<Coffee/>}{sandwich&&<Sandwich/>}
  </div>;
}

function ElaivaBlock({x,y,rotation=0,scale=1,crushed=false}:{x:number;y:number;rotation?:number;scale?:number;crushed?:boolean}){
  return <div style={{position:'absolute',left:x,top:y,width:480,height:150,background:'linear-gradient(145deg,#ffffff 0%,#f7f0eb 48%,#d8c9c0 100%)',border:'7px solid #2d2622',borderRadius:crushed?'55px 25px 55px 20px':'35px',display:'grid',placeItems:'center',fontSize:76,fontWeight:900,color:BROWN,boxShadow:'0 24px 35px rgba(45,35,30,.22), inset -10px -12px 0 rgba(190,170,158,.16), inset 8px 8px 14px rgba(255,255,255,.65)',transform:`translate(-50%,-50%) rotate(${rotation}deg) scale(${scale})`,zIndex:8,transformStyle:'preserve-3d'}}><span style={{textShadow:'0 3px 1px rgba(80,55,45,.16)'}}>ELåiVA</span></div>;
}

function LinkArms({x1,y1,x2,y2}:{x1:number;y1:number;x2:number;y2:number}){
  const dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy),angle=Math.atan2(dy,dx)*180/Math.PI;
  return <div style={{position:'absolute',left:x1,top:y1,width:len,height:22,background:'linear-gradient(180deg,#fff,#d8c9bf)',border:'4px solid #eadfd6',borderRadius:20,transformOrigin:'left center',transform:`rotate(${angle}deg)`,zIndex:1,boxShadow:'0 7px 10px rgba(55,40,32,.12)'}}/>;
}

function Scene({children}:{children:React.ReactNode}){return <AbsoluteFill style={{fontFamily:'Arial, sans-serif',overflow:'hidden'}}>{children}</AbsoluteFill>}

export default function Reel(){
 const f=useCurrentFrame(); const {fps}=useVideoConfig(); const sec=f/fps;
 const bg=sec<16.33?'#f8eee7':sec<20.33?'#f7f7f7':'#fbf4ed';
 const ease=Easing.inOut(Easing.cubic);

 const introX=interpolate(f,[0,55,90],[-260,540,540],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
 const dropY=interpolate(f,[92,108,120],[-260,100,900],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.in(Easing.cubic)});
 const squish=interpolate(f,[108,120,135],[1,1.18,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.quad)});
 const dragX=interpolate(f,[135,180,250],[540,700,1210],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});

 // Dance only: straight horizontal path, no hopping/rotation, with small alternating steps.
 const danceT=f-250;
 const danceProgress=Math.max(0,Math.min(1,danceT/240));
 const danceTravel=760*Easing.inOut(Easing.cubic)(danceProgress);
 const danceStep=(danceT/72)*Math.PI*2;
 const dancers=[0,1,2,3].map(i=>({x:920-danceTravel-i*185,y:1060,r:0,phase:danceStep+i*Math.PI}));

 const newsIn=interpolate(f,[490,510],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
 const finalStart=610;
 const finalProgress=Math.max(0,Math.min(1,(f-finalStart)/135));
 const finalX=interpolate(f,[610,680,745,780],[600,540,700,700],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
 const finalScale=interpolate(f,[610,680,745],[0.18,0.92,0.92],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
 const finalY=interpolate(f,[610,680],[1040,1120],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
 const mouthOpen=Math.floor((f-620)/5)%2===0 && f<730;

 const words=['Θες','κι','εσύ','AI','Assistants','που','μπορούν','μέχρι','και','να','χορέψουν;'];
 const wordStarts=[620,633,646,659,672,685,698,711,724,737,750];
 let activeWord=-1;
 for(let i=0;i<wordStarts.length;i++){if(f>=wordStarts[i]) activeWord=i;}
 const subtitle=activeWord>=0?words.slice(0,activeWord+1).join(' '):'';

 return <Scene><AbsoluteFill style={{background:bg}}>
  {sec<8.33&&<>
    <Kawaii x={introX} y={1110} scale={.82+.06*Math.sin(f/8)} face={f<110?'surprised':'squished'} sweat={f>=120&&f<250} walkPhase={f/9} humanSteps/>
    {f>=92&&f<135&&<ElaivaBlock x={540} y={dropY} rotation={interpolate(f,[92,108,120],[0,0,3],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.in(Easing.quad)})} scale={squish} crushed/>}
    {f>=120&&f<250&&<><ElaivaBlock x={interpolate(f,[120,135,250],[540,540,1130],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease})} y={1050} rotation={interpolate(f,[120,180,250],[0,-5,7],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease})}/><Kawaii x={dragX-80} y={1160} scale={.82} rotation={interpolate(f,[135,190,250],[0,-9,5],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease})} face="squished" sweat walkPhase={f/9} humanSteps/></>}
  </>}

  {sec>=8.33&&sec<16.33&&<>
    <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',fontSize:130,fontWeight:900,color:BROWN,opacity:.10}}>ELåiVA</div>
    {dancers.map((d,i)=><React.Fragment key={i}>
      <Kawaii x={d.x} y={d.y} scale={i===0?.70:.64} rotation={d.r} armsAround walkPhase={d.phase} humanSteps bodyColor={['#fffaf2','#f7d34b','#9edcff','#9ad66f'][i]}/>
      {i<3&&<LinkArms x1={d.x+(dancers[i+1].x-d.x)*.12} y1={d.y+(dancers[i+1].y-d.y)*.12-15} x2={dancers[i+1].x-(dancers[i+1].x-d.x)*.12} y2={dancers[i+1].y-(dancers[i+1].y-d.y)*.12-15}/>} 
    </React.Fragment>)}
    <div style={{position:'absolute',left:0,right:0,top:250,textAlign:'center',fontSize:38,fontWeight:900,color:BROWN}}>✨ ELåiVA DANCE BREAK ✨</div>
  </>}

  {sec>=16.33&&sec<20.33&&<div style={{position:'absolute',inset:0,background:'#f7f7f7',opacity:newsIn,display:'grid',placeItems:'center',padding:90}}><div style={{width:'100%',border:'5px solid #1f1b19',background:'#fff',boxShadow:'0 30px 80px #0002'}}><div style={{background:'#1f1b19',color:'#fff',padding:'24px 28px',fontSize:34,fontWeight:900}}>BREAKING NEWS</div><div style={{padding:'70px 35px',textAlign:'center'}}><div style={{fontSize:62,fontWeight:900,color:BROWN}}>ELåiVA — T&S COMPANY</div><div style={{marginTop:35,fontSize:31,lineHeight:1.35}}>AI Assistants • Websites • Smart Business Solutions</div></div></div></div>}

  {sec>=20&&<div style={{position:'absolute',inset:0,background:'#fbf4ed'}}>
    <Kawaii x={finalX} y={finalY} scale={finalScale} coffee sandwich walkPhase={f/5} mouthOpen={mouthOpen} humanSteps/>
    {f>=620&&f<760&&<div style={{position:'absolute',left:70,right:70,top:390,minHeight:125,padding:'20px 28px',background:'rgba(255,255,255,.92)',border:'4px solid #eadfd6',borderRadius:30,textAlign:'center',fontSize:43,fontWeight:900,color:BROWN,lineHeight:1.25,boxShadow:'0 15px 35px #0002'}}>{subtitle}</div>}
    {f>=760&&<><div style={{position:'absolute',left:70,right:70,top:350,textAlign:'center',fontSize:40,fontWeight:900,color:BROWN,lineHeight:1.25}}>«Επισκέψου το site μας.»</div><div style={{position:'absolute',left:0,right:0,bottom:130,textAlign:'center',fontSize:30,fontWeight:900,color:BROWN}}>ELåiVA — T&S COMPANY</div><div style={{position:'absolute',left:0,right:0,bottom:80,textAlign:'center',fontSize:20,color:'#6e625b'}}>AI Assistants • Websites • Smart Business Solutions</div></>}
  </div>}
 </AbsoluteFill></Scene>;
}
