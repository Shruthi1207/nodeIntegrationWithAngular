export class BbyPricingValues {
    type: String;
    size: String;
    centos: String;
    RH: String;
    W: String;
    VM: String;    
    _id?: string;
    
    constructor(type:String, size: String, centos: String, RH: String, W : String,VM : String,
         _id?: string) {
        this.type = type;
        this.size = size;
        this.centos = centos;
        this.RH = RH;
        this.W = W;
        this.VM = VM;
        
        this._id = _id;
    }
}