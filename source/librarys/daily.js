const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Socket = require('./socket');
const gameInfo = yaml.load(fs.readFileSync(path.resolve(__dirname, '../utils/gameInfo.yaml')));


module.exports = class Daily extends Socket {
  constructor(config) {
    super(config);
    this.sect = null;
    this.userId = null;
    this.huntTaskerId = null;
    this.dungeonNum = 0;
    this.gameInfo = gameInfo;
    this.dungeon = 'cr yz/lw/shangu';
    this.sectTaskInfo = {
      taskerId: null,
      taskItem: null,
      seller: null,
    };
    this.nowTask = 'sect';
    this.sectEvents = [];
    this.dungeonEvents = [];
    this.huntEvents = [];
    this.xiangyangEvents = [];
    this.loadEvents();
  }

  loadEvents() {
    this.sectEvents = fs
      .readdirSync(path.resolve(__dirname, '../events/sect'))
      .filter((fileName) => fileName.endsWith('.js'))
      .map((fileName) => path.basename(fileName, '.js'));
    this.dungeonEvents = fs
      .readdirSync(path.resolve(__dirname, '../events/dungeon'))
      .filter((fileName) => fileName.endsWith('.js'))
      .map((fileName) => path.basename(fileName, '.js'));
    this.huntEvents = fs
      .readdirSync(path.resolve(__dirname, '../events/hunt'))
      .filter((fileName) => fileName.endsWith('.js'))
      .map((fileName) => path.basename(fileName, '.js'));
    this.xiangyangEvents = fs
      .readdirSync(path.resolve(__dirname, '../events/xiangyang'))
      .filter((fileName) => fileName.endsWith('.js'))
      .map((fileName) => path.basename(fileName, '.js'));
    this.attach(this.sectEvents);
  }

  attach(events) {
    const [onClose] = this.listeners('CLOSE');
    this.removeAllListeners();
    this.on('ERROR', require('../events/ERROR'));
    onClose && this.on('CLOSE', onClose);
    events.forEach((name) => {
      this.on(name, require(`../events/${this.nowTask}/${name}`));
    });
  }
};
