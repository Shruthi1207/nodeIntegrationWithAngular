import { ConfigService } from '../config.service';
import { MatrixScore } from '../results/matrixScore.model';
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Barrier } from "./barrier.model";
import { BarrierWithScores } from './barrierWithScores.model';

@Injectable()
export class BarrierService {
    private barriers: Barrier[] = [];
    barrierIsEdit = new EventEmitter<Barrier>();
    config: any;

    constructor(private http: Http, private configSvc: ConfigService) {
        this.config = this.configSvc.config;
    }

    addBarrier(barrier: BarrierWithScores) {
        
        const body = JSON.stringify(barrier);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.config.servicesURL + '/barrier', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                // var BarrierWithScores = new BarrierWithScores(result.obj.text, result.obj.grouping,result.obj.rank,result.obj.hover,
                //     result.obj.scores,result.obj.id);
               // this.barriers.push(barrier);
                return result;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getBarriers() {
        return this.http.get(this.config.servicesURL + '/barrier')
            .map((response: Response) => {
                const barriers = response.json().obj;
                let transformedBarriers: Barrier[] = [];
                for (let barrier of barriers) {
                    transformedBarriers.push(new Barrier(barrier.text, barrier.grouping, barrier._id, barrier.rank, barrier.hover));
                }
                this.barriers = transformedBarriers;
                return transformedBarriers;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    getBarriersWithScores() {
        return this.http.get(this.config.servicesURL + '/barrier')
            .map((response: Response) => {
                const barriers = response.json().obj;
                let transformedBarriers: BarrierWithScores[] = [];
                for (let barrier of barriers) {
                    transformedBarriers.push(new BarrierWithScores(barrier.text, barrier.grouping,  barrier.rank, barrier.hover, barrier.scores,barrier._id,));
                }
                this.barriers = transformedBarriers;
                return transformedBarriers;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    editBarrier(barrier: Barrier) {
        this.barrierIsEdit.emit(barrier);
    }

    updateBarrier(barrier: BarrierWithScores) {
        const body = JSON.stringify(barrier);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.config.servicesURL + '/barrier/' + barrier.id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteBarrier(barrierid) {
       // this.barriers.splice(this.barriers.indexOf(barrier), 1);
        return this.http.delete(this.config.servicesURL + '/barrier/' + barrierid)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getBarriersForScoring() {
        return this.http.get(this.config.servicesURL + '/barrier')
            .map((response: Response) => {
                const barrierScores = response.json().obj;
                let transformedBarriers: MatrixScore[] = [];
                for (let barrier of barrierScores) {
                    transformedBarriers.push(new MatrixScore(barrier._id, barrier.scores));
                }
                return transformedBarriers;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
}