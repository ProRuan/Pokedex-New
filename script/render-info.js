async function renderCardAbout(i) {    // renders the info 'about' of card i
    setInfoBarButtons('card-about');
    highlightInfoLink('card-about');
    setIncludingAttribute(fileAbout);
    await includeHTML('include-card-info');
    renderCardAboutValues(i);
}


function setInfoBarButtons(id) {    // sets the info bar button enabled or disabled
    enableInfoBarButtons();
    setButtonDisabled(id, true);
}


function enableInfoBarButtons() {    // enables the info bar buttons
    let ids = ['card-about', 'card-base-stats', 'card-evolution', 'card-moves'];    // ids of info bar buttons
    for (let i = 0; i < ids.length; i++) {
        let id = ids[i];    // id i
        setButtonDisabled(id, false);
    }
}


function highlightInfoLink(id) {    // highlights the current info link
    unhighlightInfoLinks();
    setClassOnCommand(id, 'add', 'link-active');
}


function unhighlightInfoLinks() {    // unhighlights all info links
    let ids = ['card-about', 'card-base-stats', 'card-evolution', 'card-moves'];    // info links' ids
    for (let i = 0; i < ids.length; i++) {
        let id = ids[i];    // id of info link i
        setClassOnCommand(id, 'remove', 'link-active');
    }
}


function setIncludingAttribute(file) {    // sets the attribute of 'include-card-info'
    let content = getElement('card-info-content');    // element 'card-info-content'
    content.setAttribute('include-card-info', file);    // html file
}


function renderCardAboutValues(i) {    // renders the info 'about' values of card i
    renderInfoSpecies(i);
    renderInfoHeight(i);
    renderInfoWeight(i);
    renderInfoAbilities(i);
}


function renderInfoSpecies(i) {    // renders the species of card i
    let species = getFormattedSpecies(i);    // formatted species
    outputValue('info-species', species);
}


function getFormattedSpecies(i) {    // provides the formatted species of card i
    let speciesUnformatted = getPokedexObjectValue(i, 'about', 'species');
    let species = formatSpecies(speciesUnformatted);
    return species;
}


function formatSpecies(species) {    // formats a species without the word 'Pokémon'
    let overhang = species.indexOf(' Pokémon');    // index of last space
    let copy = species;    // copy of species
    species = '';    // empty
    for (let i = 0; i < overhang; i++) {
        species += copy[i];    // add letter i
    }
    return species;
}


function renderInfoHeight(i) {    // renders the height of card i
    let height = getFormattedValue(i, 'height');    // height as decimal
    outputValue('info-height', height);
}


function getFormattedValue(i, key) {    // provides a value as decimal
    let valueAsInteger = getPokedexObjectValue(i, 'about', key);    // integer
    let value = valueAsInteger / 10;    // decimal
    return value;
}


function renderInfoWeight(i) {    // renders the weight of card i
    let weight = getFormattedValue(i, 'weight');    // weight as decimal
    outputValue('info-weight', weight);
}


function getFormattedInlineNames(name) {    // provides formatted inline names
    let renaming = '';
    let initial = true;
    renaming = getRenaming(name, renaming, initial);
    return renaming;
}


function getRenaming(name, renaming, initial) {    // provides inline names with capitals
    for (let i = 0; i < name.length; i++) {
        let letter = name[i];    // letter i
        let minus = letter.indexOf('-') > -1;    // true or false
        [letter, initial] = formatInitialOrMinus(initial, letter, minus);    // letter, true or false
        renaming += letter;    // adds letter
    }
    return renaming;
}


function formatInitialOrMinus(initial, letter, minus) {    // formats an inital letter or a minus
    return (initial) ? formatInitial(initial, letter) : formatMinusOrReturnLetter(initial, letter, minus);
}


function formatInitial(initial, letter) {    // formats an inital letter
    letter = letter.toUpperCase();    // capital
    initial = false;
    return [letter, initial];
}


function formatMinusOrReturnLetter(initial, letter, minus) {    // formats a minus or returns a letter
    return (minus) ? formatMinus(initial, letter) : letter;
}


function formatMinus(initial, letter) {    // formats a minus
    letter = ' ';    // space
    initial = true;
    return [letter, initial];
}


