import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';

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

function registerVelocityEvents() {
  Velocity.RegisterEffect('login.bounceIn', {
    defaultDuration: 1200,
    calls: [
        [ { opacity: [ 1, 0 ], scaleX: [ 1.03, 0.3 ], scaleY: [ 1.03, 0.3 ] }, 0.40 ],
        [ { scaleX: 0.95, scaleY: 0.92, translateZ: 0 }, 0.20 ],
        [ { scaleX: 1, scaleY: 1 }, 0.50 ]
    ]
  });
}

var EVENTS;

const AnimationEvents = {
  init() {
    EVENTS = whichEvents();
    registerVelocityEvents();
  }
};

export default AnimationEvents;