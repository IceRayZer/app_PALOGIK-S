# À faire

Liste des tâches validées pour les prochaines mises à jour. Les idées non validées sont dans [New features.md](New%20features.md).

## Sauvegarde et import (ZIP)

- [ ] **Bouton « 📤 Partager la sauvegarde »** : ouvre le menu de partage du téléphone (WhatsApp, Mail, Drive) au lieu de simplement télécharger le fichier.
- [ ] **Import qui accepte le ZIP et l'ancien format `.json`** : détection automatique, sans que la personne ait à choisir.
- [ ] **Message de confirmation avant import** : « Cet arbre contient N personnes et M médias. Importer ? »

## Séparation des médias

- [ ] Stocker les vocaux, vidéos et photos dans un espace à part du stockage de l'arbre, avec un identifiant pour chacun.
- [ ] La fiche ne garde que les identifiants des médias.
- [ ] Export de l'arbre en ZIP : `arbre.json` + dossier `medias/`.
- [ ] Import du ZIP, avec retour sur l'ancien format `.json`.

## Live et téléchargement des médias

- [ ] À l'arrivée d'un proche, n'envoyer que la structure et les textes, pas les médias.
- [ ] Téléchargement d'un média à la demande, quand on ouvre la fiche qui le contient.
- [ ] Bouton « Tout télécharger » dans la session, avec l'avancement (ex. « 120 / 300 médias »).
- [ ] Avertissement avant de quitter la session s'il reste des médias non téléchargés.
- [ ] Avertissement à l'export si des médias manquent sur cet appareil.

## Nouveaux enregistrements

- [ ] Vocal « anecdote » : raconté par la personne ou par un autre narrateur (champ narrateur).
- [ ] Onglet « Souvenir » : enregistrement à 10 ans, 20 ans, 60 ans et plus (tranches d'âge), ou import d'un fichier pour une personne décédée.
- [ ] Limites : vocal 2 min max, vidéo 1 min max et 30 Mo max, total par personne environ 50 Mo, alerte à 70 % de l'espace disponible.

## Environnement de test

- [ ] Branche `dev` publiée à l'adresse `/dev/`, avec un bandeau « VERSION TEST ».
- [ ] Stockage séparé entre `main` et `dev`, pour que les tests ne touchent pas aux données réelles.
- [ ] Script GitHub Actions pour publier les deux branches.
- [ ] Réglage manuel dans GitHub : *Pages → Source : GitHub Actions*.
