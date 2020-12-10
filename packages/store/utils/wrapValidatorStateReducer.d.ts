export = wrapValidatorStateReducer;
/**
 * Creates a state validator reducer
 * @param {ValidatorSchema} schema
 * @param {Reducer} reducer
 */
declare function wrapValidatorStateReducer(schema: ValidatorSchema, reducer?: Reducer): (state: any, action: AnyAction) => any;
declare namespace wrapValidatorStateReducer {
    export { AnyAction, Reducer, ValidatorSchema };
}
type ValidatorSchema = any;
type Reducer = (state: any, action: import("redux").AnyAction) => any;
type AnyAction = import("redux").AnyAction;
