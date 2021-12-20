let root = document.querySelector('#root'); 

let pianoBox = new PianoBox(NOTES);
root.appendChild(pianoBox.createElement());

attachKeysEvents(NOTES);
