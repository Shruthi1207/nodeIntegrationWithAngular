import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConfigService {
  config: any;
  constructor(private http: Http) {
    console.log('ctor for ConfigService called.')
  }

  load() {
    console.log('Inside Load');
    return new Promise((resolve) => {
      this.http.get("/config/appConfig.json").map(res =>  {
        console.log("res: " + JSON.stringify(res.json()));
        return res.json();
      })
        .subscribe(config => {
          console.log('Configuration loaded...........');
          this.config = config;
          resolve();
        });
    });
  }

}
