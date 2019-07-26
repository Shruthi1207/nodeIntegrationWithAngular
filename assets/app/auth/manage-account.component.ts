import { MessageService } from '../shared/services';
import { AuthService } from './auth.service';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "./user.model";
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
    selector: 'app-signup',
    templateUrl: './manage-account.component.html',
    styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
    myForm: FormGroup;
    myPasswordForm: FormGroup;
    message: any
    isError: boolean = false;
    user: User;
    isDone: boolean = false;
    showPasswordChange: boolean = false;
 
    constructor(private location: Location, private authService: AuthService, private router: Router, private messageService: MessageService) {}

    onSubmit() {
        this.isError = false;
        const user = new User(
            this.myForm.value.username,
            this.myForm.value.email,
            this.user.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );
        this.authService.updateAccount(user, this.user._id)
            .subscribe(
                data => {
                    this.sendMessage("Your account was successfully updated!");
                 //   this.router.navigateByUrl('/auth/signin');
                },
                error => {
                    let err: any;
                    err = error.error.message;
                    /*
                    console.log("console.log(typeof instanceName);");
                    console.log(typeof err);
                    console.log("console.log(Object.keys(instanceName));");
                    console.log(Object.keys(err));
                    console.log("\nA 'for-in' loop over object instanceName will give:");
                   for (var propertyKey in err) {
                           console.log("\nObject instanceName has a property, with " +
                                     "\n\t property-key " + propertyKey +
                                     "\n\t its associated value is " + err[propertyKey] +
                                     "\n\t and propertyKey " + propertyKey +
                                     " is its own is " +
                                     err.hasOwnProperty(propertyKey) );
                   */
                    this.isError = true;
                    console.log("UPDATE ACCT ERROR: " + error.error.message);
                    this.sendMessage(error.error.message);
                }
            );
    }

    changePassword() {
        this.isError = false;
        var p1 = this.myPasswordForm.value.password;
        var p2 = this.myPasswordForm.value.confirmPassword;
        if (p1 !== p2) {
            this.isError = true;
            this.sendMessage("Passwords do not match, please try again.");
            throw new Error("passwords do not match...");
        }
        const user = new User(
            null, null, this.myPasswordForm.value.password, null,null);
        this.authService.changePassword(this.user._id, this.myPasswordForm.value.password)
            .subscribe(
                data => {
                   this.sendMessage("Your password was successfully updated!");
                },
                error => {
                    let err: any;
                    err = error.error.message;
                  
                    this.isError = true;
                    this.sendMessage(error.error.message);
                }
            );

        this.myPasswordForm.reset();

    }

    ngOnInit() {

        this.messageService.currentMessage.subscribe(message => this.message = message);
        
        let userId = sessionStorage.getItem("userId");

        if (userId) {
            this.authService.getAccount(userId).map(
                (user: User) => {
                    this.user = user;
                })
                .finally(() => {
                    this.myForm = new FormGroup({
                    firstName: new FormControl(this.user.firstName, Validators.required),
                    lastName: new FormControl(this.user.lastName, Validators.required),
                    email: new FormControl(this.user.email, [
                        Validators.required,
                        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                    ]),
                    username: new FormControl(this.user.username, Validators.required)
                })
                
                this.isDone = true;
            }).subscribe()
        }
        else {
            this.sendMessage("There was a problem loading your account.");
            this.isDone = true;
        }

        this.myPasswordForm = new FormGroup({
            password: new FormControl(null, Validators.required),
            confirmPassword: new FormControl(null, Validators.required)
        })
        console.log("password form: " + this.myPasswordForm);

    }
    
    sendMessage(message:any): void {
        this.messageService.changeMessage(message);
    }

    ngOnDestroy() {
        this.messageService.clearMessage();
    }

    passwordChangeClick() {
        if (this.showPasswordChange) {
            this.showPasswordChange = false;
        }
        else {
            this.showPasswordChange = true;
        }
        console.log("showPassword: " + this.showPasswordChange);
    }

    cancel() {
        this.location.back(); 
    }

    getTooltip() {
        return "This is my hover text";
    }
}