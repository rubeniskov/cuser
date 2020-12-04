export function md5(data: any): string;
export function mapMessage(id: any, parent?: any): {
    id: any;
    parent: any;
    message: {
        content: string;
    };
};
export function getMesageEntryFromCache(cache: any, id: any): [string, any];
export function genArrayMessages(cache: any, offset?: number, limit?: number): any[];
export function genObjectMessages(length: any, { hash, parent }?: {
    hash?: (data: any) => string;
    parent?: any;
}): any;
