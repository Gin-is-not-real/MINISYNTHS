////////////////////////////////////////////////////////////////
//
let ROOT = document.querySelector('#root'); 
let dev = document.createElement('div');
dev.className = 'dev';
document.querySelector('header').appendChild(dev);

//pour gerer le style des custom element
let SHADOW = ROOT.attachShadow({mode: 'open'});
SHADOW.nodeStyle = document.createElement('style');
SHADOW.nodeStyle.id = 'shadow-css-imports';
SHADOW.appendChild(SHADOW.nodeStyle);
////////////////////////////////////////////////////////////////
//
customElements.define('base-component', Component);
let component = document.createElement('base-component')


////////////////////////////////////////////////////////////////
//
