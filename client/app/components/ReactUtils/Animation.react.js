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