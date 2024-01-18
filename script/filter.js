// Variables
let searchPokemon = false;


let filterPokemon = {
    'enabled': false,
    'types': [],
    'by-first': false,
    'only-pure': false
};


let filterTypeGroup = [
    'normal', 'fire', 'water', 'electric', 'grass', 'flying', 'bug', 'poison', 'rock',
    'ground', 'fighting', 'ice', 'psychic', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
]


// render menu + render search and filter content


function verifySearchValue() {    // Please edit search functions!!!
    searchPokemon = true;
    resetHits('search-hits');
    renderPokecardCollection();
    showHits(searchPokemon, 'search-hits');
    searchPokemon = false;
}    // set search true and false???


function resetHits(id) {
    document.getElementById(id).innerHTML = '';
}


function countHits() {
    return document.getElementById('pokecard-collector').childElementCount;
}


function showHits(logical, id) {
    if (logical) {
        let count = countHits();
        let hits = getElement(id);
        setHits(count, hits);
    }
}


function setHits(count, hits) {
    if (count > 1) {
        hits.innerHTML = count + ' hits';
    } else {
        hits.innerHTML = count + ' hit';
    }
}


function searchPokecard(i) {
    let input = document.getElementById('search-input').value;
    let modus = isNaN(input);
    return (modus) ? searchPokecardByName(i, input) : searchPokecardById(i, input);
}


function getElementValue(id) {
    return document.getElementById(id).value;
}


function searchPokecardByName(i, input) {
    input = input.toLowerCase();
    let name = getPokedexObjectValue(i, 'main', 'name');
    let fraction = '';
    for (let j = 0; j < input.length; j++) {
        fraction += name[j];
    }
    let match = fraction == input;
    return (match) ? renderPokecard(i) : '';
}


function searchPokecardById(i, input) {
    input = Number(input);
    let id = getPokedexObjectValue(i, 'main', 'id');
    let match = input == id;
    return (match) ? renderPokecard(i) : '';
}


function closeSearch() {
    searchPokemon = false;
    closeMenu(true);
    return false;
}


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
    return `<input id="filter-${type}" class="filter-type filter-default filter-${type}" type="button" value="${type}" onclick="addFilterType('${type}'); verifyFilterValue()">`;
}


function addFilterType(type) {
    pushFilterType(type);
    setFilterButton(`filter-${type}`, type);
    setElementAttribute(`filter-${type}`, 'onclick', `removeFilterType('${type}'); verifyFilterValue()`);
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
    setElementAttribute(`filter-${type}`, 'onclick', `addFilterType('${type}'); verifyFilterValue()`);
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
    setElementAttribute('filter-by-first', 'onclick', `setFilterByFirst(${logical}); verifyFilterValue()`);
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
    setElementAttribute('filter-only-pure', 'onclick', `setFilterOnlyPure(${logical}); verifyFilterValue()`);
}


function verifyFilterValue() {    // Please edit search functions!!!
    filterPokemonOn();
    resetHits('filter-hits');
    renderPokecardCollection();
    showHits(filterPokemon['enabled'], 'filter-hits');
    filterPokemonOff();
}


function filterPokemonOn() {
    filterPokemon['enabled'] = true;
}


function filterPokemonOff() {
    filterPokemon['enabled'] = false;
}


// CloseMenuFilter() + CloseMenuSearch()
// Think about toggle / add / remove

function home() {
    setFilterSettings();
    renderPokecardCollection();
}    

// closeFilter:check, aber closeMenu und inlcudeSearch fehlt noch!!!
// oder einfach nur filterPokemon bei includeFitler neu definieren!!!


// closeMenu --> reset search input and filter variables
// openMenu --> reload the values
// Doppelfuntkion in html!!!
// Result (hits) und close formatieren!!!
// Move filter functions!!!

// menu header und/oder close button einfuegen!!!
// if input == empty or filter == empty renderPokecard(i)!!!
// filterOptions as second group!!!

// filter function zusammenfassen???
// hits only with output!!!

// filter favorites