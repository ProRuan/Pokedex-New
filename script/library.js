// Functions
// class
function setClassOnCommand(id, command, className) {    // adds or removes an element's class on command
    let toggling = command == 'toggle';    // true or false
    (toggling) ? toggleClass(id, className) : addOrRemoveClass(id, command, className);    // true: toggle | false: add or remove
}


function toggleClass(id, className) {    // toggles an element's class
    document.getElementById(id).classList.toggle(className);
}


function addOrRemoveClass(id, command, className) {    // adds or removes an element's class
    let adding = command == 'add';    // true or false
    (adding) ? addClass(id, className) : removeClass(id, className);    // true: add | false: remove
}


function addClass(id, className) {    // adds an element's class
    document.getElementById(id).classList.add(className);
}


function removeClass(id, className) {    // removes an element's class
    document.getElementById(id).classList.remove(className);
}


function replaceClasses(id, remove, add) {    // replaces element's classes
    document.getElementById(id).classList.replace(remove, add);
}


// dialog
function openDialog() {    // opens the dialog
    document.getElementById('dialog').show();
}


function stop(event) {    // prevents the closing of dialog
    event.stopPropagation();
}


function closeDialog() {    // closes the dialog
    document.getElementById('dialog').close();
}


// element
function getElement(id) {    // provides an element by id
    return document.getElementById(id);
}


function outputValue(id, value) {    // outputs a value to the element 'id'
    document.getElementById(id).innerHTML = value;
}


function setButtonDisabled(id, logical) {    // enables or disables the button 'id'
    document.getElementById(id).disabled = logical;    // true or false
}


function setElementAttribute(id, attribute, value) {    // set the value of an element's attribute
    document.getElementById(id).setAttribute(attribute, value);
}


// Async Functions
// include html
async function includeHTML(attribute) {    // includes a html file by attribute
    let inclusion = document.querySelectorAll(`[${attribute}]`);
    for (let i = 0; i < inclusion.length; i++) {
        const element = inclusion[i];
        file = element.getAttribute(attribute);
        let response = await fetch(file);
        if (response.ok) {
            element.innerHTML = await response.text();
        } else {
            element.innerHTML = 'Page not found.';
        }
    }
}