////////////////////////////////////////////
function loadScript(src) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement("script");
        script.src = src;

        document.head.append(script);
        // console.log("-----> script " + src + " chargé");

        script.onload = () => resolve("script " + src + " chargé");
        script.onerror = () => reject(new Error("Echec du chargement du script " + src))
    });
}

loadScript("js/CONSTANTES.js")
// .then(Modular => loadScript("js/Modular/Modular.js", Modular))
.then(Components => loadScript("js/Modular/Components/Component.js", Components))
.then(GainControl => loadScript("js/Modular/Components/GainControl.js", GainControl))
// .then(PianoBox => loadScript("js/PianoBox/PianoBox.js", PianoBox))
// .then(PianoBoxComponent => loadScript("js/PianoBoxComponent/PianoBoxComponent.js", PianoBoxComponent))
.then(main => loadScript("js/main.js", main))
.catch(alert);


