function findNpcByName(items, name) {
  return items.find((item) => {
    return !item.p && item.name && (item.name === name || item.name.includes(name));
  });
}

module.exports = function (data) {
  if (!this.sect) {
    return;
  }

  switch (this.roomId) {
    case this.sect.taskerRoomId:
      if (this.sectTaskInfo.inTask) {
        const tasker = findNpcByName(data.items, this.sect.tasker);
        this.sectTaskInfo.taskerId = tasker ? tasker.id : null;
        this.cmd.send(tasker ? `task sm ${tasker.id}` : this.sect.taskerWay);
      }
      break;
    case this.sect.chiefRoomId:
      const chief = findNpcByName(data.items, this.sect.chiefTitle);
      if (chief) {
        this.cmd.send(`ask2 ${chief.id}`);
        this.nowTask = 'dungeon';
        this.attach(this.dungeonEvents);
        this.cmd.send('tasks');
      } else {
        this.cmd.send(this.sect.chiefWay);
      }
      break;
    case this.sectTaskInfo.sellerRoomId:
      const seller = findNpcByName(data.items, this.sectTaskInfo.seller);
      this.cmd.send(seller ? `list ${seller.id}` : this.sectTaskInfo.sellerWay);
      break;
    default:
      break;
  }
};
