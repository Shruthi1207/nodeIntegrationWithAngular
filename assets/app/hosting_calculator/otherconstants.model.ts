export class OtherConstants {
    name: string;
    value: number;    
    _id?: string;

    constructor(name: string,
        value: number,
        _id?: string) {
        this.name = name;
        this.value = value;        
        this._id = _id;
    }
}