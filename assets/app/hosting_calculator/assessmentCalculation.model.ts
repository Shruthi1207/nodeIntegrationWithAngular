import { HostingResult } from "./hostingResult.model";

export class AssessmentCalculation {
    assessmentId: string;    
    servers: any[];
    _id?: string;
    results : HostingResult;
    hostingCostUpdated: Boolean;
    
    constructor(assessmentId: string,  servers: any[], hostingResult: HostingResult, hostingCostUpdated: Boolean, _id?: string ) {
        this.assessmentId = assessmentId;        
        this.servers = servers;
        this.results = hostingResult;
        this._id = _id;
        this.hostingCostUpdated = hostingCostUpdated;
    }
}