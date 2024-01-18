function openMenu() {
    setClassOnCommand('pokedex-menu-background', 'remove', 'display-none');

    setClassOnCommand('pokedex-menu', 'add', 'pm-opened');
    setElementAttribute('header-menu-button', 'onclick', 'closeMenu()');    // notwendig?
    includeMenuSearch();
}


function setElementAttribute(id, attribute, value) {
    document.getElementById(id).setAttribute(attribute, value);
}


function closeMenu(logical) {
    toggleMenuButtonGroup(logical);
    setClassOnCommand('pokedex-menu', 'remove', 'pm-opened');

    setClassOnCommand('pokedex-menu-background', 'add', 'display-none');

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
    // setElementAttribute('header-menu-button', 'onclick', 'closeMenu(true)');
    setElementAttribute('pokedex-menu-close-button', 'onclick', 'closeMenu(true)');
    setElementAttribute('pokedex-menu-background', 'onclick', 'closeMenu(true)');

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
    // setElementAttribute('header-menu-button', 'onclick', 'closeMenu(false)');
    setElementAttribute('pokedex-menu-close-button', 'onclick', 'closeMenu(false)');
    setElementAttribute('pokedex-menu-background', 'onclick', 'closeMenu(false)');

    setElementAttribute('pokedex-menu-content', 'include-menu-content', filefilter);
    await includeHTML('include-menu-content');
    setClassOnCommand('search-button', 'toggle', 'pokedex-menu-button-active');
    setClassOnCommand('filter-button', 'toggle', 'pokedex-menu-button-active');
    setButtonDisabled('search-button', false);
    setButtonDisabled('filter-button', true);
    renderFilterTypeGroup();
}