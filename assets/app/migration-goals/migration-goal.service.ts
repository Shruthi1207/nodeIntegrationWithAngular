import { ConfigService } from '../config.service';
import { MatrixScore } from '../results/matrixScore.model';
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { MigrationGoal } from "./migrationGoal.model";
import { MigrationGoalsWithScores } from './migrationGoalsWithScores.model';

@Injectable()
export class MigrationGoalService {
    private migrationGoals: MigrationGoal[] = [];
    migrationGoalIsEdit = new EventEmitter<MigrationGoal>();
    config: any;

    constructor(private http: Http, private configSvc: ConfigService) {
        this.config = this.configSvc.config;
    }

    addMigrationGoal(migrationGoal: MigrationGoalsWithScores) {
        const body = JSON.stringify(migrationGoal);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.config.servicesURL + '/migrationgoal', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                // const migrationGoal = new MigrationGoal(result.obj.text, result.obj.grouping);
                // this.migrationGoals.push(migrationGoal);
                return result;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getMigrationGoals() {
        return this.http.get(this.config.servicesURL + '/migrationgoal')
            .map((response: Response) => {
                const migrationGoals = response.json().obj;
                let transformedMigrationGoals: MigrationGoal[] = [];
                for (let migrationGoal of migrationGoals) {
                    transformedMigrationGoals.push(new MigrationGoal(migrationGoal.text, migrationGoal.grouping, migrationGoal._id, migrationGoal.rank, migrationGoal.hover));
                }
                this.migrationGoals = transformedMigrationGoals;
                return transformedMigrationGoals;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    
    getMigrationGoalsWithScores() {
        return this.http.get(this.config.servicesURL + '/migrationgoal')
            .map((response: Response) => {
                const migrationGoals = response.json().obj;
                let transformedMigrationGoals: MigrationGoalsWithScores[] = [];
                for (let migrationGoal of migrationGoals) {// barrier.text, barrier.grouping,  barrier.rank, barrier.hover, barrier.scores,barrier._id,));
                    transformedMigrationGoals.push(new MigrationGoalsWithScores(migrationGoal.text, migrationGoal.grouping, migrationGoal.rank, migrationGoal.hover, migrationGoal.scores, migrationGoal._id));
                }
               // this.migrationGoals = transformedMigrationGoals;
                return transformedMigrationGoals;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    editMigrationGoal(migrationGoal: MigrationGoal) {
        this.migrationGoalIsEdit.emit(migrationGoal);
    }

    updateMigrationGoal(migrationGoal: MigrationGoalsWithScores) {
        const body = JSON.stringify(migrationGoal);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.config.servicesURL + '/migrationgoal/' + migrationGoal.id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteMigrationGoal(migrationGoal: MigrationGoal) {
        this.migrationGoals.splice(this.migrationGoals.indexOf(migrationGoal), 1);
        return this.http.delete(this.config.servicesURL + '/migrationgoal/' + migrationGoal.id)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getMigrationGoalsForScoring() {
        return this.http.get(this.config.servicesURL + '/migrationgoal')
            .map((response: Response) => {
                const migrationGoalScores = response.json().obj;
                let transformedMigrationGoals: MatrixScore[] = [];
                for (let migrationGoal of migrationGoalScores) {
                    transformedMigrationGoals.push(new MatrixScore(migrationGoal._id, migrationGoal.scores));
                }
                return transformedMigrationGoals;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
}