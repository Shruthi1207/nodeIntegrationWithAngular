export class MatrixScore {
    id: string;
    scores: any[]
   
    constructor(id: string, scores?: any[]) {
        this.id = id;
        this.scores = scores;
        
    }
}