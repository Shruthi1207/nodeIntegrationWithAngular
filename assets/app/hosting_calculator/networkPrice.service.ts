import { networkPrice } from './networkPrice.model';
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { ErrorService } from "../errors/error.service";
import { ConfigService } from "../config.service";


@Injectable()
export class NetworkPriceService {
    private networkPriceData: networkPrice[] = [];
    
    config: any;
    
    constructor(private http: Http, private errorService: ErrorService, private configSvc: ConfigService) {
        this.config = this.configSvc.config;
    }

    getnetworkPrice() {
        return this.http.get(this.config.servicesURL+'/networkprice')
            .map((response: Response) => {
                const pricing = response.json().obj;
                let transformednetworkPrice: networkPrice[] = [];
                for (let networkPriceData of pricing) {
                    transformednetworkPrice.push(new networkPrice(
                        networkPriceData.networktype, networkPriceData.index, networkPriceData.networkRange, networkPriceData.cost, 
                         networkPriceData._id));
                }
                
                console.log(transformednetworkPrice);
                this.networkPriceData = transformednetworkPrice;
                return transformednetworkPrice;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    addGcpNetworkPricing(bbyN: networkPrice) {
        const body = JSON.stringify(bbyN);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.config.servicesURL+ '/networkprice', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                console.log(result);
                const bbyN = new networkPrice(result.obj.networktype,result.obj.index,result.obj.networkRange,result.obj.cost);
                console.log(bbyN);
                return bbyN;
            })
            .catch((error: any) => Observable.throw("error"));
    }

    getGcpNetworkPricing() {
        return this.http.get(this.config.servicesURL+ '/networkprice')
            .map((response: Response) => {
                const bbyN = response.json().obj;
                let transformedbby: networkPrice[] = [];
                for (let x of bbyN) {
                    transformedbby.push(new networkPrice(x.networktype, x.index,x.networkRange, x.cost, x._id));
                }
                return transformedbby;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    updateGcpNetworkPricing(bbyN: networkPrice) {
        const body = JSON.stringify(bbyN);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.config.servicesURL+ '/networkprice/' + bbyN._id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    

}