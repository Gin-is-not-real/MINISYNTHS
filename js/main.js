let root = document.querySelector('#root'); 
////////////////////////////////////////////////////////////////
//
customElements.define('piano-box', PianoBoxComponent);
root.appendChild(document.createElement('piano-box'));