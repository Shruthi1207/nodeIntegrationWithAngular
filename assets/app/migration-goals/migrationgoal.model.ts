export class MigrationGoal {
    text: string;
    grouping: string;
    id?: string;
    rank: number;
    selected?: string;
    hover?: string;
   
    constructor(text: string, grouping: string, id?: string, rank?: number, hover?: string, selected?: string) {
        this.text = text;
        this.grouping = grouping;
        this.id = id;
        this.rank = rank;
        this.hover = hover;
        selected == null ? this.selected = "0" : this.selected = selected;
        
    }
}