function openMenu() {    // opens the pokedex menu
    setClassOnCommand('pokedex-menu-background', 'remove', 'display-none');
    includeMenuSearch();
}


function closeMenu() {    // closes the pokedex menu
    setClassOnCommand('pokedex-menu-background', 'add', 'display-none');
    setMenuButtonByLogical(true);
    renderMenuNote();
}


function renderMenuNote() {    // renders a note to the menu
    let note = '<!-- rendering search bar or filter settings -->';    // note
    outputValue('pokedex-menu-content', note);
}


async function includeMenuSearch() {   // includes the search menu
    includeHTMLMenu(fileSearch);
    setMenuButtonByLogical(true);
    setFilterSettings();
}


async function includeHTMLMenu(file) {    // includes the pokedex menu's subcontent
    setElementAttribute('pokedex-menu-content', 'include-menu-content', file);
    await includeHTML('include-menu-content');
}


function setMenuButtonByLogical(logical) {    // sets the menu buttons depending on a logical value
    setButtonDisabled('search-button', logical);
    let command = getCommandByLogical(logical);
    setClassOnCommand('search-button', command, 'pokedex-menu-button-active');
    logical = setLogical(logical);
    setButtonDisabled('filter-button', logical);
    command = getCommandByLogical(logical);
    setClassOnCommand('filter-button', command, 'pokedex-menu-button-active');
}


function getCommandByLogical(logical) {    // provides a command depending on a logical value
    return (logical) ? 'add' : 'remove';
}


async function includeMenuFilter() {    // includes the filter menu
    includeHTMLMenu(fileFilter);
    setMenuButtonByLogical(false);
    renderFilterTypeGroup();
}