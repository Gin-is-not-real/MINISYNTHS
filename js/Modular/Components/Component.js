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

        this.id += Tools.uniquId(5);

        let container = document.createElement('div');
        container.setAttribute('id', this.id);
        container.insertAdjacentHTML('beforeend', this.template);
        this.container = container;

        SHADOW.appendChild(container);
        this.insertCssImports(SHADOW.nodeStyle);

        console.log(this.id);
    }

    insertCssImports(node) {
        let styleNodeHTML = node.innerHTML;
        let str = '';
        this.cssImportList.forEach(url => {
            if(!styleNodeHTML.includes(url) && !str.includes(url)) {
                str += `@import url(` + url + `);`;
            }
        })
        node.insertAdjacentHTML('beforeend', str);
    }
}

