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
            ${searchFilterRenderPokecard(i)}
        `;
    }
}


function searchFilterRenderPokecard(i) {
    return (searchPokemon) ? searchPokecard(i) : filterRenderPokecard(i);
}


function filterRenderPokecard(i) {
    let filter = getJsonObjectValue(filterPokemon, 'types').length > 0;
    return (filter) ? filterOnlyPureOrByFirst(i) : renderPokecard(i);
}


function filterOnlyPureOrByFirst(i) {
    let onlyPure = getJsonObjectValue(filterPokemon, 'only-pure');
    return (onlyPure) ? filterPokecardOnlyPure(i) : filterByFirstOrDefault(i);
}


function filterPokecardOnlyPure(i) {
    let filter = getJsonObjectValue(filterPokemon, 'types');
    let types = getPokedexObjectValue(i, 'main', 'types');
    let pure = types.length < 2;
    if (pure) {
        let type = types[0];
        let match = false;
        for (let f = 0; f < filter.length; f++) {
            match = type == filter[f];
            if (match) {
                break;
            }
        }
        return (match) ? renderPokecard(i) : '';
    } else {
        return '';
    }
}


function filterByFirstOrDefault(i) {
    let byFirst = getJsonObjectValue(filterPokemon, 'by-first');
    return (byFirst) ? filterPokecardByFirst(i) : filterPokecard(i);
}


function filterPokecardByFirst(i) {
    let filter = getJsonObjectValue(filterPokemon, 'types');
    let types = getPokedexObjectValue(i, 'main', 'types');
    let type = types[0];
    let match = false;
    for (let f = 0; f < filter.length; f++) {
        match = type == filter[f];
        if (match) {
            break;
        }
    }
    return (match) ? renderPokecard(i) : '';
}


function filterPokecard(i) {
    let filter = getJsonObjectValue(filterPokemon, 'types');
    let types = getPokedexObjectValue(i, 'main', 'types');
    let match = false;
    for (let t = 0; t < types.length; t++) {
        let type = types[t];
        for (let f = 0; f < filter.length; f++) {
            match = type == filter[f];
            if (match) {
                break;
            }
        }
        if (match) {
            break;
        }
    }
    return (match) ? renderPokecard(i) : '';
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


// move to another script???
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


// Funktionen verschieben???


function openMenu() {
    setClassOnCommand('pokedex-menu', 'add', 'pm-opened');
    setElementAttribute('header-menu-button', 'onclick', 'closeMenu()');
    includeMenuSearch();
}


function setElementAttribute(id, attribute, value) {
    document.getElementById(id).setAttribute(attribute, value);
}


function closeMenu(logical) {
    toggleMenuButtonGroup(logical);
    setClassOnCommand('pokedex-menu', 'remove', 'pm-opened');
    setElementAttribute('header-menu-button', 'onclick', `openMenu()`);
    let content = getElement('pokedex-menu-content');
    content.innerHTML = '<!-- rendering search bar or filter settings -->';
}

function toggleMenuButtonGroup(search) {
    if (search) {
        setTimeout(() => {
            setClassOnCommand('search-button', 'toggle', 'pokedex-menu-button-active');
            setClassOnCommand('filter-button', 'toggle', 'pokedex-menu-button-active');
        }, 125);
    }
}


async function includeMenuSearch() {
    setElementAttribute('header-menu-button', 'onclick', 'closeMenu(true)');
    setElementAttribute('pokedex-menu-content', 'include-menu-content', fileSearch);
    await includeHTML('include-menu-content');
    setClassOnCommand('search-button', 'toggle', 'pokedex-menu-button-active');
    setClassOnCommand('filter-button', 'toggle', 'pokedex-menu-button-active');
    setButtonDisabled('search-button', true);
    setButtonDisabled('filter-button', false);
    setFilterSettings();
}


function setFilterSettings() {
    filterPokemon = {
        'enabled': false,
        'types': [],
        'by-first': false,
        'only-pure': false
    };
}


function setButtonDisabled(id, logical) {
    document.getElementById(id).disabled = logical;
}


async function includeMenuFilter() {
    setElementAttribute('header-menu-button', 'onclick', 'closeMenu(false)');
    setElementAttribute('pokedex-menu-content', 'include-menu-content', filefilter);
    await includeHTML('include-menu-content');
    setClassOnCommand('search-button', 'toggle', 'pokedex-menu-button-active');
    setClassOnCommand('filter-button', 'toggle', 'pokedex-menu-button-active');
    setButtonDisabled('search-button', false);
    setButtonDisabled('filter-button', true);
    renderFilterTypeGroup();
}


function setClassOnCommand(id, command, className) {
    let toggling = command == 'toggle';
    (toggling) ? toggleClass(id, className) : addOrRemoveClass(id, command, className);
}


function toggleClass(id, className) {
    document.getElementById(id).classList.toggle(className);
}


function addOrRemoveClass(id, command, className) {
    let adding = command == 'add';
    (adding) ? addClass(id, className) : removeClass(id, className);
}


function addClass(id, className) {
    document.getElementById(id).classList.add(className);
}


function removeClass(id, className) {
    document.getElementById(id).classList.remove(className);
}



// Kommentare schreiben!!!

// Farbe rendern (on card)
// zu formatieren: nidoran-f, nidoran-m, porenta, pantimos (on card)
// Passe card.html an --> einfach kopieren und bearbeiten.

// flex column und/oder flex wrap
// search function
// filter fuction