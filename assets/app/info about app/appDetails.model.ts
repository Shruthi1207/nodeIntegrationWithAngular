export class AppDetailsQuestions {
    text: string;
    selected?: boolean;
    id?: string;
    formcontrol? : string;
    subtype?:string;
    controltype? : string;//
    parenttext?:string;
    mainParentText ?: string;
    commonkey?: string;

   
    constructor(text: string, id?: string,formcontrol? : string, subtype?:string,controltype? : string,parenttext? : string, selected?: boolean
       , mainParentText? :string,commonkey?: string
    ) {
        this.text = text;
        selected == null ? this.selected = false : this.selected = selected;
        this.id = id;
        this.formcontrol = formcontrol;
        this.subtype = subtype;
        this.controltype = controltype;
        this.parenttext = parenttext;
        this.mainParentText = mainParentText;
        this.commonkey = commonkey;
    }
}