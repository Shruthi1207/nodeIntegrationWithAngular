export class networkPrice {
    networktype: string;
    index: number;
    networkRange: string;
    cost: string;
    _id?: string;

    constructor(networktype: string,
        index: number,
        networkRange: string,
        cost: string,_id?: string) {
        this.networktype = networktype;
        this.index = index;
        this.networkRange = networkRange;
        this.cost = cost;
        this._id = _id;
    }
}