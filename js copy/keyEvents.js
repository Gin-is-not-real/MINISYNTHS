function attachKeysEvents(notes) {
    let keys = [];
    notes.forEach(note => {
        keys.push(note.key);
    });

    document.addEventListener('keydown', function(e) {
        if(keys.includes(e.key)) {
            let index = keys.indexOf(e.key) + 1;
            let played = notes[index];
            // playNote(notes[index]);
            console.log('Key play ', played);
        }
    })
}
