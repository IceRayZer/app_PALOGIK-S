// Vérifie l'export/import ZIP de index.html : node test-zip.js
const fs=require('fs'),assert=require('assert'),h=fs.readFileSync(__dirname+'/index.html','utf8');
const cut=(a,b)=>h.slice(h.indexOf(a),h.indexOf(b));
const wire=t=>{const {tickets,su,...w}=t;return w},b64=x=>Buffer.from(x).toString('base64');
const T={name:'Test',persons:{
 a:{id:'a',first:'Jean',last:'Dupont',birth:'1952',u:0,photo:'data:image/jpeg;base64,'+b64('PHOTO'),voice:'data:audio/webm;codecs=opus;base64,'+b64('VOIX')},
 b:{id:'b',first:'Jean',last:'Dupont',birth:'1952',u:0,photo:'data:image/jpeg;base64,'+b64('PHOTO'),voice:''}}};
eval(cut('/* ---------- export : un ZIP unique','const zipName=')+cut('async function readZip','const toUrl=')+`const toUrl=async(b,t)=>'data:'+t+';base64,'+Buffer.from(b).toString('base64');`+cut('const pl=',"$('#imp').addEventListener")+`;(async()=>{
 const files=await readZip(await(await buildZip()).arrayBuffer()),o=JSON.parse(new TextDecoder().decode(files.get('arbre.json')));
 assert.deepStrictEqual([...files.keys()].filter(n=>n.includes('/')).length,2,'une photo partagée = un seul fichier');
 assert.strictEqual(o.tree.persons.a.photo,o.tree.persons.b.photo);
 for(const id of Object.keys(o.media))assert.strictEqual(await sha(files.get(o.media[id].file)),id,'empreinte = contenu');
 // comparatif d'import : appareil = a,b identiques ; c ajoutée après l'export ; d supprimée ; fichier = a,b,d (ancienne), e nouvelle (photo+vocal), f modifiée (photo changée, vocal ajouté)
 const U=x=>'data:image/jpeg;base64,'+b64(x),id=async x=>sha(Buffer.from(x)),byId=new Map();for(const x of ['A','NEW','F1','F2','E1','E2','D1'])byId.set(await id(x),Buffer.from(x));
 const P=(i,u,o={})=>({id:i,u,photo:'',voice:'',...o});
 const local={mu:1,persons:{a:P('a',10,{photo:U('A')}),b:P('b',10),c:P('c',20),d:P('d',30,{del:true}),f:P('f',10,{photo:U('F1')})}};
 const file={tree:{mu:1,persons:{a:P('a',10,{photo:await id('A')}),b:P('b',10),d:P('d',5,{photo:await id('D1')}),e:P('e',40,{photo:await id('E1'),voice:await id('E2')}),f:P('f',50,{photo:await id('F2'),voice:await id('NEW')})}}};
 const d=await importDiff(local,file,byId);
 assert.deepStrictEqual({add:d.add,upd:d.upd,gone:d.gone,only:d.only,ma:d.ma,mm:d.mm,mr:d.mr,newer:d.newer},{add:1,upd:1,gone:1,only:1,ma:3,mm:1,mr:0,newer:0},JSON.stringify(d));
 assert.strictEqual((await importDiff(local,{tree:{mu:1,persons:{a:file.tree.persons.a}}},byId)).add,0,'même contenu = rien à importer');
 // reconversion des médias à l'import : fusion = média absent du fichier remplacé par celui de l'appareil ; remplacement = reste vide
 const mk=()=>[{id:'a',photo:'',voice:''},{id:'x',photo:'',voice:''}];const ps1=mk();ps1[0].photo=await id('A');ps1[1].photo='absent-du-fichier';
 await fillMedia(ps1,byId,{[await id('A')]:{type:'image/jpeg'}},{persons:{x:{photo:U('LOCAL')}}},true);
 assert.strictEqual(ps1[0].photo,U('A'),'média du fichier reconverti');assert.strictEqual(ps1[1].photo,U('LOCAL'),'fusion : média absent = celui de l’appareil');
 const ps2=mk();ps2[1].photo='absent-du-fichier';await fillMedia(ps2,byId,{},{persons:{x:{photo:U('LOCAL')}}},false);assert.strictEqual(ps2[1].photo,'','remplacement : média absent = vide');
 assert.ok(h.includes('await fillMedia('),"l'import doit appeler fillMedia");
 console.log('test-zip OK')})().catch(e=>{console.error('ECHEC',e.message);process.exit(1)})`);
