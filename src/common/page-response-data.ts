export class PageResponseData<T> {
    
    readonly data: T;
    readonly count: number;

    constructor(data: any= [], count: number) {
        this.data = data;
        this.count = count;
    }

}