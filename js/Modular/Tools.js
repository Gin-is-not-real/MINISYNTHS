class Tools {
    static uniquId(lenght) {
        let mult = 1;
        for(let i = 0; i < lenght-1; i++) {
            mult += '0';
        }
        let rand = Math.floor(Math.random()*((11 * parseInt(mult)) -1) +1)
        return rand;
    }

    static removeSpaceBeetwenTags(string) {
        let splitted1 = string.split("  ");
        console.log(splitted1);

        let formated = "";
        splitted1.forEach(entry => {
            if(entry !== "") {
                let splitted2 = entry.split("\n");
                splitted2.forEach(s => {
                    if(s !== "") {
                        formated += s + " ";
                    }
                })
                
            }
        });
        console.log(formated);

        return formated;
    }
}