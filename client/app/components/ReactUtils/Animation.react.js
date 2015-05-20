function whichEvents(){
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    };
    var animations = {
      'animation':'animationend',
      'mozAnimation':'animationend',
      'webkitAnimation':'webkitAnimationEnd'
    };

    return {
      transitionEnd: _getEventType(transitions, el),
      animationEnd: _getEventType(animations, el)
    };
}

function _getEventType(events, el) {
  for(var t in events){
    if( el.style[t] !== undefined ){
      return events[t];
    }
  }
}

function _useEventType(type, el){
  return new Promise((resolve) => {
    el.addEventListener(EVENTS[type], () => {
      resolve(el);
    });
  });
}

var EVENTS;

let AnimationMixin = {
  init() {
    EVENTS = whichEvents();
  },
  onAnimationEnd(el) {
    return _useEventType('animationEnd', el);
  },
  onTransitionEnd(el) {
    return _useEventType('transitionEnd', el);
  }
};

export default AnimationMixin;