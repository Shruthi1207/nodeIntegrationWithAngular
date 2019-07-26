import { ConfigService } from '../../config.service';
import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Assessment } from "./appDetail.model";
import { ErrorService } from "../../errors/error.service";


@Injectable()
export class AssessmentService {
    config: any;
    
    constructor(private http: Http, private errorService: ErrorService, private configSvc: ConfigService) {
        this.config = this.configSvc.config;
    }
     
    // Save the assessment in the database
    save(assessment: Assessment) {
        const body = JSON.stringify(assessment);
        const userId = sessionStorage.getItem('userId')
            ? '?userId=' + sessionStorage.getItem('userId')
            : '';
        console.log("defined userId "+ userId);
        
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.config.servicesURL + '/assessment' + userId, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
               // this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // Save the assessment in the database
    updateAssessment(assessment: Assessment, _id: string ) {
        
        const body = JSON.stringify(assessment);
        console.log("BODY"+body);
        const Id = '?Id='+ _id;
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.config.servicesURL + '/assessment' + Id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    updateAssessmentMatrixLock(_id: string, lockValue: boolean ) {
        const body = "{\"id\": \"" + _id + "\",\"lockValue\":" + lockValue + "}";
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.config.servicesURL + '/assessment/lockmatrix', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });

    }

    updateAssessmentCalculatorLock(_id: string, lockValue: boolean ) {
        const body = "{\"id\": \"" + _id + "\",\"lockValue\":" + lockValue + "}";
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.config.servicesURL + '/assessment/lockcalculator', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });

    }


    /// Get all of the assessments of current user
    getUserAssessments() {
        
        return this.http.get(this.config.servicesURL + '/assessment/filtered' + this.getQueryParameters())
            .map((response: Response) => {
                const assessments = response.json().obj;
                let transformedAssessments: Assessment[] = [];
                for (let assessment of assessments) {
                    transformedAssessments.push(new Assessment(assessment.appName,
                    assessment.appId,
                    assessment.pcm,
                    assessment.title,
                    assessment.vp,
                    
                    assessment._id
                ));
                }
                return transformedAssessments;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getAssessment(id: string) {
        return this.http.get(this.config.servicesURL + '/assessment?id='+ id)
        .map((response: Response) => {
            const assessment: Assessment = response.json().obj;            
            return assessment;
        })
        .catch((error: Response) => Observable.throw(error.json()));
    }

    getQueryParameters() {
        const userId = sessionStorage.getItem('userId');
        const claims = sessionStorage.getItem("cgClaims");
        let queryParams: string = "";
        if (claims !== null) {
            if (claims.indexOf("admin") >= 0) {
                queryParams += "?role=admin";
            }
            else {
                queryParams += "?role=regular";
            }
        }
        else {
            queryParams += "?role=regular";
        }
        if (userId !== null) {
            queryParams += "&userId=" + userId;
        }
        else {
            queryParams += "&userId=" 
        }
        console.log("Query Parameters: " + queryParams);
        return queryParams;
    }

    deleteAssessment(id: string) {
        return this.http.delete(this.config.servicesURL + '/assessment/' + id)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
     
    

}