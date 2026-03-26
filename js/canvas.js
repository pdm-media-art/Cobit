/* ═══ LOGIN BACKGROUND — Digital Web ═══ */
(function(){
  const canvas=document.getElementById('loginWebCanvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const N=90, DIST=155, SPEED=0.35;
  const TEAL='20,184,166', PURPLE='167,139,250', ORANGE='249,115,22';
  let nodes=[], raf;

  function resize(){
    canvas.width=canvas.offsetWidth||window.innerWidth;
    canvas.height=canvas.offsetHeight||window.innerHeight;
  }
  function mkNode(){
    const palettes=[TEAL,TEAL,TEAL,TEAL,TEAL,PURPLE,ORANGE];
    return{
      x:Math.random()*canvas.width, y:Math.random()*canvas.height,
      vx:(Math.random()-.5)*SPEED, vy:(Math.random()-.5)*SPEED,
      r:Math.random()*1.6+.6,
      col:palettes[Math.floor(Math.random()*palettes.length)],
      phase:Math.random()*Math.PI*2,
      hub:Math.random()<.06
    };
  }
  function init(){ nodes=[]; for(let i=0;i<N;i++) nodes.push(mkNode()); }

  function draw(t){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // move
    nodes.forEach(n=>{
      n.x+=n.vx; n.y+=n.vy;
      if(n.x<0||n.x>canvas.width) n.vx*=-1;
      if(n.y<0||n.y>canvas.height) n.vy*=-1;
    });
    // lines
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<DIST){
          const a=(1-d/DIST)*.45;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x,nodes[i].y);
          ctx.lineTo(nodes[j].x,nodes[j].y);
          ctx.strokeStyle=`rgba(${TEAL},${a})`;
          ctx.lineWidth=nodes[i].hub||nodes[j].hub?.9:.4;
          ctx.stroke();
        }
      }
    }
    // dots
    nodes.forEach(n=>{
      const pulse=1+.4*Math.sin(t*.0018+n.phase);
      const r=n.r*(n.hub?2.2:1)*pulse;
      // glow halo
      const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,r*5);
      g.addColorStop(0,`rgba(${n.col},.55)`);
      g.addColorStop(1,`rgba(${n.col},0)`);
      ctx.beginPath(); ctx.arc(n.x,n.y,r*5,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill();
      // core
      ctx.beginPath(); ctx.arc(n.x,n.y,r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${n.col},.9)`; ctx.fill();
    });
    raf=requestAnimationFrame(draw);
  }

  // pause when overlay hidden (perf)
  const obs=new MutationObserver(()=>{
    if(document.getElementById('loginOverlay')?.classList.contains('hidden')){
      cancelAnimationFrame(raf);
    } else {
      raf=requestAnimationFrame(draw);
    }
  });
  const overlay=document.getElementById('loginOverlay');
  if(overlay) obs.observe(overlay,{attributes:true,attributeFilter:['class']});
  window.addEventListener('resize',()=>{ resize(); init(); });
  resize(); init(); raf=requestAnimationFrame(draw);
})();
