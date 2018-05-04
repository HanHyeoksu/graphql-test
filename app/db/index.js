const EventEmitter = require('events');
const mongoose = require('mongoose');

class MongoDB extends EventEmitter {
  connect(uri) {
    mongoose.connect(uri);
    mongoose.connection.once('open', () => {
      this.emit('connected');
    });

    return this;
  }
}

module.exports = new MongoDB();