////////////////////////////////////////////////////////////////
//
class PianoBox {
    osc;
    oscGain;
    masterGain;

    notes = [];
    activeNote;
    octave;
    padIsHold;

    interface;

    constructor() {
        this.osc = this.createSoundNodes();
        this.notes = NOTES;
        this.octave = 4;
        this.padIsHold = false;

        this.interface = this.createInterface();

        this.attachKeysEvents();
    }

    createSoundNodes() {
        let master = audioCtx.createGain();
        master.gain.value = 1;
        master.connect(audioCtx.destination);
        this.masterGain = master;

        let gain = audioCtx.createGain();
        gain.gain.value = 0;
        gain.connect(master);
        this.oscGain = gain;

        let osc = audioCtx.createOscillator();
        // osc.gain = gain;
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
        let gainContainer = document.createElement('div');
        gainContainer.id = "osc-gain-cnt";

        let gainDisplayer = document.createElement('p');
        gainDisplayer.textContent = 'Vol';

        let gainControl = document.createElement("input");
        gainControl.type = "range";
        gainControl.max = '3';
        gainControl.step = '0.2';
        gainControl.value = this.getMasterGain();

        gainContainer.appendChild(gainDisplayer);
        gainContainer.appendChild(gainControl);

        container.appendChild(gainContainer);

        let self = this;
        gainControl.addEventListener('input', function() {
            self.setMasterGain(this.value);
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
        let p = document.createElement('p');
        p.textContent = note.key;
        noteElt.appendChild(p);
    
        if(noteElt.id.substr(-1) === "d") {
            noteElt.classList.add('diese');
        }
    
        let self = this;
        noteElt.addEventListener("mousedown", function() {
            self.playNote(note);
            self.padIsHold = true;
        });
        noteElt.addEventListener("mouseup", function() {
            self.stopNote();
            self.padIsHold = false;
        });
        noteElt.addEventListener("mouseenter", function() {
            if(self.padIsHold) {
                self.playNote(note);
            }
        });
        noteElt.addEventListener("mouseleave", function() {
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

        let label = document.createElement('p');
        label.textContent = 'Oct';

        let screen = document.createElement('div');
        let p = document.createElement('p');
        p.textContent = this.octave;
        screen.appendChild(p);

        let btnUp = document.createElement('button');
        btnUp.className = "shift-up";
        component.up = btnUp;

        let btnDown = document.createElement('button');
        btnDown.className = "shift-down";
        component.down = btnDown;

        let self = this;
        component.up.addEventListener('click', function() {
            if(self.octave < 9) {
                self.upOctave(self);
                p.textContent = self.octave;
            }
        });
        component.down.addEventListener('click', function() {
            if(self.octave > 0) {
                self.downOctave(self);
                p.textContent = self.octave;
            }
        });

        component.appendChild(label);
        component.appendChild(btnUp);
        component.appendChild(screen);
        component.appendChild(btnDown);

        return component;
    }

    // synth functions
    playNote(note) {
        this.setOscFrequency(note.freq);
        this.setOscGain(1);
    }
    stopNote() {
        this.setOscGain(0);
    }

    upOctave() {
        this.octave ++;
        this.notes.forEach(note => {
            note.freq *= 2;
        });
    }
    downOctave() {
        this.octave --;
        this.notes.forEach(note => {
            note.freq /= 2;
        });
    }

    // GETTERS/SETTERS
    setOscFrequency(value) {
        this.osc.frequency.value = value;
    }
    getOscFrequency() {
        return this.osc.frequency.value;
    }
    setOscGain(value) {
        this.oscGain.gain.value = value;
    }
    getOscGain= function() {
        return this.oscGain.gain.value;
    }
    setMasterGain(value) {
        this.masterGain.gain.value = value;
    }
    getMasterGain= function() {
        return this.masterGain.gain.value;
    }
}