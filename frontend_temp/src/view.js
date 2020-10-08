let bars = []
let sections = []
let scale = 1

let n = 0

// Animation Start
let animation
function animate() {

}

function move(f, t) {

}
// Animation End

function scaled (x) {
    return x * scale;
}

function mousePressed() {
    // sections.forEach(section => {
    //     section.collision(mouseX, mouseY)
    // })
}

function setup() {
    createCanvas(900, 600)

    sections.push(new Section(150, 300, 280, 580))
    sections.push(new Section(450, 300, 280, 580))
    sections.push(new Section(750, 300, 280, 580))

    bars.push(new Bar(150, 70))
    bars.push(new Bar(450, 70))
    bars.push(new Bar(750, 70))

    bars[0].init([180, 170, 160, 150])
    bars[2].init([180, 140])
    bars[2].push(120)

    rectMode(CENTER)
}

function draw() {
    background(200)
    sections.forEach(section => section.render(mouseX, mouseY))
    bars.forEach(bar => bar.render())

    
}