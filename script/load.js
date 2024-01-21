// Variables
let pokelist = 151;    // number of loading pokemon (kanto pokedex)
let seed = 0;    // start value of current loading round
let limit = 24;    // loading limit of current loading round
let step = 6;    // loading step
let rounds = Math.ceil(pokelist / step);    // loading rounds
let progress = 0;    // current percentage of progress bar
let pokemon = [];    // receives the datasets of all 151 kanto pokemon
let species = [];    // receives the species of all 151 kanto pokemon


// Functions
async function init() {    // initializes the pokedex app
    for (let i = 0; i < rounds; i++) {
        await loadPokedataStep();
        updateLoadingValues();
    }
}


function updateLoadingValues() {    // updates the loading values
    seed = limit;    // current start value
    limit += step;    // current limit
    limit = (limit < pokelist) ? limit : pokelist;    // true: limit | false: pokelist
}


async function loadPokedataStep() {    // loads a pokedata step
    await loadPokedata();
    recordPokemon();
    renderPokecardCollectionLoad();
    renderProgress();
}


function renderProgress() {    // renders the progress bar
    let progressUnscaled = limit / pokelist * 100;    // progress as percentage
    let loadingWidth = getLoadingWidth();
    progress = Math.round(progressUnscaled / 100 * loadingWidth);    // scaled progress
    let progressClass = renderStatsClass('progress-bar-value', progress);    // rendering code
    outputValue('stats-value-collector', progressClass);
    (limit == pokelist) ? renderProgressFinale() : false;
}


function getLoadingWidth() {    // provides the width of loading bar
    return document.getElementById('progress-bar').offsetWidth;
}


function renderProgressFinale() {    // renders the progress finale
    outputValue('loading-text', 'complete');
    setTimeout(() => {
        setClassOnCommand('loading-bar', 'add', 'display-none');
    }, 125);
}


async function loadPokedata() {    // loads ...
    await loadPokemon();    // dataset of pokemon
    await loadSpecies();    // species of pokemon
}


async function loadPokemon() {    // provides the dataset of pokemon
    for (let i = seed; i < limit; i++) {
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
    for (let i = seed; i < limit; i++) {
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