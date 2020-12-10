export = createStore;
/** @typedef {Store} CuserStore */
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
    export { Reducer, Store, StoreCreator, CuserStore };
}
type Reducer = (state: any, action: import("redux").AnyAction) => any;
type CuserStore = import("redux").Store<any, import("redux").AnyAction>;
type Store = import("redux").Store<any, import("redux").AnyAction>;
type StoreCreator = import("redux").StoreCreator;
