export class AssessmentBarrier {
    assessmentId: string;
    selections: string;
    scores: any[];
    _id?: string;
    
    
    constructor(assessmentId: string, selections: string, scores: any[], _id?: string) {
        this.assessmentId = assessmentId;
        this.selections = selections;
        this.scores = scores;
        this._id = _id;
         
    }
}