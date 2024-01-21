// Variables
let searchPokemon = false;    // true if search is executed

let filterPokemon = {
    'enabled': false,    // true if filter is used
    'types': [],    // receives the filtering types
    'by-first': false,    // true if only the first type of a pokecard is considered
    'only-pure': false    // true if only pokecards with pure type are requested
};

let filterTypeGroup = [
    'normal', 'fire', 'water', 'electric', 'grass', 'flying', 'bug', 'poison', 'rock',
    'ground', 'fighting', 'ice', 'psychic', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];    // contains the available filter types


// Functions
function executeSearchPokecard() {    // rendering pokecards according to search value
    searchPokemon = true;
    resetHits('search-hits');
    renderPokecardCollection();
    showHits(searchPokemon, 'search-hits');
    searchPokemon = false;
}


function resetHits(id) {    // resets the hits
    document.getElementById(id).innerHTML = '';
}


function showHits(logical, id) {    // shows the current hits
    if (logical) {
        let count = countHits();    // children of the element 'pokecard-collector'
        let hits = getElement(id);    // element 'id'
        setHits(count, hits);
    }
}


function countHits() {    // counts the children of element 'pokecard-collector'
    return document.getElementById('pokecard-collector').childElementCount;
}


function setHits(count, hits) {    // sets the hits
    if (count > 1) {
        hits.innerHTML = count + ' hits';
    } else {
        hits.innerHTML = count + ' hit';
    }
}


function searchPokecard(i) {    // searches pokecards
    let input = getElementValue('search-input');    // search value
    let modus = isNaN(input);    // true or false
    return (modus) ? searchPokecardByName(i, input) : searchPokecardById(i, input);
}


function getElementValue(id) {    // provides an input's value
    return document.getElementById(id).value;
}


function searchPokecardByName(i, input) {    // searches pokecards by name
    input = input.toLowerCase();    // input only with small letters
    let fraction = '';    // empty
    let name = getPokedexObjectValue(i, 'main', 'name');    // name of pokecard i
    fraction = getNameFraction(input, fraction, name);    // fraction of name
    let match = getBoolean(input, fraction);    // true or false
    return (match) ? renderPokecard(i) : '';
}


function getNameFraction(input, fraction, name) {    // provides the fraction of name
    for (let j = 0; j < input.length; j++) {
        fraction += name[j];    // fraction of name
    }
    return fraction;
}


function getBoolean(first, second) {    // provides a boolean value by comparison
    return first == second;
}


function searchPokecardById(i, input) {    // searches pokecards by id
    input = Number(input);    // input as number
    let id = getPokedexObjectValue(i, 'main', 'id');    // id of pokecard i
    let match = getBoolean(input, id);    // true or false
    return (match) ? renderPokecard(i) : '';
}


function closeSearch() {    // closes menu after submitting search
    searchPokemon = false;
    closeMenu();
    return false;
}


function renderFilterTypeGroup() {    // renders the filter type buttons
    let content = getElement('filter-type-group');    // element 'filter-type-group'
    content.innerHTML = '';    // empty
    fillFilterTypeGroup(content);
}


function fillFilterTypeGroup(content) {    // fills the filter type group with i filter type buttons
    for (let i = 0; i < filterTypeGroup.length; i++) {
        content.innerHTML += renderFilterType(i);    // adds filter type button i
    };
}


function renderFilterType(i) {    // renders the filter type button i
    let type = getJsonObjectValue(filterTypeGroup, i);    // type of pokecard i
    return `<input id="filter-${type}" class="filter-type filter-default filter-${type}" type="button" value="${type}" onclick="addFilterType('${type}')">`;
}


function addFilterType(type) {    // adds a type to the filter
    pushFilterType(type);
    setFilterButton(`filter-${type}`, type);
    setElementAttribute(`filter-${type}`, 'onclick', `removeFilterType('${type}')`);
    executeFilterPokemon();
}


function pushFilterType(type) {    // pushes a type to the filter
    filterPokemon['types'].push(type);
}


function setFilterButton(id, classFraction) {    // sets the classes of filter button 'id'
    setClassOnCommand(id, 'toggle', 'filter-default');
    setClassOnCommand(id, 'toggle', `filter-${classFraction}`);
    setClassOnCommand(id, 'toggle', `filter-${classFraction}-activated`);
}


function removeFilterType(type) {    // removes a type from the filter
    spliceFilterType(type);
    setFilterButton(`filter-${type}`, type);
    setElementAttribute(`filter-${type}`, 'onclick', `addFilterType('${type}')`);
    executeFilterPokemon();
}


function spliceFilterType(type) {    // deletes a type from the filter
    let types = getJsonObjectValue(filterPokemon, 'types');    // filtering types
    let index = types.indexOf(type);    // index of filtering type
    filterPokemon['types'].splice(index, 1);    // delete type by its index
}


function setFilterByFirst(logical) {    // settings of filtering by first type
    setFilter('by-first', logical);
    setFilterButton('filter-by-first', 'condition');
    logical = setLogical(logical);    // true or false
    setElementAttribute('filter-by-first', 'onclick', `setFilterByFirst(${logical})`);
    executeFilterPokemon();
}


function setFilter(key, value) {    // sets a filter condition true or false
    filterPokemon[key] = value;    // true or false
}


function setLogical(value) {    // sets the converse boolean value
    return (value) ? false : true;
}


function setFilterOnlyPure(logical) {    // settings of filtering only pure types
    setFilter('only-pure', logical);
    setFilterButton('filter-only-pure', 'condition');
    logical = setLogical(logical);    // true or false
    setElementAttribute('filter-only-pure', 'onclick', `setFilterOnlyPure(${logical})`);
    executeFilterPokemon();
}


function executeFilterPokemon() {    // rendering pokecards according to filter settings
    enableFilterPokemon(true);
    resetHits('filter-hits');
    renderPokecardCollection();
    let filterEnabled = getJsonObjectValue(filterPokemon, 'enabled');    // true or false
    showHits(filterEnabled, 'filter-hits');
    enableFilterPokemon(false);
}


function enableFilterPokemon(logical) {    // enables or disables filter pokemon 
    filterPokemon['enabled'] = logical;
}


function home() {    // sets the default settings and renders all pokecards
    setFilterSettings();
    renderPokecardCollection();
}


function setFilterSettings() {    // sets the filter's default settings
    filterPokemon = {
        'enabled': false,
        'types': [],
        'by-first': false,
        'only-pure': false
    };
}