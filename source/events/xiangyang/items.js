module.exports = function (data) {
  for (const item of data.items) {
    if (item.p || !item.name) {
      continue;
    }

    if (item.name === this.gameInfo.xiangyang.npc) {
      this.cmd.send(`reward2 ${item.id}`);
      this.cmd.send('jh fam 0 start;go south;go east;sell all;wakuang');
      return;
    }
  }
};
