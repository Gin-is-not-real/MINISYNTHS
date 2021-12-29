# Minisynths 2021
Plusieurs tests de mini synthétiseurs  
Pour tester differents fonctionnements et architecture de classes.

## PianoBox
Un synthetiseur tout simple avec un oscillateur.  
Interface:    
    - clavier de 12 pads, controllables aussi par le clavier
    - controle de volume 
    - changement d'octave

### Versions
**PianoBox.js**  
*Un object qui créer son interface DOM tout en JS*  
       +: un seul fichier  
       -: elements non réutilisables  
       -: longues méthodes  

**PianoBoxComponent.js**
*Le même synthé mais l'objet est un web component. Le style et les elements sont crées sous forme de DOMString et inserés via `insertAdjacentHTML()`*  
    *   +: Création des elements plus claire*  
    *   -: On doit récuperer les élements par querySelector pour les les manipuler*  
    *   -: N'accède pas au style global*  

**Modular/**
*Tests de composants modulaires basés web components*  
    *   (+) template html clair*   
    *   (+) Importe seulement le css necessaire*  
    *   (-) Je doit attacher le shadow DOM à un element global pour importer les feuilles de style  
    *   (-) Ajoute des noeuds textuels dans le HTML si on utilise des retours à la ligne dans le template  
