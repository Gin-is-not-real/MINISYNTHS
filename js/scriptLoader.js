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
.then(PianoBox => loadScript("js/PianoBox.js", PianoBox))
.then(main => loadScript("js/main.js", main))
.catch(alert);


