function randColor(max) {
    return Math.floor(Math.random() * max);
}
export function randomRGB(element, array) {
    if (!array) {
        element.style.backgroundColor = `rgb(${randColor(255)}, ${randColor(255)}, ${randColor(255)})`;
    } else array.forEach((el) => (el.style.color = `rgb(${randColor(255)}, ${randColor(255)}, ${randColor(255)})`));
}

// example:
// const hands = document.querySelectorAll('.hand'); is an 'array' of all clock hands
// const secondHand = document.querySelector('.secondHand'); is a single element
// randomRGB(secondHand) will change the color of the second hand, while randomRGB(null, hands) will change all of them
