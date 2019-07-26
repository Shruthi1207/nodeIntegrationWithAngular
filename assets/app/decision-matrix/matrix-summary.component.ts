import { MessageService } from '../shared/services';
import { Assessment } from '../new-assessment/start/appDetail.model';
import { AssessmentService } from '../new-assessment/start/assessment.service';
import { ModalComponent } from '../shared/layout/modal.component';
import { Observable } from 'rxjs/Rx';
import { MigrationGoal } from '../migration-goals/migrationGoal.model';
import { Barrier } from '../barriers/barrier.model';
import { MigrationGoalService } from '../migration-goals/migration-goal.service';
import { BarrierService } from '../barriers/barrier.service';
import { AssessmentMigrationGoal } from '../migration-goals/assessmentMigrationGoal.model';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentBarrier } from '../barriers/assessmentBarrier.model';
import { AssessmentMigrationGoalService } from '../migration-goals/assessment-migration-goal.service';
import { AssessmentBarrierService } from '../barriers/assessment-barrier.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-matrix-summary',
    templateUrl: './matrix-summary.component.html',
    styleUrls: ['./matrix-summary.component.css']
})
export class DecisionMatrixSummaryComponent implements OnInit {
    hasRunOnInit: boolean;
    assessmentID: any;
    assessmentBarrier: AssessmentBarrier;
    assessmentMigrationGoal: AssessmentMigrationGoal;
    selectedCloudBarriers: any[] = [];
    selectedMigrationGoals: any[] = [];
    barriers = new Map<string, string>();
    goals = new Map<string, string>();
    isDone = false;
    private sub: any;
    lockMatrix: boolean = false;
    message: any;
    
    constructor(private location: Location, private assessmentBarrierService: AssessmentBarrierService, private assessmentMigrationGoalService: AssessmentMigrationGoalService,
        private route: ActivatedRoute,private authService: AuthService, private router: Router,
        private barrierService: BarrierService, private migrationGoalService: MigrationGoalService, 
        private assessmentService: AssessmentService, private messageService: MessageService) {}

        
    ngOnInit() {
        this.hasRunOnInit = true;

        this.route.params.subscribe((data) => {
            this.assessmentID = data.assessmentID || ''; 
        });

        this.loadData();

        this.sub = this.route.params
        .subscribe(params => {
           // get id from params
           if (params['lockMatrix']) {
            let lockMatrix: boolean = params['lockMatrix'];
            this.lockMatrix = lockMatrix;
            console.log("lockMatrix: " + this.lockMatrix);
           }
          
           // do whatever you want with id here
 
         });

         this.messageService.currentMessage.subscribe(message => this.message = message);
    
    
    }

    submitMatrixSelections(modal: ModalComponent) {
        modal.hide();
        this.router.navigate(['matrix-summary', { assessmentID: this.assessmentID, lockMatrix: true }]);
        this.assessmentService.updateAssessmentMatrixLock(this.assessmentID, true)
            .subscribe(
                resp => {
                    this.sendMessage("Your Matrix Selections were successfully submitted.")
                    console.log("Matrix Lock Response: " + resp.message);
                },
                error => {
                console.error(error)
                }
            );
    }
 
    sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
      

    loadData() {
      //  this.sleep(0).then(() => {
        Observable.forkJoin(
        
            this.assessmentBarrierService.getAssessmentBarrierSelections(this.assessmentID).map(
                (assessmentBarrier: AssessmentBarrier) => this.assessmentBarrier = assessmentBarrier),
    
            this.assessmentMigrationGoalService.getAssessmentMigrationGoalSelections(this.assessmentID).map(
                (assessmentMigrationGoal: AssessmentMigrationGoal) => this.assessmentMigrationGoal = assessmentMigrationGoal),
    
            this.assessmentService.getAssessment(this.assessmentID).map(
                (assessment: Assessment) => {
                    if (assessment) {
                        this.lockMatrix = assessment.matrixSelectionsLocked;
                    }
                }
            ),
 
            this.barrierService.getBarriers().map((barriers: Barrier[]) => {
                barriers.forEach(barrier => {
                //    console.log("about to add: " + barrier.id + "  and " + barrier.text);
                    this.barriers.set(barrier.id,barrier.text);
                })
            }),
                
            this.migrationGoalService.getMigrationGoals()
            .map((migrationGoals: MigrationGoal[]) => {
                migrationGoals.forEach(migrationGoal => {
                    this.goals.set(migrationGoal.id,migrationGoal.text);
                })
            }))
            .finally(() => {
                this.setSelectedBarriers(this.assessmentBarrier); 
                this.setSelectedMigrationGoals(this.assessmentMigrationGoal);
                console.log("finished at " + Date.now()); 
                this.isDone=true;
            }).subscribe(() => console.log("running...." + Date.now()));
     //   });
    }

    setSelectedBarriers(assessmentBarrier: AssessmentBarrier) {
        const sb: any[] = [];
        if (assessmentBarrier) {
            JSON.parse(assessmentBarrier.selections, function (key, value) {
                if (value == true) {
                    sb.push(key);
                }
            })
            for (let s of sb) {
                this.selectedCloudBarriers.push(this.barriers.get(s));
            }
        }
    }

    setSelectedMigrationGoals(assessmentMigrationGoal: AssessmentMigrationGoal) {
        const mg: any[] = [];
        if (assessmentMigrationGoal) {
            if (assessmentMigrationGoal.selections) {
                JSON.parse(assessmentMigrationGoal.selections, function (key, value) {
                    if (value > 0) {
                        mg.push(key);
                    }
                })
            }
            for (let m of mg) {
                this.selectedMigrationGoals.push(this.goals.get(m));
            }
        }
    }

    sendMessage(message:any): void {
        this.messageService.changeMessage(message);
    }

    barrierClick() {
        this.router.navigate(['barriers', { assessmentID: this.assessmentID }]);
    }

    migrationGoalClick() {
        this.router.navigate(['migrationgoals', { assessmentID: this.assessmentID }]);
    }

    resultsClick() {
        this.router.navigate(['results', { assessmentID: this.assessmentID }]);
    }

    cancel() {
        //this.location.back(); // <-- go back to previous location on cancel
        console.log("about to navigate back to start with id: " + this.assessmentID);
        this.router.navigate(['start', { id: this.assessmentID }]);
    }

    isSelectedCloudBarriers() {
        if (this.selectedCloudBarriers.length > 0) {
            return true;
        }
        return false;
    }

    isSelectedMigrationGoals() {
        if (this.selectedMigrationGoals.length > 0) {
            return true;
        }
        return false;
    }

    isLocked() {
        return this.lockMatrix;
    }

    isAdmin() {
        return this.authService.isAdmin();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.messageService.clearMessage();
    }
    assessmentHomeClick(){
        this.router.navigate(['start', {id:this.assessmentID}]);
    }
    hostingCalculatorClick(){
        this.router.navigate(['calc', { assessmentID: this.assessmentID }]);
    }
    infoAppDetailsClick() {       
          this.router.navigate(['infoAppDetails', { assessmentID: this.assessmentID }]);        
      }
    
   
}