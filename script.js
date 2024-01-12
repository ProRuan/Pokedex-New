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


// Tasks
// -----
// II. Render TypeColor (HTML)
// I. Calculate Total (JavaScript)


// Options
// -------
// About: breeding details
// Evolution:  evolution chain
// moves: other versions


// Clean Coding
// ------------
// think about function names
// think about save and load
// use i instead of index
// use MASTERKEY()

// remove save and load of kantodex???