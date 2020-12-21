// @ts-check
import objectHash from 'object-hash';
import Observable from 'zen-observable';

/** @typedef {ZenObservable.SubscriptionObserver} SubscriptionObserver */

/**
 * @typedef {Object} QueryResult
 * @prop {Boolean} loading
 * @prop {Error} error
 * @prop {any} data
 */

/**
 * @typedef {Object} QueryOptions
 * @prop {Object} [variables={}]
 * @prop {any} [data=undefined]
 * @prop {Boolean} [loading=false]
 * @prop {Function} [onComplete=()=>{}]
 */

class ObservableQuery extends Observable {
  /**
   *
   * @param {(variables: Object) => Promise<any>} fetch
   * @param {QueryOptions} opts
   */
  constructor(fetch, {
    variables = {},
    data = undefined,
    loading = false,
    onComplete = () => {},
  } = {}) {
    super((observer) => this._onSubscribe(observer));
    /** @type {(variables: Object) => Promise<any>} */
    this._fetch = fetch;
    /** @type {Record<string, any>} */
    this._variables = variables;
    /** @type {Set<SubscriptionObserver>} */
    this._observers = new Set();
    /** @type {QueryResult} */
    this._lastResult = {
      loading,
      error: undefined,
      data
    }

    this._onComplete = onComplete;
    this._updateQuery = (_, {
      fetchMoreResult = null,
      subscriptionData = null
    } = {}) => fetchMoreResult || subscriptionData

    this._observer = {
      next: (result) => {
        Promise.resolve(result.data)
          .then((data) => data === undefined ? result : ({ ...result, data }))
          .then((result) => {
            this._lastResult = {
              ...this._lastResult,
              ...result,
              error: undefined,
            }
            for (let observer of this._observers) {
              observer.next(this._lastResult);
            }
          }, (err) => {
            this._observer.error(err);
          });
      },
      error: (error) => {
        this._lastResult = {
          ...this._lastResult,
          error: this._lastError = error,
          loading: false,
        }
        for (let observer of this._observers) {
          observer.error(error);
        }
      }
    }
  }
  /**
   * @returns {Promise<QueryResult>}
   */
  result() {
    return new Promise((resolve, reject) => {
      const subscription = this.subscribe({
        next: (result) => {
          resolve(result);
          process.nextTick(() => subscription.unsubscribe());
        },
        error: (err) => {
          reject(err);
          process.nextTick(() => subscription.unsubscribe());
        },
      });
    });
  }

  refetch({
    variables = {},
    updateQuery = this._updateQuery
  } = {}) {
    this._variables = { ...this._variables, ...variables };
    this._observer.next({
      loading: true
    });
    return this._fetch(this._variables).then((fetchMoreResult) => {
      const previousResult = this._lastResult.data;
      const updatedResult = updateQuery(previousResult, { fetchMoreResult });
      this._observer.next({
        data: updatedResult,
        loading: false
      });
      this._onComplete(fetchMoreResult);
    }, (error) => {
      this._observer.error(error);
    });
  }

  fetchId() {
    return objectHash(this._variables);
  }

  startPolling(interval = 15000) {
    clearInterval(this._interval);
    const tick = () => {
      this.refetch().then(() => {
        if (this._interval) {
          this._interval = setTimeout(tick, interval)
        }
      });
    }

    this._interval = setTimeout(tick, interval);
  }

  stopPolling() {
    clearInterval(this._interval);
    this._interval = null;
  }

  fetchMore(opts) {
    return this.refetch(opts);
  }

  /**
   * @returns {QueryResult}
   */
  getCurrentResult() {
    const { _lastResult } = this;
    return _lastResult;
  }

  clean() {
    this.resetLastResults();
  }

  resetLastResults() {
    this._lastResult = {
      data: undefined,
      error: undefined,
      loading: false,
    };
    this._lastError = undefined;
    this._observer.next({
      data: undefined
    });
  }

  subscribeToMore({
    subscriber = undefined,
    variables = {},
    updateQuery = this._updateQuery
  } = {}) {
    if (!subscriber) return;
    const unsubscribe = subscriber({
      ...this._variables,
      ...variables
    }, (subscriptionData) => {
      const previousResult = this._lastResult.data;
      this._observer.next({
        loading: true,
      });
      const updatedResult = updateQuery(previousResult, { subscriptionData });
      this._observer.next({
        data: updatedResult,
        loading: false,
      });
    });

    return { unsubscribe };
  }

  setVariables(variables) {
    this._variables = { ...this._variables, ...variables };
  }

  _onSubscribe(observer) {
    if (observer === this._observer) {
      return () => {};
    }

    this._observers.add(observer);

    // // Deliver most recent error or result.
    // if (this._lastError) {
    //   observer.error && observer.error(this._lastError);
    // } else if (this._lastResult) {
    //   observer.next && observer.next(this._lastResult);
    // }

    return () => {
      this._observers.delete(observer);
    };
  }
}

export default ObservableQuery;
