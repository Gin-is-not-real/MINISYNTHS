/**
 * Recupere le shadow DOM
 * Creer un HTMLDivElement container
 * Ecrit le template html dans une HTMLString
 * Ecrit le style dans une HTMLString
 * container insert template
 * container insert style
 * shadow append le container
 */
class VerticalRangeControl extends HTMLElement {
    constructor() {
        super();
        let shadow = this.attachShadow({mode: 'open'});

        let container = document.createElement('div');
        let template = `
            <div class="component">
                <div class="element">
                    <p>Vol</p>
                    <input type="range" max="3" step="0.2"></input>
                </div>
            </div>
        `;

        let style = `<style>
            .component {
                --uw-1: 30px;
                --uh-1: 80px;

                width: var(--uw-1);
                height: var(--uh-1);

                border: 1px solid var(--bor-color-btn);

                display: flex;
            }
            .element {
                width: var(--uw-1);
                height: var(--uh-1);

                display: flex;
                flex-direction: column;
                align-items: center;
            }
            p {
                width: max-content;
                margin-top: 4px;
                color: var(--bg-btn2);
            }
            input {
                width: 45px;
                height: 8px;
                padding: 0;
                
                -webkit-appearance: none;
                outline: none;
                cursor: pointer;
                box-sizing: border-box;

                background-color: var(--bg-btn1);
                opacity: .8;
                transition: opacity .2s;
                transform: rotate(-90deg);
                transform-origin: 26px 7px;
            }
            input::-moz-range-track {
                height: 100%;
                background-color: var(--bg-cnt);
                border: 1px solid var(--bor-color-btn);
                border-radius: 0;
            }
            input::-moz-range-thumb {
                width: 5px;
                height: 100%;
                background-color: var(--bg-btn2);
                border: none;
                border-radius: 0;
            }
            input::-moz-range-progress {
                height: 100%;
                background-color: var(--bg-btn1);
                border: 1px solid var(--bor-color-btn);
            }
            </style>
        `;

        container.insertAdjacentHTML('beforeend', template);
        container.insertAdjacentHTML('beforeend', style);
        
        shadow.appendChild(container);
    }
}

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
        // let container = root.shadowRoot.getElementById(this.id);
        
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
        console.log(this, ' send ', value);
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

