////////////////////////////////////////////////////////////////
//
class PianoBox {
    oscillator;

    notes = [];
    activeNote;
    octave;

    interface;

    constructor() {
        this.notes = NOTES;
        this.octave = 4;
        this.init();
    }

    init() {
        this.oscillator = audioCtx.createOscillator();
        this.interface = this.createInterface();
        this.attachKeysEvents();
    }

    createInterface() {
        let content = document.createElement("div");
        content.id = "pianoBox";

        let keyboard = this.createKeyboardElement();
        content.appendChild(keyboard);

        let freqMonito = Component.createValueMonitor("Note");
        freqMonito.id = "freq-displayer";
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
    
        noteElt.addEventListener("click", function() {
            PianoBox.playNote(note);
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
    
        document.addEventListener('keydown', function(e) {
            if(keys.includes(e.key)) {
                let index = keys.indexOf(e.key);
                let played = notesTab[index];

                PianoBox.playNote(played);
                console.log('Key ', e.key, ' play ', played);

                played.element.classList.add('active');
            }
        })
        document.addEventListener('keyup', function(e) {
            if(keys.includes(e.key)) {
                let index = keys.indexOf(e.key);
                let played = notesTab[index];
                played.element.classList.remove('active');
            }
        })
    }

    upOctave(self) {
        self.octave ++;

        let notes = self.notes;
        notes.forEach(note => {
            note.freq *= 2;
        });
        self.notes = notes;
    }
    downOctave(self) {
        self.octave --;

        let notes = self.notes;
        notes.forEach(note => {
            note.freq /= 2;
        });
        self.notes = notes;
    }

    static playNote(note) {
        // this.displayNote(document.querySelector('#pianoBox #freq-displayer .displayer'), note);

        document.querySelector('#pianoBox #freq-displayer .displayer').textContent = note.fr;

    }

    // static displayNote(elt, note) {
    //     elt.textContent = note.fr + ' '+ note.freq;
    //     elt.textContent = note.fr;

    //     console.log(note.element);
    // }
}