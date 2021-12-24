class Component extends HTMLElement {
    id = 'cmp-';

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
        this.container = container;

        SHADOW.appendChild(container);
        console.log(container.childNodes);
    }

    initTemplate() {
        let templ = Tools.removeSpaceBeetwenTags(this.template);
        this.container.insertAdjacentHTML('beforeend', templ);
        this.insertCssImports(SHADOW.nodeStyle);
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

