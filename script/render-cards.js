// Functions
function renderPokecardCollection() {    // renders the pokecards
    pokecardCollector = getElement('pokecard-collector');    // element 'pokecard-collector'
    pokecardCollector.innerHTML = '';    // empties pokecardCollector
    fillPokecardCollector(pokecardCollector);
}


function fillPokecardCollector(pokecardCollector) {    // fills the pokecardCollector
    for (let i = 0; i < pokedex.length; i++) {    // 151 pokecards
        pokecardCollector.innerHTML += `
            ${searchFilterPokecard(i)}
        `;
    }
}


function searchFilterPokecard(i) {    // searches or filters pokecard i
    return (searchPokemon) ? searchPokecard(i) : filterRenderPokecard(i);
}


function filterRenderPokecard(i) {    // filters or renders pokecard i
    let filter = getJsonObjectValue(filterPokemon, 'types').length > 0;    // true or false
    return (filter) ? filterOnlyPureOrByFirst(i) : renderPokecard(i);
}


function filterOnlyPureOrByFirst(i) {    // filters pokecard i by pure type or first type
    let onlyPure = getJsonObjectValue(filterPokemon, 'only-pure');    // true or false
    return (onlyPure) ? filterPokecardOnlyPure(i) : filterByFirstOrDefault(i);
}


function filterPokecardOnlyPure(i) {    // filters pokecard i by pure type
    let filter = getJsonObjectValue(filterPokemon, 'types');    // filtering types
    let types = getPokedexObjectValue(i, 'main', 'types');    // types
    let pure = types.length < 2;    // true or false
    return (pure) ? renderOnlyPureByMatch(i, filter, types) : '';
}


function renderOnlyPureByMatch(i, filter, types) {    // renders pokecard i if it has a pure type
    let type = types[0];    // type
    let match = false;
    match = matchesFilterTypes(filter, type, match);    // true or false
    return (match) ? renderPokecard(i) : '';
}


function matchesFilterTypes(filter, type, match) {    // returns true if there is a matching type
    for (let f = 0; f < filter.length; f++) {
        match = type == filter[f];    // true or false
        if (match) {
            break;
        }
    }
    return match;
}


function filterByFirstOrDefault(i) {    // filters pokecard i by first type or without any additional condition
    let byFirst = getJsonObjectValue(filterPokemon, 'by-first');    // true or false
    return (byFirst) ? filterPokecardByFirst(i) : filterPokecard(i);
}


function filterPokecardByFirst(i) {    // filters pokecard i by first type
    let filter = getJsonObjectValue(filterPokemon, 'types');    // filtering types
    let types = getPokedexObjectValue(i, 'main', 'types');    // types
    let type = types[0];    // type
    let match = false;
    match = matchesFilterTypes(filter, type, match);    // true or false
    return (match) ? renderPokecard(i) : '';
}


function filterPokecard(i) {    // filters the pokecard i
    let filter = getJsonObjectValue(filterPokemon, 'types');    // filtering types
    let types = getPokedexObjectValue(i, 'main', 'types');    // types
    let match = false;
    match = matchesFilterTypesLoop(filter, types, match);    // true or false
    return (match) ? renderPokecard(i) : '';
}


function matchesFilterTypesLoop(filter, types, match) {    // returns true if there is a matching type
    for (let t = 0; t < types.length; t++) {
        let type = types[t];    // type t
        match = matchesFilterTypes(filter, type, match);    // true or false
        if (match) {
            break;
        }
    }
    return match;
}


function renderPokecard(i) {    // renders the pokecard i
    let color = getColor(i, 0);    // class name of background color
    return `
        <article id="pokecard-${i}" class="pokecard ${color} flex-column gap-12" onclick="showCard(${i})">
            ${writePokecardIdName(i)}
            ${writePokecardTypeGroup(i)}
            ${writePokecardImage(i)}
        </article>
    `;
}


function getColor(i, j) {    // provides the type of pokecard i
    let types = getPokedexObjectValue(i, 'main', 'types');
    return types[j];    // first type's name is equal to same-named class
}


function writePokecardIdName(i) {    // writes id and name of pokecard i
    return `
        <div id="pokecard-id-name-${i}">
            ${writePokecardId(i)}
            ${writePokecardName(i)}
        </div>
    `;
}


