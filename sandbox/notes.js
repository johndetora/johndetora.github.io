
/*
Primitive/Value types:
String
Number
Boolean
undefined
null
*/

//Declare variable
let name = 'John'; // String literal
let age = 30; // Number literal
let isApproved = true; // Boolean Literal
let firstName = null; //Clear the value of a variable


//Declare constant 
const grav = 1;

//Declare Object

let person = {
	name: 'Xio',
	age: 22
};

// Dot Notation
person.name = 'Jerry';

// Bracket Notation
person['name'] = 'Mary';

//"Print" variable
console.log(person.name);

//Arrays

let selectedColors = ['red', 'blue']; //Array
selectedColors[2] = 'green'; // can add index to array
console.log(selectedColors[2]); //Returns index of array
console.log(selectedColors.length); //Returns length of array


//Functions

function greet(){
	console.log('Hello World');
}

greet();
// with Parameters 
function greet(name, lastName){              
	console.log('Hello ' + name + ' ' + lastName);
}

greet('John', 'smith');

// Calculating a value
function square(number) {
	return number * number;
}

console.log(square(2));