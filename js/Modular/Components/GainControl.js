class RangeControl extends HTMLElement {
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