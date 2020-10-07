class Disk {
    constructor(radius) {
        this.x = 0
        this.y = 0
        this.width = radius
        this.height = radius * .1
    }

    render() {
        rect(this.x, this.y, this.width, this.height)
    }
}

class Bar {
    constructor(x, y) {
        this.disks = []
        this.x = x
        this.y = y
    }

    init(disks) {
        disks.sort().reverse();
        disks.forEach(radius => {
            this.disks.push(new Disk(radius))
        })

        let diff = 0
        for (let disk of this.disks) {
            let x = this.x
            let y = 450 - this.y - disk.height / 2 - diff
            disk.x = x
            disk.y = y
            diff += disk.height
        }
    }

    render() {
        line(this.x, this.y, this.x, 450 - this.y)
        this.disks.forEach(disk => disk.render())
    }
}