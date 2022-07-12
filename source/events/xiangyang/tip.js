const logger = require('../../librarys/logger');

module.exports = function (tip) {
  if (tip.includes('说：')) {
    return;
  }
  if (tip.includes('每日签到')) {
    const money = tip.match(/每日签到：(\d+)\/(\d+)/);
    if (money && money[1] / money[2] > 0.9) {
      this.cmd.send(`shop 9 1;shop 0 ${money[2] / 10}`);
    }
    this.cmd.send('jh fam 0 start;go south;go east;sell all;wakuang');
  }

  if (tip.includes('再次进入襄阳城') || tip.includes('你还是不要去添乱了')) {
    this.cmd.send(`transmoney`);
  }

  if (tip.includes('你挥着铁镐开始认真挖矿')) {
    this.socketClose();
    logger.success(`「${this.userConfig.name}」任务完成`);
  }
};
