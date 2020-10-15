let bars = [];
let sections = [];
let scale = 10;
let fr = 30;

let debug_items = [];
let debug_functions = [];

// let indexOfSpeed = 2
// let speeds = [1, 2, 5, 10]
// let speed = 5

// function changeSpeed(type) {
//   if (type == 'increase') {
//     if (indexOfSpeed + 1 < speeds.length) {
//       indexOfSpeed += 1
//     }
//   }

//   if (type == 'decrease') {
//     if (indexOfSpeed - 1 >= 0) {
//       indexOfSpeed -= 1
//     }
//   }

//   speed = speeds[indexOfSpeed]
// }

let n = 1;

let canvSection = document.getElementById('canvas');

// Animation Start

// let animation = {
//     state: 'stop',
//     isStep: false,
//     object: undefined,
//     source: -1,
//     target: -1,
//     commands: [],
// };


// // from to
// function move(f, t) {
//   if (bars[f].disks.length <= 0) {
//     // if (animation.state == 'animating') {
//     //   animation.state = 'done';
//     // }
//     return `Can't move`;
//   }

//   let disk = bars[f].pop();

  
//   let pointA = {
//     x: disk.x,
//     y: disk.y,
//   };
  
  
//   let other = {};
//   if (bars[t].disks.length <= 0) {
//     other.x = bars[t].x
//     other.y = 650 - bars[t].y
//     other.height = 0
//   } else {
//     other = bars[t].disks.slice(-1)[0];
//   }
  
//   let pointB = {
//     x: other.x,
//     y: other.y - other.height / 2 - disk.height / 2,
//   };

//   animation.state = 'animating';
//   animation.object = disk;
//   animation.source = f;
//   animation.target = t;

//   for (let i = 0; i < Math.abs(pointA.y - 30) / speed; i++) {
//     animation.commands.push('up');
//   }

//   for (let i = 0; i < Math.abs(pointA.x - pointB.x) / speed; i++) {
//     animation.commands.push(pointB.x - pointA.x > 0 ? 'right' : 'left');
//   }

//   for (let i = 0; i < Math.abs(pointB.y - 30) / speed; i++) {
//     animation.commands.push('down');
//   }

//   // animation.commands.reverse()
// }

// function animate() {
//   if (animation.state == 'animating') {
//     if (animation.commands.length > 0) {
//       animation.object.move(animation.commands.pop(), speed);
//       animation.object.render();
//     } else {
//       animation.state = 'done';
//       animation.object.render();
//     }
//   } else if (animation.state == 'done') {
//     bars[animation.target].disks.push(animation.object);
//     animation.state = 'stop';
//   }
// }

let animator = new AnimationHandler();
let animationSpeed = 3;

let move = (source, target) => {
  if (bars[source].disks.length == 0) return "Can't move!!!!";

  let disk = bars[source].pop();

  let direction = (disk.x - bars[target].x < 0 ? 'right' : 'left');

  animator.push(new DiskAnimation(
    disk,
    theDisk => {
      theDisk.move('down', animationSpeed);
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
      theDisk.move(direction, animationSpeed);
      theDisk.render();
    },
    theDisk => {
      return Math.abs(theDisk.x - bars[target].x) > animationSpeed;
    },
    (theDisk, target) => {
      animator.pop();
    },
    target
  ));

  animator.push(new DiskAnimation(
    disk,
    theDisk => {
      theDisk.move('up', animationSpeed);
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
  frameRate(fr)
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
