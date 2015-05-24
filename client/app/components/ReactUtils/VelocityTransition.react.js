import React from 'react/addons';
import Velocity from 'velocity-animate';

var ReactTransitionGroup = React.addons.TransitionGroup;
 
var transitions = {
  // Forcefeeding: property order = [after, before]
  slideup: {
    duration: 250,
    enter: 'transition.slideUpIn',
    leave: 'transition.slideUpOut'
  },
  default: {
    duration: 200,
    enter: {
      opacity: [ 1, 0 ],
    },
    leave: {
      opacity: [ 0, 1 ],
    }
  }
};
 
var VelocityTransitionGroupChild = React.createClass({
  propTypes: {
    transitionName: React.PropTypes.string.isRequired,
  },
  _getTransition: function() {
    if (!transitions[this.props.transitionName]) {
      console.warn('TransitionName ' + this.props.transitionName + ' wasn\'t found in VelocityTransitionGroupChild transitions.');
    }
    return transitions[this.props.transitionName] || transitions.default;
  },
 
  componentWillEnter: function(done) {
    var node = this.getDOMNode();
    var transition = this._getTransition();
    Velocity(node, transition.enter, {
      duration: transition.duration,
      complete: done
    });
  },
 
  componentWillLeave: function(done) {
    var node = this.getDOMNode();
    var transition = this._getTransition();
      Velocity(node, transition.leave, {
        duration: transition.duration,
        complete: done
      });
  },
 
  render: function() {
    return React.Children.only(this.props.children);
  }
});
 
var VelocityTransitionGroup = React.createClass({
  propTypes: {
    transitionName: React.PropTypes.string.isRequired,
  },
 
  _wrapChild: function(child) {
    return (
      <VelocityTransitionGroupChild
          transitionName={this.props.transitionName}
          >
          {child}
      </VelocityTransitionGroupChild>
    );
  },
 
  render: function() {
    return (
      <ReactTransitionGroup
        {...this.props}
        childFactory={this._wrapChild}
        />
    );
  }
});
 
export default VelocityTransitionGroup;