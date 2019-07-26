import { MessageService } from '../shared/services';
import { AuthService } from './auth.service';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "./user.model";
import { Router } from '@angular/router';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;
    firstName: string;
    message: any
    isError: boolean = false;

    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

    onSubmit() {
        this.isError = false;
        var p1 = this.myForm.value.password;
        var p2 = this.myForm.value.confirmPassword;
        if (p1 !== p2) {
            this.sendMessage("Passwords do not match, please try again.");
            throw new Error("passwords do not match...");
        }
        const claims: string[] = ['regular'];
        const user = new User(
            this.myForm.value.username,
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName,
            claims
        );
        this.authService.signup(user)
            .subscribe(
                data => {
                    this.sendMessage("Your account was successfully created!<br>Please Sign In to continue.");
                    this.router.navigateByUrl('/auth/signin');
                },
                error => {
                    this.isError = true;
                    this.sendMessage(error.error.message);
                }
            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            confirmPassword: new FormControl(null, Validators.required)
        });
        this.messageService.currentMessage.subscribe(message => this.message = message);
    }

    signIn() {
        this.messageService.clearMessage();
        this.router.navigateByUrl('/auth/signin');
    }

    sendMessage(message:any): void {
        this.messageService.changeMessage(message);
    }

    ngOnDestroy() {
        if (this.isError) {
             this.messageService.clearMessage();
        }
        this.isError = false;
    }
}