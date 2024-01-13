// Variables
let pokelist = 151;    // number of loading pokemon (kanto pokedex)
let pokemon = [];    // receives the datasets of all 151 kanto pokemon
let species = [];    // receives the species of all 151 kanto pokemon


// Functions
async function init() {    // initializes the pokedex app
    await loadPokedata();
    recordPokemon();
    renderPokecardCollection();
}


async function loadPokedata() {    // loads ...
    await loadPokemon();    // dataset of pokemon
    await loadSpecies();    // species of pokemon
}


async function loadPokemon() {    // provides the dataset of pokemon
    for (let i = 0; i < pokelist; i++) {
        let url = getUrl(i);    // url i
        let response = await fetch(url);    // dataset i
        let pokedata = await response.json();    // dataset i as json
        pokemon.push(pokedata);    // adds dataset i to pokemon
    }
}


function getUrl(i) {    // provides the url of pokemon i
    let id = i + 1;
    return 'https://pokeapi.co/api/v2/pokemon/' + id;
}


async function loadSpecies() {    // provides the species of pokemon
    for (let i = 0; i < pokelist; i++) {
        let keys = [i, 'species', 'url'];    // keys of subsequent json
        let url = getJsonObjectDeepValue(pokemon, keys);    // url to dataset i
        let response = await fetch(url);    // dataset i
        let pokedata = await response.json();    // dataset i as json
        keys = ['genera', 7, 'genus'];
        let genus = getJsonObjectDeepValue(pokedata, keys);    // genus i
        species.push(genus);    // adds genus i to species
    }
}


function getJsonObjectValue(variable, key) {    // provides a json's value by key
    return variable[key];
}


function getJsonObjectDeepValue(variable, keys) {    // provides a json's value by more than one keys
    let value = variable;
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        value = value[key];
    }
    return value;
}


function save(key, variable) {    // saves a variable by key
    let variableAsText = JSON.stringify(variable);
    localStorage.setItem(key, variableAsText);
}


function load(key) {    // loads a variable by key
    let variableAsText = localStorage.getItem(key);
    if (variableAsText && key == 'kantodex') {
        kantodex = JSON.parse(variableAsText);
    } else if (variableAsText && key == 'pokedex') {
        pokedex = JSON.parse(variableAsText);
    }
}