export = createStore;
/**
 * @typedef {Object} CuserStore
 * @prop {(action: AnyAction) => Promise<String>} dispatch
 * @prop {() => any} getState
 * @prop {(listener: () => void) => Function} subscribe
 * @prop {(nextReducer: Reducer) => void} replaceReducer
 */
/**
 * Creates a store wrapping the default cuser enhancers
 * @param {Reducer} rootReducer
 * @param {Function} enhancer
 * @returns {CuserStore}
 */ /**
* @param {Reducer} rootReducer
* @param {any} preloadedState
* @param {Function} enhancer
* @returns {CuserStore}
*/
declare function createStore(rootReducer: Reducer, preloadedState: any, enhancer: Function): CuserStore;
declare namespace createStore {
    export { GraphRoot, Reducer, Store, StoreCreator, AnyAction, CuserStore };
}
type Reducer = (state: any, action: import("redux").AnyAction) => any;
type CuserStore = {
    dispatch: (action: AnyAction) => Promise<string>;
    getState: () => any;
    subscribe: (listener: () => void) => Function;
    replaceReducer: (nextReducer: Reducer) => void;
};
type GraphRoot = import("@cuser/proto/graphs").GraphRoot;
type Store = import("redux").Store<any, import("redux").AnyAction>;
type StoreCreator = import("redux").StoreCreator;
type AnyAction = import("redux").AnyAction;
