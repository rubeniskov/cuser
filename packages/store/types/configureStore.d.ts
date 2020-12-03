export = configureStore;
/**
 * @typedef {Object} CuserConfigureStoreOptions
 * @prop {any} [preloadedState]
 * @prop {StoreEnhancer} [enhancer]
 */
/**
 * Creates a store wrapping the default cuser enhancers
 * @param {Reducer} rootReducer
 * @param {CuserConfigureStoreOptions} param1
 */
declare function configureStore(rootReducer: Reducer, { preloadedState, enhancer, ...restOpts }?: CuserConfigureStoreOptions): any;
declare namespace configureStore {
    export { Reducer, StoreEnhancer, CuserConfigureStoreOptions };
}
type Reducer = (state: any, action: import("redux").AnyAction) => any;
type CuserConfigureStoreOptions = {
    preloadedState?: any;
    enhancer?: StoreEnhancer;
};
type StoreEnhancer = (next: import("redux").StoreEnhancerStoreCreator<{}, {}>) => import("redux").StoreEnhancerStoreCreator<{}, {}>;
