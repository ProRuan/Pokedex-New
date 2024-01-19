async function showCard(i) {    // shows the pokecard i
    openDialog();
    await includeHTML('include-card');
    renderCardValues(i);
}


async function renderCardValues(i) {    // renders the values of card i
    setCardColor(i);
    renderCardMain(i);
    renderCardAbout(i);
    setCardInfoOnClick(i);
}


function setCardColor(i) {    // sets the background color of card i
    let color = getColor(i, 0);    // class name of background color
    replaceClasses('card', 'grass', color);
}


function renderCardMain(i) {    // renders the main content of card i
    renderCardName(i);
    renderCardId(i);
    renderCardTypeGroup(i);
    renderCardArtwork(i);
}


function renderCardName(i) {    // renders the name of card i
    let name = getFormattedNameFemale(i);    // formatted name
    outputValue('card-name', name);
}


function renderCardId(i) {    // renders the id of card i
    let id = getFormattedId(i);    // formatted id
    outputValue('card-id', id);
}


function renderCardTypeGroup(i) {    // renders the type group of card i
    let types = getPokedexObjectValue(i, 'main', 'types');    // types
    let typeGroup = getElement('card-type-group');
    typeGroup.innerHTML = '';
    for (let j = 0; j < types.length; j++) {
        typeGroup.innerHTML += renderCardType(i, j);    // type j
    }
}


function renderCardType(i, j) {    // renders the type j of card i
    let color = getColor(i, j);    // part of class name of background color
    let type = getFormattedType(i, j);    // type j
    return `<div id="card-type-${j}" class="card-type type-${color}">${type}</div>`;
}


function renderCardArtwork(i) {    // renders the artwork of card i
    let image = getPokedexObjectValue(i, 'main', 'image');    // artwork
    setImageSource('card-artwork', image);
}


function setImageSource(id, image) {    // sets the src of element 'id'
    document.getElementById(id).src = image;
}


async function renderCardAbout(i) {    // renders the info 'about' of card i
    highlightInfoLink('card-about');
    setIncludingAttribute(fileAbout);
    await includeHTML('include-card-info');
    renderCardAboutValues(i);
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


function setCardInfoOnClick(i) {    // sets the info links' onclick attribute
    setElementAttribute('card-about', 'onclick', `renderCardAbout(${i})`);
    setElementAttribute('card-base-stats', 'onclick', `renderCardStats(${i})`);
    setElementAttribute('card-evolution', 'onclick', `renderCardEvolution(${i})`);
    setElementAttribute('card-moves', 'onclick', `renderCardMoves(${i})`);
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


async function renderCardEvolution(i) {
    highlightInfoLink('card-evolution');
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
    highlightInfoLink('card-moves');
    setIncludingAttribute(fileMoves);
    await includeHTML('include-card-info');
    // add function()

    renderMoves(i);
}
// update moves.html!!!


function renderMoves(i) {
    let content = getElement('tb-moves');
    content.innerHTML = '';
    // renderMovesTableRow(i, content);
    fillTableMoves(i, content);
    // content.innerHTML = 'table moves';
}


function fillTableMoves(i, content) {
    let [levels, names, methods] = getLevelsNamesMethods(i);
    [levels, names, methods] = sortByLevel(levels, names, methods);

    // for (let j = 0; j < levels.length; j++) {
    //     content.innerHTML += 'in Arbeit';
    // }


    for (let k = 0; k < methods.length; k++) {
        let method = methods[k];
        let byLevelUp = method == 'level-up';
        if (byLevelUp) {
            // let name = names[k];
            let nameUnformatted = names[k];
            let name = getFormattedInlineNames(nameUnformatted);
            let level = levels[k];

            let moveData = `
            <tr>
                <th id="th-level-${k}" class="th-moves">${level}</th>
                <td id="td-name-${k}" class="td-moves">${name}</td>
            </tr>
        `;
            content.innerHTML += moveData;
        }
    }
}
// render yellow???


function getLevelsNamesMethods(i) {
    let keys = [i, 'moves', 'red-blue', 'levels'];
    let levels = getJsonObjectDeepValue(pokedex, keys);
    keys = [i, 'moves', 'red-blue', 'names'];
    let names = getJsonObjectDeepValue(pokedex, keys);
    keys = [i, 'moves', 'red-blue', 'methods'];
    let methods = getJsonObjectDeepValue(pokedex, keys);
    return [levels, names, methods];
}


function sortByLevel(levels, namesUnsorted, methodsUnsorted) {
    let copy = [];
    for (let c = 0; c < levels.length; c++) {
        let level = levels[c];
        copy.push(level);
    }

    levels = [];
    let names = [];
    let methods = [];

    for (let k = 0; k < copy.length; k++) {
        let min = 100;
        let index = -1;
        let name = 'n';
        let method = 'm';
        for (let j = 0; j < copy.length; j++) {
            let level = copy[j];
            if (level < min && level > -1) {
                min = level;
                name = namesUnsorted[j];
                method = methodsUnsorted[j];
                index = j;
            }
        }
        levels.push(min);
        names.push(name);
        methods.push(method);
        copy[index] = -1;
    }
    return [levels, names, methods];
    // alert(levels);
}
// levels and levelsUnsorted!!!

// if id = current leicht einfaerben!!!

// style buttons