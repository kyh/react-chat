import LoginAnimation from './LoginAnimations';

export function addAnimation(options = {el: null, className: '', delay: 0, beforeBegin: null }) {
  var {el, className, delay, beforeBegin} = options;
  return new Promise((resolve) => {
    setTimeout(() => {
      if (beforeBegin) beforeBegin(el, className);
      el.classList.add(className);
      onAnimationEnd(el).then(() => {
        el.classList.remove(className);
        resolve(el);
      });
    }, delay);
  });
}

export function addAnimations(arr = []) {
  arr.forEach(addAnimation);
}

export function onAnimationStart(el) {
  return _useEventType('animationStart', el);
}

export function onAnimationEnd(el) {
  return _useEventType('animationEnd', el);
}

export function onTransitionEnd(el) {
  return _useEventType('transitionEnd', el);
}

function whichEvents(){
    var el = document.createElement('fakeelement');
    const transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd',
    };
    const animations = {
      'animation':'animationend',
      'mozAnimation':'animationend',
      'webkitAnimation':'webkitAnimationEnd',
      'MSAnimation': 'MSAnimationEnd'
    };
    const animationsS = {
      'animation':'animationstart',
      'mozAnimation':'animationstart',
      'webkitAnimation':'webkitAnimationStart',
      'MSAnimation': 'MSAnimationStart'
    };

    return {
      transitionEnd: _getEventType(transitions, el),
      animationEnd: _getEventType(animations, el),
      animationStart: _getEventType(animationsS, el)
    };
}

function _getEventType(events, el) {
  for (let t in events){
    if (el.style[t] !== undefined){
      return events[t];
    }
  }
}

function _useEventType(type, el){
  return new Promise((resolve) => {
    let eventType = EVENTS[type];
    el.addEventListener(eventType, function callee() {
      el.removeEventListener(eventType, callee, false);
      resolve(el);
    }, false);
  });
}

var EVENTS;

const AnimationEvents = {
  init() {
    EVENTS = whichEvents();
    LoginAnimation.init();
  }
};

export default AnimationEvents;