function writePokecardId(i) {    // writes the id of pokecard i
    let id = getFormattedId(i);
    return `<div id="pokecard-id-${i}" class="pokecard-id ta-right">${id}</div>`;
}


function getFormattedId(i) {    // provides the formatted id of pokecard i
    let idUnformatted = getPokedexObjectValue(i, 'main', 'id');    // id as number
    let id = formatId(idUnformatted);    // id as formatted String
    return id;
}


function getPokedexObjectValue(index, key, subkey) {    // provides a value of the pokedex by index, key and subkey
    return pokedex[index][key][subkey];
}


function formatId(id) {    // formats the id
    return ((id > 99) ? '#' : (id > 9) ? '#0' : '#00') + id;
}


function writePokecardName(i) {    // writes the name of pokecard i
    let name = getFormattedNameFemale(i);    // formatted name of pokecard i
    return `<h3 id="pokecard-name-${i}" class="pokecard-name">${name}</h3>`
}


function getFormattedNameFemale(i) {    // provides the formatted name of 'nidoran-f'
    let name = getPokedexObjectValue(i, 'main', 'name');
    let match = name == 'nidoran-f';
    return (match) ? 'Nidoran&#9792' : getFormattedNameMale(i);
}


function getFormattedNameMale(i) {    // provides the formatted name of 'nidoran-m'
    let name = getPokedexObjectValue(i, 'main', 'name');
    let match = name == 'nidoran-m';
    return (match) ? 'Nidoran&#9794' : getFormattedNameD(i);
}


function getFormattedNameD(i) {    // provides the formatted name of 'farfetchd'
    let name = getPokedexObjectValue(i, 'main', 'name');
    let match = name == 'farfetchd';
    return (match) ? 'Farfetch\'d' : getFormattedNameMr(i);
}


function getFormattedNameMr(i) {    // // provides the formatted name of 'mr-mime'
    let name = getPokedexObjectValue(i, 'main', 'name');
    let match = name == 'mr-mime';
    return (match) ? 'Mr. Mime' : getFormattedName(i);
}


function getFormattedName(i) {    // provides the formatted name of pokecard i
    let nameUnformatted = getPokedexObjectValue(i, 'main', 'name');    // unformatted name
    let name = formatFirstLetter(nameUnformatted);    // name with capital
    return name;
}


function formatFirstLetter(name) {    // formats the first letter of a name to a capital
    let first = name[0];    // first letter
    let capital = first.toUpperCase();    // capital 
    return name.replace(first, capital);    // name with capital
}


function writePokecardTypeGroup(i) {    // writes the type group of pokecard i
    return `
        <div id="pokecard-type-group-${i}" class="flex-column gap-8">
            ${writeFormattedTypeGroup(i)}
        </div>
    `;
}


function writeFormattedTypeGroup(i) {    // writes the formatted type group of pokecard i
    let typeGroup = '';
    let types = getPokedexObjectValue(i, 'main', 'types');    // types of pokecard i
    for (let j = 0; j < types.length; j++) {
        typeGroup += writePokecardType(i, j);    // adds type j
    }
    return typeGroup;
}


function writePokecardType(i, j) {    // writes a type of pokecard i
    let slot = getSlot(j);    // type one or two
    let color = getColor(i, j);    // part of class name of background color
    let type = getFormattedType(i, j);    // type with capital
    return `<div id="pokecard-type-${slot}-${i}" class="pokecard-type type-${color}">${type}</div>`;
}


function getSlot(j) {    // provides slot one or two by index
    return (j > 0) ? 'two' : 'one';
}


function getFormattedType(i, j) {    // provides the formatted type j
    let types = getPokedexObjectValue(i, 'main', 'types');    // types of pokecard i
    let typeUnformatted = types[j];    // type j
    let type = formatFirstLetter(typeUnformatted);    // type j with capital
    return type;
}


function writePokecardImage(i) {    // writes the image of pokecard i
    let image = getImage(i);    // artwork of pokecard i
    let name = getPokedexObjectValue(i, 'main', 'name');    // name of pokecard i
    return `<img id="pokecard-artwork-${i}" class="artwork" src="${image}" alt="${name}">`;
}


function getImage(i) {    // provides the artwork of pokecard i
    return getPokedexObjectValue(i, 'main', 'image');
}