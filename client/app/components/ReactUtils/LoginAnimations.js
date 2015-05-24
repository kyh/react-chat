import Velocity from 'velocity-animate';

function registerVelocityEvents() {
  Velocity.RegisterEffect('login.bounceIn', {
    defaultDuration: 1200,
    calls: [
      [ { opacity: [ 1, 0 ], scaleX: [ 1.03, 0.3 ], scaleY: [ 1.03, 0.3 ] }, 0.40 ],
      [ { scaleX: 0.95, scaleY: 0.92, translateZ: 0 }, 0.20 ],
      [ { scaleX: 1, scaleY: 1 }, 0.50 ]
    ]
  });

  Velocity.RegisterEffect('login.slidePageLeft', {
    defaultDuration: 800,
    calls: [
      [ { width: ['220px', [200, 15]] } ]
    ]
  });
}

const LoginAnimation = {
  init() {
    registerVelocityEvents();
  }
};

export default LoginAnimation;