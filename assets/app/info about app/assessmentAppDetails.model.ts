export class AssessmentAppDetails {
    assessmentId: string;
    selections: string;
    _id?: string;
    
    constructor(assessmentId: string, selections: string, _id?: string) {
        this.assessmentId = assessmentId;
        this.selections = selections;
        this._id = _id;
    }
}