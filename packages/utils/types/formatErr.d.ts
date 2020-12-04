export = formatErr;
/**
 * Formats an error like sprintf
 * @param  {...any} args
 * @example
 * formatErr('messsage errro with argument %s', 'foo')
 * formatErr(TypeError, 'messsage errro with argument %s and custom Error constructor', 'foo')
 */
declare function formatErr(...args: any[]): Error;
