# Modifications à faire plus tard

Problèmes repérés en test, **notés mais pas encore réglés**. À traiter une fois `A faire.md` terminé, car certaines fonctionnalités à venir (live, médias, import) touchent aux mêmes zones.

## Rappel de sauvegarde (Priorité 2) : impossible à tester en live

- **Constat** : le rappel toutes les 10 minutes (bandeau jaune « Exporter tout l'arbre ») est codé, mais n'a pas pu être testé en conditions réelles.
- **Essai fait** : modifier des fiches depuis l'hôte, puis rejoindre avec un autre compte qui n'avait pas ces modifications.
- **Résultat** : tout se synchronise immédiatement, l'invité récupère tout d'un coup. On ne peut donc pas obtenir une situation « modifications non exportées sur un appareil » avec le live.
- **À vérifier plus tard** :
  - le rappel apparaît bien 10 minutes après une modification faite hors live (arbre seul sur un appareil) ;
  - il ne revient pas après un export, ni pendant une saisie ni sous une fenêtre ouverte ;
  - son comportement pour un invité qui reçoit des modifications en live (compte-t-on ces modifications comme « non exportées » ?). À décider avec les règles de la Priorité 6 bis.
- **Statut** : non réglé. La Priorité 2 n'est pas cochée dans `A faire.md` tant que ce point n'est pas vérifié.
