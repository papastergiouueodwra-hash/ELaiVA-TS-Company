import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

const CREAM = '#fffaf2';
const PINK = '#f4c6d7';
const BROWN = '#6f5145';
const DARK = '#3d332f';
const BORDER = '#eadfd6';

type KawaiiProps = {
  x:number; y:number; scale?:number; rotation?:number;
  face?:'happy'|'surprised'|'squished'; sweat?:boolean;
  coffee?:boolean; sandwich?:boolean; walkPhase?:number;
  mouthOpen?:boolean; armsAround?:boolean;
};

function Ear({side}:{side:'left'|'right'}) {
  return <div style={{position:'absolute',left:side==='left'?48:158,top:-35,width:52,height:125,
    background:`linear-gradient(135deg,#fff ${side==='left'?'20%':'70%'},${CREAM} 65%)`,
    border:`5px solid ${BORDER}`,borderRadius:'58% 58% 45% 45%',
    transform:`rotate(${side==='left'?-15:15}deg)`,zIndex:0,
    boxShadow:'inset -7px -10px 0 #e5d6cd'}}>
    <div style={{position:'absolute',inset:11,borderRadius:'inherit',background:PINK,opacity:.72}} />
  </div>;
}

function Coffee(){return <div style={{position:'absolute',left:-48,top:118,width:72,height:76,zIndex:8}}>
  <div style={{position:'absolute',left:5,top:12,width:47,height:52,background:'linear-gradient(90deg,#fff,#f4eee8)',border:'4px solid #8a6a5a',borderRadius:'8px 8px 14px 14px',boxShadow:'inset -6px -5px #d8c5ba'}}/>
  <div style={{position:'absolute',left:44,top:23,width:23,height:26,border:'4px solid #8a6a5a',borderLeft:0,borderRadius:'0 15px 15px 0'}}/>
  <div style={{position:'absolute',left:12,top:5,width:35,height:15,background:'#6d4b3a',borderRadius:'50%'}}/>
  <div style={{position:'absolute',left:18,top:-14,width:5,height:24,background:'#c7a38f',borderRadius:10,transform:'rotate(-8deg)'}}/>
  <div style={{position:'absolute',left:31,top:-17,width:5,height:27,background:'#c7a38f',borderRadius:10,transform:'rotate(8deg)'}}/>
</div>}

function Sandwich(){return <div style={{position:'absolute',right:-72,top:120,width:78,height:58,zIndex:8,transform:'rotate(-8deg)'}}>
  <div style={{position:'absolute',left:0,top:7,width:74,height:27,background:'linear-gradient(#f4ce8b,#d99f56)',border:'4px solid #9b6d42',borderRadius:'13px 13px 5px 5px'}}/>
  <div style={{position:'absolute',left:5,top:29,width:64,height:14,background:'#79a85c',borderRadius:5}}/>
  <div style={{position:'absolute',left:3,top:40,width:68,height:13,background:'#e8b3a0',border:'3px solid #9b6d42',borderRadius:'4px 4px 10px 10px'}}/>
</div>}

