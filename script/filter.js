// Variables
let searchPokemon = [
    {
        'enabled': false,
        'hits': 0
    }
];


let filterPokemon = {
    'enabled': false,
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
    return `<input id="filter-${type}" class="filter-type filter-default filter-${type}" type="button" value="${type}" onclick="addFilterType('${type}')">`;
}


function addFilterType(type) {
    pushFilterType(type);
    setFilterButton(`filter-${type}`, type);
    setElementAttribute(`filter-${type}`, 'onclick', `removeFilterType('${type}')`);
}


function pushFilterType(type) {
    filterPokemon['types'].push(type);
}


function setFilterButton(id, classFraction) {
    setClassOnCommand(id, 'toggle', 'filter-default');
    setClassOnCommand(id, 'toggle', `filter-${classFraction}`);
    setClassOnCommand(id, 'toggle', `filter-${classFraction}-activated`);
}


function removeFilterType(type) {
    spliceFilterType(type);
    setFilterButton(`filter-${type}`, type);
    setElementAttribute(`filter-${type}`, 'onclick', `addFilterType('${type}')`);
}


function spliceFilterType(type) {
    let index = filterPokemon['types'].indexOf(type);
    filterPokemon['types'].splice(index, 1);
}


function setFilterByFirst(logical) {    // vereinfachen???
    setFilter('by-first', logical);
    setFilterButton('filter-by-first', 'condition');
    setButtonDisabled('filter-only-pure', logical);
    logical = setLogical(logical);
    setClassOnCommand('filter-only-pure', 'toggle', 'filter-condition');
    setElementAttribute('filter-by-first', 'onclick', `setFilterByFirst(${logical})`);
}


function setFilter(key, value) {
    filterPokemon[key] = value;
}


function setLogical(value) {
    return (value) ? false : true;
}


function setFilterOnlyPure(logical) {
    setFilter('only-pure', logical);
    setFilterButton('filter-only-pure', 'condition');
    setButtonDisabled('filter-by-first', logical);
    logical = setLogical(logical);
    setClassOnCommand('filter-by-first', 'toggle', 'filter-condition');
    setElementAttribute('filter-only-pure', 'onclick', `setFilterOnlyPure(${logical})`);
}


// filter function zusammenfassen???
// hits only with output!!!