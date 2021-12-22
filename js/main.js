// ////////////////////////////////////////////////////////////////
// //AUDIO CTX
// let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
////////////////////////////////////////////////////////////////
//
let root = document.querySelector('#root'); 
////////////////////////////////////////////////////////////////
//
let pianoBox = new PianoBox();
root.appendChild(pianoBox.interface);

customElements.define('piano-box', PianoBoxComponent);
root.appendChild(document.createElement('piano-box'));

