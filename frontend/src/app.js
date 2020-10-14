const startBtn = document.getElementById('start');
const stepBtn = document.getElementById('step');
const resetBtn = document.getElementById('reset');
const speedInput = document.getElementById('speed');

let solvedStrArr = '';
let currStep = 0;
let totalSteps = 0;
let diskArray = [];
let isSolved = false;

startBtn.addEventListener('click', async (e) => {
  if (!isSolved) {
    await makeRequest();
    stepBtn.setAttribute('disabled', true);
    startBtn.setAttribute('disabled', true);
    return moveDisk(solvedStrArr[0].split('')[0], solvedStrArr[0].split('')[1]);
  }
  startBtn.setAttribute('disabled', true);
  return moveDisk(solvedStrArr[0].split('')[0], solvedStrArr[0].split('')[1]);
});

async function makeRequest() {
  let hanoiString = ``;
  bars.forEach((bar) => {
    bar.disks.forEach((disk) =>
      diskArray.push({
        width: disk.n,
        barIndex: disk.barIndex,
      })
    );
  });

  diskArray.forEach((disk, i) => {
    if (i == diskArray.length - 1) return (disk.isLastBar = false);

    disk.isLastBar = diskArray[i].barIndex !== diskArray[i + 1].barIndex;
  });

  diskArray.forEach((disk) => {
    hanoiString += `${disk.width}${disk.isLastBar ? '-' : ','}`;
  });
  hanoiString = hanoiString.slice(0, hanoiString.length - 1);

  const response = await fetch('http://localhost:3000', {
    method: 'POST',
    body: JSON.stringify({ hanoi: hanoiString }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    let data = await response.text();
    let parsed = data.split(',');
    solvedStrArr = parsed;
    totalSteps = parsed.length;
    isSolved = true;
  } else {
    alert('http error');
  }
}

function moveDisk(from, to, callback) {
  move(from, to, parseValue(speedInput.value));
  solvedStrArr.shift();
}

function parseValue(value) {
  switch (value) {
    case 1:
      return 1;
      break;
    case 2:
      return 2;
      break;
    case 3:
      return 3;
      break;
    case 4:
      return 5;
      break;
    case 5:
      return 5;
      break;
    default:
      return 10;
      break;
  }
}

document.addEventListener('animation-end', () => {
  if (animation.isStep) {
    stepBtn.removeAttribute('disabled');
    return console.log('enable');
  }
  if (solvedStrArr.length) {
    setTimeout(() => {
      console.log(solvedStrArr);
      currStep++;
      console.log(currStep);
      if (currStep < totalSteps) {
        moveDisk(solvedStrArr[0].split('')[0], solvedStrArr[0].split('')[1]);
      } else {
        console.log('solved');
      }
    }, 100);
  } else {
    startBtn.setAttribute('disabled', true);
    stepBtn.setAttribute('disabled', true);
  }
});

document.addEventListener('animation-end-step', () => {});

resetBtn.addEventListener('click', () => {
  location.reload();
});

stepBtn.addEventListener('click', async () => {
  if (!isSolved) {
    await makeRequest();
    moveDisk(solvedStrArr[0].split('')[0], solvedStrArr[0].split('')[1]);
    console.log('disable');
    stepBtn.setAttribute('disabled', true);
    return (animation.isStep = true);
  }
  if (solvedStrArr.length) {
    moveDisk(solvedStrArr[0].split('')[0], solvedStrArr[0].split('')[1]);
    console.log('disable');
    stepBtn.setAttribute('disabled', true);
    return (animation.isStep = true);
  }
  console.log('disable');
  startBtn.setAttribute('disabled', true);
  return stepBtn.setAttribute('disabled', true);
});
