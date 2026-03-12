/**
 * Dodaje dodajną i dodajnik
 * @param {number} a Dodajna
 * @param {number} b Dodajnik
 * @returns {number}
 */
export function add(a, b) {
  return a + b;
}

add(1, "2");

/** @type {Person}*/
const person = {
  name: "Alice",
  company: {
    name: "Wonderland",
  },
};

/**
 * @typedef Person  
 * nice person 
 * @property {string} name
 * @property {{
 *  name:string
 * }} company
 */

/**
 * Shows person info
 * @param {Person} person 
 * @returns 
 */
export function getPersonInfo(person){
  return `${person.name} - ${person.company.name}`
}