// SVG charts draw the supplied scores; each axis is a coded index.
export const colors=['#6ac5ef','#f3b968','#7aebaa','#c7a5ff'];
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function radar(input,reference,names,color){
 const cx=300,cy=228,r=155,max=5,n=names.length;
 const point=(i,value)=>{const a=-Math.PI/2+i*2*Math.PI/n;return [cx+Math.cos(a)*r*value/max,cy+Math.sin(a)*r*value/max];};
 const polygon=values=>values.map((v,i)=>point(i,v).join(',')).join(' ');
 let s='<svg viewBox="0 0 600 455" role="img" aria-label="Seven scoring indices: your input compared with a reference"><title>Input and reference scores on seven independent axes, from zero to five</title>';
 for(let v=1;v<=max;v++)s+=`<polygon class="radar-ring" points="${polygon(Array(n).fill(v))}"/><text class="ring-label" x="${cx+8}" y="${cy-r*v/max+5}">${v}</text>`;
 names.forEach((name,i)=>{const p=point(i,max),a=-Math.PI/2+i*2*Math.PI/n,q=[cx+Math.cos(a)*(r+34),cy+Math.sin(a)*(r+30)];s+=`<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${p[0]}" y2="${p[1]}"/><text class="radar-label" x="${q[0]}" y="${q[1]+5}" text-anchor="${Math.abs(q[0]-cx)<10?'middle':q[0]>cx?'start':'end'}">${safe(name)}</text>`;});
 s+=`<polygon class="reference-shape" points="${polygon(reference)}" fill="${color}" stroke="${color}"/><polygon class="input-shape" points="${polygon(input)}" fill="#e7f9ff" stroke="#e7f9ff"/>`;
 input.forEach((v,i)=>{const p=point(i,v);s+=`<circle class="radar-point" tabindex="0" cx="${p[0]}" cy="${p[1]}" r="5"><title>${safe(names[i])}: input ${v}; reference ${reference[i]}</title></circle>`;});
 return s+'</svg>';
}
export function heatmap(rows,names){
 return `<div class="table-wrap"><table class="heatmap"><thead><tr><th>Reference / sample</th>${names.map((n,i)=>`<th title="${safe(n.name)}"><span class="index-number">${i+1}</span>${safe(n.short)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr><th>${safe(row.name)}</th>${row.values.map((v,i)=>`<td style="--cell-strength:${v/5}" title="${safe(row.name)} · ${safe(names[i].name)}: ${v}"><span>${v}</span></td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
export function donut(weights,labels){
 const radius=78,circumference=2*Math.PI*radius;let offset=0;
 let svg='<svg viewBox="0 0 220 220" role="img" aria-label="AHP criterion weights"><title>AHP criterion weights</title><circle cx="110" cy="110" r="78" fill="none" stroke="#183c40" stroke-width="23"/>';
 weights.forEach((v,i)=>{const length=v*circumference;svg+=`<circle class="donut-arc" cx="110" cy="110" r="78" fill="none" stroke="${colors[i]}" stroke-width="23" stroke-dasharray="${length} ${circumference-length}" stroke-dashoffset="${-offset}" transform="rotate(-90 110 110)"><title>${safe(labels[i])}: ${(v*100).toFixed(1)}%</title></circle>`;offset+=length;});
 return svg+'<text x="110" y="104" text-anchor="middle" class="donut-total">100%</text><text x="110" y="129" text-anchor="middle" class="donut-caption">total weight</text></svg>';
}
export function distanceChart(series,labels,{xMin,xMax,yMax,xTitle}){
 const W=850,H=340,L=57,R=25,T=25,B=65,pw=W-L-R,ph=H-T-B;
 const xx=v=>xMax===xMin?L+pw/2:L+(v-xMin)/(xMax-xMin)*pw,yy=v=>T+ph-v/yMax*ph;
 let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Euclidean distance as ${safe(xTitle)} varies"><title>Euclidean distance as ${safe(xTitle)} varies</title><defs><linearGradient id="curve-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#7aebaa" stop-opacity=".12"/><stop offset="1" stop-color="#7aebaa" stop-opacity="0"/></linearGradient></defs>`;
 for(let i=0;i<=4;i++){const v=yMax*i/4;s+=`<line class="grid" x1="${L}" x2="${W-R}" y1="${yy(v)}" y2="${yy(v)}"/><text x="${L-10}" y="${yy(v)+5}" text-anchor="end">${v.toFixed(1)}</text>`;}
 (xMax===xMin?labels.slice(0,1):labels).forEach(a=>s+=`<text x="${xx(a.value)}" y="${H-36}" text-anchor="middle">${safe(a.label)}</text>`);
 for(const seriesRow of series){const pts=seriesRow.points.map(p=>[xx(p[0]),yy(p[1])]);s+=`<polyline class="distance-curve" fill="none" stroke="${seriesRow.color}" stroke-width="3" points="${pts.map(p=>p.join(',')).join(' ')}"><title>${safe(seriesRow.name)}</title></polyline>`;
  for(let i=0;i<seriesRow.points.length;i+=10){const v=seriesRow.points[i],p=pts[i];s+=`<circle class="curve-point" cx="${p[0]}" cy="${p[1]}" r="4" fill="${seriesRow.color}"><title>${safe(seriesRow.name)}: score ${v[0].toFixed(2)}, distance ${v[1].toFixed(3)}</title></circle>`;}}
 const mid=(xMin+xMax)/2;s+=`<line class="baseline-line" x1="${xx(mid)}" x2="${xx(mid)}" y1="${T}" y2="${T+ph}"/><text class="baseline-label" x="${xx(mid)}" y="16" text-anchor="middle">Current score</text><text x="${W/2}" y="${H-5}" text-anchor="middle">${safe(xTitle)} score</text></svg>`;
 return s;
}
