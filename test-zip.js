// Vérifie l'export/import ZIP de index.html : node test-zip.js
const fs=require('fs'),assert=require('assert'),h=fs.readFileSync(__dirname+'/index.html','utf8');
const cut=(a,b)=>h.slice(h.indexOf(a),h.indexOf(b));
const wire=t=>{const {tickets,su,...w}=t;return w},b64=x=>Buffer.from(x).toString('base64');
const T={name:'Test',persons:{
 a:{id:'a',first:'Jean',last:'Dupont',birth:'1952',u:0,photo:'data:image/jpeg;base64,'+b64('PHOTO'),voice:'data:audio/webm;codecs=opus;base64,'+b64('VOIX')},
 b:{id:'b',first:'Jean',last:'Dupont',birth:'1952',u:0,photo:'data:image/jpeg;base64,'+b64('PHOTO'),voice:''}}};
eval(cut('/* ---------- export : un ZIP unique','const zipName=')+cut('async function readZip','const toUrl=')+`;(async()=>{
 const files=await readZip(await(await buildZip()).arrayBuffer()),o=JSON.parse(new TextDecoder().decode(files.get('arbre.json')));
 assert.deepStrictEqual([...files.keys()].filter(n=>n.includes('/')).length,2,'une photo partagée = un seul fichier');
 assert.strictEqual(o.tree.persons.a.photo,o.tree.persons.b.photo);
 for(const id of Object.keys(o.media))assert.strictEqual(await sha(files.get(o.media[id].file)),id,'empreinte = contenu');
 console.log('test-zip OK')})().catch(e=>{console.error('ECHEC',e.message);process.exit(1)})`);
