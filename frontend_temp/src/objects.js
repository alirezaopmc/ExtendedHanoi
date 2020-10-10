class Disk {
  constructor(radius, barIndex) {
    this.x = 0;
    this.y = 0;
    this.width = radius * 7 + 15;
    this.height = 20;
    this.n = radius;
    this.barIndex = barIndex;
    this.R = random(255);
    this.G = random(80, 220);
    this.B = random(220, 250);
  }

  move(dir) {
    switch (dir) {
      case 'right':
        this.x += 2;
        break;
      case 'left':
        this.x -= 2;
        break;
      case 'up':
        this.y += 2;
        break;
      case 'down':
        this.y -= 2;
        break;
      default:
        break;
    }
  }

  render() {
    fill(this.R, this.G, this.B);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Bar {
  constructor(x, y, index) {
    this.disks = [];
    this.x = x;
    this.y = y;
    this.index = index;
  }

  init(disks) {
    // disks.sort().reverse();
    disks.forEach((radius) => {
      this.disks.push(new Disk(radius, this.index));
    });
    this.update();
  }

  update() {
    this.disks
      .sort(function (a, b) {
        return a.width - b.width;
      })
      .reverse();
    let diff = 0;
    this.disks.forEach((disk) => {
      let x = this.x;
      let y = 650 - this.y - disk.height / 2 - diff;
      disk.x = x;
      disk.y = y;
      diff += disk.height;
    });
  }

  push(radius, type) {
    if (type == 'force') {
      let disk = new Disk(radius, this.index);
      this.disks.push(disk);
      return true;
    } else {
      if (this.disks.length <= 13) {
        let disk = new Disk(radius, this.index);
        this.disks.push(disk);
        return true;
      }
      return true;
    }
  }

  pop() {
    return this.disks.pop();
  }

  render() {
    line(this.x, this.y, this.x, 650 - this.y);
    this.update();
    this.disks.forEach((disk) => disk.render());
  }
}

class Section {
  constructor(x, y, width, height, i) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.i = i;
    this.color = 255;
  }

  swapColor(x, y) {
    if (this.collision(x, y)) {
      this.color = 200;
    } else {
      this.color = 255;
    }
  }

  render(x, y) {
    push();
    this.swapColor(x, y);
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  collision(x, y) {
    return (
      this.x - this.width / 2 < x &&
      x < this.x + this.width / 2 &&
      this.y - this.height / 2 < y &&
      y < this.y + this.height / 2
    );
  }
}
