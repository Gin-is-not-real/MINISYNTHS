### PianoBox.js
Une classe PianoBox qui créer son interface DOM tout en JS

### Fonctionnement
Les element sont crées à l'interieur de la classe, par des méthodes, comme `createOctaveShifter()`. Ces méthodes retournent des HTMLElement qui seront ajouté à l'interface via `this.interface.appendChild()`

Méthodes `create...()`:
    - Creation d'un container via `document.createElement()`
    - Creation des élements et ajout au container via `appendChild()`
    - Ajout des events listeners
    - Retourne le container

### Avantages et inconvénients
**Avantages**
    - Modification facile des elements sans aller chercher dans d'autres fichiers
**Inconvénients**
    - Les méthodes sont longues
    - Les elements ne sont pas réutilisables
