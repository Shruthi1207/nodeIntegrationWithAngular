import { ConfigService } from '../config.service';
import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AuthService {
    config: any;
    
    constructor(private http: Http, private errorService: ErrorService, private configSvc: ConfigService) {
        this.config = this.configSvc.config;
    }

    currentNameSubject = new BehaviorSubject('');

    setUserFirstName(firstName) {
        let fname: string = firstName;
        if (fname.length > 0) {
            firstName = "Hello, " + firstName;
        }
        
        this.currentNameSubject.next(firstName);
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.config.servicesURL + '/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
               // this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    signin(username: string, password: string) {
        this.logout();
        this.setUserFirstName("");
        const body = JSON.stringify({"username": username, "password": password});
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.config.servicesURL + '/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
             //   this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    
    getAccount(id: string) {
        return this.http.get(this.config.servicesURL + '/user?id='+ id)
        .map((response: Response) => {
            const user: User = response.json().obj;
            return user;
        })
        .catch((error: Response) => Observable.throw(error));
    }

    updateAccount(user: User, _id: string ) {
        console.log("UPDATED USER ID: " + _id);
        const body = JSON.stringify(user);
        console.log("BODY"+body);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.config.servicesURL + '/user?id=' + _id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    changePassword(_id: string, pwd: string ) {
        const body = JSON.stringify({"id": _id, "pwd": pwd});
        console.log("BODY"+body);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.config.servicesURL + '/user/changepassword', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    logout() {
        this.setUserFirstName("");
        sessionStorage.clear();
    }

    isLoggedIn() {
        return sessionStorage.getItem('username') !== null;
    }

    isAdmin() {
        if (sessionStorage.getItem("cgClaims") !== null && sessionStorage.getItem("cgClaims").indexOf("admin") >= 0) {
            return true;
        }
        return false;
    }
}