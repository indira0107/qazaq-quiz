import { getStore } from '@netlify/blobs';

const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8'}});
export default async(req)=>{
  if(req.method!=='POST') return json({error:'POST required'},405);
  try{
    const body=await req.json();
    if(!body.name||typeof body.name!=='string'||!Array.isArray(body.answers)) return json({error:'Invalid submission'},400);
    const item={id:crypto.randomUUID(),name:body.name.trim().slice(0,100),score:Number(body.score)||0,total:Number(body.total)||20,percent:Number(body.percent)||0,answers:body.answers.slice(0,100),submittedAt:new Date().toISOString()};
    const store=getStore('qazaq-quiz-results');
    await store.setJSON('submission/'+item.id,item,{onlyIfNew:true});
    return json({ok:true,id:item.id});
  }catch(e){return json({error:'Нәтижені сақтау мүмкін болмады'},500)}
};

export const config={path:'/api/submit'};

