export class Assessment {
    appName: string;   
    appId: string;    
    pcm: string;
    title: string;
    vp: string;    
    id?: string;
    matrixSelectionsLocked?: boolean;
    calculatorSelectionsLocked?: boolean

    constructor(appName: string,appId: string,pcm: string,title: string,vp: string, id?: string, matrixSelectionsLocked?: boolean, calculatorSelectionsLocked?: boolean) {
        this.appName = appName;      
        this.appId = appId;        
        this.pcm = pcm;
        this.title = title;
        this.vp = vp;       
        this.id = id;
        this.matrixSelectionsLocked = matrixSelectionsLocked;
        this.calculatorSelectionsLocked = calculatorSelectionsLocked;

    }
}