// Vérifie stockage des médias, migration, nettoyage, export/import ZIP de index.html : node test-zip.js
const fs=require('fs'),assert=require('assert'),h=fs.readFileSync(__dirname+'/index.html','utf8');
const cut=(a,b)=>{const i=h.indexOf(a),j=h.indexOf(b,i);assert(i>=0&&j>i,'repère introuvable : '+a);return h.slice(i,j)};
const b64=x=>Buffer.from(x).toString('base64'),U=(m,x)=>`data:${m};base64,`+b64(x);
eval(`
const wire=t=>{const {tickets,su,...w}=t;return w};
let T=null;const esc=x=>x,ticketsUI=()=>{};const live={peer:null,conns:[],dids:{}},ME={name:'t'};const send=()=>{};
const trees={},media={},parts={};let puts=0,saves=0;const toasts=[];let renders=0;const toast=m=>toasts.push(m),render=()=>renders++,$=()=>null,$$=()=>[];const IDBKeyRange={bound:(a,b)=>({a,b})};
const tx=async(m,f,st='trees')=>{const o=st==='media'?media:st==='parts'?parts:trees,r=f({getAll:g=>({result:Object.entries(o).filter(([k])=>!g||(k>=g.a&&k<=g.b)).map(([,v])=>structuredClone(v))}),put:v=>{o[v.k||v.id]=structuredClone(v);if(st==='media')puts++},delete:id=>{delete o[id]}});return r&&r.result};
const allTrees=()=>tx('readonly',s=>s.getAll()),saveTree=async t=>{saves++;trees[t.id]=structuredClone(t)};
const toUrl=async(b,t)=>'data:'+t+';base64,'+Buffer.from(b).toString('base64');
const confirm=()=>true;
`+cut('const safeAudio','function normP')+cut('/* ---------- médias :','/* ---------- dates')+cut('/* ---------- export : un ZIP unique','const zipName=')+cut('const guestConn=','const tell=')+`const get=id=>{const p=T&&T.persons[id];return p&&!p.del?p:null};`+cut('const tkCounts=','const CAN_SHARE')+cut('const MEDIA=','const resize=')+cut('async function readZip',"$('#imp').addEventListener")+`
;(async()=>{
 const id=async x=>sha(Buffer.from(x)),sameId=/^[0-9a-f]{64}$/;
 // --- migration : ancien format (médias dans les fiches, y compris dans un ticket) -> médias à part, sans perte, relançable
 trees.t1={id:'t1',name:'A',persons:{a:{id:'a',photo:U('image/jpeg','PHOTO'),voice:U('audio/webm;codecs=opus','VOIX')},b:{id:'b',photo:U('image/jpeg','PHOTO'),voice:''}},tickets:[{after:{id:'a',photo:U('image/png','AUTRE'),voice:''}}]};
 await loadMedia();await migrate();
 const a=trees.t1.persons.a,b=trees.t1.persons.b,tk=trees.t1.tickets[0].after;
 assert.ok(sameId.test(a.photo)&&sameId.test(a.voice)&&sameId.test(tk.photo),'ids SHA-256');
 assert.strictEqual(a.photo,b.photo,'même contenu = même identifiant');assert.strictEqual(a.photo,await id('PHOTO'));
 assert.strictEqual(Object.keys(media).length,3,'un média par contenu distinct');
 const s0=saves;await migrate();assert.strictEqual(saves,s0,'migration idempotente');
 // --- nettoyage
 trees.t1.persons.b.photo='';trees.t1.persons.a.photo='';await putBytes(await id('ORPHELIN'),Buffer.from('ORPHELIN'),'image/jpeg');
 T={};await gc();assert.ok(MC.has(await id('ORPHELIN')),'jamais avec un arbre ouvert');T=null;live.peer={};await gc();assert.ok(MC.has(await id('ORPHELIN')),'jamais pendant une session');live.peer=null;
 await gc();assert.ok(!MC.has(await id('ORPHELIN'))&&!media[await id('ORPHELIN')],'orphelin supprimé');
 assert.ok(MC.has(tk.photo)&&MC.has(a.voice),'médias référencés (fiche, ticket) conservés');assert.ok(!MC.has(await id('PHOTO')),'photo plus référencée supprimée');
 // --- réception en ligne : image/audio acceptés, autre type refusé
 const p=await ingestP({photo:U('image/jpeg','RECU'),voice:U('text/html','<script>')});assert.ok(sameId.test(p.photo));assert.strictEqual(p.voice,'');
 const n=puts;await putMedia(new Blob(['RECU'],{type:'image/jpeg'}));assert.strictEqual(puts,n,'média déjà présent : pas réécrit');
 // --- export : un seul fichier par contenu, empreintes = contenu, média manquant signalé
 const ph=await putMedia(new Blob(['PHOTO'],{type:'image/jpeg'})),vo=await putMedia(new Blob(['VOIX'],{type:'audio/webm;codecs=opus'}));
 T={name:'Test',persons:{a:{id:'a',first:'Jean',last:'Dupont',birth:'1952',u:0,photo:ph,voice:vo},b:{id:'b',first:'Jean',last:'Dupont',birth:'1952',u:0,photo:ph,voice:'f'.repeat(64)}}};
 assert.strictEqual(missingMedia(),1);
 const files=await readZip(await(await buildZip()).arrayBuffer()),o=JSON.parse(new TextDecoder().decode(files.get('arbre.json')));
 assert.strictEqual([...files.keys()].filter(n=>n.includes('/')).length,2,'une photo partagée = un seul fichier');
 for(const k of Object.keys(o.media))assert.strictEqual(await sha(files.get(o.media[k].file)),k,'empreinte = contenu');
 // --- import : comparatif (appareil a,b,c,d ; fichier a,b,d ancienne, e nouvelle, f modifiée)
 const byId=new Map();for(const x of ['A','NEW','F1','F2','E1','E2','D1'])byId.set(await id(x),Buffer.from(x));await putBytes(await id('F1'),Buffer.from('F1'),'image/jpeg');
 const P=(i,u,x={})=>({id:i,u,photo:'',voice:'',...x});
 const local={mu:1,persons:{a:P('a',10,{photo:await id('A')}),b:P('b',10),c:P('c',20),d:P('d',30,{del:true}),f:P('f',10,{photo:await id('F1')})}};
 const file={tree:{mu:1,persons:{a:P('a',10,{photo:await id('A')}),b:P('b',10),d:P('d',5,{photo:await id('D1')}),e:P('e',40,{photo:await id('E1'),voice:await id('E2')}),f:P('f',50,{photo:await id('F2'),voice:await id('NEW')})}}};
 const d=await importDiff(local,file,byId);
 assert.deepStrictEqual({add:d.add,upd:d.upd,gone:d.gone,only:d.only,ma:d.ma,mm:d.mm,mr:d.mr,newer:d.newer},{add:1,upd:1,gone:1,only:1,ma:3,mm:1,mr:0,newer:0},JSON.stringify(d));
 assert.strictEqual((await importDiff(local,{tree:{mu:1,persons:{a:file.tree.persons.a}}},byId)).add,0,'même contenu = rien à importer');
 // --- rangement des médias importés : présent = pas réécrit ; absent partout = appareil (fusion) ou vide (remplacement)
 const E1=await id('E1'),ps1=[P('e',1,{photo:E1}),P('x',1,{photo:'0'.repeat(64)})],n2=puts;
 await storeMedia(ps1,byId,{[E1]:{type:'image/jpeg'}},{persons:{x:{photo:'1'.repeat(64)}}},true);
 assert.ok(MC.has(E1)&&puts===n2+1,'média du fichier rangé');assert.strictEqual(ps1[1].photo,'1'.repeat(64),'fusion : celui de l’appareil');
 const ps2=[P('x',1,{photo:'0'.repeat(64)})];await storeMedia(ps2,byId,{},{persons:{x:{photo:'1'.repeat(64)}}},false);assert.strictEqual(ps2[0].photo,'','remplacement : vide');
 await storeMedia([P('e',1,{photo:E1})],byId,{},null,true);assert.strictEqual(puts,n2+1,'déjà présent : pas réécrit');
 assert.ok(h.includes('await storeMedia('),"l'import doit appeler storeMedia");
 // --- transfert des médias entre appareils (hôte simulé, morceaux de 48 Ko)
 const big=Buffer.alloc(150000);for(let i=0;i<big.length;i++)big[i]=(i*7+3)%251;const bid=await sha(big),hostM=new Map();
 const hostAdd=(bytes,type='audio/webm')=>{const url=URL.createObjectURL(new Blob([bytes],{type}));hostM.set(bytes===big?bid:'x',{url,type})};hostAdd(big);
 const mkConn=(opt={})=>{const reqs=[],c={peer:opt.peer||'h',open:true,reqs,send(m){if(m.t!=='mget')return;reqs.push(m.i);if(opt.onReq)opt.onReq(m);if(opt.failAt===m.i&&!opt.failed){opt.failed=true;throw new Error('connexion coupée')}
  setTimeout(()=>serveMedia({send:r=>gotMedia(c,r)},m,opt.store||hostM),0)}};return c};
 T={persons:{p1:{id:'p1',photo:bid,voice:''}}};
 let c1=mkConn();await getMedia(c1,bid);assert.ok(MC.has(bid),'média reçu');assert.strictEqual(c1.reqs.length,4,'4 morceaux de 48 Ko');
 assert.deepStrictEqual(Buffer.from(await(await fetch(MC.get(bid).url)).arrayBuffer()),big,'contenu identique');assert.strictEqual(Object.keys(parts).length,0,'morceaux nettoyés');
 // reprise après coupure : seuls les morceaux manquants sont redemandés
 await delMedia(bid);const opt={failAt:2};c1=mkConn(opt);
 await assert.rejects(getMedia(c1,bid),/coupée/);assert.ok(Object.keys(parts).length>=1&&!MC.has(bid),'morceaux déjà reçus gardés');
 const have=Object.values(parts).map(x=>x.i);c1=mkConn();await getMedia(c1,bid);
 assert.deepStrictEqual(c1.reqs.sort(),[0,1,2,3].filter(i=>!have.includes(i)),'reprise : seuls les manquants sont redemandés');assert.ok(MC.has(bid));
 // média corrompu chez l'hôte : refusé, rien n'est rangé
 await delMedia(bid);const bad=Buffer.from(big);bad[100]^=255;const cs=new Map([[bid,{url:URL.createObjectURL(new Blob([bad])),type:'audio/webm'}]]);
 await assert.rejects(getMedia(mkConn({store:cs}),bid),/abîmé/);assert.ok(!MC.has(bid)&&Object.keys(parts).length===0,'empreinte incorrecte : rien de gardé');
 // média remplacé pendant le transfert : abandon et morceaux jetés
 await assert.rejects(getMedia(mkConn({onReq:m=>{if(m.i===0)T.persons.p1.photo=''}}),bid),/replaced/);assert.ok(!MC.has(bid)&&Object.keys(parts).length===0,'ancienne version abandonnée');T.persons.p1.photo=bid;
 // média disparu chez l'hôte
 await assert.rejects(getMedia(mkConn({store:new Map()}),bid),/gone/);
 // demandes invalides ignorées ; réponse non demandée ignorée
 const sent=[];await serveMedia({send:m=>sent.push(m)},{id:'zz',i:0});await serveMedia({send:m=>sent.push(m)},{id:bid,i:-1});assert.strictEqual(sent.length,0);gotMedia({peer:'h'},{t:'mchunk',id:bid,i:0,n:1,d:new ArrayBuffer(1)});
 // reste à récupérer : référencés et absents seulement ; ancien format et fiches supprimées jamais
 const other='a'.repeat(64);await delMedia(bid);T={persons:{p1:{id:'p1',photo:bid,voice:other},p2:{id:'p2',photo:'data:image/png;base64,AA',voice:''},p3:{id:'p3',del:true,photo:'b'.repeat(64),voice:''}}};
 assert.deepStrictEqual(needIds().sort(),[bid,other].sort());
 // « Tout récupérer » : file, compteurs remis à zéro, média introuvable noté sans boucle
 live.conns=[mkConn()];live.peer={};toasts.length=0;dlAdd(needIds(),true);
 for(let i=0;i<200&&(dl.total||dl.act.size);i++)await new Promise(r=>setTimeout(r,10));
 assert.ok(MC.has(bid),'média récupéré par la file');assert.ok(dl.fail.has(other),'introuvable noté');assert.deepStrictEqual(needIds(),[other]);assert.strictEqual(dl.total,0,'compteurs remis à zéro');live.peer=null;live.conns=[];
 // ticket : le média est récupéré chez l'invité à l'ouverture ; invité absent = média non disponible
 await delMedia(bid);const tkt={id:'t1',did:'D1',who:'Léa',after:{id:'a',photo:bid,voice:''}};T={persons:{},tickets:[tkt]};
 live.dids={k1:'D1'};live.conns=[mkConn({peer:'k1'})];assert.strictEqual(guestConn('D1'),live.conns[0]);
 tkFetch(tkt);assert.ok(tkBusy.has(bid)&&tkMed(tkt,bid).includes('Réception'));
 for(let i=0;i<200&&tkBusy.size;i++)await new Promise(r=>setTimeout(r,10));assert.ok(MC.has(bid)&&!tkBusy.size,'média du ticket récupéré chez l’invité');
 await delMedia(bid);live.conns=[];assert.ok(tkMed(tkt,bid).includes('non disponible'),'invité absent');live.dids={};
 // formats : photo JPEG 1280 px à 80 %, son AAC mono 48 kbit/s, AAC préféré quand le navigateur sait l'enregistrer
 assert.deepStrictEqual(MEDIA,{photoPx:1280,photoQ:.8,audioBps:48000});
 assert.strictEqual(pickAudio(()=>true),'audio/mp4;codecs=mp4a.40.2');assert.strictEqual(pickAudio(x=>x.startsWith('audio/webm')),'audio/webm;codecs=opus');assert.strictEqual(pickAudio(()=>false),undefined);
 // décompte des tickets du bandeau de l'hôte : ajout = fiche inconnue, suppression = fiche supprimée, modification = fiche existante
 T={persons:{a:{id:'a'}},tickets:[{pid:'a',after:{}},{pid:'zz',after:{}},{pid:'a',after:{del:true}},{pid:'a',after:{}}]};
 assert.deepStrictEqual(tkCounts(),{add:1,mod:2,del:1});
 console.log('test-zip OK')})().catch(e=>{console.error('ECHEC',e.stack||e.message);process.exit(1)})`);
