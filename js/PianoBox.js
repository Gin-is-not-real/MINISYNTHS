////////////////////////////////////////////////////////////////
//
class PianoBox {
    osc;

    notes = [];
    activeNote;
    octave;

    interface;
    noteDisplayer;
    oscGainDisplayer;

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

        let oscControls = this.createOscControls();
        content.appendChild(oscControls);

        let keyboard = this.createKeyboardElement();
        content.appendChild(keyboard);

        let freqMonito = Component.createValueMonitor("Note");
        freqMonito.id = "freq-displayer";
        // TODO: changer l'id et le  nom de varible pour noteDisplayer
        this.noteDisplayer = freqMonito.childNodes[1];
        console.log(this.noteDisplayer);

        // content.appendChild(freqMonito);

        content.appendChild(Component.createOctaveShifter(this));

        return content;
    }

    createOscControls() {
        let container = document.createElement('div');
        container.id = "osc-cnt";

        //gain
        let gainCnt = document.createElement('div');
        gainCnt.id = "osc-gain-cnt";

        let gainDisplayer = document.createElement('p');
        // gainDisplayer.className = 'displayer';
        gainDisplayer.textContent = 'Vol';

        let gainControl = document.createElement("input");
        gainControl.type = "range";
        gainControl.max = '3';
        gainControl.step = '0.2';
        // gainControl.id = "osc-gain-ctrl";

        gainCnt.appendChild(gainDisplayer);
        gainCnt.appendChild(gainControl);

        //freq
        let freqCnt = document.createElement('div');
        freqCnt.id = "osc-freq-cnt";

        let freqDisplayer = document.createElement('p');
        // freqDisplayer.className = 'displayer';
        freqDisplayer.textContent = 'Freq';

        let freqControl = document.createElement('input');
        freqControl.type = "range";
        // freqControl.id = "osc-freq-ctrl";
        freqCnt.appendChild(freqDisplayer);
        freqCnt.appendChild(freqControl);

        container.appendChild(gainCnt);
        container.appendChild(freqCnt);

        let self = this;
        gainControl.addEventListener('input', function() {
            console.log(this.value);
            self.setOscGain(this.value);
        });
        freqControl.addEventListener('input', function() {
            console.log(this.value);
            self.setOscFrequency(this.value);
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

    setOscFrequency(value) {
        this.osc.frequency.value = value;
    }
    getOscFrequency() {
        return this.osc.frequency.value;
    }
    setOscGain(value) {
        this.osc.gain.gain.value = value;
        // this.oscGainDisplayer.textContent = this.getOscGain();
    }
    getOscGain= function() {
        return this.osc.gain.gain.value;
    }

    playNote(note) {
        this.setOscFrequency(note.freq);
        this.setOscGain(1);
        this.noteDisplayer.textContent = note.fr;
    }
    stopNote() {
        this.setOscGain(0);
        this.noteDisplayer.textContent = "";
    }
    
}