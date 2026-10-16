# À faire

Tâches validées pour les prochaines mises à jour. Les idées non validées sont dans [New features.md](New%20features.md).

Légende : `[ ]` à faire · `[x]` déjà réalisé · **⚠️** point critique à ne pas oublier.

---

## Priorité 1 : Environnement de test (avant toute nouvelle fonctionnalité)

- [ ] Branche `dev` publiée à l'adresse `/dev/` du même dépôt, avec un bandeau « VERSION TEST ».
- [ ] **⚠️ Stockage séparé entre `main` et `dev`** : base de données et clés de réglages distinctes, pour que les tests ne touchent jamais aux arbres réels. (Même domaine, donc sans cette séparation les données seraient partagées.)
- [ ] Script GitHub Actions qui publie `main` à la racine et `dev` dans `/dev/`.
- [ ] Réglage manuel dans GitHub : *Settings → Pages → Source : GitHub Actions* (à faire une seule fois, par toi).
- [ ] Règle de travail : jamais de fusion `dev` → `main` sans test. Passer par une *Pull request* pour voir les changements avant publication.
- [ ] Les données restent dans le navigateur de chacun, pas dans le dépôt : aucune opération Git ne les efface.

## Priorité 2 : Stockage, sauvegarde et accueil

- [ ] **⚠️ Stockage persistant** : demander au navigateur de ne pas effacer les données (déjà prévu dans le code, à vérifier).
- [ ] **Avertissement iPhone** : Safari peut effacer les données d'un site non utilisé pendant 7 jours. Recommander d'installer l'appli sur l'écran d'accueil (voir « Mode hors-ligne installable » dans New features).
- [ ] **Message d'accueil** à chaque arrivée sur le site : une phrase de bienvenue, avec en petit : « Si vous êtes en navigation privée, vos données ne seront pas conservées. Utilisez un navigateur normal. »
- [ ] **Détection de la navigation privée** : quand c'est possible, un avertissement bien visible remplace la phrase de bienvenue. La détection n'est pas fiable sur tous les navigateurs : la phrase reste donc toujours affichée.
- [ ] **Rappel de sauvegarde toutes les 10 minutes**, seulement s'il y a des modifications non exportées. Pas de rappel pendant qu'on écrit. Un bouton « Exporter tout l'arbre » lance l'export.
- [ ] Le rappel ne sauvegarde jamais tout seul : le téléchargement est toujours déclenché manuellement par la personne.
- [ ] **Limite connue** : sur téléphone, un export crée un nouveau fichier. L'ancien doit être supprimé à la main. Sur Chrome d'ordinateur, il est possible d'écraser le fichier existant (à décider).
- [ ] **Pas de sauvegarde automatique dans la galerie.** Le risque vient des services de sauvegarde du téléphone (Google Photos, iCloud), pas de l'appli.

## Priorité 3 : Export « Exporter tout l'arbre »

Un seul export, qui contient tout. C'est le bouton « Exporter tout l'arbre », au même endroit sur tous les appareils.

