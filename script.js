// async function init() {
//     await includeHTML();
// }


async function includeHTML() {
    let inclusion = document.querySelectorAll('[pokecard]');
    for (let i = 0; i < inclusion.length; i++) {
        const element = inclusion[i];
        file = element.getAttribute("pokecard");
        let response = await fetch(file);
        if (response.ok) {
            element.innerHTML = await response.text();
        } else {
            element.innerHTML = 'Page not found.';
        }
    }
}



// Tasks
// -----
// Clean Coding
// openDialog() + includeHTML() + renderValues()
// format output: e.g. Seed (without pokemon)


// Options
// -------
// About: breeding details
// Evolution:  evolution chain
// moves: other versions
// like button + filter liked pokemon


// Clean Coding
// ------------
// think about function names
// think about save and load
// remove save and load of kantodex???