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

## Priorité 2 : Sauvegarde et import (ZIP)

- [ ] **Export ZIP** : `arbre.json` + dossier `medias/` contenant tous les fichiers.
- [ ] **Import du ZIP**, avec retour possible sur l'ancien format `.json`. Détection automatique du format, sans que la personne ait à choisir.
- [ ] Import en **deux gestes** seulement : « 📥 Importer » puis choix du fichier. Simple pour les personnes peu à l'aise avec le numérique.
- [ ] **Message de confirmation avant import** : « Cet arbre contient N personnes et M médias. Importer ? »
- [ ] **Bouton « 📤 Partager la sauvegarde »** : ouvre le menu de partage du téléphone (WhatsApp, Mail, Drive) au lieu de simplement télécharger le fichier.
- [ ] **Rappel de sauvegarde toutes les 10 minutes**, seulement s'il y a des modifications non exportées. Pas de rappel pendant qu'on écrit. Un bouton « Exporter maintenant » lance l'export.
- [ ] Le rappel ne sauvegarde jamais tout seul : le téléchargement est toujours déclenché manuellement par la personne.
- [ ] **Limite connue** : sur téléphone, un export crée un nouveau fichier. L'ancien doit être supprimé à la main. Sur Chrome d'ordinateur, il est possible d'écraser le fichier existant (à décider).
- [ ] **Pas de sauvegarde automatique dans la galerie.** Le risque vient des services de sauvegarde du téléphone (Google Photos, iCloud), pas de l'appli.

## Priorité 3 : Séparation des médias

- [ ] Stocker chaque vocal, vidéo et photo comme un fichier à part, avec un identifiant.
- [ ] La fiche ne garde que les identifiants des médias (les modifications de texte redeviennent légères).
- [ ] **Un identifiant par version** : si un média est remplacé, la nouvelle version a un nouvel identifiant. Aucun mélange possible entre deux versions.
- [ ] **Nettoyage automatique** : un média qui n'est plus référencé par l'arbre est supprimé de l'appareil.
- [ ] **⚠️ Média supprimé puis annulé** : il doit rester présent sur l'appareil jusqu'à la fin de la session, puis être supprimé. Si l'annulation est impossible après la session, il n'est pas restauré.

## Priorité 4 : Live et téléchargement des médias

- [ ] À l'arrivée d'un proche, n'envoyer que la structure et les textes, jamais les médias.
- [ ] **Téléchargement à la demande** : quand on ouvre une fiche, ses médias sont récupérés. Petits fichiers (vocal, photo) automatiquement ; vidéo après confirmation, avec sa taille affichée (ex. « Télécharger cette vidéo de 18 Mo ? »).
- [ ] Une fois reçu, un média reste sur l'appareil : pas de nouveau téléchargement.
- [ ] **Bouton « Tout télécharger »** dans la session, avec l'avancement (ex. « 120 / 300 médias »). La personne peut faire autre chose pendant le téléchargement.
- [ ] **Avertissement en quittant** s'il reste des médias non téléchargés : « Il reste N médias. Ils ne seront disponibles que si l'hôte est connecté. Quitter quand même ? »
- [ ] **Avertissement à l'export** si des médias manquent sur cet appareil.
- [ ] **Reprise d'un téléchargement interrompu** : chaque média est reçu par morceaux, et les morceaux déjà reçus sont gardés.
- [ ] **⚠️ Média modifié ou supprimé pendant son téléchargement** : prévenir la personne, abandonner les morceaux de l'ancienne version, puis reprendre avec la nouvelle version. Les médias déjà complets ne sont pas retéléchargés.
- [ ] Le compteur « il reste N médias » ne compte que les médias actuellement référencés et absents de l'appareil. Un média remplacé n'y apparaît jamais.
- [ ] **Côté hôte** : un média remplacé reste disponible le temps des téléchargements en cours. Si un téléchargement échoue à cause d'un remplacement, afficher « ce média a été remplacé » et recharger la liste.

## Priorité 4 bis : Validation des tickets avec aperçu des médias

