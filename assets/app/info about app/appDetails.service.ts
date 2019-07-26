import { ConfigService } from '../config.service';
import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { ErrorService } from "../errors/error.service";
import { AssessmentAppDetails } from './assessmentAppDetails.model';
import { AppDetailsQuestions } from './appDetails.model';

@Injectable()
export class AppDetailsService {
    appDetailsQuestions: AppDetailsQuestions[] = [];
    config: any;
    
    constructor(private http: Http, private errorService: ErrorService, private configSvc: ConfigService) {
        this.config = this.configSvc.config;
    }

    addAssessmentAppDetails(assessmentAppDetails: AssessmentAppDetails) {
        const body = JSON.stringify(assessmentAppDetails);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.config.servicesURL + '/assessment-appDetails', body, {headers: headers})
            .map((response: Response) => {
                console.log(response);
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    getAssessmentAppDetailsSelections(assessmentId: string) {
        return this.http.get(this.config.servicesURL + '/assessment-appDetails/' + assessmentId)
            .map((response: Response) =>  {
                const assessmentAppDetails: AssessmentAppDetails = response.json().obj != null ? response.json().obj : null;
                return assessmentAppDetails;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    getAppdetailsQuestions() {
        return this.http.get(this.config.servicesURL + '/appDetailsQuestions')
            .map((response: Response) => {
                const appDetailsQuestions = response.json().obj;
                let transformedappDetailsQuestions: AppDetailsQuestions[] = [];
                for (let appDetailsQuestion of appDetailsQuestions) {
                    
                    transformedappDetailsQuestions.push(new AppDetailsQuestions(appDetailsQuestion.text, appDetailsQuestion._id, appDetailsQuestion.formcontrol,
                        appDetailsQuestion.subtype,appDetailsQuestion.controltype,appDetailsQuestion.parenttext, appDetailsQuestion.selected
                    ,appDetailsQuestion.mainParentText , appDetailsQuestion.commonkey));
                }
                this.appDetailsQuestions = transformedappDetailsQuestions;
                return transformedappDetailsQuestions;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }


    updateAssessmentAppDetailsSelections(assessmentAppDetails: AssessmentAppDetails) {
        const body = JSON.stringify(assessmentAppDetails);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.config.servicesURL + '/assessment-appDetails/' + assessmentAppDetails._id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    addAssessmentAppSecurity(assessmentAppSecurity: AssessmentAppDetails) {
        const body = JSON.stringify(assessmentAppSecurity);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.config.servicesURL + '/assessment-appSecurity', body, {headers: headers})
            .map((response: Response) => {
                console.log(response);
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    getAssessmentAppDetailsSecurity(assessmentId: string) {
        return this.http.get(this.config.servicesURL + '/assessment-appSecurity/' + assessmentId)
            .map((response: Response) =>  {
                const assessmentAppDetails: AssessmentAppDetails = response.json().obj != null ? response.json().obj : null;
                return assessmentAppDetails;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    updateAssessmentAppSecuritySelections(assessmentAppDetails: AssessmentAppDetails) {
        const body = JSON.stringify(assessmentAppDetails);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.config.servicesURL + '/assessment-appSecurity/' + assessmentAppDetails._id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}