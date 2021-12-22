# Minisynth 2021
Plusieurs tests de mini synthétiseurs

## PianoBox
Un synthetiseur tout simple avec un oscillateur.
Interface:  
    - clavier de 12 pads, controllables aussi par le clavier
    - controle de volume 
    - changement d'octave

### Versions
**PianoBox.js**
*Un object qui créer son interface DOM tout en JS*
    *+: un seul fichier*
    *-: elements non réutilisables*
    *-: longues méthodes*

**PianoBoxComponent.js**
*Le même synthé mais l'objet est un web component. Le style et les elements sont crées sous forme de DOMString et inserés via `insertAdjacentHTML()`*
    *+: Création des elements plus claire*
    *-: On doit récuperer les élements par querySelector pour les les manipuler*
    *-: N'accède pas au style global*

