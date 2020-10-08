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
        // disks.sort().reverse();
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

    push(radius) {
        let top = this.disks.slice(-1)[0]
        let disk = new Disk(radius)
        disk.x = top.x
        disk.y = top.y - top.height / 2 - disk.height / 2
        this.disks.push(disk)
    }

    render() {
        line(this.x, this.y, this.x, 450 - this.y)
        this.disks.forEach(disk => disk.render())
    }
}