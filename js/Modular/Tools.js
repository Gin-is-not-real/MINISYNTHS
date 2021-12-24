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
        //enlever les " " avant le premier "<" et apres le dernier ">" 
        string = string.trim();
        //enlever les saut de lignes 
        string = string.replaceAll('\n', '!');
        string = string.replaceAll(/(\s{2,})/g, '!');
        let split = string.split('!!');
        console.log(split);

        let formated = "";
        split.forEach(i => {
            // console.log(i);
            formated += i;
        });
        console.log(formated);

        return formated;
    }
}