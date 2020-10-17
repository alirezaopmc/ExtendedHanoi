class Disk {
  constructor(radius, barIndex) {
    this.x = 0;
    this.y = 0;
    this.width = radius * 7 + 15;
    this.height = 20;
    this.n = radius;
    this.barIndex = barIndex;
    this.color = 255 * (1 - this.n % 2);
  }

  move(dir, speed, targetX, diskX) {
    switch (dir) {
      case 'right':
        this.x += min(speed, Math.abs(targetX - diskX));
        break;
      case 'left':
        this.x -= min(speed, Math.abs(targetX - diskX));
        break;
      case 'up':
        this.y -= speed;
        break;
      case 'down':
        this.y += speed;
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
    this.freeY = 0;
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

    this.freeY = 650 - this.y - diff;
  }

  pushDisk(disk) {
    this.disks.push(disk);
    this.update();
  }

  push(radius, type) {
    if (type == 'force') {
      let disk = new Disk(radius, this.index);
      this.disks.push(disk);
      this.update();
      return true;
    } else {
      if (this.disks.length <= 13) {
        let disk = new Disk(radius, this.index);
        this.disks.push(disk);
        this.update();
        return true;
      }
      this.update();
      return true;
    }
  }

  pop() {
    return this.disks.pop();
    this.update();
  }

  render() {
    line(this.x, this.y, this.x, 650 - this.y);
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

class DiskAnimation {
  constructor(disk, action, condition, end, target) {
    this.disk = disk;
    this.action = action;
    this.condition = condition;
    this.end = end;
    this.target = target
  }

  run() {
    if (this.condition(this.disk)) {
      this.action(this.disk);
    } else {
      this.end(this.disk, this.target);
    }
  }
}

class AnimationHandler {
  constructor() {
    this.state = 'free';
    this.isStep = false;
    this.animations = [];
  }

  push(animation) {
    this.state = 'busy';
    this.animations.push(animation);
  }

  pop() {
    return this.animations.pop();
  }

  run() {
    if (this.animations.length === 0) {
      if (this.state == 'busy') {
        this.state = 'done';
      } else {
        this.state = 'free';
      }
    } else {
      this.state = 'busy';
      this.animations.slice(-1)[0].run();
    }

  }
}