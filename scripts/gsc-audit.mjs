import { readFileSync, readdirSync } from 'node:fs';
import { createSign } from 'node:crypto';
import { homedir } from 'node:os';
const SITE = 'https://the-motivahub.com/';
const D = `${homedir()}/Downloads`;
const key = JSON.parse(readFileSync(`${D}/${readdirSync(D).filter(f=>/^themotivahub1717-.*\.json$/.test(f))[0]}`,'utf8'));
const b64u = (b)=>Buffer.from(b).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const now = Math.floor(Date.now()/1000);
const h=b64u(JSON.stringify({alg:'RS256',typ:'JWT'})), c=b64u(JSON.stringify({iss:key.client_email,scope:'https://www.googleapis.com/auth/webmasters.readonly',aud:'https://oauth2.googleapis.com/token',iat:now,exp:now+3600}));
const si=`${h}.${c}`, sig=createSign('RSA-SHA256').update(si).sign(key.private_key);
const tok=(await (await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion:`${si}.${b64u(sig)}`})})).json()).access_token;
const iso=d=>{const x=new Date();x.setDate(x.getDate()-d);return x.toISOString().slice(0,10)};
const EP=`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;
async function run(body){const r=await fetch(EP,{method:'POST',headers:{Authorization:`Bearer ${tok}`,'Content-Type':'application/json'},body:JSON.stringify(body)});return r.json();}
async function totals(days,off=0){const r=await run({startDate:iso(off+days),endDate:iso(off),dimensions:[]});return r.rows?.[0]||{};}
console.log('=== TREND (impressions / clicks / CTR / position) ===');
for(const [label,days,off] of [['last 7d',7,0],['prior 7d',7,7],['last 14d',14,0],['prior 14d',14,14]]){
  const t=await totals(days,off);
  console.log(`${label.padEnd(10)} ${iso(off+days)}→${iso(off)}  imp=${t.impressions??0}  clicks=${t.clicks??0}  CTR=${t.ctr?(t.ctr*100).toFixed(1)+'%':'-'}  pos=${t.position?t.position.toFixed(1):'-'}`);
}
console.log('\n=== TOP 20 QUERIES (14d) ===');
for(const r of (await run({startDate:iso(14),endDate:iso(0),dimensions:['query'],rowLimit:20})).rows||[]) console.log(`${String(r.clicks).padStart(3)}c ${String(r.impressions).padStart(4)}i ${String(Math.round(r.position)).padStart(3)}p  ${r.keys[0]}`);
console.log('\n=== TOP 15 PAGES by impressions (14d) ===');
for(const r of (await run({startDate:iso(14),endDate:iso(0),dimensions:['page'],rowLimit:15})).rows||[]) console.log(`${String(r.clicks).padStart(3)}c ${String(r.impressions).padStart(4)}i ${String(Math.round(r.position)).padStart(3)}p  ${r.keys[0].replace('https://the-motivahub.com','')}`);
console.log('\n=== COUNTRIES (14d) ===');
for(const r of (await run({startDate:iso(14),endDate:iso(0),dimensions:['country'],rowLimit:10})).rows||[]) console.log(`${String(r.clicks).padStart(3)}c ${String(r.impressions).padStart(4)}i  ${r.keys[0]}`);
console.log('\n=== DEVICES (14d) ===');
for(const r of (await run({startDate:iso(14),endDate:iso(0),dimensions:['device'],rowLimit:10})).rows||[]) console.log(`${String(r.clicks).padStart(3)}c ${String(r.impressions).padStart(4)}i ${String(Math.round(r.position)).padStart(3)}p  ${r.keys[0]}`);
