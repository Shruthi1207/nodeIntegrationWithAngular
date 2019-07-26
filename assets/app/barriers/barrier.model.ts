export class Barrier {
    text: string;
    grouping: string;
    id?: string;
    rank: number;
    selected?: boolean;
    hover?: string;
    
   
    constructor(text: string, grouping: string, id?: string, rank?: number, hover?: string, selected?: boolean ) {
        this.text = text;
        this.grouping = grouping;
        this.id = id;
        this.rank = rank;
        this.hover = hover;
        selected == null ? this.selected = false : this.selected = selected;
        
            
    }
}