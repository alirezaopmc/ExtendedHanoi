const startBtn = document.getElementById('start');
const stepBtn = document.getElementById('step');
const stopBtn = document.getElementById('stop');

let solvedStrArr = '';
let currStep = 0;
let totalSteps = 0;
let diskArray = [];

startBtn.addEventListener('click', async (e) => {
  let hanoiString = ``;
  bars.forEach((bar, index) => {
    bar.disks.forEach((disk) =>
      diskArray.push({
        width: disk.width,
        barIndex: index,
      })
    );
  });

  diskArray.sort((a, b) => a.width - b.width);

  diskArray.forEach((disk, i) => {
    disk.width = i + 1;
    if (i == diskArray.length - 1) return (disk.isLastBar = false);

    disk.isLastBar = diskArray[i].barIndex !== diskArray[i + 1].barIndex;
  });

  diskArray.forEach((disk, i) => {
    hanoiString += `${disk.width}${disk.isLastBar ? '-' : ','}`;
  });
  hanoiString = hanoiString.slice(0, hanoiString.length - 1);
  console.log(hanoiString);

  const response = await fetch('http://localhost:3000', {
    method: 'POST',
    body: JSON.stringify({ hanoi: hanoiString }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    startBtn.setAttribute('disabled', true);
    let data = await response.text();
    let parsed = data.split(',');
    solvedStrArr = parsed;
    totalSteps = parsed.length;
    moveDisk(solvedStrArr[0].split('')[0], solvedStrArr[0].split('')[1]);
  } else {
    alert('http error');
  }
});

function moveDisk(from, to, callback) {
  move(from, to);
  solvedStrArr.shift();
}

document.addEventListener('animation-end', () => {
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
});
