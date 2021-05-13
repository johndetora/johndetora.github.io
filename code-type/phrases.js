// Here is the library of phrases.
// To do: organize into seperate languages function types

export const phrases = [
    // HTML
    '<link rel="stylesheet" href="./styles/index.css"></link>',
    '<script src="./script.js">',
    '<input type="range" class="parameter" value=0 min=0 max=7 step=1>',
    // js
    'const log = console.log;',
    "const element = document.querySelectorAll('.class');",
    'parseFloat(value).toFixed(2);',
    'for (let i = 0; i < array.length; i++) {',
    'let vals = [4, 8, 1, 2, 9, 6];',
    "document.addEventListener('click', ({target}) => {",
    "const createSpan = document.createElement('span');",
    // arrow functions
    'vals = vals.map(x => x * 2);',
    'array.reduce((accumulator, person) => accumulator + person.age), 0);',
    'const result = words.filter(word => word.length > 6);',
    'evenNumbers = arr.filter(x => !(x % 2));',
    "arr.filter((x) => typeof x == 'string');",

    // Numbers
    'const d20 = Math.floor(Math.random() * 20) + 1;',
    // CSS
    'grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));',
];
