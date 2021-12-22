////////////////////////////////////////////////////////////////
//
class PianoBoxComponent extends HTMLElement {
    soundNodes = {}

    notes = [];
    activeNote;
    octave;
    padIsHold;

    interface;

    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        this.notes = NOTES;
        this.octave = 4;
        this.padIsHold = false;

        this.interface = this.createInterface();
        shadow.appendChild(this.interface);

        this.soundNodes = this.createSoundNodes();
        this.control = this.createControl();
        this.createKeyboardElement();
        this.createOctaveShifter();

        this.attachKeysEvents();
    }

    createSoundNodes() {
        let master = audioCtx.createGain();
        master.gain.value = 1;
        master.connect(audioCtx.destination);

        let gain = audioCtx.createGain();
        gain.gain.value = 0;
        gain.connect(master);

        let osc = audioCtx.createOscillator();
        // osc.gain = gain;
        osc.connect(gain);
        osc.start();

        let sNodes = {masterGain: master, oscGain: gain, osc: osc};

        return sNodes;
    }

    createInterface() {
        let interf = document.createElement("div");
        interf.id = "pianoBox";

        let style = `<style>
                @import url("js/WebComponent/pianoBoxComponent.css");
            </style>
        `;
        interf.insertAdjacentHTML('beforeend', style);

        return interf;
    }

    createControl() {
        let template = `
            <div id="osc-cnt">
                <div id="ocs-gain-cnt">
                    <p>Vol</p>
                    <input type="range" max="3" step="0.2"></input>
                </div>
            </div>
        `;
        this.interface.insertAdjacentHTML('beforeend', template);
        
        let input = this.shadowRoot.querySelector('#ocs-gain-cnt input');
        input.value = this.getMasterGain();

        let self = this;
        input.addEventListener('input', function() {
            self.setMasterGain(this.value);
        });

        this.soundNodes.masterGain.input = input; 
    }

    createKeyboardElement() {
        let notes = this.notes;
        let template = `
            <div id="keyboard-cnt">
                <div id="keyboard">
        `;
        notes.forEach(note => {
            let clName = note.name.substr(-1) === "d" ? "note diese" : "note";
            
            template += `<div 
                class="` + clName + `" 
                id="` + note.name + `">
                    <p>` + note.key + `</p>
            </div>
            `;
        });

        template += `
                </div>
            </div>
        `;
        this.interface.insertAdjacentHTML('beforeend', template);

        let self = this;
        notes.forEach(note => {
            note.pad = this.interface.querySelector('#' + note.name);
            note.pad.addEventListener("mousedown", function() {
                self.playNote(note);
                self.padIsHold = true;
            });
            note.pad.addEventListener("mouseup", function() {
                self.stopNote();
                self.padIsHold = false;
            });
            note.pad.addEventListener("mouseenter", function() {
                if(self.padIsHold) {
                    self.playNote(note);
                }
            });
            note.pad.addEventListener("mouseleave", function() {
                self.stopNote();
            });
        })
        this.notes = notes;
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
        let template = `
        <div id="octave-shifter">
            <p>Oct</p>
            <button id="octave-up"></button>
            <div><p id="octave-displayer">` + this.octave + `</p></div>
            <button id="octave-down"></button>
        </div>
        `;
        this.interface.insertAdjacentHTML('beforeend', template);

        let self = this;
        let p = this.interface.querySelector('#octave-displayer');

        this.interface.querySelector('#octave-up').addEventListener('click', function() {
            if(self.octave < 9) {
                self.upOctave(self);
                p.textContent = self.octave;
            }
        });
        this.interface.querySelector('#octave-down').addEventListener('click', function() {
            if(self.octave > 0) {
                self.downOctave(self);
                p.textContent = self.octave;
            }
        });
    }

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

    setOscFrequency(value) {
        this.soundNodes.osc.frequency.value = value;
    }
    getOscFrequency() {
        return this.soundNodes.osc.frequency.value;
    }
    setOscGain(value) {
        this.soundNodes.oscGain.gain.value = value;
    }
    getOscGain= function() {
        return this.soundNodes.oscGain.gain.value;
    }
    setMasterGain(value) {
        this.soundNodes.masterGain.gain.value = value;
    }
    getMasterGain= function() {
        return this.soundNodes.masterGain.gain.value;
    }
}
// customElements.define('piano-box', PianoBox);