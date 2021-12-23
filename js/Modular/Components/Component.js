class Component extends HTMLElement {
    id = 'comp-';

    cssImportList = [
        'js/Modular/style/container.css',
    ];
    template = `
            <div class="component w1 h2 vert">
            </div>
        `;

    constructor() {
        super();

        // this.id += Math.random(10);

        let container = document.createElement('div');
        container.setAttribute('id', this.id);
        container.insertAdjacentHTML('beforeend', this.template);

        this.insertCssImports();

        SHADOW.appendChild(container);
    }

    insertCssImports() {
        let styleNodeHTML = SHADOW.nodeStyle.innerHTML;
        // console.log(styleNode);
        let str = '';
        this.cssImportList.forEach(url => {
            if(!styleNodeHTML.includes(url) && !str.includes(url)) {
                str += `@import url(` + url + `);`;
            }
        })
        SHADOW.nodeStyle.insertAdjacentHTML('beforeend', str);
    }
}

