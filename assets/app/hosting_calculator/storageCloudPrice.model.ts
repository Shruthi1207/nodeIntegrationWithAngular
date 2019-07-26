export class storageCloudPrice {
    storagetype: string;
    tierindex: number;
    tier: string;
    cost: string;
    _id?: string;

    constructor(storagetype: string,
        tierindex: number,
        tier: string,
        cost: string,_id?: string) {
        this.storagetype = storagetype;
        this.tierindex = tierindex;
        this.tier = tier;
        this.cost = cost;
        this._id = _id;
    }
}