class Component extends HTMLElement {
    interface;

    constructor() {
        super();
        let shadow = this.attachShadow({mode: 'open'});

        let interf = document.createElement('div');
        interf.setAttribute('class','component-interface');
        this.interface = interf;

        shadow.appendChild(interf);
        // console.log(this);
    }
}
customElements.define('my-comp', Component);

//////////////////////////////////////////////////////////
//
class Keyboard extends Component {
    constructor(notesTab) {
        super();
        this.interface.setAttribute('id','keyboard-cnt');

        let keyboard = document.createElement("div");
        keyboard.setAttribute('id','keyboard');

        notesTab.forEach(note => {
            let pad = new NotePad(note);
            keyboard.appendChild(pad);
        });

        this.shadowRoot.appendChild(keyboard);
        console.log(this.interface);
    }
}
customElements.define('keyboard-1', Keyboard);


//////////////////////////////////////////////////////////
//
class NotePad extends Component {
    constructor(note) {
        super();
        let pad = this.interface;

        pad.setAttribute('class','note');
        pad.setAttribute('id', note.name);
        pad.textContent = note.key;

        let style = '<style>.note{background-color: #955b108a;border: 1px solid #8b6200;border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;grid-row: 1/3;   color: rgba(0, 0, 0, 0.671);text-align: center;}';
        this.interface.insertAdjacentHTML('afterend', style);

        if(pad.id.substr(-1) === "d") {
            pad.classList.add('diese');
            let styleAlt = '<style>.diese{background-color: rgb(167, 108, 46);border: 1px solid #8b6200;grid-row: 1;z-index: 1;}</style>';
            this.interface.insertAdjacentHTML('afterend', styleAlt);
        }

        // let string = '<style>.note{background-color: #955b108a;border: 1px solid #8b6200;border-bottom-left-radius: 7px;border-bottom-right-radius: 7px;grid-row: 1/3;   color: rgba(0, 0, 0, 0.671);text-align: center; .diese{background-color: rgb(167, 108, 46);border: 1px solid #8b6200;grid-row: 1;z-index: 1;}</style>';
        // this.interface.insertAdjacentHTML('afterend', string);

        pad.addEventListener("click", function() {
            console.log(this, ' clicked !');
        });

        this.interface = pad;
    }
}
customElements.define('notepad-1', NotePad);

'}';
