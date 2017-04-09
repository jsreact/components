/* eslint-disable */
function EventHandler() {
  this.handlers = [];
}

EventHandler.prototype.on = function (event, handler) {
  this.handlers.push({
    event: event,
    handler: handler
  });
  event.subscribe(handler);

  return this;
};

EventHandler.prototype.off = function (event, handler) {
  var i = this.handlers.length;
  while (i--) {
    if (this.handlers[i].event === event &&
      this.handlers[i].handler === handler) {
      this.handlers.splice(i, 1);
      event.off(handler);
      return;
    }
  }

  return this;
};

EventHandler.prototype.offAll = function () {
  var i = this.handlers.length;
  while (i--) {
    this.handlers[i].event.off(this.handlers[i].handler);
  }
  this.handlers = [];

  return this;
};

export default EventHandler;

