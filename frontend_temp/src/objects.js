class Disk {
    constructor(radius) {
        radius = scaled(radius)
        this.x = 0
        this.y = 0
        this.width = radius
        this.height = radius * .1

        this.R = random(255)
        this.G = random(80, 220)
        this.B = random(220, 250)
    }
}

class Bar {
    constructor(x, y) {
        this.disks = []
        this.x = x
        this.y = y
    }

    init(disks) {
        // disks.sort().reverse();
        disks.forEach(radius => {
            this.disks.push(new Disk(radius))
        })
        this.update()
    }

    update() {
        this.disks.sort(function(a, b) {
            return a.radius - b.radius
        })
        let diff = 0
        this.disks.forEach(disk => {
            let x = this.x
            let y = 650 - this.y - disk.height / 2 - diff
            disk.x = x
            disk.y = y
            diff += disk.height
        })
    }

    push(radius) {
        let top = this.disks.slice(-1)[0]
        let disk = new Disk(radius)
        this.disks.push(disk)
        this.update()
    }

    pop() {
        this.disks.pop()
    }

    render() {
        line(this.x, this.y, this.x, 650 - this.y)
        this.disks.forEach(disk => {
            rect(disk.x, disk.y, disk.width, disk.height)
        })
    }
}

class Section {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = 255;
    }

    swapColor(x, y) {
        if (this.collision(x, y)) {
            this.color = 200
        } else {
            this.color = 255
        }
    }

    render(x, y) {
        push()
        this.swapColor(x, y)
        fill(this.color)
        rect(this.x, this.y, this.width, this.height)
        pop()
    }

    collision(x, y) {
        return (this.x - this.width/2 < x && x < this.x + this.width/2
            && this.y - this.height/2 < y && y < this.y + this.height/2) 
    }

}