- [ ] **Photo modifiée** : afficher l'ancienne et la nouvelle côte à côte, ou avec un curseur avant/après. Pas de comparaison pixel par pixel, pour éviter les calculs lourds.
- [ ] **Photo ajoutée ou supprimée** : affichage en rose (ajouté) ou en rouge transparent (supprimé), comme les autres données.
- [ ] **Vidéo modifiée** : une miniature (une image tirée de la vidéo) est créée à l'enregistrement ou à l'import, et stockée avec le média. Elle pèse environ 20 à 30 Ko. Elle permet de comparer sans télécharger la vidéo.
- [ ] La vidéo complète ne se récupère que sur demande, quand l'hôte clique pour la visionner.
- [ ] Les médias du ticket restent sur l'appareil de l'invité : l'hôte les récupère à l'ouverture du ticket. L'hôte doit donc être connecté à l'invité pour voir le nouveau média.
- [ ] Les miniatures sont ajoutées à `arbre.json` pour être disponibles hors session.

## Priorité 5 : Formats des médias

- [ ] **Son** : AAC dans un fichier `.m4a`, mono, 48 kbit/s (environ 180 Ko par minute). Lu partout.
- [ ] **Image** : WebP, 1280 px maximum, qualité 80 % (environ 100 Ko par photo). Environ 30 % plus léger que le JPEG.
- [ ] **Vidéo** : MP4 avec codec H.264, 720p maximum, 60 secondes maximum (environ 9 Mo par minute). Format le plus universel.
- [ ] Vidéo importée déjà en MP4 H.264 et assez légère : on la garde telle quelle. Sinon, l'appli demande de la réduire avec l'appli Photos du téléphone (pas de conversion dans le navigateur, trop lente).
- [ ] **À décider** : garder le JPEG en secours pour les très anciens appareils (Android ou Windows d'avant 2019).
- [ ] **Nom de fichier explicite** pour chaque média exporté, par exemple `Jean-Dupont_1952_souvenir_2026-10-16.mp4` : qui, année de naissance, type, date d'enregistrement.

## Priorité 6 : Enregistrer un média dans la galerie

- [ ] **Bouton « 💾 Enregistrer » sur chaque média** : sur téléphone, ouvre le menu de partage natif (« Enregistrer la vidéo » sur iPhone, ou téléchargement sur Android) ; sur ordinateur, téléchargement dans le dossier Téléchargements.
- [ ] Le téléchargement en dur est **toujours manuel**, jamais automatique.
- [ ] **À décider** : bouton « Tout en ZIP » pour ordinateur, rangé par personne. Sur téléphone, le ZIP reste réservé à la sauvegarde.
- [ ] Signaler dans l'appli que les fichiers enregistrés dans la galerie peuvent être envoyés vers le cloud par les services du téléphone.

## Priorité 7 : Annulation (Ctrl+Z)

- [ ] Annulation des dernières actions (une trentaine), avec le raccourci Ctrl+Z et le bouton ↩️.
- [ ] Légère : seuls les changements de fiche sont gardés, pas de copie des médias.
- [ ] **La confirmation reste la protection principale** : pop-up avant tout remplacement ou suppression de média (« Êtes-vous sûr de vouloir supprimer ce média ? »).
- [ ] L'annulation est le **dernier recours** pour les actions récentes.

## Priorité 8 : Nouveaux enregistrements

- [ ] **Vocal « anecdote »** : raconté par la personne elle-même ou par un autre narrateur (champ « narrateur »).
- [ ] **Onglet « Souvenir »** (commémoration) :
  - Personne décédée : importer un fichier audio ou vidéo existant.
  - Personne vivante : enregistrement de la personne elle-même à 10 ans, 20 ans, et 60 ans ou plus (tranches d'âge).
- [ ] Limites : vocal 2 min maximum, vidéo 1 min et 30 Mo maximum, total par personne environ 50 Mo, alerte à 70 % de l'espace disponible.
- [ ] Limite à expliquer : un appel en cours (téléphone, WhatsApp) bloque le son sur téléphone.

## Priorité 9 : Conflits pendant le live

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
