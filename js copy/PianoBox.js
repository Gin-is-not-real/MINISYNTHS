class PianoBox {
    notes = [];
    octave;

    constructor(notes) {
        this.notes = notes;
        this.octave = 4;
    }

    createElement() {
        let content = document.createElement("div");
        content.id = "pianoBox";
        
        let freqMonito = Component.createValueMonitor("Freq");
        freqMonito.id = "freq-monitor";
        content.appendChild(freqMonito);

        let keyboard = this.createKeyboardElement();
        content.appendChild(keyboard);
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
        });
        keyboardCnt.appendChild(keyboard);

        return keyboardCnt;
    }

    createNoteElement(note) {
        let noteElt = document.createElement('div');
        noteElt.className = 'note';
        noteElt.id = note.id;
        noteElt.textContent = note.key;
    
        if(noteElt.id.substr(-1) === "d") {
            noteElt.classList.add('diese');
        }
    
        noteElt.addEventListener("click", function() {
            PianoBox.playNote(note);
        });
    
        return noteElt;
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
        console.log(note);
        this.displayNote(document.querySelector('#pianoBox #freq-monitor .screen'), note);
    }

    static displayNote(elt, note) {
        elt.textContent = note.fr + ' '+ note.freq;
    }
}