function renderInfoAbilities(i) {    // renders the abilities of card i
    let abilities = getFormattedAbilities(i);    // abilities
    outputValue('info-abilities', abilities);
}


function getFormattedAbilities(i) {    // provides the formatted abilities of card i
    let abilities = '';    // empty
    let abilitiesUnformatted = getPokedexObjectValue(i, 'about', 'abilities');    // unformatted abilities
    abilities = formatAbilities(abilities, abilitiesUnformatted);    // abilities with capitals
    return abilities;
}

function formatAbilities(abilities, abilitiesUnformatted) {    // formats abilities
    for (let i = 0; i < abilitiesUnformatted.length; i++) {
        let abilityUnformatted = abilitiesUnformatted[i];    // unformatted ability
        let ability = getFormattedInlineNames(abilityUnformatted);    // ability with capitals
        (i > 0) ? abilities += `, ${ability}` : abilities += ability;    // true: ability with leading comma and space
    }
    return abilities;
}


async function renderCardStats(i) {    // renders the base stats of card i
    setInfoBarButtons('card-base-stats');
    highlightInfoLink('card-base-stats');
    setIncludingAttribute(fileStats);
    await includeHTML('include-card-info');
    renderStatsValueCollector(i);
    renderCardStatsValues(i);
}



function renderCardStatsValues(i) {    // renders the base stats values of card i
    let keys = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed', 'total'];    // stats and total
    for (let j = 0; j < keys.length; j++) {
        let key = keys[j];    // key of stat j
        let stat = getPokedexObjectValue(i, 'base-stats', key);    // stat j
        outputValue(`td-${key}`, stat);
    }
}


function renderStatsValueCollector(i) {    // renders the value bars' class with relates to stats
    let content = getElement('stats-value-collector');
    content.innerHTML = '';    // empty
    renderStatsValueClasses(i, content);
    renderStatsTotalClass(i, content);
    setValueBarColor(i);
    setValueBarColorTotal(i);
}


function renderStatsValueClasses(i, content) {    // renders the base stats' classes
    let keys = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];    // stats
    for (let j = 0; j < keys.length; j++) {
        let key = keys[j];    // key of stat j
        let stat = getScaledStat(i, key, 160);    // scaled stat j
        content.innerHTML += renderStatsClass(key, stat);    // renders class of stat j
    }
}


function getScaledStat(i, key, max) {    // provides a scaled stat
    let statUnscaled = getPokedexObjectValue(i, 'base-stats', key);    // unscaled stat
    let maxWidth = getElement(`${key}-max-bar`).offsetWidth;    // length of max bar
    let stat = statUnscaled / max * maxWidth;    // scaled stat
    return (stat > maxWidth) ? maxWidth : stat;    // returns the max width if stat's value is too big
}


function renderStatsClass(key, stat) {    // renders the class of stat 'key'
    return `
        .${key} {
            width: ${stat}px;
        }
    `;
}


function renderStatsTotalClass(i, content) {    // renders the base stats total's class
    let total = getScaledStat(i, 'total', 720);    // scaled total
    content.innerHTML += renderStatsClass('total', total);
}


function setValueBarColor(i) {    // sets the value bars' background color
    let keys = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];    // stats
    for (let k = 0; k < keys.length; k++) {
        let key = keys[k];    // key of stat k
        let stat = getPokedexObjectValue(i, 'base-stats', key);    // stat k
        let color = getValueBarColor(stat, 50);    // background color of stat k
        setClassOnCommand(`${key}-bar`, 'add', color);
    }
}


function getValueBarColor(stat, max) {    // provides the background color of stat's value bar
    return (stat < max) ? 'bgc-red' : 'bgc-green';
}


function setValueBarColorTotal(i) {    // sets the total value bar's background color
    let total = getPokedexObjectValue(i, 'base-stats', 'total');    // total
    let color = getValueBarColor(total, 300);    // background color of total
    setClassOnCommand('total-bar', 'add', color);
}


async function renderCardEvolution(i) {   // renders the evolution of card i
    setInfoBarButtons('card-evolution');
    highlightInfoLink('card-evolution');
    setIncludingAttribute(fileEvolution);
    await includeHTML('include-card-info');
    renderEvolutionFamily(i);
}


function renderEvolutionFamily(i) {    // renders the evolution family of card i
    let content = getElement('evolution-family');    // element 'evolution-family'
    content.innerHTML = '';    // empty
    fillEvolutionFamily(i, content);
}


