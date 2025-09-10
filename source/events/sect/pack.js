const logger = require('../../librarys/logger');

module.exports = function (data) {
  const items = data.items;
  if(items === null || items === undefined) {
  return;
  } else {
  items.forEach(item => {
    if (item.name.includes('<hig>背包扩充石</hig>')) {
      const id = item.id;
      this.cmd.send(`use ${item.id}`);
      logger.warning(`「${this.userConfig.name}」背包已扩充`);
    }
  });
  }
};