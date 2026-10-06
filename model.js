// Browser and Node share these calculations. Original values are retained.
export const groups=['Arachnids','Crustaceans','Insects','Myriapods'];
export const prototypes=[[3,4,4,3,1,4,4],[4,1,4,2,4,1,1],[2,2.5,1,4,1,4,2.5],[1,2.5,4,1,1,4,4]];
// Slide 12, “Scoring Index of KNN”; antenna scores follow its table and the code.
export const indices=[
 {name:'Body segmentation',short:'Segments',key:'Many → 1 · Three → 2 · Two → 3 · Zero → 4'},
 {name:'Antennae',short:'Antennae',key:'Two pairs → 1 · One pair → 2.5 · None → 4'},
 {name:'Wings',short:'Wings',key:'Present → 1 · Absent → 4'},
 {name:'Leg count',short:'Legs',key:'Many → 1 · More than four → 2 · Four → 3 · Three → 4 (pairs inferred from the table)'},
 {name:'Respiration',short:'Respiration',key:'Two source categories: 1 and 4; see README'},
 {name:'Living environment',short:'Environment',key:'Aquatic → 1 · Terrestrial → 4'},
 {name:'Diet',short:'Diet',key:'Omnivore → 1 · Herbivore → 2.5 · Carnivore → 4'}
];
export const beetleScores=[2,2.5,1,4,1,4,2.5];
export const criteria=['Ecological impact','Origin','Spreadability','Economic impact'];
export const originalWeights=[.11030392,.25813635,.56221594,.06934380];
export const exampleScores=[8,7,9,6],comparisonScores=[5,4,3,4];
export function nearest(x){
 if(!Array.isArray(x)||x.length!==7||x.some(v=>!Number.isFinite(v)))throw Error('Seven finite numeric entries required.');
 return prototypes.map((p,i)=>({group:groups[i],id:'ABCD'[i],distance:Math.hypot(...x.map((v,j)=>v-p[j])),contributions:x.map((v,j)=>(v-p[j])**2)})).sort((a,b)=>a.distance-b.distance);
}
export function ahp(matrix){
 const n=matrix.length;if(n!==4||matrix.some(r=>r.length!==n||r.some(v=>!Number.isFinite(v)||v<=0)))throw Error('A positive 4 × 4 matrix is required.');
 let w=Array(n).fill(1/n);
 for(let k=0;k<1000;k++){const v=matrix.map(r=>r.reduce((s,a,j)=>s+a*w[j],0)),sum=v.reduce((s,a)=>s+a,0),next=v.map(a=>a/sum);if(Math.max(...next.map((a,j)=>Math.abs(a-w[j])))<1e-12){w=next;break;}w=next;}
 const aw=matrix.map(r=>r.reduce((s,a,j)=>s+a*w[j],0)),lambda=aw.reduce((s,a,j)=>s+a/w[j],0)/n,ci=(lambda-n)/(n-1),cr=ci/.90;
 return {weights:w,lambda,ci,cr:Math.max(0,cr)};
}
export function score(scores,weights){return scores.reduce((s,v,i)=>s+v*weights[i],0);}
export function sweep(x,feature,delta){
 if(!Number.isInteger(feature)||feature<0||feature>6||!Number.isFinite(delta)||delta<0)throw Error('Invalid sweep.');
 const base=nearest(x)[0].group;
 const points=Array.from({length:101},(_,i)=>{const v=x[feature]-delta+2*delta*i/100,a=x.slice();a[feature]=v;const r=nearest(a);return {value:v,group:r[0].group,distances:groups.map(g=>r.find(q=>q.group===g).distance)};});
 return {base,points,unchanged:points.filter(p=>p.group===base).length/points.length};
}
export function traitKey(legs,antennae,segments){
 if(legs===6&&antennae===1&&segments==='three')return 'Insects';
 if(legs===8&&antennae===0)return 'Arachnids';
 if(legs>8&&antennae===2)return 'Crustaceans';
 if(legs>8&&antennae===1&&segments==='many')return 'Myriapods';
 return 'Indeterminate';
}
