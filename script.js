(function(){
const RATE=43.1;
let t0=Date.now();
function fmt(n){
return n.toLocaleString('pt-BR',{minimumFractionDigits:3,maximumFractionDigits:3});
}
function tick(){
let s=(Date.now()-t0)/1000;
let v=s*RATE;
document.getElementById('counter').textContent=fmt(v);
requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
})();

(function(){
const sliders=[
{id:'s-stream',vid:'v-stream',suffix:'h/sem'},
{id:'s-video',vid:'v-video',suffix:'h/sem'},
{id:'s-ai',vid:'v-ai',suffix:'consultas/dia'},
{id:'s-email',vid:'v-email',suffix:'e-mails/dia'},
{id:'s-social',vid:'v-social',suffix:'h/dia'},
{id:'s-game',vid:'v-game',suffix:'h/sem'},
];
const FACTORS={
stream:0.036,
video:0.015,
ai:0.004,
email:0.007,
social:0.003,
game:0.016,
};
const LABELS={stream:'Streaming',video:'Videochamadas',ai:'Consultas a IA',email:'E-mails',social:'Redes sociais',game:'Games'};
sliders.forEach(s=>{
const el=document.getElementById(s.id);
const vo=document.getElementById(s.vid);
el.addEventListener('input',()=>{vo.textContent=el.value;calc();});
});
function calc(){
const sv=parseFloat(document.getElementById('s-stream').value);
const vv=parseFloat(document.getElementById('s-video').value);
const av=parseFloat(document.getElementById('s-ai').value);
const ev=parseFloat(document.getElementById('s-email').value);
const sov=parseFloat(document.getElementById('s-social').value);
const gv=parseFloat(document.getElementById('s-game').value);
const monthly={
stream:sv*4*FACTORS.stream,
video:vv*4*FACTORS.video,
ai:av*30*FACTORS.ai,
email:ev*30*FACTORS.email,
social:sov*30*FACTORS.social,
game:gv*4*FACTORS.game,
};
const total=Object.values(monthly).reduce((a,b)=>a+b,0);
const yearly=total*12;
document.getElementById('r-month').textContent=total.toFixed(2).replace('.',',');
document.getElementById('r-year').textContent=yearly.toFixed(1).replace('.',',');
const top=Object.entries(monthly).sort((a,b)=>b[1]-a[1])[0];
document.getElementById('r-top').textContent=LABELS[top[0]];
const pct=total>0?Math.round(top[1]/total*100):0;
document.getElementById('r-top-pct').textContent=pct+'% do total';
if(yearly<1){
document.getElementById('r-equiv-val').textContent=(yearly*1000).toFixed(0);
document.getElementById('r-equiv-unit').textContent='g CO₂ / ano';
document.getElementById('r-equiv-text').textContent='Emissão muito baixa';
}else if(yearly<50){
document.getElementById('r-equiv-val').textContent=(yearly/0.9).toFixed(0);
document.getElementById('r-equiv-unit').textContent='km de carro';
document.getElementById('r-equiv-text').textContent='equivalente dirigido por ano';
}else if(yearly<500){
document.getElementById('r-equiv-val').textContent=(yearly/0.255).toFixed(0);
document.getElementById('r-equiv-unit').textContent='árvores/ano';
document.getElementById('r-equiv-text').textContent='necessárias para compensar';
}else{
document.getElementById('r-equiv-val').textContent=(yearly/900).toFixed(1).replace('.',',');
document.getElementById('r-equiv-unit').textContent='voos ida NY→SP';
document.getElementById('r-equiv-text').textContent='equivalentes por ano';
}
}
calc();
})();
