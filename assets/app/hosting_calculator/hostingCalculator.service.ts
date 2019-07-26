import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { ErrorService } from "../errors/error.service";
import { HostingCalculator } from './hostingCalculator.model';
import { OtherConstants } from './otherconstants.model';
import { AssessmentCalculation } from "./assessmentCalculation.model";
import { HostingResult } from "./hostingResult.model";
import { ConfigService } from "../config.service";
import { BbyPricingValues } from './bbyPricingValues.model';
import { storageCloudPrice } from './storageCloudPrice.model';
import { BbyPricing } from './BbyPricing.model';

@Injectable()
export class HostingCalculatorService {
    private barriers: HostingCalculator[] = [];
    private OtherConstants: OtherConstants[] = [];
    config: any;
    
    constructor(private http: Http, private errorService: ErrorService, private configSvc: ConfigService) {
        this.config = this.configSvc.config;
    }
    

    
    
    addAssessmentCalculation(assessmentCalculation: AssessmentCalculation) {
        const body = JSON.stringify(assessmentCalculation);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.config.servicesURL+'/calculation', body, {headers: headers})
            .map((response: Response) => {
                console.log(response);
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }
    updateAssessmentCalculation(assessmentCalculation: AssessmentCalculation) {
        const body = JSON.stringify(assessmentCalculation);
        const headers = new Headers({'Content-Type': 'application/json'});
     /*   const token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';*/
        return this.http.patch(this.config.servicesURL+'/calculation/' + assessmentCalculation._id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    getAssessmentCalculation(assessmentId: string) {
        console.log("call made to getAssessmentCalculation at " +Date.now());
        return this.http.get(this.config.servicesURL+'/calculation/' + assessmentId)
            .map((response: Response) =>  {
                const assessmentCalculation: AssessmentCalculation = response.json().obj != null ? response.json().obj : null;
                console.log("return call made to getAssessmentCalculation at " +Date.now());
                return assessmentCalculation;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    getAllAssessmentCalculation() {
        return this.http.get(this.config.servicesURL+'/calculation/')
            .map((response: Response) =>  {
                const assessmentCalculation: AssessmentCalculation = response.json().obj != null ? response.json().obj : null;
                console.log("return call made to getAssessmentCalculation at " +Date.now());
                return assessmentCalculation;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }


    getPricing() {
        return this.http.get(this.config.servicesURL+ '/pricing')
            .map((response: Response) => {
                const pricing = response.json().obj;
                let transformedBarriers: HostingCalculator[] = [];
                for (let barrier of pricing) {
                    transformedBarriers.push(new HostingCalculator(barrier.type, barrier.size, barrier.centos, barrier.RH, barrier.W,barrier.VM, barrier._id));
                }
                this.barriers = transformedBarriers;
                return transformedBarriers;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    // OtherConstants
    getOtherConstants() {
        return this.http.get(this.config.servicesURL+ '/constants')
            .map((response: Response) => {
                const pricing = response.json().obj;
                let transformedOtherConstants: OtherConstants[] = [];
                for (let OtherConstant of pricing) {
                    transformedOtherConstants.push(new OtherConstants(OtherConstant.name, OtherConstant.value, OtherConstant._id));
                }
                this.OtherConstants = transformedOtherConstants;
                return transformedOtherConstants;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    updateBbyComputePricing(bby: BbyPricingValues) {
        const body = JSON.stringify(bby);
        const headers = new Headers({'Content-Type': 'application/json'});
        console.log(this.config.servicesURL+ '/pricing/' + bby._id);
        return this.http.patch(this.config.servicesURL+ '/pricing/' + bby._id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    addBbyComputePricing(bby: BbyPricingValues) {
        const body = JSON.stringify(bby);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.config.servicesURL+ '/pricing', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                console.log(result);
                const bby = new BbyPricingValues(result.obj.type,result.obj.size, result.obj.centos, result.obj.RH, result.obj.W,result.obj.VM );
                console.log(bby);
                return bby;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getBbyComputePricing() {
        return this.http.get(this.config.servicesURL+ '/pricing')
            .map((response: Response) => {
                const bby = response.json().obj;
                let transformedbby: BbyPricingValues[] = [];
                for (let x of bby) {
                    transformedbby.push(new BbyPricingValues(x.type, x.size, x.centos, x.RH, x.W,x.VM,  x._id));
                }
                return transformedbby;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    addBbyOtherPricing(bbyO: OtherConstants) {
        const body = JSON.stringify(bbyO);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.config.servicesURL+ '/constants', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                console.log(result);
                const bbyO = new OtherConstants(result.obj.name,result.obj.value);
                console.log(bbyO);
                return bbyO;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getBbyOtherPricing() {
        return this.http.get(this.config.servicesURL+ '/constants')
            .map((response: Response) => {
                const bbyO = response.json().obj;
                let transformedbby: OtherConstants[] = [];
                for (let x of bbyO) {
                    transformedbby.push(new OtherConstants(x.name, x.value, x._id));
                }
                return transformedbby;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    updateBbyOtherPricing(bbyO: OtherConstants) {
        const body = JSON.stringify(bbyO);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.config.servicesURL+ '/constants/' + bbyO._id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    addBbyPricing(bbyPricing: BbyPricing) {
        const body = JSON.stringify(bbyPricing);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.config.servicesURL+ '/bbyPricing', body, {headers: headers})
            .map((response: Response) => {
                console.log(response);
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    getBbyPricing() {
        return this.http.get(this.config.servicesURL+ '/bbyPricing')
            .map((response: Response) =>  {
                const bbyPricing: BbyPricing = response.json().obj != null ? response.json().obj : null;
                return bbyPricing;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    updateBbyPricing(bbyPricing: BbyPricing) {
        const body = JSON.stringify(bbyPricing);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.config.servicesURL+ '/bbyPricing/' + bbyPricing._id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getGCPPricing() {
        return this.http.get(this.config.servicesURL+ '/bbyPricing/gcp')
            .map((response: Response) =>  {
                const gcp = response.json()
                return gcp;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    getAWSPricing1() {
        return this.http.get(this.config.servicesURL+ '/bbyPricing/aws1')
            .map((response: Response) =>  {
                const aws = response.json()
                return aws;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    getAWSPricing2() {
        return this.http.get(this.config.servicesURL+ '/bbyPricing/aws2')
            .map((response: Response) =>  {
                const aws = response.json()
                return aws;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    getAWSPricing3() {
        return this.http.get(this.config.servicesURL+ '/bbyPricing/aws3')
            .map((response: Response) =>  {
                const aws = response.json()
                return aws;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    getAWSPricing4() {
        return this.http.get(this.config.servicesURL+ '/bbyPricing/aws4')
            .map((response: Response) =>  {
                const aws = response.json()
                return aws;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    getAWSPricing5() {
        return this.http.get(this.config.servicesURL+ '/bbyPricing/aws5')
            .map((response: Response) =>  {
                const aws = response.json()
                return aws;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }

    getAzurePricing() {
        return this.http.get(this.config.servicesURL+ '/bbyPricing/azure')
            .map((response: Response) =>  {
                const azure = response.json()
                return azure;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }
        );
    }



}