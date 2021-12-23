class Tools {
    static uniquId(lenght) {
        let mult = 1;
        for(let i = 0; i < lenght-1; i++) {
            mult += '0';
        }
        let rand = Math.floor(Math.random()*((11 * parseInt(mult)) -1) +1)
        return rand;
    }
}