////////////////////////////////////////////////////////////////
//
class PianoBox {
    osc;

    notes = [];
    activeNote;
    octave;

    interface;

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
        gain.gain.value = 0;
        gain.connect(audioCtx.destination);

        osc.gain = gain;
        osc.connect(gain);
        osc.start();

        return osc;
    }

    createInterface() {
        let content = document.createElement("div");
        content.id = "pianoBox";

        content.appendChild(this.createOscControls());
        content.appendChild(this.createKeyboardElement());
        content.appendChild(this.createOctaveShifter());

        return content;
    }

    createOscControls() {
        let container = document.createElement('div');
        container.id = "osc-cnt";

        //gain
        let gainCnt = document.createElement('div');
        gainCnt.id = "osc-gain-cnt";

        let gainDisplayer = document.createElement('p');
        gainDisplayer.textContent = 'Vol';

        let gainControl = document.createElement("input");
        gainControl.type = "range";
        gainControl.max = '3';
        gainControl.step = '0.2';

        gainCnt.appendChild(gainDisplayer);
        gainCnt.appendChild(gainControl);

        container.appendChild(gainCnt);

        let self = this;
        gainControl.addEventListener('input', function() {
            console.log(this.value);
            self.setOscGain(this.value);
        });

        return container
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
    
        let self = this;
        document.addEventListener('keydown', function(e) {
            if(keys.includes(e.key)) {
                let index = keys.indexOf(e.key);
                let played = notesTab[index];
                played.element.classList.add('active');

                self.playNote(played);
            }
        })
        document.addEventListener('keyup', function(e) {
            if(keys.includes(e.key)) {
                let index = keys.indexOf(e.key);
                let played = notesTab[index];
                played.element.classList.remove('active');

                self.stopNote();
            }
        })
    }

    createOctaveShifter() {
        let component = document.createElement('div');
        component.className = "comp-cnt";
        component.id = "octave-shifter";

        let screen = document.createElement('div');
        let p = document.createElement('p');
        screen.appendChild(p);
        component.screen = screen;

        let btnUp = document.createElement('button');
        btnUp.className = "shift-up";
        component.up = btnUp;

        let btnDown = document.createElement('button');
        btnDown.className = "shift-down";
        component.down = btnDown;

        let self = this;
        component.up.addEventListener('click', function() {
            if(self.octave < 11) {
                self.upOctave(self);
                component.screen.textContent = self.octave;
            }
        });
        component.down.addEventListener('click', function() {
            if(self.octave > 0) {
                self.downOctave(self);
                component.screen.textContent = self.octave;
            }
        });

        component.appendChild(btnUp);
        component.appendChild(screen);
        component.appendChild(btnDown);

        return component;
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

    setOscFrequency(value) {
        this.osc.frequency.value = value;
    }
    getOscFrequency() {
        return this.osc.frequency.value;
    }
    setOscGain(value) {
        this.osc.gain.gain.value = value;
    }
    getOscGain= function() {
        return this.osc.gain.gain.value;
    }

    playNote(note) {
        this.setOscFrequency(note.freq);
        this.setOscGain(1);
    }
    stopNote() {
        this.setOscGain(0);
    }
    
}