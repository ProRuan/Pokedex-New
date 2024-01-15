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
    renderInfoAbilities(i);
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


function renderInfoAbilities(i) {
    let abilities = getFormattedAbilities(i);
    outputValue('info-abilities', abilities);
}


function getFormattedAbilities(i) {
    let abilities = '';
    let abilitiesUnformatted = getPokedexObjectValue(i, 'about', 'abilities');
    for (let j = 0; j < abilitiesUnformatted.length; j++) {
        let abilityUnformatted = abilitiesUnformatted[j];
        let ability = getFormattedInlineNames(abilityUnformatted);
        if (j > 0) {
            abilities += `, ${ability}`;
        } else {
            abilities += ability;
        }
    }
    return abilities;
}


function renderCardStats() {
    setIncludingAttribute(fileStats)
    includeHTML('include-card-info');
}


function setIncludingAttribute(file) {
    let content = getElement('card-info-content');
    content.setAttribute('include-card-info', fileStats);
}


// stats values in relation or fixed table width
// search, filter, render in render-cards.js