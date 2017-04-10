/**
 * A minimal event emitter implemention in ES6, api is fairly to similar to
 * node api check node emitter documention for information.
 *
 * @example
 * ```
 * var emitter = new Emitter();
 * emitter.on('foo', () => {
 *   console.log('foo triggered');
 * });
 * emitter.emit('foo');
 * ```
 */

class Emitter {
  constructor() {
    this.events = {};
  }

  /**
   * Register an `event`.
   *
   * @param {String} eventName
   * @param {Function} fn
   * @return {Emitter}
   */

  on(eventName, fn) {
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);
    return this;
  }

  /**
   * Remove an `event`.
   *
   * @param {String} eventName
   * @param {Function} fn
   * @return {Emitter}
   */

  off(eventName, fn) {
    if (typeof eventName === 'undefined') {
      this.events = {};
    }

    if (typeof fn === 'undefined') {
      this.events[eventName] = [];
    }

    if (typeof fn === 'function') {
      let i;
      let events = this.events[eventName];

      for (i = 0; i < events.length; i += 1) {
        if (events[i] === fn) {
          events.splice(i, 1);
        }
      }
    }

    return this;
  }

  /**
   * Register an `event` which is fired only once and removed.
   *
   * @param {Strint} eventName
   * @param {Function} fn
   * @return {Emitter}
   */

  once(eventName, fn) {
    let self = this;
    let cb = (data) => {
      self.off(eventName, cb);
      fn.call(this, data);
    };

    this.on(eventName, cb);
    return this;
  }

  /**
   * Emit `event` with given arguments.
   *
   * @param {String} eventName
   * @param {Mixed} args
   * @return {Emitter}
   */

  emit(eventName, data) {
    var i;
    var events = this.events[eventName];

    if (typeof events === 'undefined') {
      return this;
    }

    for (i = 0; i < events.length; i += 1) {
      events[i].call(this, data);
    }

    return this;
  }

  /**
   * An alias to `emit`.
   *
   * @see `emit`
   */

  trigger(eventName, data) {
    return this.emit(eventName, data);
  }
}

export default Emitter;

