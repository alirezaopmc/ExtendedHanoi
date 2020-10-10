let bars = []
let sections = []
let scale = 10
let speed = 2

let n = 0.01

// Animation Start

// Todo animating bug dare 
// back o front ------------------------

function emptyAnimation() {
    return {
        state: 'stop',
        object: undefined,
        source: -1,
        target: -1,
        commands: []
    }
}

let animation = emptyAnimation()

// from to
function move(f, t) {
    if (bars[f].disks.length <= 0) {
        if (animation.state == 'animating') {}animation.state = 'done'
        return `Can't move`
    }
    
    let disk = bars[f].pop()
    let other = bars[t].disks.slice(-1)[0]

    let pointA = {
        x: disk.x,
        y: disk.y
    }

    let pointB = {
        x: other.x,
        y: other.y + other.height / 2 + disk.height / 2
    }

    animation.state = 'animating'
    animation.object = disk
    animation.source = f
    animation.target = t

    for (let i = 0; i < Math.abs(pointA.y - 45) / 2; i++) {
        animation.commands.push('up')
    }

    for (let i = 0; i < Math.abs(pointA.x - pointB.x) / 2; i++) {
        animation.commands.push(pointB.x - pointA.x > 0 ? 'right' : 'left')
    }

    for (let i = 0; i < Math.abs(pointB.y - 45) / 2; i++) {
        animation.commands.push('down')
    }

    // animation.commands.reverse()
}

function animate() {
    if (animation.state == 'animating') {
        if (animation.commands.length > 0) {
            animation.object.move(animation.commands.pop())
            animation.object.render()
        } else {
            animation.state = 'done'
        }
    } else if (animation.state == 'done') {
        bars[animation.target].disks.push(animation.object)
        animation = emptyAnimation()
    }
}
// Animation End

function nextDisk() {
    let result = 15 + 7 * n
    return result
}

function mousePressed() {
    sections.forEach(section => {
        if (section.collision(mouseX, mouseY)) {
            if (bars[section.i].push(nextDisk(), 'normal')) n++
        }
    })
}

function setup() {
    createCanvas(1200, 600)

    sections.push(new Section(200, 300, 380, 580, 0))
    sections.push(new Section(600, 300, 380, 580, 1))
    sections.push(new Section(1000, 300, 380, 580, 2))

    bars.push(new Bar(200, 70))
    bars.push(new Bar(600, 70))
    bars.push(new Bar(1000, 70))

    // bars[0].init([180, 200, 170, 160, 150])
    // bars[2].init([180, 140])
    // bars[2].push(120)

    rectMode(CENTER)
}

function draw() {
    background(200)
    sections.forEach(section => section.render(mouseX, mouseY))
    bars.forEach(bar => bar.render())
    animate()
    
}