const logger = require('../../librarys/logger');

module.exports = function (tip) {
  if (tip.includes('说：')) {
    return;
  }

  if (tip.includes('你去帮我找')) {
    this.sectTaskInfo.taskItem = tip.match(/<.+?>.+?<\/.+?>/)[0];
    const seller = this.gameInfo.store.find(({ goods }) =>
      goods.includes(this.sectTaskInfo.taskItem),
    );
    if (seller) {
      this.sectTaskInfo.seller = seller.seller;
      this.sectTaskInfo.sellerWay = seller.way;
      this.sectTaskInfo.sellerRoomId = seller.roomId;
      this.cmd.send(seller.way);
    } else {
      this.cmd.send(`task sm ${this.sectTaskInfo.taskerId}`);
    }
  }
  if (/师父让别人去找|你的师门任务完成了/.test(tip)) {
    this.cmd.send(`task sm ${this.sectTaskInfo.taskerId}`);
  }

  if (tip.includes('你拿不下那么多东西')) {
    logger.warning(`「${this.userConfig.name}」背包已满`);
    this.cmd.send('shop 2 1');
    this.cmd.send('pack');
    this.cmd.send(`task sm ${this.sectTaskInfo.taskerId}`);
  }

  if (tip.includes('你没有那么多的钱')) {
    logger.warning(`「${this.userConfig.name}」黄金不足`);
    this.cmd.send(`wakuang`);
    this.socketClose();
  }
  
  if (tip.includes('你没有那么多的元宝')) {
    logger.warning(`「${this.userConfig.name}」元宝不足`);
    this.cmd.send(`wakuang`);
    this.socketClose();
  }
  if (/你先去休息一下吧/.test(tip)) {
    this.sectTaskInfo.inTask = false;
    this.cmd.send(this.sect.chiefWay);
  }
};
