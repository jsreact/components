/**
 * An event object for passing data to event handlers and letting them control propagation.
 * <p>This is pretty much identical to how W3C and jQuery implement events.</p>
 * @class EventData
 * @constructor
 */
function EventData() {
  this.isPropagationStopped = false;
  this.isImmediatePropagationStopped = false;
}

/**
 * Stops event from propagating up the DOM tree.
 * @method stopPropagation
 */
EventData.prototype.stopPropagation = function () {
  this.isPropagationStopped = true;
};

/**
 * Returns whether stopPropagation was called on EventData.prototype.event object.
 * @method isPropagationStopped
 * @return {Boolean}
 */
EventData.prototype.isPropagationStopped = function () {
  return this.isPropagationStopped;
};

/**
 * Prevents the rest of the handlers from being executed.
 * @method stopImmediatePropagation
 */
EventData.prototype.stopImmediatePropagation = function () {
  this.isImmediatePropagationStopped = true;
};

/**
 * Returns whether stopImmediatePropagation was called on EventData.prototype.event object.\
 * @method isImmediatePropagationStopped
 * @return {Boolean}
 */
EventData.prototype.isImmediatePropagationStopped = function () {
  return this.isImmediatePropagationStopped;
};

export default EventData;

