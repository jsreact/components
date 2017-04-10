import Emitter from '../src/js/emitter';

describe('Emitter', () => {
  let emitter;
  let result;

  beforeEach(() => {
    emitter = new Emitter();
    result = [];
  });

  it(".on(eventName, fn)", () => {
    registerEvents();
    emitEvents();

    expect(result).toEqual([1, 2, 1, 2]);
  });

  it(".once(eventName, fn)", () => {
    emitter.once('foo', (n) => {
      result.push(n);
    });

    emitter.once('bar', (n) => {
      result.push(n);
    });

    emitEvents();

    expect(result).toEqual([1, 1]);
  });

  it(".off(eventName, fn)", () => {
    registerEvents();
    emitter.off('foo');
    emitEvents();

    expect(result).toEqual([1, 2]);
  });

  let registerEvents = () => {
    emitter.on('foo', (n) => {
      result.push(n);
    });

    emitter.on('bar', (n) => {
      result.push(n);
    });
  };

  let emitEvents = () => {
    emitter.emit('foo', 1);
    emitter.emit('foo', 2);
    emitter.emit('bar', 1);
    emitter.emit('bar', 2);
  };
});

