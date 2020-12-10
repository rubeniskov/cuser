export = formatErr;
/**
 * Formats an error like sprintf
 * @param  {...any} args
 * @example
 * ```javascript
 * formatErr('messsage error with argument %s', 'foo')
 * formatErr(TypeError, 'messsage error with argument %s and custom Error constructor', 'foo')
 * ```
 */
declare function formatErr(...args: any[]): Error;
