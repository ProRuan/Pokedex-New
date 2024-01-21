// Variables
let pokedex = [];    // receives the dataset of all 151 kanto pokemon


// Functions
load('pokedex');


function recordPokemon() {    // records the pokemon' data
    for (let i = seed; i < limit; i++) {
        pokedex[i] = {
            'main': recordMain(i),
            'about': recordAbout(i),
            'base-stats': recordBaseStat(i),
            'evolution': recordEvolution(i),
            'moves': recordMoves(i)
        };
    }
    save('pokedex', pokedex);
}


function recordMain(i) {    // records the main of pokemon i
    let main = {
        'id': getPokemonObjectValue(i, 'id'),
        'name': getPokemonObjectValue(i, 'name'),
        'types': getDataset(i, 'types', 'type'),
        'image': getArtwork(i)
    };
    return main;
}


function getPokemonObjectValue(index, key) {    // provides a pokemon' value by index and key
    return pokemon[index][key];
}


function getDataset(i, key, subkey) {    // provides a dataset of pokemon i
    let master = getPokemonObjectValue(i, key);
    let dataset = [];
    for (let j = 0; j < master.length; j++) {
        let keys = [j, subkey, 'name'];
        let primal = getJsonObjectDeepValue(master, keys);
        dataset.push(primal);
    }
    return dataset;
}


function getArtwork(i) {    // provides an image of pokemon i
    let sprites = getPokemonObjectValue(i, 'sprites');
    let keys = ['other', 'official-artwork', 'front_default'];
    return getJsonObjectDeepValue(sprites, keys);
}


function recordAbout(i) {    // records some data of pokemon i
    let about = {
        'species': getSpecies(i),
        'height': getPokemonObjectValue(i, 'height'),
        'weight': getPokemonObjectValue(i, 'weight'),
        'abilities': getDataset(i, 'abilities', 'ability')
    };
    return about;
}


function getSpecies(i) {    // provides the species of pokemon i
    return species[i];
}


function recordBaseStat(i) {    // records the base stats of pokemon i
    let baseStats = {
        'hp': getBaseStat(i, 0),
        'attack': getBaseStat(i, 1),
        'defense': getBaseStat(i, 2),
        'special-attack': getBaseStat(i, 3),
        'special-defense': getBaseStat(i, 4),
        'speed': getBaseStat(i, 5),
        'total': getBaseStatTotal(i)
    }
    return baseStats;
}


function getBaseStat(i, j) {    // provides a base stat of pokemon i by j
    let stats = getPokemonObjectValue(i, 'stats');
    let keys = [j, 'base_stat'];
    return getJsonObjectDeepValue(stats, keys);
}


function getBaseStatTotal(i) {
    let total = 0;
    for (let j = 0; j < 6; j++) {
        let stat = getBaseStat(i, j);
        total += stat;
    }
    return total;
}


function recordEvolution(i) {    // records the evolution of pokemon i
    let member = i;    // index of current member
    member = getLowest(i, member);    // index of lowest member
    return getEvolutionChain(member);
}


function getLowest(i, lowest) {    // provides the index of lowest member of evolution family i
    for (let previous = i - 1; evolution[previous]; previous--) {
        lowest = previous;
    }
    return lowest;
}


function getEvolutionChain(member) {    // provides evolution family or single of pokemon i
    return (evolution[member]) ? getFamily(member) : [member];    // true: family | false: single
}


function getFamily(member) {    // provides the evolution family of pokemon i
    let family = [];
    for (; evolution[member]; member++) {
        family.push(member);    // adds the index of current member
    }
    family.push(member);    // adds the index of the final member
    return family;
}


function recordMoves(i) {    // records the moves of pokemon i
    let moves = {
        'red-blue': getMovesVersion(i, 'red-blue'),
        'yellow': getMovesVersion(i, 'yellow')
    }
    return moves;
}


function getMovesVersion(i, key) {    // records the moves' versions of pokemon i
    let [names, methods, levels] = getVersionDetails(i, key);
    let version = {
        'names': names,    // names of moves
        'methods': methods,    // learning methods of moves
        'levels': levels    // learning levels of moves
    }
    return version;
}


function getVersionDetails(i, key) {    // provides the names, methods and levels of moves
    let namesMethodsLevels = getVersionParameters();
    let moves = getPokemonObjectValue(i, 'moves');
    iterateOverMoves(key, moves, namesMethodsLevels);
    return namesMethodsLevels;
}


function getVersionParameters() {    // provides the moves' parameters names, methods and levels
    let names = [];
    let methods = [];
    let levels = [];
    return [names, methods, levels];
}


function iterateOverMoves(key, moves, namesMethodsLevels) {    // iterates over moves
    for (let m = 0; m < moves.length; m++) {
        let nameVersionGroup = getNameVersionGroup(moves, m);    // name and version group of move m
        iterateOverVersionGroup(key, namesMethodsLevels, nameVersionGroup);
    }
}


function getNameVersionGroup(moves, m) {    // provides name and version group of move m
    let keys = [m, 'move', 'name'];
    let name = getJsonObjectDeepValue(moves, keys);
    keys = [m, 'version_group_details'];
    let versionGroup = getJsonObjectDeepValue(moves, keys);
    return [name, versionGroup];
}


function iterateOverVersionGroup(key, namesMethodsLevels, nameVersionGroup) {    // iterates over version group
    let [name, versionGroup] = nameVersionGroup;
    for (let v = 0; v < versionGroup.length; v++) {
        let [version, method, level] = getVersionMethodLevel(versionGroup, v);    // method and level of version v
        let nameVersionMethodLevel = [name, version, method, level];    // a parameter of subsequent function
        pushVersionDetails(key, namesMethodsLevels, nameVersionMethodLevel);
    }
}


function getVersionMethodLevel(versionGroup, v) {    // provides the method and level of version v
    let keys = [v, 'version_group', 'name'];
    let version = getJsonObjectDeepValue(versionGroup, keys);
    keys = [v, 'move_learn_method', 'name'];
    let method = getJsonObjectDeepValue(versionGroup, keys);
    keys = [v, 'level_learned_at'];
    let level = getJsonObjectDeepValue(versionGroup, keys);
    return [version, method, level];
}


function pushVersionDetails(key, namesMethodsLevels, nameVersionMethodLevel) {    // pushes name, method and level of move m (version v)
    let [names, methods, levels] = namesMethodsLevels;    // receiving arrays
    let [name, version, method, level] = nameVersionMethodLevel;    // pushing values
    if (version == key) {    // if version requested ...
        names.push(name);    // push name of move m
        methods.push(method);    // push method of move m
        levels.push(level);    // push level of move m
    }
}