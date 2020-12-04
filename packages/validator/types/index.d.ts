export = createValidator;
/**
 * Creates a validator which raise a ValidatonError when the object doesn't fit the schema
 */
declare function createValidator(schema: any): (obj: any) => void;
declare namespace createValidator {
    export { ValidationError };
}
/**
 * Validator error class with nested errors
 */
declare class ValidationError extends Error {
    /**
     *
     * @param {*} [message]
     * @param {import('ajv').ValidateFunction} [validator]
     */
    constructor(message?: any, validator?: import('ajv').ValidateFunction);
    errors: import("ajv").ErrorObject[];
    extendedInfo: string;
}
