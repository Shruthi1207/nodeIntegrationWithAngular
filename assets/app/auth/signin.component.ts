import { MessageService } from '../shared/services';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "./user.model";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
    myForm: FormGroup;
    message: any;
    isError: boolean = false;
 
    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

    onSubmit() {
        this.isError = false;
        this.authService.signin(this.myForm.value.username,this.myForm.value.password)
            .subscribe(
                data => {
                    console.log("User claims: " + data.claims);
                    sessionStorage.setItem('firstName', data.firstName);
                    sessionStorage.setItem('username', data.username);
                    sessionStorage.setItem('userId', data.userid);
                    sessionStorage.setItem('cgClaims', data.claims);
                    this.authService.setUserFirstName(data.firstName);
                    this.router.navigateByUrl('/home');
                },
                error =>  {
                    this.isError = true;
                    this.sendMessage(error.error.message);
                }
            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
        this.messageService.currentMessage.subscribe(message => this.message = message);
        
    }

    sendMessage(message:any): void {
        this.messageService.changeMessage(message);
    }

    ngOnDestroy() {
         this.messageService.clearMessage();
         this.isError = false;
    }
    
}