import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {
  dispatchAsync(promise, types, action = {}) {
    const { request, success, failure } = types;

    this.dispatch(request, action);
    promise.then(
      response => this.dispatch(success, { action, response }),
      error => this.dispatch(failure, { action, error })
    );
  }

  dispatch(action = {}) {
    if (!action.type) {
      throw new Error('You forgot to specify type.');
    }

    if (process.env.NODE_ENV !== 'production') {
      if (action.error) {
        console.error(action);
      } else {
        console.log(action);
      }
    }

    super.dispatch(action);
  }
}

export default new AppDispatcher();