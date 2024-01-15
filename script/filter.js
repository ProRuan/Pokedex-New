// Variables
let searchPokemon = [
    {
        // 'enabled': false,
        'hits': 0
    }
];


let filterTypes = [
    {
        // 'enabled': false,
        'types': [],
        'by-first': false,
        'only-pure': false,
        'hits': 0
    }
];
// render menu + render search and filter content


function setFilterByFirst(key, value) {
    setFilter('by-first', true);
    setFilter('only-pure', false);
    // class fehlt noch
    // change onclick
}


function setFilter(key, value) {
    filterTypes[key] = value;
}


function setFilterOnlyPure(key, value) {
    setFilter('by-first', false);
    setFilter('only-pure', true);
    // class fehlt noch
    // change onclick
}





// render filter.html???