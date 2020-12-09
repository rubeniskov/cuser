export = wrapReducerAction;
/**
 * Creates a state validator reducer
 * @param {ValidatorSchema} schema
 * @param {Reducer} reducer
 */
declare function wrapReducerAction(schema: ValidatorSchema, reducer?: Reducer): (state: any, action: AnyAction) => any;
declare namespace wrapReducerAction {
    export { AnyAction, Reducer, ValidatorSchema };
}
type ValidatorSchema = any;
type Reducer = (state: any, action: import("redux").AnyAction) => any;
type AnyAction = import("redux").AnyAction;
