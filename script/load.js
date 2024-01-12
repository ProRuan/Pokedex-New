// Variables
let kantodex;    // receives 'name' and 'url' of all 151 kanto pokemon
let pokelist = [];    // receives the names of all 151 kanto pokemon
let pokemon = [];    // receives the datasets of all 151 kanto pokemon
let species = [];    // receives the species of all 151 kanto pokemon


// Functions
load('kantodex');


async function init() {    // initializes the pokedex app
    await loadPokedata();
    recordPokemon();
}


async function loadPokedata() {
    await loadPokelist();
    await loadPokemon();
    await loadSpecies();
}


async function loadPokelist() {    // provides the pokelist
    await loadKantodex();
    await getPokelist();
}

async function loadKantodex() {    // provides the data of kanto pokedex
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`;    // url to data
    let response = await fetch(url);    // data
    let pokedata = await response.json();    // data as json
    kantodex = getJsonObjectValue(pokedata, 'results');    // data of kanto pokedex
    save('kantodex', kantodex);
}

function getJsonObjectValue(variable, key) {    // provides a json's value by key
    return variable[key];
}


async function getPokelist() {    // provides the names of all 151 kanto pokemon
    for (let i = 0; i < kantodex.length; i++) {
        let keys = [i, 'name'];    // keys of subsequent json
        let name = getJsonObjectDeepValue(kantodex, keys);    // name i
        pokelist.push(name);    // adds name i to pokelist
    }
}


function getJsonObjectDeepValue(variable, keys) {    // provides a json's value by more than one keys
    let value = variable;
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        value = value[key];
    }
    return value;
}


async function loadPokemon() {    // provides the dataset of pokemon by their names
    for (let i = 0; i < pokelist.length; i++) {
        let name = getJsonObjectValue(pokelist, i);    // name i
        let url = `https://pokeapi.co/api/v2/pokemon/${name}`;    // url to dataset i
        let response = await fetch(url);    // dataset i
        let pokedata = await response.json();    // dataset i as json
        pokemon.push(pokedata);    // adds dataset i to pokemon
    }
}


async function loadSpecies() {    // provides the species of pokemon
    for (let i = 0; i < pokelist.length; i++) {
        let keys = [i, 'species', 'url'];    // keys of subsequent json
        let url = getJsonObjectDeepValue(pokemon, keys);    // url to dataset i
        let response = await fetch(url);    // dataset i
        let pokedata = await response.json();    // dataset i as json
        keys = ['genera', 7, 'genus'];
        let genus = getJsonObjectDeepValue(pokedata, keys);    // genus i
        species.push(genus);    // adds genus i to species
    }
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