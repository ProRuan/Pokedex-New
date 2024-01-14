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
        <article id="pokecard-${i}" class="pokecard ${color} flex-column gap-12" onclick="showCard(${i})">
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
    let name = formatFirstLetter(nameUnformatted)
    return name;
}


function formatFirstLetter(name) {
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
    let type = formatFirstLetter(typeUnformatted);
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




async function showCard(i) {
    openDialog();
    await includeHTML('include-card');
    renderCard(i);
}


function openDialog() {
    document.getElementById('dialog').show();
}


function stop(event) {
    event.stopPropagation();
}


function closeDialog() {
    document.getElementById('dialog').close();
}


async function includeHTML(attribute) {
    let inclusion = document.querySelectorAll(`[${attribute}]`);    // check
    for (let i = 0; i < inclusion.length; i++) {
        const element = inclusion[i];
        file = element.getAttribute(attribute);    // check
        let response = await fetch(file);
        if (response.ok) {
            element.innerHTML = await response.text();
        } else {
            element.innerHTML = 'Page not found.';
        }
    }
}


async function renderCard(i) {
    setCardColor(i);
    renderCardMain(i);
    await includeHTML('include-card-info');
    renderCardAbout(i);
}


function renderCardMain(i) {
    renderCardName(i);
    renderCardId(i);
    renderCardTypeGroup(i);
    renderCardArtwork(i);
}


function setCardColor(i) {
    let color = getColor(i, 0);
    let card = getElement('card');
    card.classList.replace('grass', color);
}
// classOnCommmand + just add (not replace) + css!!!


function renderCardName(i) {
    let name = getFormattedNameFemale(i);
    outputValue('card-name', name);
}


function outputValue(id, value) {
    document.getElementById(id).innerHTML = value;
}


function renderCardId(i) {
    let id = getFormattedId(i);
    outputValue('card-id', id);
}


function renderCardTypeGroup(i) {
    let types = getPokedexObjectValue(i, 'main', 'types');
    let typeGroup = getElement('card-type-group');
    typeGroup.innerHTML = '';
    for (let j = 0; j < types.length; j++) {
        renderCardType(i, j, typeGroup);
    }
}


function renderCardType(i, j, typeGroup) {
    let color = getColor(i, j);
    let type = getFormattedType(i, j);
    typeGroup.innerHTML += `<div id="card-type-${j}" class="card-type type-${color}">${type}</div>`;
}


function renderCardArtwork(i) {
    let image = getPokedexObjectValue(i, 'main', 'image');
    setImageSource('card-artwork', image);
}


function setImageSource(id, image) {
    document.getElementById(id).src = image;
}


function renderCardAbout(i) {
    renderInfoSpecies(i);
    renderInfoHeight(i);
    renderInfoWeight(i);
}

// Bitte folgende Funktionen updaten
function renderInfoSpecies(i) {
    let species = getFormattedSpecies(i);
    outputValue('info-species', species);
}


function getFormattedSpecies(i) {
    let speciesUnformatted = getPokedexObjectValue(i, 'about', 'species');
    let species = formatSpecies(speciesUnformatted);
    return species;
}


function formatSpecies(species) {
    let space = species.indexOf(' ');
    let copy = species;
    species = '';
    for (let i = 0; i < space; i++) {
        species += copy[i];
    }
    return species;
}


function renderInfoHeight(i) {
    let height = getFormattedValue(i, 'height');
    outputValue('info-height', height);
}


function getFormattedValue(i, key) {
    let valueAsInteger = getPokedexObjectValue(i, 'about', key);
    let value = valueAsInteger / 10;
    return value;
}


function renderInfoWeight(i) {
    let weight = getFormattedValue(i, 'weight');
    outputValue('info-weight', weight);
}


function getFormattedInlineNames(name) {
    let renaming = '';
    let initial = true;
    renaming = getRenaming(name, renaming, initial);
    return renaming;
}


function getRenaming(name, renaming, initial) {
    for (let i = 0; i < name.length; i++) {
        let letter = name[i];
        let minus = letter.indexOf('-') > -1;
        [letter, initial] = formatInitialOrMinus(initial, letter, minus);
        renaming += letter;
    }
    return renaming;
}


function formatInitialOrMinus(initial, letter, minus) {
    return (initial) ? formatInitial(initial, letter) : formatMinusOrReturnLetter(initial, letter, minus);
}


function formatInitial(initial, letter) {
    letter = letter.toUpperCase();
    initial = false;
    return [letter, initial];
}


function formatMinusOrReturnLetter(initial, letter, minus) {
    return (minus) ? formatMinus(initial, letter) : letter;
}


function formatMinus(initial, letter) {
    letter = ' ';
    initial = true;
    return [letter, initial];
}


// renderInfoAbilities(i)


// Kommentare schreiben!!!

// Farbe rendern (on card)
// zu formatieren: nidoran-f, nidoran-m, porenta, pantimos (on card)
// Passe card.html an --> einfach kopieren und bearbeiten.

// flex column und/oder flex wrap
// search function
// filter fuction