let root = document.querySelector('#root'); 

let pianoBox = new PianoBox(NOTES);
root.appendChild(pianoBox.interface);

// attachKeysEvents(NOTES);
