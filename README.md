# Simple Synth
## MODD
**SIMPLE    FONCTIONNEL     PRESENTABLE**

## Piano Box - Web Component
Un petit synthetiseur sous forme de web component
Peut être inseré dans le 
### Présentation
    - Sound Nodes
    - Master gain control
    - Keyboard control
    - Keys events
    - Octave Shifter control
    
#### Attributs
    - soundNodes = {}

    - notes = [];
    - activeNote;
    - octave;
    - padIsHold;

    - interface;

#### Fonctions
    - createSoundNodes()

    - createInterface():HTMLElement
    - createControl()
    - createKeyboardElement()
    - attachKeysEvents()
    - createOctaveShifter()

    - playNote(note)
    - stopNote()
    - upOctave()
    - downOctave()

    - setOscFrequency(value)
    - getOscFrequency()
    - setOscGain(value)
    - getOscGain()
    - setMasterGain(value)
    - getMasterGain()

### Fonctionnement
    - Instance de shadow: `this.attachShadow({mode: 'open'})`

    - Creation de l'interface: 
        - Creation de l'element via `document.createElement("div")`
        - Creation d'une stringHTML contenant une balise de style (Contenannt la ligne `@import url()`) 
    - Ajout dans le shadow dom via `appendChild()`
    
    - Creation des sounds nodes de gain et oscillator

    - Creation des elements de controle
        - Ecriture du HTML sous forme de string
        - Ajout dans l'interface du PianoBox via `insertAdjacentHTML`

        - Selection des elements via `this.interface.querySelector()`
        - Ajout des events listeners

### Avantage et inconvénients
**Avantages:**
    - Création des elements plus claire

**Inconvénients:**
    - On doit récuperer les élements par query pour y attacher les events ou les manipuler
    - Pirouete pour le style