export class BbyPricing {
    entries: string;
    _id?: string;
    
    constructor(entries: string, _id?: string) {
        this.entries = entries;
        this._id = _id;
    }
}