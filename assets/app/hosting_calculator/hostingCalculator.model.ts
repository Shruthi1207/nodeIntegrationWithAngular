export class HostingCalculator {
    type: string;
    size: string;
    centos: string;
    RH: string;
    W: string;
    VM: string;
    _id?: string;
    
    constructor(type: string, size: string, centos: string, RH: string, W: string,VM:string, _id?: string) {
        this.type = type;
        this.size = size;
        this.centos = centos;
        this.RH = RH;
        this.W = W;
        this.VM = VM;
        this._id = _id;
    }
}