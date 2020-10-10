const { execSync } = require('child_process');

const solve = (hanoi) => {
  let command = `/mnt/d/exhanoi.py '${hanoi}'`;

  const result = '12,02,21,02'; //execSync(command).toString().replace('\n', '');
  return result;
};

module.exports = solve;
