let bars = []

function setup() {
    createCanvas(600, 400)
    bars.push(new Bar(100, 70))
    bars.push(new Bar(300, 70))
    bars.push(new Bar(500, 70))

    bars[0].init([180, 170, 160, 150])
    bars[2].init([180, 140])

    rectMode(CENTER)
}

function draw() {
    background(200)
    bars.forEach(bar => bar.render())
    
}