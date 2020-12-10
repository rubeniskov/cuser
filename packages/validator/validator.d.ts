export = createValidator;
/**
 * Creates a validator which raise a ValidationError when the object doesn't fit the schema
 * @param {ValidatorSchema} schema
 */
declare function createValidator(schema: ValidatorSchema): (value: any, message?: string) => void;
declare namespace createValidator {
    export { ValidationError, ValidatorSchema };
}
type ValidatorSchema = any;
/**
 * @typedef {Object} ValidatorSchema
 */
/**
 * Validator error class with nested errors
 */
declare class ValidationError extends Error {
    /**
     *
     * @param {*} [message]
     * @param {import('ajv').ValidateFunction} [validator]
     * @param {any} [value]
     */
    constructor(message?: any, validator?: import('ajv').ValidateFunction, value?: any);
    errors: import("ajv").ErrorObject[];
    extendedInfo: string;
    value: any;
}
