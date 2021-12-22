////////////////////////////////////////////////////////////////
//
let root = document.querySelector('#root'); 

let shadow = root.attachShadow({mode: 'open'});
let shadowStyle = document.createElement('style');
shadowStyle.id = 'shadow-css-imports';
shadow.appendChild(shadowStyle);
////////////////////////////////////////////////////////////////
//
// customElements.define('range-control', RangeControl);
// let rangeControl = document.createElement('range-control');
// root.appendChild(rangeControl);

customElements.define('gain-control', GainControl);
let gainControl = document.createElement('gain-control');
root.appendChild(gainControl);

let styles = shadow.querySelectorAll('style');

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
        })
    shadowStyle.insertAdjacentHTML('beforeend', str);
}