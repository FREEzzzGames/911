export const createBattleData=()=>({obstacles:[[4,3],[4,4],[4,5],[2,4],[6,4]],units:[
{id:'obsidian',name:'OBSIDIAN',team:'blue',q:1,r:6,hp:2600,maxHp:2600,ap:2,mp:3,atk:390,def:360},
{id:'red-eye',name:'RED EYE',team:'blue',q:1,r:7,hp:1900,maxHp:1900,ap:2,mp:4,atk:520,def:190},
{id:'void-priest',name:'VOID PRIEST',team:'blue',q:2,r:7,hp:2000,maxHp:2000,ap:2,mp:3,atk:390,def:260},
{id:'brood',name:'BROODMOTHER',team:'red',q:7,r:1,hp:2300,maxHp:2300,ap:2,mp:3,atk:370,def:300},
{id:'titan',name:'TITAN CORE',team:'red',q:7,r:2,hp:2800,maxHp:2800,ap:2,mp:2,atk:420,def:390},
{id:'neon',name:'NEON ROGUE',team:'red',q:6,r:1,hp:1850,maxHp:1850,ap:2,mp:5,atk:510,def:190}
]});
export const hexDistance=(a,b)=>{const dq=a.q-b.q,dr=a.r-b.r;return(Math.abs(dq)+Math.abs(dr)+Math.abs(dq+dr))/2};
const dirs=[[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]];
export function findHexPath(start,end,obstacles,units){
 const key=(q,r)=>q+','+r,blocked=new Set(obstacles.map(([q,r])=>key(q,r)));
 units.forEach(u=>{if(!(u.q===start.q&&u.r===start.r))blocked.add(key(u.q,u.r));});
 const open=[{q:start.q,r:start.r,g:0,f:hexDistance(start,end),prev:null}],seen=new Map();
 while(open.length){open.sort((a,b)=>a.f-b.f);const cur=open.shift(),k=key(cur.q,cur.r);if(seen.has(k))continue;seen.set(k,cur);
  if(cur.q===end.q&&cur.r===end.r){const path=[];for(let n=cur;n;n=n.prev)path.unshift({q:n.q,r:n.r});return path;}
  for(const [dq,dr] of dirs){const q=cur.q+dq,r=cur.r+dr,nk=key(q,r);if(q<0||r<0||q>8||r>8||blocked.has(nk)||seen.has(nk))continue;const g=cur.g+1;open.push({q,r,g,f:g+hexDistance({q,r},end),prev:cur});}
 }return [];
}
