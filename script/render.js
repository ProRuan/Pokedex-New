// Variables


// Functions
function renderPokecardCollection() {
    pokecardCollector = getElement('pokecard-collector');
    pokecardCollector.innerHTML = '';
    fillPokecardCollector(pokecardCollector);
}


function getElement(id) {
    return document.getElementById(id);
}


function fillPokecardCollector(pokecardCollector) {
    for (let i = 0; i < pokedex.length; i++) {
        pokecardCollector.innerHTML += `
            ${renderPokecard(i)}
        `;
    }
}


function renderPokecard(i) {
    let color = getColor(i, 0);
    return `
        <article id="pokecard-${i}" class="pokecard ${color} flex-column gap-12">
            ${writePokecardIdName(i)}
            ${writePokecardTypeGroup(i)}
            ${writePokecardImage(i)}
        </article>
    `;
}


function getColor(i, j) {
    let types = getPokedexObjectValue(i, 'main', 'types');
    return types[j];
}


function writePokecardIdName(i) {
    return `
        <div id="pokecard-id-name-${i}">
            ${writePokecardId(i)}
            ${writePokecardName(i)}
        </div>
    `;
}


function writePokecardId(i) {
    let id = getFormattedId(i);
    return `<div id="pokecard-id-${i}" class="pokecard-id ta-right">${id}</div>`;
}


function getFormattedId(i) {
    let idUnformatted = getPokedexObjectValue(i, 'main', 'id');
    let id = formatId(idUnformatted);
    return id;
}


function getPokedexObjectValue(index, key, subkey) {
    return pokedex[index][key][subkey];
}


function formatId(id) {
    return ((id > 99) ? '#' : (id > 9) ? '#0' : '#00') + id;
}


function writePokecardName(i) {
    let name = getFormattedNameFemale(i);
    return `<h3 id="pokecard-name-${i}" class="pokecard-name">${name}</h3>`
}


function getFormattedNameFemale(i) {
    let name = getPokedexObjectValue(i, 'main', 'name');
    let match = name == 'nidoran-f';
    return (match) ? 'Nidoran&#9792' : getFormattedNameMale(i);
}


function getFormattedNameMale(i) {
    let name = getPokedexObjectValue(i, 'main', 'name');
    let match = name == 'nidoran-m';
    return (match) ? 'Nidoran&#9794' : getFormattedNameD(i);
}


function getFormattedNameD(i) {
    let name = getPokedexObjectValue(i, 'main', 'name');
    let match = name == 'farfetchd';
    return (match) ? 'Farfetch\'d' : getFormattedNameMr(i);
}


function getFormattedNameMr(i) {
    let name = getPokedexObjectValue(i, 'main', 'name');
    let match = name == 'mr-mime';
    return (match) ? 'Mr. Mime' : getFormattedName(i);
}


function getFormattedName(i) {
    let nameUnformatted = getPokedexObjectValue(i, 'main', 'name');
    let name = formatName(nameUnformatted)
    return name;
}


function formatName(name) {
    let first = name[0];
    let capital = first.toUpperCase();
    return name.replace(first, capital);
}


function writePokecardTypeGroup(i) {
    return `
        <div id="pokecard-type-group-${i}" class="flex-column gap-8">
            ${writePokecardTypes(i)}
        </div>
    `;
}


function writePokecardTypes(i) {
    let typeGroup = '';
    typeGroup = getFormattedTypes(i, typeGroup);
    return typeGroup;
}


function getFormattedTypes(i, typeGroup) {
    let types = getPokedexObjectValue(i, 'main', 'types');
    for (let j = 0; j < types.length; j++) {
        typeGroup += writePokecardType(i, j);
    }
    return typeGroup;
}


function writePokecardType(i, j) {
    let slot = getSlot(j);
    let color = getColor(i, j);
    let type = getFormattedType(i, j);
    return `<div id="pokecard-type-${slot}-${i}" class="pokecard-type type-${color}">${type}</div>`;
}


function getSlot(j) {
    return (j > 0) ? 'two' : 'one';
}


function getFormattedType(i, j) {
    let types = getPokedexObjectValue(i, 'main', 'types');
    let typeUnformatted = types[j];
    let type = formatName(typeUnformatted);
    return type;
}


function writePokecardImage(i) {
    let image = getImage(i);
    let name = getPokedexObjectValue(i, 'main', 'name');
    return `<img id="pokecard-artwork-${i}" class="artwork" src="${image}" alt="${name}">`;
}


function getImage(i) {
    return getPokedexObjectValue(i, 'main', 'image');
}


// Kommentare schreiben!!!

// Farbe rendern (on card)
// zu formatieren: nidoran-f, nidoran-m, porenta, pantimos (on card)
// Passe card.html an --> einfach kopieren und bearbeiten.

// flex column und/oder flex wrap
// search function
// filter fuction