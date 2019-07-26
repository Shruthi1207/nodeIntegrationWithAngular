import { storageCloudPrice } from './storageCloudPrice.model';
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { ErrorService } from "../errors/error.service";
import { ConfigService } from "../config.service";


@Injectable()
export class StorageCloudPriceService {
    private storageCloudPriceData: storageCloudPrice[] = [];
    
    config: any;
    
    constructor(private http: Http, private errorService: ErrorService, private configSvc: ConfigService) {
        this.config = this.configSvc.config;
    }

    getstorageCloudPrice() {
        return this.http.get(this.config.servicesURL + '/storagecloudprice')
            .map((response: Response) => {
                const pricing = response.json().obj;
                let transformedstorageCloudPrice: storageCloudPrice[] = [];
                for (let storageCloudPriceData of pricing) {
                    transformedstorageCloudPrice.push(new storageCloudPrice(
                        storageCloudPriceData.storagetype, storageCloudPriceData.tierindex, storageCloudPriceData.tier, storageCloudPriceData.cost, 
                         storageCloudPriceData._id));
                }
                
                console.log(transformedstorageCloudPrice);
                this.storageCloudPriceData = transformedstorageCloudPrice;
                return transformedstorageCloudPrice;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    addBbyStoragePricing(bbyS: storageCloudPrice) {
        const body = JSON.stringify(bbyS);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.config.servicesURL+ '/storagecloudprice', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                console.log(result);
                const bbyS = new storageCloudPrice(result.obj.storagetype,result.obj.tierindex, result.obj.tier, result.obj.cost);
                console.log(bbyS);
                return bbyS;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getBbyStoragePricing() {
        return this.http.get(this.config.servicesURL+ '/storagecloudprice')
            .map((response: Response) => {
                const bbyS = response.json().obj;
                let transformedbby: storageCloudPrice[] = [];
                for (let x of bbyS) {
                    transformedbby.push(new storageCloudPrice(x.storagetype, x.tierindex, x.tier, x.cost, x._id));
                }
                return transformedbby;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    updateBbyStoragePricing(bbyS: storageCloudPrice) {
        const body = JSON.stringify(bbyS);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.config.servicesURL+ '/storagecloudprice/' + bbyS._id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    

}