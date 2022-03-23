const logger = require('../../librarys/logger');

module.exports = function (data) {
  const signinTask = data.items.find((item) => item.id === 'signin');
  if (signinTask.desc.includes('200/200')) {
    this.cmd.send(
      `taskover signin;taskover zz1;taskover zz2;jh fam 0 start;go south;go east;sell all`,
    );
    this.nowTask = 'hunt';
    this.attach(this.huntEvents);
    this.cmd.send(this.gameInfo.hunt.way);
  } else {
    this.cmd.send(this.dungeon);
  }
};