function fillEvolutionFamily(i, content) {    // fills the element 'evolution-family'
    let family = getEvolutionIndices(i);    // indices of family members
    let max = family.length;    // number of family members
    for (let j = 0; j < max; j++) {
        let member = family[j];    // member of family
        content.innerHTML += renderEvolutionMember(j, member);
    }
}


function getEvolutionIndices(i) {    // provides the indices of evolution family
    let keys = [i, 'evolution'];    // keys of subsequent json
    let ids = getJsonObjectDeepValue(pokedex, keys);    // indices of evolution family
    return ids;
}


function renderEvolutionMember(j, member) {    // renders the evolution member j
    let image = getImage(member);    // artwork
    let name = getFormattedName(member);    // name
    let id = getFormattedId(member);    // id
    return `
        <div id="evolution-member-${j}">
            <img class="evolution-artwork" src="${image}" alt="${name}">
            <div class="evolution-subtext">${id} ${name}</div>
        </div>
    `;
}


async function renderCardMoves(i) {    // renders the moves of card i
    setInfoBarButtons('card-moves');
    highlightInfoLink('card-moves');
    setIncludingAttribute(fileMoves);
    await includeHTML('include-card-info');
    renderTBodyMoves(i);
}


function renderTBodyMoves(i) {    // renders the moves' table body of card i
    let content = getElement('tb-moves');    // element 'tb-moves'
    content.innerHTML = '';    // empty
    renderTableRowsMoves(i, content);
}


function renderTableRowsMoves(i, content) {    // renders the moves' table rows of card i
    let levels = getSortedMovesDetail(i, 'levels');    // levels
    let names = getSortedMovesDetail(i, 'names');    // names
    for (let j = 0; j < levels.length; j++) {
        let level = levels[j];    // level j
        let nameUnformatted = names[j];    // unformatted name j
        let name = getFormattedInlineNames(nameUnformatted);    // name j with capital
        content.innerHTML += writesMoveData(j, level, name);    // table data of move j
    }
}


function getSortedMovesDetail(i, key) {    // provides a sorted moves detail of card i
    let [levels, unsortedValues, values] = setMovesDetails(i, key);    // levels, unsortedValue, values
    for (let l = 0; l < levels.length; l++) {
        let [min, index, value] = setSortDetails();    // min, index, value
        for (let j = 0; j < levels.length; j++) {
            let level = levels[j];    // level j
            (level < min && level > -1) ? [min, index, value] = updateSortDetails(level, j, unsortedValues) : min, index, value;    // true: update | false: keep
        }
        values.push(value);    // add value j
        levels[index] = -1;    // set index out of range
    }
    return values;
}


function setMovesDetails(i, key) {    // sets the moves details
    let levels = getMovesDetail(i, 'levels');    // levels
    let unsortedValues = getMovesDetail(i, key);    // unsorted values
    let values = [];    // values
    return [levels, unsortedValues, values];
}


function setSortDetails() {    // sets the sorting details
    let min = 100;    // minimum (maximum level 100)
    let index = -1;    // index
    let value = 'v';    // value
    return [min, index, value];
}


function updateSortDetails(level, j, unsortedValues) {    // updates the sorting details
    min = level;    // lowest level
    index = j;    // index of lowest level
    value = unsortedValues[j];    // value of lowest level
    return [min, index, value];
}


function getMovesDetail(i, key) {    // provides a moves detail of card i
    let version = getPokedexObjectValue(i, 'moves', 'red-blue');    // version 'red-blue'
    let methods = getJsonObjectValue(version, 'methods');    // methods
    let unsorted = getJsonObjectValue(version, key);    // unsorted value
    let values = [];    // empty
    for (let j = 0; j < methods.length; j++) {
        let method = methods[j];    // method j
        let match = getBoolean(method, 'level-up');    // true or false
        if (match) {
            let value = unsorted[j];    // value j
            values.push(value);    // add value j
        }
    }
    return values;
}


function writesMoveData(j, level, name) {    // writes the table row of move k
    return `
        <tr>
            <th id="th-level-${j}" class="th-moves">${level}</th>
            <td id="td-name-${j}" class="td-moves">${name}</td>
        </tr>
    `;
}