function Kawaii({x,y,scale=1,rotation=0,face='happy',sweat=false,coffee=false,sandwich=false,walkPhase=0,mouthOpen=false,armsAround=false}:KawaiiProps){
  // A proper alternating walk: one leg reaches forward while the other goes back,
  // then they swap. The feet also move in X/Y so the character does not look dragged.
  const s=Math.sin(walkPhase);
  const c=Math.cos(walkPhase);
  const leftLegRot=20*s;
  const rightLegRot=-20*s;
  const leftFootX=18*s;
  const rightFootX=-18*s;
  const leftFootY=Math.max(0,-c)*10;
  const rightFootY=Math.max(0,c)*10;
  const bodyBob=Math.abs(s)*3;

  return <div style={{position:'absolute',left:x,top:y+bodyBob,transform:`translate(-50%,-50%) scale(${scale}) rotate(${rotation}deg)`,width:250,height:310,zIndex:2,perspective:600}}>
    <Ear side="left"/><Ear side="right"/>
    <div style={{position:'absolute',left:20,top:38,width:210,height:205,
      background:'radial-gradient(circle at 35% 25%,#ffffff 0,#fffaf2 55%,#eadfd6 100%)',
      border:`5px solid ${BORDER}`,borderRadius:'46% 46% 42% 42%',
      boxShadow:'inset -14px -18px 0 rgba(190,165,150,.20), 0 18px 35px #0003',zIndex:1,
      transform:'rotateX(4deg)'}}/>
    <div style={{position:'absolute',left:55,top:118,width:24,height:34,background:DARK,borderRadius:20,zIndex:2,boxShadow:'3px 3px 0 #241d1a'}}/>
    <div style={{position:'absolute',right:55,top:118,width:24,height:34,background:DARK,borderRadius:20,zIndex:2,boxShadow:'3px 3px 0 #241d1a'}}/>
    <div style={{position:'absolute',left:112,top:153,width:mouthOpen?34:28,height:mouthOpen?28:18,background:mouthOpen?DARK:'transparent',borderBottom:mouthOpen?'0':'5px solid #3d332f',borderRadius:'0 0 30px 30px',zIndex:3}}/>
    <div style={{position:'absolute',left:45,top:155,width:35,height:18,background:'#f3aebc',borderRadius:50,opacity:.65,zIndex:2}}/>
    <div style={{position:'absolute',right:45,top:155,width:35,height:18,background:'#f3aebc',borderRadius:50,opacity:.65,zIndex:2}}/>
    {face==='surprised'&&<div style={{position:'absolute',left:108,top:147,width:34,height:42,border:'5px solid #3d332f',borderRadius:'50%',zIndex:3}}/>}
    {face==='squished'&&<><div style={{position:'absolute',left:58,top:132,width:28,height:8,background:DARK,borderRadius:8,transform:'rotate(18deg)',zIndex:3}}/><div style={{position:'absolute',right:58,top:132,width:28,height:8,background:DARK,borderRadius:8,transform:'rotate(-18deg)',zIndex:3}}/></>}

    <div style={{position:'absolute',left:-12,top:166,width:86,height:25,background:'linear-gradient(#fff,#eee4dc)',border:`4px solid ${BORDER}`,borderRadius:30,transform:`rotate(${armsAround?-8:-12}deg)`,zIndex:4}}/>
    <div style={{position:'absolute',right:-12,top:166,width:86,height:25,background:'linear-gradient(#fff,#eee4dc)',border:`4px solid ${BORDER}`,borderRadius:30,transform:`rotate(${armsAround?8:12}deg)`,zIndex:4}}/>
    <div style={{position:'absolute',left:-5,top:166,width:25,height:25,background:CREAM,border:`4px solid ${BORDER}`,borderRadius:'50%',zIndex:5}}/>
    <div style={{position:'absolute',right:-5,top:166,width:25,height:25,background:CREAM,border:`4px solid ${BORDER}`,borderRadius:'50%',zIndex:5}}/>

    <div style={{position:'absolute',left:73,top:229,width:30,height:62,background:'linear-gradient(90deg,#fff,#eee5dd)',border:`4px solid ${BORDER}`,borderRadius:20,transform:`rotate(${leftLegRot}deg)`,transformOrigin:'top center',zIndex:0}}/>
    <div style={{position:'absolute',right:73,top:229,width:30,height:62,background:'linear-gradient(90deg,#fff,#eee5dd)',border:`4px solid ${BORDER}`,borderRadius:20,transform:`rotate(${rightLegRot}deg)`,transformOrigin:'top center',zIndex:0}}/>
    <div style={{position:'absolute',left:53,top:276,width:63,height:26,background:'#8b6b5b',borderRadius:'50%',transform:`translateX(${leftFootX}px) translateY(${leftFootY}px) rotate(${leftLegRot/2}deg)`,zIndex:0}}/>
    <div style={{position:'absolute',right:53,top:276,width:63,height:26,background:'#8b6b5b',borderRadius:'50%',transform:`translateX(${rightFootX}px) translateY(${rightFootY}px) rotate(${rightLegRot/2}deg)`,zIndex:0}}/>

    {sweat&&<><div style={{position:'absolute',right:25,top:76,fontSize:28,zIndex:6}}>💦</div><div style={{position:'absolute',right:0,top:105,fontSize:20,zIndex:6}}>💦</div></>}
    {coffee&&<Coffee/>}{sandwich&&<Sandwich/>}
  </div>;
}

