async function renderCard(i) {
    setCardColor(i);
    renderCardMain(i);
    renderCardAbout(i);
    // await includeHTML('include-card-info');
    // renderCardAbout(i);
    setCardLinks(i);
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


async function renderCardAbout(i) {
    setIncludingAttribute(fileAbout);
    await includeHTML('include-card-info');
    renderCardAboutValues(i);
}


function setCardLinks(i) {
    setElementAttribute('card-about', 'onclick', `renderCardAbout(${i})`);
    setElementAttribute('card-base-stats', 'onclick', `renderCardStats(${i})`);
    setElementAttribute('card-evolution', 'onclick', `renderCardEvolution(${i})`);
    setElementAttribute('card-moves', 'onclick', `renderCardMoves(${i})`);
}


function renderCardAboutValues(i) {
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


async function renderCardStats(i) {
    setIncludingAttribute(fileStats)
    await includeHTML('include-card-info');
    renderStatsValueCollector(i);
    renderCardStatsValues(i);
}


function setIncludingAttribute(file) {
    let content = getElement('card-info-content');
    content.setAttribute('include-card-info', file);
}


function renderCardStatsValues(i) {
    let keys = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed', 'total'];
    for (let j = 0; j < keys.length; j++) {
        let key = keys[j];
        let stat = getPokedexObjectValue(i, 'base-stats', key);
        outputValue(`td-${key}`, stat);
    }
}


function renderStatsValueCollector(i) {
    let content = getElement('stats-value-collector');
    content.innerHTML = '';
    renderStatsValueGroup(i, content);
    renderStatsValueTotal(i, content);
    setValueBarColor(i);
    setValueBarColorTotal(i);
}


function renderStatsValueGroup(i, content) {
    let keys = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
    for (let j = 0; j < keys.length; j++) {
        let key = keys[j];
        let stat = getScaledStat(i, key, 160);
        content.innerHTML += renderStatsValue(key, stat);
    }
}


function getScaledStat(i, key, max) {
    let statUnscaled = getPokedexObjectValue(i, 'base-stats', key);
    let maxWidth = getElement(`${key}-max-bar`).offsetWidth;
    let stat = statUnscaled / max * maxWidth;
    return (stat > maxWidth) ? maxWidth : stat;
}


function renderStatsValue(key, stat) {    // Bitte umbennenen!!!
    return `
        .${key} {
            width: ${stat}px;
        }
    `;
}


function renderStatsValueTotal(i, content) {
    let total = getScaledStat(i, 'total', 720);
    content.innerHTML += renderStatsValue('total', total);
}


function setValueBarColor(i) {
    let keys = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
    for (let k = 0; k < keys.length; k++) {
        let key = keys[k]
        let stat = getPokedexObjectValue(i, 'base-stats', key);
        let color = getValueBarColor(stat, 50);
        setClassOnCommand(`${key}-bar`, 'add', color);
    }
}


function getValueBarColor(stat, max) {
    return (stat < max) ? 'bgc-red' : 'bgc-green';
}


function setValueBarColorTotal(i) {
    let total = getPokedexObjectValue(i, 'base-stats', 'total');
    let color = getValueBarColor(total, 300);
    setClassOnCommand('total-bar', 'add', color);
}


async function renderCardEvolution(i) {
    setIncludingAttribute(fileEvolution);
    await includeHTML('include-card-info');
    renderEvolutionFamily(i);
}


function renderEvolutionFamily(i) {    // think about the names of subsequent funcitons!!!
    let content = getElement('evolution-family');
    content.innerHTML = '';
    fillEvolutionFamily(i, content);
}


function fillEvolutionFamily(i, content) {
    let family = pokedex[i]['evolution'];
    let max = family.length;
    for (let j = 0; j < max; j++) {
        let member = family[j];
        content.innerHTML += renderEvolutionMember(j, member);
    }
}


// class evolution-member text links - bild rechts!!!
function renderEvolutionMember(j, member) {
    let image = getImage(member);
    let name = getFormattedName(member);
    let id = getFormattedId(member);
    return `
        <div id="evolution-member-${j}">
            <img class="evolution-artwork" src="${image}" alt="${name}">
            <div class="evolution-subtext">${id} ${name}</div>
        </div>
    `;
}


// render info-link-underline!!!


async function renderCardMoves(i) {
    setIncludingAttribute(fileMoves);
    await includeHTML('include-card-info');
    
}


