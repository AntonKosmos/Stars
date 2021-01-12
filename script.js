const canvas       = document.getElementById('bigCanvas');
const smallCanvas  = document.getElementById('smallCanvas');
const ctx = canvas.getContext('2d');
const templateSize = +prompt("set template size(px)", '600');
ctx.canvas.width   = templateSize;
ctx.canvas.height  = templateSize;
const countStars   = +prompt("set count of stars(px)", '5');
// Star size - (width = height)
const starSize     = +prompt("set size of star (px)", '100');
const colorArray   = ['#F0350E', '#0E23F0', '#52F00E', '#E9F00E', '#000000'];
let   countStarsX  = null;

// location of the element (x,y) being relative to the document.
const getElementPosition = (obj) => {
    return {x: obj.offsetLeft, y: obj.offsetTop};
};

// location of the click relative to the given element (to increase accuracy).
const getEventLocation = (element, event) => {
    const pos = getElementPosition(element);
    return {
        x: (event.pageX - pos.x),
        y: (event.pageY - pos.y)
    };
};

canvas.onclick = function (e) {
    const eventLocation = getEventLocation(this, e);
    const context       = this.getContext('2d');
    const pixelData     = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;
    smallCanvas.style.backgroundColor = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3]})`;
};

const drawStar = (centerAxisX, centerAxisY, partStarX, partStarY, offsetX, offsetY, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerAxisX + offsetX   , 0.0 + offsetY);
    ctx.lineTo(partStarX * 6 + offsetX , partStarY * 3 + offsetY);
    ctx.lineTo(starSize + offsetX      , partStarY * 3 + offsetY);
    ctx.lineTo(partStarX * 7 + offsetX , partStarY * 5 + offsetY);
    ctx.lineTo(partStarX * 8 + offsetX , starSize + offsetY);
    ctx.lineTo(centerAxisX + offsetX   , partStarY * 6 + offsetY);
    ctx.lineTo(partStarX * 2 + offsetX , starSize + offsetY);
    ctx.lineTo(partStarX * 3 + offsetX , partStarY * 5 + offsetY);
    ctx.lineTo(0 + offsetX             , partStarY * 3 + offsetY);
    ctx.lineTo(partStarX * 4 + offsetX , partStarY * 3 + offsetY);
    ctx.lineTo(centerAxisX + offsetX   , 0.0 + offsetY);
    ctx.closePath();
    ctx.fill();
};

const generateStar = () => {
    // Find the center of star
    const centerAxisX = starSize / 2;
    const partStarX   = centerAxisX / 5;

    const centerAxisY = starSize / 2;
    const partStarY   = centerAxisX / 4;

    let offsetX = 0, offsetY = 0,  color;

    for (let i = 0, count = i; i < countStars; i++) {
        // If count of stars > 5
        // color =colorArray[Math.floor(Math.random() * colorArray.length)];
        color = colorArray[i];
        if (count < countStarsX) { // Draw horizontally
            drawStar(centerAxisX, centerAxisY, partStarX, partStarY, offsetX, offsetY, color)
            offsetX += starSize;
        } else { //  Draw on new row
            offsetY += starSize;
            offsetX = 0;
            count   = 0;
            drawStar(centerAxisX, centerAxisY, partStarX, partStarY, offsetX, offsetY, color);
            offsetX += starSize;
        }
        count += 1; // Counting of stars
    }
};

const getCountStarsX = (templateSize, countStars, starSize) => {
    // Counting the number of stars horizontally
    const permissibleCountStars = Math.floor(templateSize / starSize);
    if (Math.pow(permissibleCountStars, 2) < countStars) { // If the entered value is larger than the allowed
        alert("Incorrect data entered");
        return false;
    }
    return permissibleCountStars;
};

countStarsX = getCountStarsX(templateSize, countStars, starSize);

if (countStarsX) {
    generateStar();
}
