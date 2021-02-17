
var gameTextContainer = document.getElementById("gameTextContainer");
var gameText = document.getElementById("gameText");
var response = document.getElementById("response");
var button = document.getElementById("enter");
var inputField = document.getElementById("inputField");


var story = {
    "tree": "You approach a clearing.  You see a tree to the east.  Where would you like to go?",
    "crystal": "You approach the tree.  You find a mysterious crystal.",
    "crystalHave": "You take the crystal."
}

var inventory = {
    "crystal": false
}

function clear() {
    inputField.value = "";
}

function tree(){
    clear();
    response.innerHTML = "" 
    gameText.innerHTML = story.tree;
    inputField.addEventListener("keyup", function(event){
        if (event.key === "Enter") {
            var userInput = inputField.value
                if (userInput.includes("tree")) crystal();
                else {
                    response.innerHTML = "Please Retry" 
                }
            }
    });
};

function crystal(){
    clear();
    response.innerHTML = "" 
    gameText.innerHTML = story.crystal;
    inputField.addEventListener("keyup", function(event){
        if (event.key === "Enter") {
            var userInput = inputField.value
                if (userInput.includes("take")) crystalHave();
                else {
                    response.innerHTML = "Please Retry" 
                }
            }
    });
};

////

function crystalHave(){
    clear();
    response.innerHTML = "" 
    gameText.innerHTML = story.crystalHave;
    inputField.addEventListener("keyup", function(event){
        if (event.key === "Enter") {
            var userInput = inputField.value
                if (userInput.includes("crystal")){
                    crystal();
                } else {
                    response.innerHTML = "Please Retry";
                }
            }
    });
};




function treeOld(){
gameText.innerHTML = "You approach the tree.  You find a mysterious crystal."
var inputField = document.getElementById("inputField");
var userInput = inputField.value;
userText.innerText = userInput
    if (userInput.includes("take")) {
        inputField.value = "";
        crystal();
    }
}

function npc(){
gameText.innerHTML = "a man approaches"
input();
    if (inp.includes("look")) {
        npc();
    }
}


tree();
/*




function checkObj(obj, checkProp) {
// Only change code below this line
if (obj.hasOwnProperty(checkProp)){
return obj[checkProp];
} else
return "Not Found";
// Only change code above this line
}
*/