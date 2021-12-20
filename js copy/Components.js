class Component {
    static createValueMonitor(label, input) {
        let cnt = document.createElement("div");
        cnt.className = "comp-cnt";

        let labelCnt = document.createElement("div");
        let labelP = document.createElement("p");
        labelP.textContent = label;
        labelCnt.appendChild(labelP);
        cnt.appendChild(labelCnt);

        let screenCnt = document.createElement("div");
        screenCnt.className = "screen";
        let screenP = document.createElement("p");
        screenP.textContent = "";
        screenCnt.appendChild(screenP);
        cnt.appendChild(screenCnt);

        return cnt;
    }

    static createValueShifter() {
        let element = document.createElement('div');
        element.className = "comp-cnt";

        let screen = document.createElement('div');
        let p = document.createElement('p');
        screen.appendChild(p);
        element.screen = screen;

        let btnUp = document.createElement('button');
        btnUp.className = "shift-up";
        element.up = btnUp;

        let btnDown = document.createElement('button');
        btnDown.className = "shift-down";
        element.down = btnDown;

        element.appendChild(btnUp);
        element.appendChild(screen);
        element.appendChild(btnDown);

        return element;
    }

    static createOctaveShifter(element) {
        let component = document.createElement('div');
        component.className = "comp-cnt";
        component.id = "octave-shifter";

        let screen = document.createElement('div');
        let p = document.createElement('p');
        screen.appendChild(p);
        component.screen = screen;

        let btnUp = document.createElement('button');
        btnUp.className = "shift-up";
        component.up = btnUp;

        let btnDown = document.createElement('button');
        btnDown.className = "shift-down";
        component.down = btnDown;

        component.up.addEventListener('click', function() {
            if(element.octave < 11) {
                element.upOctave(element);
                component.screen.textContent = element.octave;
            }
        });

        component.down.addEventListener('click', function() {
            if(element.octave > 0) {
                element.downOctave(element);
                component.screen.textContent = element.octave;
            }
        });

        component.appendChild(btnUp);
        component.appendChild(screen);
        component.appendChild(btnDown);

        return component;
    }
}