function ElaivaBlock({x,y,rotation=0,scale=1,crushed=false}:{x:number;y:number;rotation?:number;scale?:number;crushed?:boolean}){
  return <div style={{position:'absolute',left:x,top:y,width:480,height:150,background:'linear-gradient(180deg,#fff,#f4eee9)',border:'7px solid #2d2622',borderRadius:crushed?'55px 25px 55px 20px':'35px',display:'grid',placeItems:'center',fontSize:76,fontWeight:900,color:BROWN,boxShadow:'0 20px 30px #0003',transform:`translate(-50%,-50%) rotate(${rotation}deg) scale(${scale})`,zIndex:8}}><span>ELåiVA</span></div>;
}

function LinkArms({x1,y1,x2,y2}:{x1:number;y1:number;x2:number;y2:number}){
  const dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy),angle=Math.atan2(dy,dx)*180/Math.PI;
  return <div style={{position:'absolute',left:x1,top:y1,width:len,height:22,background:'linear-gradient(#fff,#e9ddd5)',border:`4px solid ${BORDER}`,borderRadius:20,transformOrigin:'left center',transform:`rotate(${angle}deg)`,zIndex:1}}/>;
}

function Scene({children}:{children:React.ReactNode}){return <AbsoluteFill style={{fontFamily:'Arial, sans-serif',overflow:'hidden'}}>{children}</AbsoluteFill>}

