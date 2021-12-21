////////////////////////////////////////////////////////////////
//
class PianoBox {
    osc;

    notes = [];
    activeNote;
    octave;

    interface;
    noteDisplayer;

    constructor() {
        this.osc = this.createOscillator();
        this.notes = NOTES;
        this.octave = 4;
        this.interface = this.createInterface();
        this.attachKeysEvents();
    }

    createOscillator() {
        let osc = audioCtx.createOscillator();
        let gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.gain = gain;

        osc.setGain = function(value) {
            this.gain.gain.value = value;
        }
        osc.getGain = function() {
            return this.gain.gain.value;
        }
        osc.setFrequency = function(value) {
            this.frequency.value = value;
        }
        osc.getFrequency = function() {
            return this.frequency.value;
        }

        osc.setGain(0);
        osc.start();

        return osc;
    }

    createInterface() {
        let content = document.createElement("div");
        content.id = "pianoBox";

        let keyboard = this.createKeyboardElement();
        content.appendChild(keyboard);

        let freqMonito = Component.createValueMonitor("Note");
        freqMonito.id = "freq-displayer";
        // TODO: changer l'id et le  nom de varible pour noteDisplayer
        this.noteDisplayer = freqMonito.childNodes[1];
        console.log(this.noteDisplayer);

        content.appendChild(freqMonito);

        content.appendChild(Component.createOctaveShifter(this));

        return content;
    }

    createKeyboardElement() {
        let keyboardCnt = document.createElement("div");
        keyboardCnt.id = "keyboard-cnt";
        let keyboard = document.createElement("div");
        keyboard.id = "keyboard";
    
        this.notes.forEach(note => {
            let noteElt = this.createNoteElement(note);
            keyboard.appendChild(noteElt);

            note.element = noteElt;
        });
        keyboardCnt.appendChild(keyboard);

        return keyboardCnt;
    }

    createNoteElement(note) {
        let noteElt = document.createElement('div');
        noteElt.className = 'note';
        noteElt.id = note.name;
        noteElt.textContent = note.key;
    
        if(noteElt.id.substr(-1) === "d") {
            noteElt.classList.add('diese');
        }
    
        let self = this;
        noteElt.addEventListener("mousedown", function() {
            self.playNote(note);
        });
        noteElt.addEventListener("mouseup", function() {
            self.stopNote();
        });
    
        return noteElt;
    }

    attachKeysEvents() {
        let notesTab = this.notes;
        let keys = [];
        notesTab.forEach(note => {
            keys.push(note.key);
        });
        console.log(keys);
    
        let self = this;
        document.addEventListener('keydown', function(e) {
            if(keys.includes(e.key)) {
                let index = keys.indexOf(e.key);
                let played = notesTab[index];

                self.playNote(played);

                console.log('Key ', e.key, ' play ', played);
                played.element.classList.add('active');
            }
        })
        document.addEventListener('keyup', function(e) {
            if(keys.includes(e.key)) {
                let index = keys.indexOf(e.key);
                let played = notesTab[index];

                self.stopNote();

                played.element.classList.remove('active');
            }
        })
    }

    upOctave() {
        this.octave ++;

        let notes = this.notes;
        notes.forEach(note => {
            note.freq *= 2;
        });
        this.notes = notes;
    }
    downOctave() {
        this.octave --;

        let notes = this.notes;
        notes.forEach(note => {
            note.freq /= 2;
        });
        this.notes = notes;
    }

    playNote(note) {
        this.osc.setFrequency(note.freq);
        this.osc.setGain(1);

        this.noteDisplayer.textContent = note.fr;
    }
    stopNote() {
        this.osc.setGain(0);

        this.noteDisplayer.textContent = "";
    }
    
}