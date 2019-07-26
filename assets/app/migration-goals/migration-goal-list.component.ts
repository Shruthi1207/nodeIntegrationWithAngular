import { MessageService } from '../shared/services';
import { MatrixScore } from '../results/matrixScore.model';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { AssessmentMigrationGoalService } from './assessment-migration-goal.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from "@angular/core";

import { MigrationGoal } from "./migrationgoal.model";
import { MigrationGoalService } from "./migration-goal.service";
import { AssessmentMigrationGoal } from "./assessmentMigrationGoal.model";
import { AuthService } from "../auth/auth.service";
import { Location } from '@angular/common';

@Component({
    selector: 'app-migrationgoal-list',
    templateUrl: './migration-goal-list.component.html',
    styleUrls: ['./migration-goal-list.component.css']
})


export class MigrationGoalListComponent implements OnInit {
    assessmentID: any;
    saasMigrationGoals: MigrationGoal[] = [];
    ipaasMigrationGoals: MigrationGoal[] = [];
    businessMigrationGoals: MigrationGoal[] = [];
    migrationGoalGroup: FormGroup;
    assessmentMigrationGoal: AssessmentMigrationGoal;
    migrationGoalScoreMap = new Map<string, number[]>();
    goalsHoverMap = new Map<any, string>();
 
    constructor(private location: Location, private migrationGoalService: MigrationGoalService, 
        private assessmentMigrationGoalService: AssessmentMigrationGoalService, private fb: FormBuilder, 
        private router: Router, private route: ActivatedRoute, private authService: AuthService, private messageService: MessageService) {
        this.migrationGoalGroup = new FormGroup({});
        
    }

    ngOnInit() {
        if(!this.authService.isLoggedIn())
          this.router.navigateByUrl('/auth/signin');

        this.route.params.subscribe((data) => {
          this.assessmentID = data.assessmentID || ''; // existingAppID is unique ID from mongodb.
        });

        this.assessmentMigrationGoalService.getAssessmentMigrationGoalSelections(this.assessmentID)
            .subscribe((assessmentMigrationGoal: AssessmentMigrationGoal) => {
                this.assessmentMigrationGoal = assessmentMigrationGoal;
            });  

        this.migrationGoalService.getMigrationGoals()
            .finally(() => {
                if (this.assessmentMigrationGoal) {
                    this.migrationGoalGroup.patchValue(JSON.parse(this.assessmentMigrationGoal.selections));
                   
                }
            })
            .subscribe(
                (migrationGoals: MigrationGoal[]) => {
                    migrationGoals.forEach(b => {
                        this.goalsHoverMap.set(b.id,b.hover);
                        if (b.grouping === 'saas') {
                            this.saasMigrationGoals.push(b);
                        }
                        else if (b.grouping === 'ipaas') {
                            this.ipaasMigrationGoals.push(b);
                        }
                        else if (b.grouping === 'business') {
                            this.businessMigrationGoals.push(b);
                        }
                        this.migrationGoalGroup.addControl(b.id, new FormControl(b.selected))
                    })
                }
            );

        this.migrationGoalService.getMigrationGoalsForScoring().subscribe((migrationGoalScores: MatrixScore[]) => {
            
            for(var i = 0;i<migrationGoalScores.length;i++) { 
                this.migrationGoalScoreMap.set(migrationGoalScores[i].id,migrationGoalScores[i].scores); 
            } 
        });
    }
    
    onSubmit() {
        const scores: any[] = this.getScore(this.migrationGoalGroup.value);
        if (this.assessmentMigrationGoal) {
            //edit
            this.assessmentMigrationGoal.selections = JSON.stringify(this.migrationGoalGroup.value);
            this.assessmentMigrationGoal.scores = scores;
            this.assessmentMigrationGoalService.updateAssessmentMigrationGoal(this.assessmentMigrationGoal)
                .finally(() => this.router.navigate(['matrix-summary', { assessmentID: this.assessmentID }]))
                .subscribe();
            this.assessmentMigrationGoal = null;
            this.messageService.changeMessage("Your Cloud Benefit Selections were successfully updated.");
        }
        else {
            //create
            const assessmentMigrationGoal = new AssessmentMigrationGoal(
                this.assessmentID, JSON.stringify(this.migrationGoalGroup.value), scores);
            this.assessmentMigrationGoalService.addAssessmentMigrationGoal(assessmentMigrationGoal)
                .finally(() => this.router.navigate(['matrix-summary', { assessmentID: this.assessmentID }]))
                .subscribe();
            this.messageService.changeMessage("Your Cloud Benefit Selections were successfully saved.");
            
        }
    }
                


    getScore(selections: any[]) {
        
        const baseValues: number[] = [1,1,1,1,1,1,1];
        
        const migrationGoalScoresArrays: any[] = [];
        const finalScores: any[] = [];

        //establish array of selected questions and their corresponding assigned score
        migrationGoalScoresArrays.push(baseValues);

        let lSelections = selections,key;
        for (key in lSelections) {
            if (lSelections.hasOwnProperty(key)) {
                if (lSelections[key] > 0) {
                    let pickedWeight = lSelections[key];
                    let scores = this.migrationGoalScoreMap.get(key);
                    let firstPassScores: number[] = [];
                    if (scores) {
                        for (let s of scores) {
                            firstPassScores.push(pickedWeight*s);
                        }
                        console.log("about to add key: " + key + " and value: " + firstPassScores);
                        migrationGoalScoresArrays.push(firstPassScores);
                    }
                }
            }
        }
        
        const myObservables$ = migrationGoalScoresArrays.map((xs: any) => Observable.from(xs));
        const zipped$ = (a$) => Observable.zip(...myObservables$);
        
        const subscriber = zipped$(myObservables$).subscribe(x => {
            console.log("scorerow: " + x);
            let rollingTotal: number = 0;
            for (var i = 0; i < x.length; i++) {
                let score = x[i] as number;
                rollingTotal = rollingTotal+score;
            }
            finalScores.push(rollingTotal);

        },
        error => console.log(error));
        return finalScores;
        
    }

    sendMessage(message:any): void {
        this.messageService.changeMessage(message);
    }

    cancel() {
        this.location.back(); 
    }

    getTooltip(id: any) {
        if (this.goalsHoverMap.get(id) != null) {
            return this.goalsHoverMap.get(id);
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


