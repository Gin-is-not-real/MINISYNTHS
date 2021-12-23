/**
 * cssImportList = {Array string}
 * 
 * Creer un HTMLDivElement container
 * Ecrit le template html dans une HTMLString
 * container insert template
 * shadow append le container
 */
class RangeControl extends HTMLElement {
    id = 'range-control';
    cssImportList = [
        'js/Modular/style/container.css',
        'js/Modular/style/vertical-flat-range.css'
    ];
    template = `
            <div class="component w1 h2 vert">
                <div class="element vert-flat-range">
                    <p>Vol</p>
                    <input type="range" max="3" step="0.2"></input>
                </div>
            </div>
        `;

    label;
    input;

    constructor(id) {
        super();

        // let shad = this.attachShadow({mode: 'open'});
        let container = document.createElement('div');
        if(id !== undefined) {
            // this.id += '-' + id;
            this.id = id;
            container.setAttribute('id', this.id);
        }
        container.insertAdjacentHTML('beforeend', this.template);
        // shad.appendChild(container);
        this.container = container;

        shadow.appendChild(container);

        this.init();
    }

    init() {
        let input = this.container.querySelector('input');
        let self = this;
        input.addEventListener('input', function() {
            self.send(this.value);
        })
    }

    send(value) {
        console.log(this, ' send ', value);
    }
    receive(value) {
        console.log(this, ' receive ', value);
    }

    setLabel(value) {
        let p = this.container.querySelector('p');
        p.textContent = value;
    }
}


class GainControl extends RangeControl {
    constructor(id) {
        super(id);
    }
}

