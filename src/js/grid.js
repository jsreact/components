import Emitter from './emitter';

class Grid extends Emitter {
  constructor(options) {
    super();

    this.el = options.el;
    if (typeof this.el === 'undefined') {
      throw new Error('Grid container must be valid dom element.');
    }

    this.columns = options.columns;
    this.dataProvider = options.dataProvider;
  }

  render() {
    // eslint-disable-next-line no-console
    console.log(this.el);
  }
}

export default Grid;

