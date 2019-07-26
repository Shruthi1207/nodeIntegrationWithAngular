import { MessageService } from '../shared/services';
import { MatrixScore } from '../results/MatrixScore.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AssessmentBarrierService } from './assessment-barrier.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from "@angular/core";

import { Barrier } from "./barrier.model";
import { BarrierService } from "./barrier.service";
import { AssessmentBarrier } from "./assessmentBarrier.model";

import { Observable } from 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";
import { Location } from '@angular/common';



@Component({
    selector: 'app-barrier-list',
    templateUrl: './barrier-list.component.html',
    styleUrls: ['./barriers-list.component.css']
})

export class BarrierListComponent implements OnInit {
    assessmentID: any;
    infraBarriers: Barrier[] = [];
    integBarriers: Barrier[] = [];
    eaBarriers: Barrier[] = [];
    barrierGroup: FormGroup;
    assessmentBarrier: AssessmentBarrier;
    barrierScoreMap = new Map<string, number[]>();
    barrierHoverMap = new Map<any, string>();
    
    constructor(private location: Location, private barrierService: BarrierService, private assessmentBarrierService: AssessmentBarrierService, 
        private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService, 
        private messageService: MessageService) {
        this.barrierGroup = new FormGroup({});
    }

    ngOnInit() {
        if(!this.authService.isLoggedIn())
          this.router.navigateByUrl('/auth/signin');

        this.route.params.subscribe((data) => {
          this.assessmentID = data.assessmentID || ''; // existingAppID is unique ID from mongodb.
          console.log("this.assessmentID" + this.assessmentID);
        });

        this.assessmentBarrierService.getAssessmentBarrierSelections(this.assessmentID)
            .subscribe((assessmentBarrier: AssessmentBarrier) => {
                this.assessmentBarrier = assessmentBarrier;
            });  
            
        this.barrierService.getBarriers()
            .finally(() => {
                if (this.assessmentBarrier) {
                    this.barrierGroup.patchValue(JSON.parse(this.assessmentBarrier.selections))
                }
            })
            .subscribe(
                (barriers: Barrier[]) => {
                    barriers.forEach(b => {
                        this.barrierHoverMap.set(b.id,b.hover);
                        if (b.grouping === 'infrastructure') {
                            this.infraBarriers.push(b);
                        }
                        else if (b.grouping === 'integration') {
                            this.integBarriers.push(b);
                        }
                        else if (b.grouping === 'ent-arch') {
                            this.eaBarriers.push(b);
                        }
                  
                        this.barrierGroup.addControl(b.id, new FormControl(b.selected))
                    }),
                    error => console.error(error)
                }
            )
        
        //get assigned score for each question from db
        this.barrierService.getBarriersForScoring().subscribe((barrierScores: MatrixScore[]) => {
            for(var i = 0;i<barrierScores.length;i++) { 
                this.barrierScoreMap.set(barrierScores[i].id,barrierScores[i].scores); 
            } 
        });
        
    }

    sendMessage(message:any): void {
        this.messageService.changeMessage(message);
    }

    onSubmit() {
        const scores: any[] = this.getScore(this.barrierGroup.value);
        if (this.assessmentBarrier) {
            //edit
            this.assessmentBarrier.selections = JSON.stringify(this.barrierGroup.value);
            this.assessmentBarrier.scores = scores;
            this.assessmentBarrierService.updateAssessmentBarrier(this.assessmentBarrier)
                .finally(() => this.router.navigate(['matrix-summary', { assessmentID: this.assessmentID }]))
                .subscribe();
            this.assessmentBarrier = null;
            this.sendMessage("Your Cloud Barrier Selections were successfully updated.");
        }
        else {
            //create
            const assessmentBarrier = new AssessmentBarrier(
                this.assessmentID, JSON.stringify(this.barrierGroup.value), scores);
            this.assessmentBarrierService.addAssessmentBarrier(assessmentBarrier)
                .finally(() => this.router.navigate(['matrix-summary', { assessmentID: this.assessmentID }]))
                .subscribe();
            this.sendMessage("Your Cloud Barrier Selections were successfully saved.");
                
        }
        
    }



    getScore(selections: any[]) {
        const baseValues: number[] = [1,1,1,1,1,1,1];
        
        const barrierScoresArrays: any[] = [];
        const finalScores: any[] = [];

        //establish array of selected questions and their corresponding assigned score
        barrierScoresArrays.push(baseValues);

        let lSelections = selections,key;
        for (key in lSelections) {
            if (lSelections.hasOwnProperty(key)) {
                if (lSelections[key] == true) {
                   console.log("about to add key: " + key + " and value: " + this.barrierScoreMap.get(key));
                    barrierScoresArrays.push(this.barrierScoreMap.get(key));
                }
            }
        }
        
        const myObservables$ = barrierScoresArrays.map((xs: any) => Observable.from(xs));
        const zipped$ = (a$) => Observable.zip(...myObservables$);
        
        const subscriber = zipped$(myObservables$).subscribe(x => {
            console.log("scorerow: " + x);
            let rollingTotal: number = 1;
            for (var i = 0; i < x.length; i++) {
                let score = x[i] as number;
                rollingTotal = rollingTotal*score;
            }
            finalScores.push(rollingTotal);
        },
        error => console.log(error));
        return finalScores;
        
    }

    cancel() {
        this.location.back(); 
    }

    getTooltip(id: any) {
        if (this.barrierHoverMap.get(id) != null) {
            return this.barrierHoverMap.get(id);
        }
        return "";
    }
    assessmentHomeClick(){
        this.router.navigate(['start', {id:this.assessmentID}]);
    }
    infoAppDetailsClick(){
        this.router.navigate(['infoAppDetails', {assessmentID:this.assessmentID}]);
    }
    hostingCalculatorClick(){
        this.router.navigate(['calc', { assessmentID: this.assessmentID }]);
    }
    resultsClick() {
        this.router.navigate(['results', { assessmentID: this.assessmentID }]);
    }
      

}


