class Controller extends Component {
    id;
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

    constructor() {
        super();

        this.init();
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