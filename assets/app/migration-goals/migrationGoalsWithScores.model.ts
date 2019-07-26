export class MigrationGoalsWithScores {
    text: string;
    grouping: string;
    id?: string;
    rank: number;
    selected?: boolean;
    hover?: string;
    scores?:any[];
    
   
    constructor(text: string, grouping: string,  rank?: number, hover?: string, scores?:any[],id?: string, selected?: boolean ) {
        this.text = text;
        this.grouping = grouping;
        this.id = id;
        this.rank = rank;
        this.hover = hover;
        selected == null ? this.selected = false : this.selected = selected;
        this.scores = scores;
            
    }
}