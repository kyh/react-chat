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
    let eventType = EVENTS[type];
    el.addEventListener(eventType, () => {
      el.removeEventListener(eventType);
      resolve(el);
    });
  });
}

var EVENTS;

let AnimationEvents = {
  init() {
    EVENTS = whichEvents();
  }
};

export function addAnimation(el, className) {
  return new Promise((resolve) => {
    el.classList.add(className);
    this.onAnimationEnd(el).then(() => {
      el.classList.remove(className);
      resolve(el);
    });
  });
}

export function onAnimationEnd(el) {
  return _useEventType('animationEnd', el);
}

export function onTransitionEnd(el) {
  return _useEventType('transitionEnd', el);
}

export default AnimationEvents;