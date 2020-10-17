let bars = [];
let sections = [];

let debug_items = [];
let debug_functions = [];

let n = 1;

let canvSection = document.getElementById('canvas');

let animator = new AnimationHandler();
let animationSpeed = 20;

let move = (source, target) => {
  if (bars[source].disks.length == 0) return "Can't move!!!!";

  let disk = bars[source].pop();

  let direction = (disk.x - bars[target].x < 0 ? 'right' : 'left');

  animator.push(new DiskAnimation(
    disk,
    theDisk => {
      theDisk.move('down', animationSpeed, bars[target].x, disk.x);
      theDisk.render();
    },
    theDisk => {
      return theDisk.y < bars[target].freeY - disk.height / 2;
    },
    (theDisk, target) => {
      animator.pop();
      bars[target].pushDisk(disk);
    },
    target
  ));

  animator.push(new DiskAnimation(
    disk,
    theDisk => {
      theDisk.move(direction, animationSpeed, bars[target].x, disk.x);
      theDisk.render();
    },
    theDisk => {
      return Math.abs(theDisk.x - bars[target].x) >= animationSpeed;
    },
    (theDisk, target) => {
      animator.pop();
    },
    target
  ));

  animator.push(new DiskAnimation(
    disk,
    theDisk => {
      theDisk.move('up', animationSpeed, bars[target].x, disk.x);
      theDisk.render();
    },
    theDisk => {
      return theDisk.y > 30;
    },
    (theDisk, target) => {
      animator.pop();
    },
    target
  ));
}
// Animation End

function nextDisk() {
  let result = 15 + 7 * n;
  return result;
}

function mousePressed() {
  if (animator.state == 'busy') return
  sections.forEach((section) => {
    if (section.collision(mouseX, mouseY)) {
      if (bars[section.i].push(n, 'normal')) n++;
    }
  });
}

function setup() {
  let mycanvas = createCanvas(1200, 600);
  mycanvas.parent('canvas');

  sections.push(new Section(200, 300, 380, 580, 0));
  sections.push(new Section(600, 300, 380, 580, 1));
  sections.push(new Section(1000, 300, 380, 580, 2));

  bars.push(new Bar(200, 70, 0));
  bars.push(new Bar(600, 70, 1));
  bars.push(new Bar(1000, 70, 2));

  // bars[0].init([180, 200, 170, 160, 150])
  // bars[2].init([180, 140])
  // bars[2].push(120)

  rectMode(CENTER);
}

function draw() {
  background(200);
  sections.forEach((section) => section.render(mouseX, mouseY));
  bars.forEach((bar) => bar.render());
  animator.run()
  if (animator.state === 'done') {
    let event = new CustomEvent('animation-end');
    document.dispatchEvent(event);
  }
  debug_functions.forEach(fun => fun());
}
