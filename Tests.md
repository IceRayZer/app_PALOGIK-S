# Protocole de tests : Racines

Ce document permet de valider **toute l'appli**, du début à la fin, sur la version de test (`dev`). À suivre dans l'ordre, étape par étape. Chaque test indique **quoi faire**, **ce que tu dois voir** et **quoi noter si ça ne marche pas**. Coche les cases `- [ ]` au fur et à mesure (tu peux les cocher directement dans le fichier sur GitHub).

> Vocabulaire : « récupérer sur mon arbre » = stockage du navigateur (l'appli) ; « exporter » = fichier (ZIP ou média).

---

## 0. Avant de commencer

### 0.1 Où tester
- Tous les tests se font sur la **version publiée**, jamais en local :
  - **Version de test** : https://icerayzer.github.io/app_PALOGIK-S/dev/ (bandeau rouge « VERSION TEST » en haut)
  - **Version principale** (à ne pas toucher pendant les tests) : https://icerayzer.github.io/app_PALOGIK-S/
- Les données de la version de test sont **séparées** de la version principale. Aucune donnée réelle ne doit être modifiée.
- Ne fais **pas** les tests en navigation privée : les données ne seraient pas gardées.

### 0.2 Ce qu'il te faut
- Un **ordinateur** avec un navigateur récent (Chrome, Edge ou Firefox).
- Un **téléphone** (idéalement iPhone ou Android).
- Pour le **live** (section 15 et suivantes) : deux appareils différents. Deux navigateurs sur le même ordinateur (ex. Chrome et Firefox) fonctionnent aussi, car leurs données sont séparées. Deux onglets du même navigateur ne suffisent pas : ils partagent le même stockage.
- Pour les tests de fichiers : un petit fichier vidéo MP4 légère, une vidéo trop lourde, une vidéo HEVC (filmée sur iPhone en « haute efficacité »), une photo JPEG et une photo PNG.

### 0.3 Tests automatiques (optionnel, sur ordinateur)
Si tu as Node.js installé, à la racine du dépôt :
```
node test-zip.js
```
- **Attendu** : la ligne `test-zip OK`. Si tu vois `ECHEC`, note le message exact et arrête-toi là.

### 0.4 Vérifier la version
- [ ] **T-00** Ouvre la version de test. **Attendu** : bandeau rouge « VERSION TEST — données séparées de Racines » en haut de l'écran.

---

## 1. Premier lancement et pop-up de bienvenue

Ce test porte sur le **premier chargement** (vide le cache ou utilise un navigateur jamais utilisé sur cette adresse pour le voir proprement).

- [ ] **T-01** Ouvre la version de test. **Attendu** : une feuille blanche monte du bas avec :
  - la mascotte 🌳 dans un cercle, qui se balance doucement ;
  - le titre « Bienvenue dans Racines ! » ;
  - la phrase « Crée et partage l’histoire de ta famille, simplement. » ;
  - trois pastilles : 🔒 Sur ton appareil · 👨‍👩‍👧 En direct · 💾 Exportable (elles apparaissent l'une après l'autre) ;
  - un gros bouton vert « C’est parti ! » qui s'enfonce quand on appuie dessus ;
  - en bas, un encart 🕶️ : « Si vous êtes en navigation privée, les informations et données ne seront pas sauvegardées… ».
- [ ] **T-02** Touche « C’est parti ! ». **Attendu** : la feuille disparaît. Touche le fond sombre autour : elle se ferme aussi.
- [ ] **T-03** Recharge la page (F5 ou glisser vers le bas). **Attendu** : le pop-up **revient** à chaque arrivée sur le site.
- [ ] **T-04** Sur **iPhone**, ouvre Racines dans Safari (sans l'avoir ajouté à l'écran d'accueil). **Attendu** : un encadré jaune 📱 apparaît au-dessus du bouton : « Sur iPhone, Safari peut effacer les données d’un site non utilisé pendant 7 jours. Ajoute Racines à ton écran d’accueil… ».
- [ ] **T-05** Sur **Android** ou **ordinateur**, le même pop-up **n'affiche pas** cet encadré jaune. **Attendu** : pas d'encadré jaune.
- [ ] **T-06** Mode clair / sombre : change le thème du téléphone ou du navigateur. **Attendu** : le pop-up reste lisible dans les deux modes (texte sombre sur fond clair, et l'inverse).
- [ ] **T-07** Écran étroit (téléphone en portrait) : **Attendu** : aucune barre de défilement horizontale, marges de 16 px environ sur les côtés.

---

## 2. Écran d'accueil et création d'un arbre

- [ ] **T-08** Après « C’est parti ! », l'écran « Mes arbres » s'affiche avec le texte « Ton arbre généalogique, 100 % sur ton appareil… » et les boutons « ＋ Nouvel arbre » et « 📥 Importer ».
- [ ] **T-09** Touche « ＋ Nouvel arbre ». **Attendu** : l'assistant s'ouvre pour l'arbre (nom, origine, auteur, description).
  - Essaie de passer sans nom : **Attendu** : un message « Donne un nom à ton arbre » et une secousse de la fenêtre.
- [ ] **T-10** Donne un nom (ex. « Test Dupont »), une origine et ton prénom. **Attendu** : une réaction en texte apparaît sous le champ (ex. « Enchanté… ») et le bouton « 💾 Enregistrer » est toujours visible.
- [ ] **T-11** Enregistre. **Attendu** : l'arbre apparaît dans « Mes arbres » avec son nom et la date de modification.
- [ ] **T-12** Ouvre l'arbre. **Attendu** : le titre de l'arbre en haut, la barre de vues en bas (🌳 Arbre, 🌅 Éventail, ⏳ Chronologie, 🗂️ Générations, 📊 Aperçu) et le message « Plante la première graine ».

---

## 3. Ajouter une personne (assistant de création)

L'assistant a une **barre d'icônes** en haut (rail) : 🪪 Identité · 🎂 Naissance · 🌳 Famille · 📖 Histoire · 🎙️ Vocal · 🕯️ Souvenir · 📸 Photo (selon l'ordre et les étapes visibles).

- [ ] **T-13** Touche « ＋ Personne » (ou « Ajouter une personne »). **Attendu** : l'assistant s'ouvre à l'étape Identité.
- [ ] **T-14** Ne mets ni prénom ni nom et tente d'avancer. **Attendu** : message « Il faut au moins un prénom ou un nom ».
- [ ] **T-15** Mets « Jean » et « Dupont », choisis 👨 Homme. **Attendu** : « Enchanté, Jean ! 👋 » et la case Homme est sélectionnée.
- [ ] **T-16** Touche 🎂 dans le rail (saut direct d'étape). **Attendu** : l'assistant passe à Naissance sans perdre ce que tu as saisi.
- [ ] **T-17** Dans Naissance, tape **14031952** (sans les barres). **Attendu** : le champ affiche **14/03/1952** pendant que tu tapes.
- [ ] **T-18** Tape **1952** seul (année). **Attendu** : accepté, et « Quand est né Jean ? » reste valable.
- [ ] **T-19** Tape **32131952** (date impossible). **Attendu** : message « Date non reconnue — essaie 14/03/1952 ou 1952 » au moment d'avancer.
- [ ] **T-20** Touche 📅 à côté du champ. **Attendu** : le sélecteur de date natif du téléphone ou de l'ordinateur s'ouvre, et la date choisie remplit le champ au format JJ/MM/AAAA.
- [ ] **T-21** Dans Famille, la liste des personnes existantes apparaît (s'il y en a) : choisis un parent, puis un conjoint. **Attendu** : chacun devient sélectionné ; un troisième parent est refusé avec « Deux parents maximum ».
- [ ] **T-22** Dans Histoire, touche 🎲 à côté de la question : **Attendu** : une autre question apparaît.
- [ ] **T-23** Dans Histoire, écris une phrase et un métier. **Attendu** : elle s'affiche dans la fiche plus tard (voir T-40).
- [ ] **T-24** Touche « 💾 Enregistrer » (visible dès la première étape). **Attendu** : toast « 🌳 Jean Dupont a rejoint l’arbre ! », quelques confettis, et la carte apparaît dans l'arbre.

---

## 4. Modifier une fiche (✏️ par bloc)

- [ ] **T-25** Ouvre la fiche de Jean (clic sur la carte). **Attendu** : une fenêtre « Fiche » avec le nom, la naissance, l'anecdote et les boutons « ✏️ Modifier » et « ＋ Parent ».
- [ ] **T-26** Touche le ✏️ à côté de « Naissance » (ou d'un autre bloc). **Attendu** : l'assistant s'ouvre **directement sur cette étape**, pas au début.
- [ ] **T-27** Change le lieu de naissance, enregistre. **Attendu** : la fiche est à jour immédiatement, toast « est à jour ».
- [ ] **T-28** Ajoute une seconde personne et relie-la comme parent, puis ouvre le menu ⋯ de l'arbre. **Attendu** : la relation apparaît dans « Parents » / « Enfants » de la fiche.

---

## 5. Photos

- [ ] **T-29** Dans l'étape Photo, choisis une photo JPEG de ton téléphone (grande, 4000 px environ). **Attendu** : elle s'affiche dans l'avatar et la fiche.
- [ ] **T-30** Choisis une **photo PNG avec fond transparent**. **Attendu** : elle s'affiche sur fond **blanc**, pas noir.
- [ ] **T-31** Touche « Retirer la photo ». **Attendu** : pop-up « Êtes-vous sûr de vouloir supprimer ce média ? ». Refuse : la photo reste. Accepte : la photo disparaît et l'avatar revient aux initiales.
- [ ] **T-32** Remplace une photo existante par une autre. **Attendu** : pop-up « Êtes-vous sûr de vouloir remplacer ce média ? ». Refuse : l'ancienne reste.
- [ ] **T-33** Taille : enregistre une photo, puis exporte l'arbre (section 9) et regarde la taille de l'image dans le ZIP. **Attendu** : moins de 300 Ko par photo environ (JPEG, 1280 px au maximum, qualité 80 %).

---

## 6. Vocal (anecdote)

- [ ] **T-34** Étape 🎙️ Vocal. **Attendu** : le titre « Une anecdote racontée à voix haute ? », un bouton « 🎙️ Enregistrer » et un champ « Qui raconte ? (vide = la personne elle-même) ».
- [ ] **T-35** Touche « Enregistrer », parle 10 secondes en regardant la jauge. **Attendu** : la jauge bouge pendant que tu parles, et « 🔴 Enregistrement en cours… ». Touche « ⏹ Arrêter ». **Attendu** : le bouton « Réécouter » (lecteur audio) apparaît.
- [ ] **T-36** Écoute le vocal avec le lecteur. **Attendu** : tu entends ta voix, sans grésillement notable.
- [ ] **T-37** Dans « Qui raconte ? », écris « Marie », puis enregistre la fiche. **Attendu** : dans la fiche, le titre devient « Anecdote racontée par Marie ».
- [ ] **T-38** Enregistre un vocal **de plus de 2 minutes** (laisse tourner). **Attendu** : l'enregistrement s'arrête automatiquement à 2 minutes.
- [ ] **T-39** Fais un enregistrement, puis exporte l'arbre et regarde l'extension du fichier audio dans le ZIP. **Attendu** : `.m4a` sur un navigateur qui sait enregistrer en AAC (Safari, Chrome récent). Sur un autre navigateur, un toast indique « Ce navigateur n’enregistre pas en AAC (.m4a) : le vocal est en WebM… » et le fichier est en `.webm`.
- [ ] **T-40** Enregistre un vocal sur une fiche qui en a déjà un. **Attendu** : pop-up « Êtes-vous sûr de vouloir remplacer ce média ? (tu pourras le retrouver ici tant que tu ne fermes pas cette fenêtre) ». Accepte, puis touche « ↩️ Retrouver l’ancien vocal » : l'ancien revient.
- [ ] **T-41** Touche « Supprimer le vocal ». **Attendu** : pop-up « Êtes-vous sûr de vouloir supprimer ce média ? ». Refuse : rien ne change.
- [ ] **T-42** Ferme l'assistant pendant qu'un vocal non enregistré vient d'être fait. **Attendu** : pop-up « Un enregistrement que tu viens de faire n’est pas sauvegardé et sera perdu. Fermer quand même ? ».
- [ ] **T-43** Dans la fiche, le bouton « 🔊 Lecture alternative » fait sortir le son par un autre chemin (volume un peu plus fort). **Attendu** : le son se joue.
- [ ] **T-44** Refuse un micro (paramètres du navigateur). **Attendu** : toast « Micro inaccessible : autorise-le dans le navigateur… ».

---

## 7. Souvenirs (vidéos, personnes décédées et vivantes)

Étape 🕯️ Souvenir (ou zone « Souvenirs » dans la fiche).

### 7.1 Personne vivante
- [ ] **T-45** Pour une personne **en vie** (case « Vivant(e) »), l'étape montre trois emplacements : « À 10 ans », « À 20 ans », « À 60 ans et plus », chacun avec 🎙️ Voix, 🎥 Vidéo et 📁 Importer.
- [ ] **T-46** Enregistre une **vidéo** de 10 secondes avec 🎥 Vidéo (caméra et micro autorisés). **Attendu** : ta caméra s'affiche pendant la prise, puis « ⏹ Arrêter ». Après l'arrêt, la vidéo apparaît avec ses commandes de lecture.
- [ ] **T-47** Laisse une vidéo tourner plus d'une minute. **Attendu** : elle s'arrête automatiquement à 1 minute.
- [ ] **T-48** Dans la fiche, ouvre la vidéo et joue-la. **Attendu** : elle se lit ; un bouton « 💾 Exporter ce média » est juste dessous.

### 7.2 Import de vidéo
- [ ] **T-49** Importe une **vidéo MP4 H.264 légère** (moins de 30 Mo, moins d'une minute, 720p ou moins). **Attendu** : acceptée sans message.
- [ ] **T-50** Importe une **vidéo HEVC** (filmée sur iPhone en « haute efficacité », extension `.mov` ou `.mp4`). **Attendu** : message « Cette vidéo n’est pas au bon format (le codec doit être H.264)… Réduis-la avec l’application Photos… ».
- [ ] **T-51** Importe une vidéo de **plus de 30 Mo**. **Attendu** : message « 30 Mo maximum » et demande de la réduire.
- [ ] **T-52** Importe une vidéo de **plus d'une minute** (plus de 60 secondes). **Attendu** : message « 1 minute maximum ».
- [ ] **T-53** Importe un fichier **non vidéo ou non audio** (ex. un PDF). **Attendu** : message « Choisis un fichier audio ou vidéo. ».

### 7.3 Miniature
- [ ] **T-54** Après l'import ou l'enregistrement d'une vidéo, ouvre un **ticket** ou un export ZIP plus tard (section 9). **Attendu** : le fichier `.jpg` de la miniature est présent à côté de la vidéo dans le dossier de la personne.

### 7.4 Personne décédée
- [ ] **T-55** Dans une fiche, mets « Décédé(e) » avec une date. Ouvre l'étape Souvenir. **Attendu** : un seul emplacement, titré « Fichier à garder en souvenir », avec 📁 Importer (pas d'enregistrement possible).
- [ ] **T-56** Importe un fichier audio existant. **Attendu** : il est lisible dans la fiche.

### 7.5 Limite de stockage
- [ ] **T-57** Ajoute plusieurs souvenirs vidéo pour une même personne, jusqu'à dépasser 50 Mo au total. **Attendu** : message « Trop de médias pour cette personne (50 Mo maximum) : supprime-en un d’abord ».
- [ ] **T-58** Supprime un souvenir (« 🗑️ Supprimer ») : pop-up de confirmation, puis le souvenir disparaît. Tu peux à nouveau en ajouter.
- [ ] **T-59** Alerte d'espace : cette alerte apparaît quand le stockage du navigateur est utilisé à 70 % ou plus. Difficile à provoquer ; si tu l'as déjà vu, note-le. **Sinon, marque « non testé ».**

---

## 8. Vues de l'arbre

- [ ] **T-60** Vue 🌳 Arbre : les cartes sont visibles, les liens entre parents et enfants sont tracés, et on peut zoomer par pincement à deux doigts, avec les boutons ＋, − et 🎯 (recentrer).
- [ ] **T-61** Vue 🌅 Éventail : les personnes apparaissent en arc autour d'une personne choisie.
- [ ] **T-62** Vue ⏳ Chronologie : les personnes sont classées par date de naissance.
- [ ] **T-63** Vue 🗂️ Générations : les personnes sont regroupées par génération, avec une recherche « 🔎 Filtrer par nom… » qui réduit la liste en tapant.
- [ ] **T-64** Vue 📊 Aperçu : des chiffres résumés (nombre de personnes, etc.) s'affichent.
- [ ] **T-65** Cartes : le nom du prénom s'adapte à la largeur de la carte (un nom long reste lisible).

---

## 9. Export : « Exporter tout l'arbre » (ZIP)

- [ ] **T-66** Menu ⋯ → « 💾 Exporter tout l’arbre ». **Attendu** : un fichier `.zip` est téléchargé (ou le menu de partage s'ouvre sur téléphone). Le nom suit `nom-de-larbre-AAAA-MM-JJ.zip`.
- [ ] **T-67** Ouvre le ZIP (ordinateur : clic droit → Extraire ; téléphone : application Fichiers). **Attendu** : tu vois `arbre.json`, `LISEZ-MOI.txt` et un **dossier par personne** (ex. `Jean-Dupont_1952`), qui contient ses médias.
- [ ] **T-68** Noms des médias : **attendu** `Jean-Dupont_1952_photo_AAAA-MM-JJ.jpg`, `…_vocal_…m4a` (ou `.webm`), `…_souvenir-10-ans_…mp4`, `…_souvenir-10-ans-miniature_….jpg`.
- [ ] **T-69** Ouvre `LISEZ-MOI.txt`. **Attendu** : il explique le contenu, les formats (JPEG 1280 px, AAC mono, vidéo MP4 H.264), la structure de `arbre.json` et l'avertissement sur les médias modifiés hors de Racines.
- [ ] **T-70** Ouvre `arbre.json` avec un éditeur de texte. **Attendu** : `"app": "racines"`, `"v": 2`, un objet `"tree"` (les personnes) et un objet `"media"` où chaque identifiant (64 caractères hexadécimaux) renvoie à un fichier du dossier.
- [ ] **T-71** Même contenu = un seul fichier. Si deux personnes ont la **même photo**, le ZIP ne contient **qu'un** fichier pour cette photo.
- [ ] **T-72** Sur **téléphone**, touche « 📤 Partager la sauvegarde ». **Attendu** : le menu de partage natif s'ouvre (WhatsApp, Mail, Drive…). Sur ordinateur, ce bouton peut ne pas exister : c'est normal (« marqué non testé » si absent).
- [ ] **T-73** Taille : partage le ZIP par WhatsApp ou Mail (à essayer sur téléphone). **Attendu** : note si le partage accepte le fichier. Cette limite est encore à mesurer.
- [ ] **T-74** Un média manque sur l'appareil (cas rare : tu peux le simuler en supprimant le stockage d'un média, ou sur un autre appareil). **Attendu** : pop-up « N média(s) manque(nt) sur cet appareil… Exporter quand même ? ». Refuse : rien n'est exporté. Accepte : le ZIP est créé.

---

## 10. Exporter un seul média (💾 Exporter ce média)

- [ ] **T-75** Dans une fiche, sous la photo : touche « 💾 Exporter ce média ». **Attendu** : la **première fois** seulement, une fenêtre dit : « Un fichier enregistré dans la galerie de ton téléphone peut être envoyé vers le cloud par les services du téléphone (Google Photos, iCloud…). Racines ne le fait jamais. ». Touche « Exporter ce média ».
- [ ] **T-76** Sur **téléphone**, le menu de partage s'ouvre (« Enregistrer l’image » ou « Enregistrer la vidéo »). **Attendu** : une fois enregistré, le fichier est dans la galerie avec le bon nom.
- [ ] **T-77** Sur **ordinateur**, le fichier se télécharge dans Téléchargements avec le nom `Jean-Dupont_1952_photo_….jpg`. **Attendu** : toast « 💾 Média exporté : … ».
- [ ] **T-78** Refais un export dans la même session : **Attendu** : la fenêtre d'avertissement cloud n'apparaît plus.
- [ ] **T-79** Rechargement de la page puis nouvel export. **Attendu** : la fenêtre cloud revient (une fois par session).

---

## 11. Import : « 📥 Importer » (ZIP)

Le menu « ＋ Nouvel arbre » et « 📥 Importer » sont sur l'écran « Mes arbres ». Prépare un ZIP exporté (section 9).

### 11.1 Arbre qui n'existe pas encore
- [ ] **T-80** Supprime l'arbre de test (depuis « Mes arbres », puis confirmation). Puis importe son ZIP. **Attendu** : pop-up « Cet arbre contient N personnes et M médias. Importer ? ». Accepte : toast « Arbre importé ✔ ». Les photos et vocaux reviennent (ouvre une fiche).
- [ ] **T-81** Avant d'accepter, compte les personnes et médias annoncés. **Attendu** : les nombres correspondent à l'arbre exporté (personnes non supprimées, médias uniques).

### 11.2 Arbre déjà présent (même identifiant)
- [ ] **T-82** Importe le **même** fichier sans modification. **Attendu** : pop-up « Rien à importer : cet arbre est identique à celui de cet appareil. » (aucun bouton « Fusionner »).
- [ ] **T-83** Exporte l'arbre (fichier A). Ajoute une personne et modifie une fiche. Exporte à nouveau (fichier B). Supprime l'arbre sur l'appareil et importe A, puis importe B, puis réimporte A **après** avoir modifié l'arbre : **Attendu** : la fenêtre « Cet arbre existe déjà sur cet appareil. Le fichier contient… » liste ce qui va changer (« 1 personne ajoutée », « 1 personne modifiée », « 3 médias ajoutés », etc.).
- [ ] **T-84** Dans la fenêtre de T-83, touche **Fusionner**. **Attendu** : toast « Arbre fusionné avec la version existante ». L'arbre garde les ajouts et les fiches les plus récentes ; **rien n'est retiré**.
- [ ] **T-85** Dans la même situation, touche **Remplacer par ce fichier**. **Attendu** : une deuxième confirmation liste « Ce qui sera perdu ou annulé » (personnes présentes seulement sur l'appareil, modifications plus récentes, suppressions annulées, tickets en attente). Accepte : toast « Arbre remplacé par le fichier ✔ », et l'arbre est **exactement** celui du fichier (la personne ajoutée après l'export a disparu).
- [ ] **T-86** Dans la fenêtre, touche **Annuler** (ou la touche Échap sur ordinateur). **Attendu** : aucun changement.
- [ ] **T-87** Cas où **Fusionner** n'apporte rien (le fichier est plus ancien que l'arbre de l'appareil) : **Attendu** : la fenêtre n'affiche pas « Fusionner » et dit « Il n’y a rien à fusionner : cet appareil est déjà au moins aussi à jour que le fichier. ».

### 11.3 Fichiers refusés
- [ ] **T-88** Importe un **ancien fichier `.json`** (ou un fichier texte quelconque). **Attendu** : toast « Fichier invalide : choisis le ZIP exporté par Racines ».
- [ ] **T-89** Importe un ZIP **abîmé** (un fichier de médias modifié : ouvre le ZIP, ajoute un caractère à une photo, enregistre, puis importe). **Attendu** : la confirmation contient « ⚠️ 1 média manque ou est abîmé dans ce fichier. » ; le média abîmé n'est pas rangé.
- [ ] **T-90** (optionnel, avec 7-Zip ou similaire) Renomme un fichier média à l'intérieur du ZIP et importe. **Attendu** : le média est quand même reconnu (il est identifié par son contenu, pas par son nom).

---

## 12. Rappel de sauvegarde (bandeau jaune)

> Ce test est **difficile à valider en live**. Voir `Modification.md`. Le faire **seul sur un appareil**, sans session live.

- [ ] **T-91** Arbre avec des personnes, **jamais exporté** (ou exporté puis modifié). Attends au moins 10 minutes sans rien toucher. **Attendu** : un bandeau jaune « 💾 Sauvegarde non exportée… » apparaît en haut, avec « Exporter tout l’arbre » et ✕.
- [ ] **T-92** Pendant que tu **tapes** dans une fiche : **Attendu** : le bandeau n'apparaît pas à ce moment-là (il attend que tu aies fini).
- [ ] **T-93** Touche ✕ sur le bandeau : **Attendu** : il disparaît et ne revient qu'à la prochaine modification et au prochain passage du minuteur.
- [ ] **T-94** Exporte l'arbre : **Attendu** : le bandeau disparaît.
- [ ] **T-95** Sans aucune modification après l'export, attends 10 minutes : **Attendu** : pas de bandeau.

---

## 13. Annulation (↩️ et Ctrl+Z)

- [ ] **T-96** Ajoute une personne, puis touche « ↩️ Annuler » en haut. **Attendu** : la personne disparaît et le toast « ↩️ Annulé : ajout d’une personne » apparaît.
- [ ] **T-97** Ordinateur : après une modification, appuie sur **Ctrl+Z** (Cmd+Z sur Mac). **Attendu** : la dernière action est annulée.
- [ ] **T-98** Ordinateur : appuie sur **Ctrl+Maj+Z**. **Attendu** : **rien ne se passe** (ce n'est pas une annulation).
- [ ] **T-99** Supprime une personne (avec sa photo et son vocal), puis annule. **Attendu** : la personne revient **avec sa photo et son vocal** (le nettoyage des médias ne tourne pas tant qu'un arbre est ouvert).
- [ ] **T-100** Remplace une photo, puis annule. **Attendu** : l'ancienne photo revient (si elle est encore sur l'appareil).
- [ ] **T-101** Pour annuler un remplacement dont l'ancien média a disparu : **Attendu** : toast « Impossible d’annuler : l’ancien média n’est plus sur cet appareil ».
- [ ] **T-102** L'annulation ne touche **pas** aux actions d'une autre personne (en live, section 17).
- [ ] **T-103** Fais 30 modifications, puis essaie de remonter au-delà : **Attendu** : au plus 30 actions peuvent être annulées.

---

## 14. Suppression d'une personne

- [ ] **T-104** Supprime une personne (menu de la fiche, « Supprimer »). **Attendu** : pop-up « Supprimer … de l’arbre ? » ; s'il a une photo : « Sa photo sera supprimée aussi. » ; s'il a un vocal : « ⚠️ Son message vocal (unique) sera supprimé aussi. » puis une **seconde** confirmation pour le vocal.
- [ ] **T-105** Accepte. **Attendu** : la personne disparaît de l'arbre (et de la fiche des autres).
- [ ] **T-106** Refais la même personne, cette fois annule. **Attendu** : l'annulation la remet dans l'arbre.

---

## 15. Live : préparer une session (l'hôte)

Appareil A = **hôte** (celui qui héberge). Appareil B = **invité**.

- [ ] **T-107** Sur A, ouvre l'arbre, touche 📡 **Live** puis « Héberger ». **Attendu** : une fenêtre rouge « Avant d’inviter des personnes, fais une sauvegarde complète de l’arbre. Si des modifications arrivent… ». Les boutons : « 💾 Sauvegarder l’arbre » (rouge/bleu), « Héberger », « Annuler ».
- [ ] **T-108** Touche « 💾 Sauvegarder l’arbre ». **Attendu** : le ZIP est téléchargé, et la fenêtre réapparaît avec « ✅ Sauvegarde exportée. » puis le même texte.
- [ ] **T-109** Touche « Héberger ». **Attendu** : la session démarre, un **code** s'affiche (ex. ABC123) et le bouton 🔗 « Copier le lien d’invitation » est disponible.
- [ ] **T-110** Dans le panneau 📡 Live, ton rôle est « 👑 Créateur ».
- [ ] **T-111** Touche « Copier le lien » et colle-le dans le téléphone B. **Attendu** : le lien contient `#join=CODE`.
- [ ] **T-112** Retourne à l'arbre sur A. **Attendu** : le bouton Live affiche 🔴 et le nombre de participants.

---

## 16. Live : arrivée d'un invité

- [ ] **T-113** Sur B (invité, avec un arbre déjà présent sur l'appareil), ouvre le lien. **Attendu** : la fenêtre « Avant de rejoindre, fais une sauvegarde complète de ton arbre. Après la session, ton arbre prendra la version de la session. » avec « 💾 Sauvegarder mon arbre », « Rejoindre » et « Annuler ».
- [ ] **T-114** Sur B, touche « 💾 Sauvegarder mon arbre ». **Attendu** : le ZIP est téléchargé et la fenêtre réapparaît avec « ✅ Sauvegarde exportée. ».
- [ ] **T-115** Touche « Rejoindre ». **Attendu** : sur A, une confirmation « <prénom de B> demande à rejoindre la session et recevra une copie de « … » (en tant qu’Invité…). Accepter ? ». Accepte.
- [ ] **T-116** Sur B, **Attendu** : dans « Mes arbres », une copie de l'arbre nommée « … (avant session) » est apparue. C'est la copie de sécurité.
- [ ] **T-117** Sur B, la notification apparaît si des médias manquent : « Il manque N média(s) à ton arbre. Voulez-vous tout récupérer ? » avec « Oui, tout récupérer » et « Non, plus tard ». **Attendu** : le message donne seulement un **total**, sans détail. Si rien ne manque, **aucune** notification.
- [ ] **T-118** Sur B, touche « Oui, tout récupérer ». **Attendu** : le bandeau vert « ⬇️ Médias : x / y » apparaît et augmente. Tu peux continuer à naviguer dans l'arbre pendant le transfert.
- [ ] **T-119** Sur B, touche « Non, plus tard ». **Attendu** : rien ne se télécharge. Les pastilles ⬇️ restent visibles sur les personnes concernées.
- [ ] **T-120** Sur B, ouvre une fiche dont la photo manque. **Attendu** : un encart jaune « 📸 Photo non récupérée » avec « ⬇️ Récupérer sur mon arbre ».
- [ ] **T-121** Touche « ⬇️ Récupérer sur mon arbre » sur une seule zone. **Attendu** : seul ce média est récupéré ; les autres restent manquants.
- [ ] **T-122** Sur B, une personne dont un média est **identique** à celui de A ne porte **pas** de pastille ⬇️ (ce média n'est jamais signalé).
- [ ] **T-123** Sur B, ouvre le panneau 📡 Live : la section « Médias » affiche « Il reste N médias à récupérer… » ou « Tous les médias sont sur ton arbre ✓ ».
- [ ] **T-124** Sur B, touche « Quitter la session » **avant** la fin des transferts. **Attendu** : « Tu n’as pas tous les médias. Tu ne verras pas tout hors session. Tout récupérer maintenant ? » avec « Tout récupérer », « Quitter quand même » et « Annuler ».
- [ ] **T-125** Touche « Annuler ». **Attendu** : tu restes dans la session.
- [ ] **T-126** Touche « Quitter quand même ». **Attendu** : tu quittes ; les médias déjà reçus restent sur B.

---

## 17. Live : modifications en direct et tickets

Sur A (hôte) et B (invité, connecté).

- [ ] **T-127** Sur A, modifie une fiche (ex. le lieu de naissance). **Attendu** : la modification apparaît **immédiatement** chez B, sans validation (A est Créateur).
- [ ] **T-128** Sur B, avec le rôle **Invité** (lecture seule) : **Attendu** : les boutons ✏️ et « ＋ Personne » ne sont pas proposés, et la barre de menu n'affiche pas d'action de modification.
- [ ] **T-129** Donne le rôle **Éditeur** à B depuis A (menu du panneau Live, liste déroulante). **Attendu** : sur B, un toast « Ton rôle : ✏️ Éditeur ».
- [ ] **T-130** Sur B (éditeur), modifie une fiche. **Attendu** : A reçoit la modification **immédiatement**, avec un toast « ✏️ Léa a modifié … ».
- [ ] **T-131** Sur B, **hors ligne** (mode avion pendant la modification) : modifie une fiche, puis reconnecte-toi et rejoins la session. **Attendu** : sur A, un bandeau rose « 🎫 1 modification à valider » (et un bouton « Voir »).
- [ ] **T-132** Sur A, touche « Voir » pour ouvrir les tickets. **Attendu** : chaque ticket affiche l'ancienne et la nouvelle valeur, avec une couleur : rose (ajout), orange (modification), rouge (suppression).
- [ ] **T-133** Sur A, touche ✅ sur un ticket. **Attendu** : confirmation « Valider les changements de … ». Accepte : toast « ✅ Changements appliqués » avec un bouton « Annuler ».
- [ ] **T-134** Sur A, touche ❌ sur un ticket. **Attendu** : confirmation « Refuser les changements de … ». Accepte : le ticket disparaît et B voit « ❌ Ta modification … a été refusée ».
- [ ] **T-135** Sur B, pendant qu'il attend : **Attendu** : bandeau bleu « ⏳ N de tes modifications sont en attente de validation par l’hôte ».
- [ ] **T-136** Sur **B** (invité ou éditeur), essaie de valider un ticket : **Attendu** : les boutons ✅ et ❌ ne fonctionnent pas (l'hôte seul).
- [ ] **T-137** Un ticket **d'ajout** (nouvelle personne) : **Attendu** : la carte affiche « Nouvelle fiche » et la couleur rose.
- [ ] **T-138** Un ticket de **suppression** : **Attendu** : rouge, « Cette personne est supprimée de l’arbre ».

### 17.1 Photo dans un ticket
- [ ] **T-139** Sur B (invité hors ligne), change la photo d'une personne, reconnecte-toi. Sur A, ouvre le ticket. **Attendu** : la photo « Avant » et « Proposé » s'affichent **côte à côte**. La nouvelle photo se charge après quelques secondes (elle vient de B).
- [ ] **T-140** Même test, mais **B déconnecté** avant que A ouvre le ticket. **Attendu** : à la place de la photo, « ⚠️ Média non disponible : … doit être connecté·e pour l’envoyer ».
- [ ] **T-141** Validation possible sans le média : valide le ticket alors que B est déconnecté. **Attendu** : la confirmation indique « Un média n’est pas encore reçu… ». Une fois B revenu, la photo arrive.

### 17.2 Vidéo dans un ticket
- [ ] **T-142** Un ticket contenant une vidéo (souvenir) : **Attendu** : A voit une **miniature** et un bouton « ▶️ Voir la vidéo ». La vidéo complète **ne se charge pas** tant que tu ne cliques pas.
- [ ] **T-143** Clique « ▶️ Voir la vidéo ». **Attendu** : le bouton indique « ⏳ Réception… » puis la vidéo se joue.

---

## 18. Live : conflits entre deux personnes

- [ ] **T-144** A et B ouvrent **la même fiche** en même temps. **Attendu** : toast « 👀 … a aussi cette fiche ouverte : si vous enregistrez en même temps, la dernière version enregistrée est gardée. ».
- [ ] **T-145** A modifie la fiche et enregistre. Puis B (qui avait la fiche ouverte depuis avant) enregistre sa propre modification. **Attendu** : pop-up « ⚠️ Cette fiche a été modifiée par quelqu’un d’autre pendant que tu la modifiais. Enregistrer remplacera ses changements par les tiens. Continuer ? ». Refuse : B reste dans la fenêtre avec sa saisie. Accepte : B écrase.
- [ ] **T-146** Même test, mais A **supprime** la personne pendant que B l'édite. **Attendu** : pop-up « ⚠️ Cette personne a été supprimée… Enregistrer la remettra dans l’arbre. Continuer ? ».

---

## 19. Live : retirer ou changer le rôle

- [ ] **T-147** Sur A, retire B de la session (croix ✕ à côté de son nom). **Attendu** : pop-up de confirmation ; B voit « Tu as été retiré de la session ». Il peut revenir avec le lien (une nouvelle validation est demandée).
- [ ] **T-148** Sur A, change le rôle de B (Invité → Éditeur → Invité). **Attendu** : B voit « Ton rôle : … » à chaque changement.
- [ ] **T-149** Un invité **déjà venu** (même appareil) revient avec le lien : **Attendu** : pas de nouvelle demande de validation, il retrouve son rôle.

---

## 20. Live : coupure et reprise des transferts

- [ ] **T-150** Sur B, lance « Tout récupérer » avec beaucoup de médias, puis **coupe le Wi-Fi** au milieu. **Attendu** : toast « Récupération interrompue : relance « Tout récupérer » pour reprendre où elle s'est arrêtée. ».
- [ ] **T-151** Rétablis le réseau, relance « Tout récupérer ». **Attendu** : le transfert **reprend** et ne redemande pas les morceaux déjà reçus (le compteur repart du bon endroit).
- [ ] **T-152** Recharge la page sur B pendant le transfert, puis relance. **Attendu** : la reprise fonctionne aussi.
- [ ] **T-153** Un média est **remplacé** sur A pendant son transfert sur B. **Attendu** : toast « ⚠️ Un média a été remplacé pendant son transfert… » ; B récupère la nouvelle version si « Tout récupérer » est en cours. (Difficile à provoquer : note si tu ne peux pas le tester.)
- [ ] **T-154** Un média **disparu** côté hôte : **Attendu** : toast « Ce média a été remplacé chez l’hôte : liste mise à jour. ».

---

## 21. Stockage séparé entre version principale et version de test

- [ ] **T-155** Sur le **même navigateur**, ouvre la version principale (https://icerayzer.github.io/app_PALOGIK-S/). **Attendu** : tes arbres réels sont là, sans bandeau rouge.
- [ ] **T-156** Ouvre la version de test sur le même navigateur. **Attendu** : elle **ne montre pas** les arbres de la version principale ; elle est vide (ou ne contient que tes arbres de test).
- [ ] **T-157** Crée un arbre de test sur `/dev/`, puis reviens sur la version principale. **Attendu** : l'arbre de test **n'apparaît pas** sur la version principale.
- [ ] **T-158** Vérifie que la version principale n'a pas été modifiée par les tests.

---

## 22. Migration des anciens arbres de test

Ce test concerne les arbres de test **créés avant** les changements de stockage (Priorité 5).

- [ ] **T-159** Si tu as un arbre de test ancien (créé avant la mise à jour), ouvre-le. **Attendu** : ses photos et vocaux s'affichent. Ouvre la console (F12) : aucune erreur rouge « Mise à jour du stockage impossible ».
- [ ] **T-160** Après la migration, exporte l'arbre et contrôle que `arbre.json` utilise bien des identifiants de 64 caractères (et non des données en texte long).

---

## 23. Navigation et finitions

- [ ] **T-161** Le menu ⋯ : « 💾 Exporter la sauvegarde », « ⚙️ Infos de l’arbre », « 🗂️ Mes arbres », et le rôle affiché en bas du menu.
- [ ] **T-162** « ⚙️ Infos de l’arbre » (créateur uniquement) : tu peux modifier le nom, l'origine, l'auteur. Enregistre : la modification est visible.
- [ ] **T-163** Recharge la page : **Attendu** : tu restes dans le même arbre, et les données sont toujours là.
- [ ] **T-164** Fermer le navigateur, puis le rouvrir : **Attendu** : les arbres sont toujours là.
- [ ] **T-165** Un arbre qu'on supprime : pop-up de confirmation « Supprimer définitivement « … » de cet appareil ? (Pense à l’exporter avant si besoin.) ».

---

## 24. Relevé final

Quand tous les tests sont faits, note ici les points qui n'ont pas fonctionné :

| Test | Résultat (OK / KO / non testé) | Remarque |
|---|---|---|
| | | |

**Rappel** : les tests qui impliquent **plusieurs appareils** (sections 15 à 20) et les **médias réels** (vidéo, partage téléphone, cloud) sont ceux qui ont le plus de chances de révéler des problèmes. Si un test échoue, note le **test exact**, **l'appareil et le navigateur**, et **le message affiché** (ou ce qui manque). Je pourrai alors corriger précisément.
