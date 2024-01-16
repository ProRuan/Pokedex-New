// Variables
let searchPokemon = [
    {
        // 'enabled': false,
        'hits': 0
    }
];


let filterPokemon = {
    // 'enabled': false,
    'types': [],
    'by-first': false,
    'only-pure': false,
    'hits': 0
};


let filterTypeGroup = [
    'normal', 'fire', 'water', 'electric', 'grass', 'flying', 'bug', 'poison', 'rock',
    'ground', 'fighting', 'ice', 'psychic', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
]


// render menu + render search and filter content


function renderFilterTypeGroup() {
    let content = getElement('filter-type-group');
    content.innerHTML = '';
    fillFilterTypeGroup(content);
}


function fillFilterTypeGroup(content) {
    for (let i = 0; i < filterTypeGroup.length; i++) {
        content.innerHTML += renderFilterType(i);
    };
}


function renderFilterType(i) {
    let type = filterTypeGroup[i];
    return `<input id="filter-${type}" class="filter-type filter-${type}" type="button" value="${type}" onclick="addFilterType('${type}')">`;
}


function addFilterType(type) {
    filterPokemon['types'].push(type);
    setElementAttribute(`filter-${type}`, 'onclick', `removeFilterType('${type}')`);
    // removeFire + setClass
}


function removeFilterType(type) {
    let index = filterPokemon['types'].indexOf(type);
    filterPokemon['types'].splice(index, 1);
}


function setFilterByFirst(key, value) {
    setFilter('by-first', true);
    setFilter('only-pure', false);
    // class fehlt noch
    // change onclick
}


function setFilter(key, value) {
    filterPokemon[key] = value;
}


function setFilterOnlyPure(key, value) {
    setFilter('by-first', false);
    setFilter('only-pure', true);
    // class fehlt noch
    // change onclick
}





// render filter.html???