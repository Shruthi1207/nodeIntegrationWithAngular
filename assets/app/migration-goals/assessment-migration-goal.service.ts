import { ConfigService } from '../config.service';
import { AssessmentMigrationGoal } from './assessmentMigrationGoal.model';
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { ErrorService } from "../errors/error.service";


@Injectable()
export class AssessmentMigrationGoalService {
    config: any;
    
    constructor(private http: Http, private errorService: ErrorService, private configSvc: ConfigService) {
        this.config = this.configSvc.config;
    }

    addAssessmentMigrationGoal(assessmentMigrationGoal: AssessmentMigrationGoal) {
        const body = JSON.stringify(assessmentMigrationGoal);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.config.servicesURL + '/assessment-migration-goal', body, {headers: headers})
            .map((response: Response) => {
                console.log(response);
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    getAssessmentMigrationGoalSelections(assessmentId: string) {
        console.log("call made to assessmentMigrationGoalService.getAssessmentMigrationGoals at " +Date.now());
        return this.http.get(this.config.servicesURL + '/assessment-migration-goal/' + assessmentId)
            .map((response: Response) =>  {
                const assessmentMigrationGoal: AssessmentMigrationGoal = response.json().obj != null ? response.json().obj : null;
                console.log("return call made to assessmentMigrationGoalService.getAssessmentMigrationGoals at " +Date.now());               
                return assessmentMigrationGoal;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    updateAssessmentMigrationGoal(assessmentMigrationGoal: AssessmentMigrationGoal) {
        const body = JSON.stringify(assessmentMigrationGoal);
        const headers = new Headers({'Content-Type': 'application/json'});
     /*   const token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';*/
        return this.http.patch(this.config.servicesURL + '/assessment-migration-goal/' + assessmentMigrationGoal._id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}