export default function Reel(){
 const f=useCurrentFrame();
 const sec=f/30;
 const bg=sec<16.33?'#f8eee7':sec<20.33?'#f7f7f7':'#fbf4ed';

 const introX=interpolate(f,[0,55,90],[-260,540,540],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const introWalk=interpolate(f,[0,90],[0,Math.PI*7],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const dropY=interpolate(f,[92,108,120],[-260,100,900],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const squish=interpolate(f,[108,120,135],[1,1.18,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const dragX=interpolate(f,[135,180,250],[540,700,1210],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});

 // 8 seconds: four characters travel around a circle. Every 24 frames they
 // alternate a clear forward step and a lifted/back leg, like a simple tsamiko.
 const danceT=f-250;
 const circleAngle=Math.max(0,Math.min(1,danceT/240))*Math.PI*4;
 const centerX=540,centerY=1070,radiusX=300,radiusY=270;
 const dancers=[0,1,2,3].map(i=>{const a=circleAngle+i*Math.PI/2;return{x:centerX+radiusX*Math.cos(a),y:centerY+radiusY*Math.sin(a),r:(a*180/Math.PI)+90,a};});
 const danceStep=(danceT/4)*Math.PI*2;

 const newsIn=interpolate(f,[490,510],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});

 // Full final CTA. It is intentionally long enough to be visible in the Player.
 const finalStart=610;
 const finalX=interpolate(f,[610,680,745,780],[180,540,720,1250],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const finalScale=interpolate(f,[610,680,745],[0.14,0.92,0.92],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const finalY=interpolate(f,[610,680,745],[1100,1120,1120],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const finalWalk=interpolate(f,[610,745],[0,Math.PI*8],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const mouthOpen=f>=620&&f<755&&Math.floor((f-620)/4)%2===0;

 const words=['Θες','κι','εσύ','AI','Assistants','που','μπορούν','μέχρι','και','να','χορέψουν;'];
 const wordStarts=[620,633,646,659,672,685,698,711,724,737,750];
 let activeWord=-1;
 for(let i=0;i<wordStarts.length;i++){if(f>=wordStarts[i]) activeWord=i;}
 const subtitle=activeWord>=0?words.slice(0,activeWord+1).join(' '):'';

 return <Scene><AbsoluteFill style={{background:bg}}>
  {sec<8.33&&<>
    <Kawaii x={introX} y={1110} scale={.82+.06*Math.sin(f/8)} face={f<110?'surprised':'squished'} sweat={f>=120&&f<250} walkPhase={introWalk}/>
    {f>=92&&f<135&&<ElaivaBlock x={540} y={dropY} rotation={interpolate(f,[92,108,120],[0,0,3],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})} scale={squish} crushed/>}
    {f>=120&&f<250&&<><ElaivaBlock x={dragX} y={1050} rotation={interpolate(f,[120,180,250],[0,-5,7],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}/><Kawaii x={dragX-80} y={1160} scale={.82} rotation={interpolate(f,[135,190,250],[0,-9,5],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})} face="squished" sweat walkPhase={(f-135)/2}/></>}
  </>}

  {sec>=8.33&&sec<16.33&&<>
    <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',fontSize:130,fontWeight:900,color:BROWN,opacity:.10}}>ELåiVA</div>
    {dancers.map((d,i)=>{const next=dancers[(i+1)%4]; const phase=danceStep+i*Math.PI; const stepForward=Math.sin(phase); const lift=Math.max(0,Math.cos(phase)); const tangentX=-Math.sin(d.a)*stepForward*24; const tangentY=Math.cos(d.a)*stepForward*18; return <React.Fragment key={i}>
      <Kawaii x={d.x+tangentX} y={d.y+tangentY+55*Math.sin(f/4+i)} scale={i%2?.64:.70} rotation={d.r+8*stepForward} armsAround walkPhase={phase} />
      <LinkArms x1={d.x+(next.x-d.x)*.12} y1={d.y+(next.y-d.y)*.12-15} x2={next.x-(next.x-d.x)*.12} y2={next.y-(next.y-d.y)*.12-15}/>
    </React.Fragment>})}
    <div style={{position:'absolute',left:0,right:0,top:250,textAlign:'center',fontSize:38,fontWeight:900,color:BROWN}}>✨ ELåiVA DANCE BREAK ✨</div>
    <div style={{position:'absolute',left:0,right:0,bottom:190,textAlign:'center',fontSize:30,fontWeight:800,color:'#8b7569'}}>Βήμα μπροστά • σηκώνει πόδι • αλλάζει • ξανά!</div>
  </>}

  {sec>=16.33&&sec<20.33&&<div style={{position:'absolute',inset:0,background:'#f7f7f7',opacity:newsIn,display:'grid',placeItems:'center',padding:90}}><div style={{width:'100%',border:'5px solid #1f1b19',background:'#fff',boxShadow:'0 30px 80px #0002'}}><div style={{background:'#1f1b19',color:'#fff',padding:'24px 28px',fontSize:34,fontWeight:900}}>BREAKING NEWS</div><div style={{padding:'70px 35px',textAlign:'center'}}><div style={{fontSize:62,fontWeight:900,color:BROWN}}>ELåiVA — T&S COMPANY</div><div style={{marginTop:35,fontSize:38,fontWeight:800,color:DARK}}>AI Assistants • Websites • Smart Business Solutions</div></div></div></div>}

  {sec>=20.33&&<>
    <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 50% 40%,#fffaf5,#fbf4ed 65%,#f2e3da)'}}/>
    <div style={{position:'absolute',left:0,right:0,top:170,textAlign:'center',fontSize:42,fontWeight:900,color:BROWN}}>ELåiVA — T&S COMPANY</div>
    <Kawaii x={finalX} y={finalY} scale={finalScale} walkPhase={finalWalk} coffee sandwich mouthOpen={mouthOpen}/>
    {subtitle&&<div style={{position:'absolute',left:55,right:55,bottom:300,textAlign:'center',fontSize:54,fontWeight:900,color:'#fff',textShadow:'0 4px 14px #000, 0 0 3px #000',lineHeight:1.12}}>{subtitle}</div>}
    {f>=755&&<div style={{position:'absolute',left:55,right:55,bottom:205,textAlign:'center',fontSize:42,fontWeight:900,color:BROWN,background:'#ffffffdd',border:`4px solid ${BORDER}`,borderRadius:28,padding:'20px 18px'}}>Επισκέψου το site μας.</div>}
    {f>=755&&<div style={{position:'absolute',left:0,right:0,bottom:115,textAlign:'center',fontSize:28,fontWeight:800,color:'#8b7569'}}>AI Assistants • Websites • Smart Business Solutions</div>}
  </>}
 </AbsoluteFill></Scene>;
}