- [ ] Un fichier ZIP unique, contenant les données **et** tous les médias.
- [ ] Contenu : `arbre.json` (toutes les données) à la racine, plus un dossier par personne, contenant ses médias. Chaque média n'est présent qu'une seule fois.
- [ ] Noms de fichiers explicites : `Jean-Dupont_1952_souvenir_2026-10-16.mp4` (qui, année de naissance, type, date d'enregistrement).
- [ ] Un fichier `LISEZ-MOI.txt` explique la structure, pour pouvoir reconstruire une appli même si Racines ne fonctionne plus.
- [ ] Le ZIP sert à deux choses : réimporter l'arbre dans l'appli (sur n'importe quel navigateur), et retrouver les fichiers à la main dans la galerie ou sur l'ordinateur.
- [ ] **Avertissement à l'export** si des médias manquent sur cet appareil.
- [ ] **Bouton « 📤 Partager la sauvegarde »** : ouvre le menu de partage natif du téléphone (WhatsApp, Mail, Drive) pour envoyer le ZIP complet, au lieu de le télécharger.
- [ ] Vérifier la taille acceptée par le partage (WhatsApp, Mail) avant de publier ce bouton (à tester).

## Priorité 4 : Import de l'arbre

- [ ] **Import en deux gestes** seulement : « 📥 Importer » puis choix du fichier. Simple pour les personnes peu à l'aise avec le numérique.
- [ ] **Détection automatique** du format : ZIP exporté ou ancien `.json`, sans que la personne ait à choisir.
- [ ] **Message de confirmation avant import** : « Cet arbre contient N personnes et M médias. Importer ? »
- [ ] **Import des médias sans relecture inutile** : pour chaque média, si son empreinte est déjà présente dans le navigateur (y compris un doublon, c'est-à-dire un fichier au contenu identique), il n'est ni relu ni réécrit.
- [ ] **Vérification d'intégrité** : à l'import, l'empreinte de chaque fichier est recalculée pour s'assurer qu'il n'est pas corrompu.
- [ ] Les noms de fichiers ne servent pas à identifier un média : un fichier renommé dans le ZIP reste reconnu grâce à son empreinte.

## Priorité 5 : Séparation des médias et identification

- [ ] Stocker chaque vocal, vidéo et photo comme un fichier à part, avec un identifiant.
- [ ] **Identifiant = empreinte SHA-256 du contenu.** Même contenu = même identifiant. Contenu modifié = nouvel identifiant.
- [ ] La fiche ne garde que les identifiants des médias (les modifications de texte redeviennent légères).
- [ ] **Nettoyage automatique** : un média qui n'est plus référencé par l'arbre est supprimé de l'appareil. Exception pendant la session : un média supprimé reste disponible jusqu'à la fin de la session, pour pouvoir être restauré par Ctrl+Z.
- [ ] **⚠️ Média supprimé puis annulé** : il doit rester présent sur l'appareil jusqu'à la fin de la session, puis être supprimé. Si l'annulation est impossible après la session, il n'est pas restauré.
- [ ] **⚠️ Média modifié hors de l'appli** (recadré, retouché, ou simplement réenregistré dans un logiciel) : l'empreinte change, donc le fichier n'est plus reconnu. Pour changer un média, passer par l'appli.

## Priorité 6 : Live et récupération des médias

- [ ] À l'arrivée d'un proche, n'envoyer que la structure et les textes, jamais les médias.
- [ ] **Deux actions distinctes, avec des icônes différentes** :
  - « ⬇️ Récupérer sur mon arbre » : le média est stocké dans le navigateur, pour utiliser l'appli. Rien n'apparaît dans la galerie.
  - « 💾 Exporter ce média » : crée un fichier visible dans la galerie ou le dossier de l'ordinateur. Ce n'est jamais nécessaire pour utiliser l'appli.
- [ ] **Indicateur des médias absents de l'arbre** : une pastille sur la personne, et sur chaque zone concernée dans sa fiche (photo, vocal, vidéo…). Un média dont l'empreinte est déjà présente n'est jamais signalé.
- [ ] **Dans chaque zone d'une fiche**, un bouton « ⬇️ Récupérer sur mon arbre » permet de récupérer ce média précisément, sans passer par « Tout récupérer ».
- [ ] **Bouton « Tout récupérer »** dans la session, avec l'avancement (ex. « 120 / 300 médias »). La personne peut faire autre chose pendant le transfert.
- [ ] **Avertissement en quittant** s'il reste des médias non récupérés : « Tu n'as pas tous les médias. Tu ne verras pas tout hors session. Tout récupérer maintenant ? »
- [ ] Une fois reçu, un média reste sur l'appareil : pas de nouveau transfert.
- [ ] **Reprise d'un transfert interrompu** : chaque média est reçu par morceaux, et les morceaux déjà reçus sont gardés.
- [ ] **⚠️ Média modifié ou supprimé pendant son transfert** : prévenir la personne, abandonner les morceaux de l'ancienne version, puis reprendre avec la nouvelle version. Les médias déjà complets ne sont pas retéléchargés.
- [ ] Le compteur « il reste N médias » ne compte que les médias actuellement référencés et absents de l'appareil. Un média remplacé n'y apparaît jamais.
- [ ] **Côté hôte** : un média remplacé reste disponible le temps des transferts en cours. Si un transfert échoue à cause d'un remplacement, afficher « ce média a été remplacé » et recharger la liste.

## Priorité 6 bis : Règles d'arrivée et de modification en session

**Règle d'or** : seules les différences apportées par une personne qui arrive avec un arbre différent passent par la validation de l'hôte. Les modifications faites en direct par les éditeurs autorisés sont appliquées immédiatement, sans validation, et ne peuvent pas être refusées.

**Arrivée d'un invité**
- [ ] **Sauvegarde automatique avant arrivée, dans tous les cas** : son arbre personnel est copié dans « Mes arbres » (« avant session »). Le code actuel écrit encore « avant fusion » : à renommer. Cette copie n'est pas une garantie, car l'arbre personnel change dès qu'on quitte la session.
- [ ] **⚠️ Avertissement avant de rejoindre une session** : « Avant de rejoindre, fais une sauvegarde complète de ton arbre. Après la session, ton arbre prendra la version de la session. » Avec un bouton **« Sauvegarder mon arbre »** directement dans l'avertissement.
- [ ] **Notification à l'arrivée** : « Il manque N médias à ton arbre. Voulez-vous tout récupérer ? » Oui ou non. Le nombre est un total : la liste détaillée n'est pas affichée.
- [ ] **Si oui** : tous les médias absents de son arbre sont récupérés. Les médias propres à l'invité ne sont jamais remplacés.
- [ ] **Si non** : l'invité entre dans l'arbre. Chaque onglet de personne propose, pour chaque zone manquante, un bouton « ⬇️ Récupérer sur mon arbre ». Il s'agit de télécharger dans son arbre, pas d'exporter.
- [ ] **Médias identiques** : un média qui a la même empreinte que celui de l'hôte n'est jamais signalé, ni dans la notification, ni comme modification, ni dans les tickets. Il n'est pas à télécharger.
- [ ] **⚠️ Les médias de l'invité lui-même ne sont jamais proposés** : ses propres photos, vidéos ou vocaux modifiés ou ajoutés restent sur son appareil et deviennent des tickets.
- [ ] **Après avoir quitté une session**, l'arbre personnel contient la dernière version reçue de la session, y compris les modifications des éditeurs. Il n'y a pas de retour automatique à la version d'avant.

**Côté hôte**
- [ ] **Avertissement rouge au moment d'héberger une session** (bouton 📡 Live) : « Avant d'inviter des personnes, fais une sauvegarde complète de l'arbre. Si des modifications arrivent pendant la session, tu pourras revenir à ta version d'avant. »
- [ ] **Notification en haut** avec le nombre de modifications, ajouts et suppressions reçus.
- [ ] **⚠️ Validation par l'hôte uniquement** : ✅ et ❌ ne sont accessibles que pour l'hôte, avec confirmation à chaque décision.
- [ ] **Une fiche peut être acceptée avec un média manquant.** Le média reste sur l'appareil de l'invité, et la fiche affiche « média manquant » tant que personne ne l'a reçu.

**Retour en arrière**
- [ ] **Retour en arrière par personne** : chaque personne ne peut annuler que ses propres actions (Ctrl+Z). Il n'existe pas d'annulation de l'arbre général.

## Priorité 7 : Validation des tickets avec aperçu des médias

- [ ] **Photo modifiée** : afficher l'ancienne et la nouvelle côte à côte, ou avec un curseur avant/après. Pas de comparaison pixel par pixel, pour éviter les calculs lourds.
- [ ] **Photo ajoutée ou supprimée** : affichage en rose (ajouté) ou en rouge transparent (supprimé), comme les autres données.
- [ ] **Vidéo modifiée** : une miniature (une image tirée de la vidéo) est créée à l'enregistrement ou à l'import, et stockée avec le média. Elle pèse environ 20 à 30 Ko. Elle permet de comparer sans télécharger la vidéo.
- [ ] La vidéo complète ne se récupère que sur demande, quand l'hôte clique pour la visionner.
- [ ] Les médias du ticket restent sur l'appareil de l'invité : l'hôte les récupère à l'ouverture du ticket. L'hôte doit donc être connecté à l'invité pour voir le nouveau média.
- [ ] **Validation possible même si le média n'est pas disponible** : la fiche est acceptée avec un média « manquant », jusqu'à ce qu'il soit reçu.
- [ ] Les miniatures sont ajoutées à `arbre.json` pour être disponibles hors session.
- [ ] Un média identique (même empreinte) n'apparaît jamais dans un ticket.

## Priorité 8 : Formats des médias

- [ ] **Son** : AAC dans un fichier `.m4a`, mono, 48 kbit/s (environ 180 Ko par minute). Lu partout.
- [ ] **Image** : JPEG, 1280 px maximum, qualité 80 % (environ 170 Ko par photo). Lu par tous les appareils, y compris les plus anciens.
- [ ] **Vidéo** : MP4 avec codec H.264, 720p maximum, 60 secondes maximum (environ 9 Mo par minute). Format le plus universel.
- [ ] Vidéo importée déjà en MP4 H.264 et assez légère : on la garde telle quelle. Sinon, l'appli demande de la réduire avec l'appli Photos du téléphone (pas de conversion dans le navigateur, trop lente).

## Priorité 9 : Enregistrer un média dans la galerie

- [ ] **Bouton « 💾 Exporter ce média » sur chaque média** : crée un fichier du média sur lequel on a cliqué, et non de l'arbre entier. Sur téléphone, ouvre le menu de partage natif (« Enregistrer la vidéo » sur iPhone, ou téléchargement sur Android) ; sur ordinateur, téléchargement dans le dossier Téléchargements.
- [ ] **Distinction des icônes** : ⬇️ Récupérer sur mon arbre (stockage du navigateur, pour utiliser l'appli) et 💾 Exporter ce média (fichier, pour la galerie). Les deux ne doivent jamais être confondus dans l'interface.
- [ ] Le téléchargement en dur est **toujours manuel**, jamais automatique.
- [ ] Signaler dans l'appli que les fichiers enregistrés dans la galerie peuvent être envoyés vers le cloud par les services du téléphone.

## Priorité 10 : Annulation (Ctrl+Z)

- [ ] Annulation des dernières actions de **la personne elle-même** (une trentaine), avec le raccourci Ctrl+Z et le bouton ↩️. Pas d'annulation de l'arbre général.
- [ ] Légère : seuls les changements de fiche sont gardés, pas de copie des médias.
- [ ] **La confirmation reste la protection principale** : pop-up avant tout remplacement ou suppression de média (« Êtes-vous sûr de vouloir supprimer ce média ? »).
- [ ] L'annulation est le **dernier recours** pour les actions récentes.
- [ ] Annuler un remplacement de média n'est possible que si l'ancien média est encore présent (voir Priorité 5).

## Priorité 11 : Nouveaux enregistrements

- [ ] **Vocal « anecdote »** : raconté par la personne elle-même ou par un autre narrateur (champ « narrateur »).
- [ ] **Onglet « Souvenir »** (commémoration) :
  - Personne décédée : importer un fichier audio ou vidéo existant.
  - Personne vivante : enregistrement de la personne elle-même à 10 ans, 20 ans, et 60 ans ou plus (tranches d'âge).
- [ ] Limites : vocal 2 min maximum, vidéo 1 min et 30 Mo maximum, total par personne environ 50 Mo, alerte à 70 % de l'espace disponible.
- [ ] Limite à expliquer : un appel en cours (téléphone, WhatsApp) bloque le son sur téléphone.

## Priorité 12 : Conflits pendant le live

- [ ] Deux personnes qui modifient la même fiche en même temps : la dernière modification gagne actuellement. À améliorer si cela pose problème en pratique.

---

## Déjà réalisé

- [x] Rôles Invité, Éditeur et Créateur, avec attribution et changement par l'hôte.
- [x] Fiche pop-up avec grande photo, toutes les infos et vocal.
- [x] Cartes à largeur adaptée au nom.
- [x] Vocal enregistrable et réécoutable par tous, avec jauge de niveau et protection contre l'écrasement.
- [x] Identité persistante par appareil, retour automatique sans nouvelle validation.
- [x] Retrait d'un participant par la croix ✕, avec possibilité de revenir via le lien.
- [x] Code d'invitation fixe, choisi par le Créateur et mémorisé pour chaque arbre.
- [x] Annulation (↩️) et confirmations pour les suppressions.
- [x] Interface mobile : barre des vues en bas, menu ⋯, barre du haut compacte.
- [x] Zoom par pincement, boutons ＋ / − et recentrage 🎯.
- [x] Tickets de validation à l'arrivée d'un invité, avec ✅ / ❌, détail coloré (rose, orange, rouge) et confirmation.
- [x] Contrôle de version entre hôte et invité, statut d'attente pour l'invité, retour de décision.
- [x] Assistant de création et d'édition refondu : rail d'icônes à 7 étapes, Enregistrer toujours visible, calage sur le clavier, dates assistées (14031952 → 14/03/1952, sélecteur 📅).
- [x] ✏️ par bloc dans la fiche, qui ouvre l'assistant sur la bonne étape.
