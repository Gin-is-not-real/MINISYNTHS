////////////////////////////////////////////////////////////////
// VARS
let ROOT = document.querySelector('#root'); 

customElements.define('piano-box', PianoBoxComponent);

let loadPianoBox = document.querySelector('#load-piano-box');
let loadPianoBoxComponent = document.querySelector('#load-piano-box-component');

let loadButtons = [loadPianoBox, loadPianoBoxComponent];

////////////////////////////////////////////////////////////////
// SCRIPT

////////////////////////////////////////////////////////////////
// FUNCTIONS
function desactiveNavButtons() {
    loadButtons.forEach(btn => {
        btn.classList.remove('activ-button');
    })
}

////////////////////////////////////////////////////////////////
// EVENTS LISTENERS
loadPianoBox.addEventListener('click', function() {
    desactiveNavButtons();
    this.classList.add('activ-button');

    ROOT.innerHTML = '<header><h2>Piano Box</h2><p>An autonomous JavaScript class for instanciate a synth with this logic and DOM</p></header>';

    let synth = new PianoBox();
    ROOT.appendChild(synth.interface);
})
loadPianoBox.click();

loadPianoBoxComponent.addEventListener('click', function() {
    desactiveNavButtons();
    this.classList.add('activ-button');

    ROOT.innerHTML = '<header><h2>Piano Box Web Component</h2><p>The same synth but here, the class define a Web Component</p></header>';

    ROOT.appendChild(document.createElement('piano-box'));
})