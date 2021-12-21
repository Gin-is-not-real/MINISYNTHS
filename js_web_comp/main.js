let root = document.querySelector('#root'); 

// let pianoBox = new PianoBox(NOTES);
// root.appendChild(pianoBox.createElement());

// root.appendChild(document.createElement('keyboard-1'));
root.appendChild(new Keyboard(NOTES));

// root.appendChild(document.createElement('my-comp'));

// attachKeysEvents(NOTES);
