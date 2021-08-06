import Vector from "./vector.js";

const line = new Vector(50, 0);

// Setup Canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;


// Setup Angle Slider and Label
const angleSlider = document.getElementById('angleSlider');
const angleLabel = document.getElementById('angleLabel')

angleSlider.addEventListener('input', ()=>{
    angleLabel.innerText = angleSlider.value + 'deg';
    line.rotate = angleSlider.value;
});


let start = new Vector(300,300);

const drawline = ()=>{

    // draw background color
    context.fillStyle = "#568cb3";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Origin
    context.beginPath();
    context.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    context.stroke();
    context.fillStyle = '#ff0000';
    context.fill();

    // Draw First Point
    context.fillStyle = "#ffffff";
    context.beginPath();
    context.moveTo(start.x, start.y);

    // Convert Degrees to Radians
    // using -radians to invert rotation
    let radians = -line.rotate * (Math.PI / 180);

    // Get x2 & y2 (A) location
    let x2 = start.x + Math.cos(radians) * line.x - Math.sin(radians) * line.y;
    let y2 = start.y + Math.sin(radians) * line.x + Math.cos(radians) * line.y;

    // Draw from Origin to A
    context.lineTo(x2, y2);

    //Draw from A to B
    let bX = start.x + Math.cos(radians) * -line.height / 2 - Math.sin(radians) * -line.width / 2
    let bY = start.y + Math.sin(radians) * -line.height / 2 + Math.cos(radians) * -line.width / 2
    context.lineTo(bX , bY);

    // // Draw from B to Origin
    context.lineTo(start.x, start.y)


    // // Draw from Origin to C
    let cX = start.x + -Math.cos(radians) * line.height / 2 - Math.sin(radians) * line.width / 2
    let cY = start.y + -Math.sin(radians) * line.height / 2 + Math.cos(radians) * line.width / 2
    context.lineTo(cX, cY)


    //Close shape (C to A)
    context.lineTo(x2, y2)
    context.stroke();

    requestAnimationFrame(drawline)
}

drawline();



