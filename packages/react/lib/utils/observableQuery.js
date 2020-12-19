"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectHash = _interopRequireDefault(require("object-hash"));

var _zenObservable = _interopRequireDefault(require("zen-observable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
var ObservableQuery = /*#__PURE__*/function (_Observable) {
  _inherits(ObservableQuery, _Observable);

  var _super = _createSuper(ObservableQuery);

  /**
   *
   * @param {(variables: Object) => Promise<any>} fetch
   * @param {QueryOptions} opts
   */
  function ObservableQuery(fetch) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$variables = _ref.variables,
        variables = _ref$variables === void 0 ? {} : _ref$variables,
        _ref$data = _ref.data,
        data = _ref$data === void 0 ? undefined : _ref$data,
        _ref$loading = _ref.loading,
        loading = _ref$loading === void 0 ? false : _ref$loading,
        _ref$onComplete = _ref.onComplete,
        onComplete = _ref$onComplete === void 0 ? function () {} : _ref$onComplete;

    _classCallCheck(this, ObservableQuery);

    _this = _super.call(this, function (observer) {
      return _this._onSubscribe(observer);
    });
    /** @type {(variables: Object) => Promise<any>} */

    _this._fetch = fetch;
    /** @type {Record<string, any>} */

    _this._variables = variables;
    /** @type {Set<SubscriptionObserver>} */

    _this._observers = new Set();
    /** @type {QueryResult} */

    _this._lastResult = {
      loading: loading,
      error: undefined,
      data: data
    };
    _this._onComplete = onComplete;

    _this._updateQuery = function (_) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$fetchMoreResult = _ref2.fetchMoreResult,
          fetchMoreResult = _ref2$fetchMoreResult === void 0 ? null : _ref2$fetchMoreResult,
          _ref2$subscriptionDat = _ref2.subscriptionData,
          subscriptionData = _ref2$subscriptionDat === void 0 ? null : _ref2$subscriptionDat;

      return fetchMoreResult || subscriptionData;
    };

    _this._observer = {
      next: function next(result) {
        Promise.resolve(result.data).then(function (data) {
          return data === undefined ? result : _objectSpread(_objectSpread({}, result), {}, {
            data: data
          });
        }).then(function (result) {
          _this._lastResult = _objectSpread(_objectSpread({
            error: undefined
          }, _this._lastResult), result);

          var _iterator = _createForOfIteratorHelper(_this._observers),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var observer = _step.value;
              observer.next(_this._lastResult);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }, function (err) {
          _this._observer.error(err);
        });
      },
      error: function error(_error) {
        _this._lastResult = _objectSpread(_objectSpread({}, _this._lastResult), {}, {
          error: _this._lastError = _error,
          loading: false
        });

        var _iterator2 = _createForOfIteratorHelper(_this._observers),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var observer = _step2.value;
            observer.error(_error);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    };
    return _this;
  }
  /**
   * @returns {Promise<QueryResult>}
   */


  _createClass(ObservableQuery, [{
    key: "result",
    value: function result() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var subscription = _this2.subscribe({
          next: function next(result) {
            resolve(result);
            process.nextTick(function () {
              return subscription.unsubscribe();
            });
          },
          error: function error(err) {
            reject(err);
            process.nextTick(function () {
              return subscription.unsubscribe();
            });
          }
        });
      });
    }
  }, {
    key: "refetch",
    value: function refetch() {
      var _this3 = this;

      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$variables = _ref3.variables,
          variables = _ref3$variables === void 0 ? {} : _ref3$variables,
          _ref3$updateQuery = _ref3.updateQuery,
          updateQuery = _ref3$updateQuery === void 0 ? this._updateQuery : _ref3$updateQuery;

      this._variables = _objectSpread(_objectSpread({}, this._variables), variables);

      this._observer.next({
        loading: true
      });

      this._fetch(this._variables).then(function (fetchMoreResult) {
        var previousResult = _this3._lastResult.data;
        var updatedResult = updateQuery(previousResult, {
          fetchMoreResult: fetchMoreResult
        });

        _this3._observer.next({
          data: updatedResult,
          loading: false
        });

        _this3._onComplete(fetchMoreResult);
      }, function (error) {
        _this3._observer.error(error);
      });
    }
  }, {
    key: "fetchId",
    value: function fetchId() {
      return (0, _objectHash["default"])(this._variables);
    }
  }, {
    key: "startPolling",
    value: function startPolling() {
      var _this4 = this;

      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 15000;
      this.stopPolling();
      this._interval = setInterval(function () {
        _this4.refetch();
      }, interval);
    }
  }, {
    key: "stopPolling",
    value: function stopPolling() {
      clearInterval(this._interval);
    }
  }, {
    key: "fetchMore",
    value: function fetchMore(opts) {
      return this.refetch(opts);
    }
    /**
     * @returns {QueryResult}
     */

  }, {
    key: "getCurrentResult",
    value: function getCurrentResult() {
      var _lastResult = this._lastResult;
      return _lastResult;
    }
  }, {
    key: "clean",
    value: function clean() {
      this.resetLastResults();
    }
  }, {
    key: "resetLastResults",
    value: function resetLastResults() {
      this._lastResult = {
        data: undefined,
        error: undefined,
        loading: false
      };
      this._lastError = undefined;

      this._observer.next({
        data: undefined
      });
    }
  }, {
    key: "subscribeToMore",
    value: function subscribeToMore() {
      var _this5 = this;

      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$subscriber = _ref4.subscriber,
          subscriber = _ref4$subscriber === void 0 ? undefined : _ref4$subscriber,
          _ref4$variables = _ref4.variables,
          variables = _ref4$variables === void 0 ? {} : _ref4$variables,
          _ref4$updateQuery = _ref4.updateQuery,
          updateQuery = _ref4$updateQuery === void 0 ? this._updateQuery : _ref4$updateQuery;

      if (!subscriber) return;
      var unsubscribe = subscriber(_objectSpread(_objectSpread({}, this._variables), variables), function (subscriptionData) {
        var previousResult = _this5._lastResult.data;

        _this5._observer.next({
          loading: true
        });

        var updatedResult = updateQuery(previousResult, {
          subscriptionData: subscriptionData
        });

        _this5._observer.next({
          data: updatedResult,
          loading: false
        });
      });
      return {
        unsubscribe: unsubscribe
      };
    }
  }, {
    key: "setVariables",
    value: function setVariables(variables) {
      this._variables = _objectSpread(_objectSpread({}, this._variables), variables);
    }
  }, {
    key: "_onSubscribe",
    value: function _onSubscribe(observer) {
      var _this6 = this;

      if (observer === this._observer) {
        return function () {};
      }

      this._observers.add(observer); // Deliver most recent error or result.


      if (this._lastError) {
        observer.error && observer.error(this._lastError);
      } else if (this._lastResult) {
        observer.next && observer.next(this._lastResult);
      }

      return function () {
        _this6._observers["delete"](observer);
      };
    }
  }]);

  return ObservableQuery;
}(_zenObservable["default"]);

var _default = ObservableQuery;
exports["default"] = _default;