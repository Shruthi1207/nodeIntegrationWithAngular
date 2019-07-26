import { ConfigService } from '../config.service';
import { AssessmentBarrier } from './assessmentBarrier.model';
import { Http, Response, Headers } from "@angular/http";
import { EventEmitter, Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { ErrorService } from "../errors/error.service";


@Injectable()
export class AssessmentBarrierService {
    config: any;
    
    constructor(private http: Http, private errorService: ErrorService, private configSvc: ConfigService) {
        this.config = this.configSvc.config;
    }

    addAssessmentBarrier(assessmentBarrier: AssessmentBarrier) {
        const body = JSON.stringify(assessmentBarrier);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.config.servicesURL + '/assessment-barrier', body, {headers: headers})
            .map((response: Response) => {
                console.log(response);
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    getAssessmentBarrierSelections(assessmentId: string) {
        console.log("call made to assessmentBarrierService.getAssessmentBarrierSelections at " +Date.now());
        return this.http.get(this.config.servicesURL + '/assessment-barrier/' + assessmentId)
            .map((response: Response) =>  {
                const assessmentBarrier: AssessmentBarrier = response.json().obj != null ? response.json().obj : null;
                console.log("return call made to assessmentBarrierService.getAssessmentBarrierSelections at " +Date.now());
                return assessmentBarrier;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    updateAssessmentBarrier(assessmentBarrier: AssessmentBarrier) {
        const body = JSON.stringify(assessmentBarrier);
        const headers = new Headers({'Content-Type': 'application/json'});
     /*   const token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';*/
        return this.http.patch(this.config.servicesURL + '/assessment-barrier/' + assessmentBarrier._id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}