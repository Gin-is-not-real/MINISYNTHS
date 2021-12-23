////////////////////////////////////////////////////////////////
//
let root = document.querySelector('#root'); 
let dev = document.createElement('div');
dev.className = 'dev';
document.querySelector('header').appendChild(dev);

//pour gerer le style des custom element
let shadow = root.attachShadow({mode: 'open'});
let shadowStyle = document.createElement('style');
shadowStyle.id = 'shadow-css-imports';
shadow.appendChild(shadowStyle);
////////////////////////////////////////////////////////////////
//
customElements.define('gain-control', GainControl);
let gainControl = new GainControl(0);
gainControl.send = function(value) {
    dev.textContent = this.id + ' send ' + value;
    ;
}

root.appendChild(gainControl);

insertCssImports([gainControl]);


////////////////////////////////////////////////////////////////
//
function insertCssImports(componentList) {
    let styleNodeHTML = shadowStyle.innerHTML;
    // console.log(styleNode);
    let str = '';
    componentList.forEach(comp => {
        comp.cssImportList.forEach(url => {
            if(!styleNodeHTML.includes(url) && !str.includes(url)) {
                str += `@import url(` + url + `);`;
            }
        })
    });
    shadowStyle.insertAdjacentHTML('beforeend', str);
}