# Minisynth 2021
Un synthetiseur tout simple avec un oscillator.
Interface:  
    - clavier de 12 pads, controllables aussi par le clavier
    - controle de volume 
    - changement d'octave

## PianoBox.js
Une classe PianoBox qui créer son interface DOM tout en JS
- Sound Nodes gain et oscillator
- Keyboard control
- Keys events
- Master Gain control
- Octave control

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
