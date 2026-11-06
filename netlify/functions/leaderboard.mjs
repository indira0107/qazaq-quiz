import { getStore } from '@netlify/blobs';
export default async()=>{
  try{
    const store=getStore('qazaq-quiz-results');
    const listed=await store.list({prefix:'submission/'});
    const rows=(await Promise.all(listed.blobs.map(x=>store.get(x.key,{type:'json'})))).filter(Boolean);
    rows.sort((a,b)=>b.score-a.score||new Date(a.submittedAt)-new Date(b.submittedAt));
    return Response.json({top3:rows.slice(0,3).map(x=>({name:x.name,score:x.score,total:x.total,percent:x.percent}))},{headers:{'cache-control':'no-store'}});
  }catch(e){return Response.json({top3:[]})}
};
export const config={path:'/api/leaderboard'};

