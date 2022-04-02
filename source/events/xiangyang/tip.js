const logger = require('../../librarys/logger');

module.exports = function (tip) {
  if (tip.includes('说：')) {
    return;
  }

  if (tip.includes('再次进入襄阳城')) {
    this.cmd.send('jh fam 0 start;go south;go east;sell all;wakuang');
  }

  if (tip.includes('你挥着铁镐开始认真挖矿')) {
    this.socketClose();
    logger.success(`「${this.userConfig.name}」任务完成`);
  }
};
