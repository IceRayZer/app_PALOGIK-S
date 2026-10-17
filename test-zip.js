// Vérifie stockage des médias, migration, nettoyage, export/import ZIP de index.html : node test-zip.js
const fs=require('fs'),assert=require('assert'),h=fs.readFileSync(__dirname+'/index.html','utf8');
const cut=(a,b)=>{const i=h.indexOf(a),j=h.indexOf(b,i);assert(i>=0&&j>i,'repère introuvable : '+a);return h.slice(i,j)};
const b64=x=>Buffer.from(x).toString('base64'),U=(m,x)=>`data:${m};base64,`+b64(x);
eval(`
const wire=t=>{const {tickets,su,...w}=t;return w};
let T=null;const live={peer:null,conns:[]},ME={name:'t'};const send=()=>{};
const trees={},media={};let puts=0,saves=0;
const tx=async(m,f,st='trees')=>{const o=st==='media'?media:trees,r=f({getAll:()=>({result:Object.values(o).map(v=>structuredClone(v))}),put:v=>{o[v.id]=structuredClone(v);if(st==='media')puts++},delete:id=>{delete o[id]}});return r&&r.result};
const allTrees=()=>tx('readonly',s=>s.getAll()),saveTree=async t=>{saves++;trees[t.id]=structuredClone(t)};
const toUrl=async(b,t)=>'data:'+t+';base64,'+Buffer.from(b).toString('base64');
const confirm=()=>true;
`+cut('const safeAudio','function normP')+cut('/* ---------- médias :','/* ---------- dates')+cut('/* ---------- export : un ZIP unique','const zipName=')+cut('async function readZip','const toUrl=')+cut('const pl=',"$('#imp').addEventListener")+`
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
 assert.strictEqual(await dataOf(p.photo),U('image/jpeg','RECU'),'sortie live : données intégrées');
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
 console.log('test-zip OK')})().catch(e=>{console.error('ECHEC',e.stack||e.message);process.exit(1)})`);
