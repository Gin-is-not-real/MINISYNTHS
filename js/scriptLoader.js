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
<<<<<<< HEAD
.then(PianoBox => loadScript("js/WebComponent/PianoBoxComponent.js", PianoBox))
=======
.then(PianoBox => loadScript("js/PianoBox/PianoBox.js", PianoBox))
.then(PianoBoxComponent => loadScript("js/PianoBoxComponent/PianoBoxComponent.js", PianoBoxComponent))
>>>>>>> master
.then(main => loadScript("js/main.js", main))
.catch(alert);


