const { execSync } = require('child_process');

const solve = (hanoi) => {
  let command = `python /mnt/d/exhanoi.py '${hanoi}'`;
  let linuxCommand = `python3 ${__dirname}/extended-hanoi-solver.py '${hanoi}'`;

  // const result = '12,02,21,02';
  let result = execSync(linuxCommand).toString().replace('\n', ''); //'12,02,21,02';
  return result;
};

module.exports = solve;
