import { getStore } from '@netlify/blobs';

const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
export default async(req)=>{
  if(req.method!=='GET') return json({error:'GET required'},405);
  const password=req.headers.get('x-teacher-password')||'';
  if(!process.env.TEACHER_PASSWORD||password!==process.env.TEACHER_PASSWORD) return json({error:'Құпиясөз қате'},401);
  try{
    const store=getStore('qazaq-quiz-results');
    const listed=await store.list({prefix:'submission/'});
    const rows=(await Promise.all(listed.blobs.map(x=>store.get(x.key,{type:'json',consistency:'strong'})))).filter(Boolean);
    rows.sort((a,b)=>b.score-a.score||new Date(a.submittedAt)-new Date(b.submittedAt));
    return json({rows,top3:rows.slice(0,3)});
  }catch(e){return json({error:'Нәтижелерді оқу мүмкін болмады'},500)}
};

export const config={path:'/api/results'};

