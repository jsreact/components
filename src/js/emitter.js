/*
var emitter = new Emitter();

emitter.on('foo', function() {
  console.log('foo triggered');
});

emitter.off('foo');
*/
class Emitter {
  constructor() {
    this.callbacks = {};
  }

  on(name, fn) {
    this.callbacks[name] = fn;
  }

  emit() {
    // eslint-disable-next-line no-console
    console.log(this.callbacks);
  }

  trigger() {
    // eslint-disable-next-line no-console
    console.log(this.callbacks);
  }
}

export default Emitter;

