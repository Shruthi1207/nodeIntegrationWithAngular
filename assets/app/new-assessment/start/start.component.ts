import { MessageService } from '../../shared/services';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


import { Assessment } from "./appDetail.model";
import { AssessmentService } from "./assessment.service";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../../auth/auth.service";
import { Location } from '@angular/common';
import { ModalComponent } from '../../shared/layout/modal.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {
  hasRunOnInit: boolean;
  private existingAssessment: Assessment;
  existingAppID: any;
  assessmentID: any;
  myForm: FormGroup;
  email: AbstractControl;
  require: boolean;
  isDone: boolean = false;
  lockMatrix: boolean = false;
  message: any
  isError: boolean = false;
  cleanMessage: boolean = true;



  constructor(private _location: Location, private router: Router, private assessmentService: AssessmentService, 
    private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService, private messageService: MessageService) {}

  


  ngOnInit() {
    this.hasRunOnInit = true;
    this.messageService.currentMessage.subscribe(message => this.message = message);
    //debugger;
    if (!this.authService.isLoggedIn())
      this.router.navigateByUrl('/auth/signin');

    this.route.params.subscribe((data) => {
      if (data.id) {
         this.existingAppID = data.id || ''; // existingAppID is unique ID from mongodb.
      }
      console.log("this.appID" + this.existingAppID);
    });

    if (this.existingAppID) {
        this.assessmentService.getAssessment(this.existingAppID).map(
        (assessment: Assessment) => {
           this.existingAssessment = assessment;
           this.lockMatrix = assessment.matrixSelectionsLocked;
        })
        .finally(() => {
           this.myForm = this.fb.group({
            appName: [this.existingAssessment.appName, Validators.required],
            appId: [this.existingAssessment.appId, [<any>Validators.required]],
            pcm: [this.existingAssessment.pcm ],
          //  title: [this.existingAssessment.title, [<any>Validators.required]],
            vp: [this.existingAssessment.vp],
          })
          this.isDone = true;
          console.log("existingAssessement" + this.existingAssessment);  
        }).subscribe();
      
      // debugger;                  
    } else {
      this.myForm = this.fb.group({
        appName: ['', Validators.required],
        appId: ["", [<any>Validators.required]],
        pcm: [''],
      //  title: ['', [<any>Validators.required]],
        vp: [''],        
      });
      this.isDone = true;
    }
  }

  save(assessmentModel: Assessment, isValid: boolean, btnName: string) {
    debugger;
    this.isError = false;
    
    console.log("assessmentModel" + assessmentModel, isValid);
    console.log("btnName" + btnName);
    
    
    if (this.existingAppID) {
      // Update the existing assessment  
      
      this.assessmentService.updateAssessment(assessmentModel, this.existingAppID)
        .subscribe(
          data => {
            this.sendMessage("Your Assessment was successfully updated!");
         },
         error => {
             let err: any;
             err = error.error.message;
           
             this.isError = true;
             this.sendMessage(error.error.message);
         });
    }
    
    else {
      
      // Add new assessment
      this.assessmentService.save(assessmentModel)
        .subscribe(
          data => {
            this.assessmentID = data.obj._id;
            this.existingAppID = data.obj._id;
            console.log("New AssessmentId: " + this.assessmentID);
            this.sendMessage("Your Assessment was successfully created!");
            this.router.navigate(['start', {id:this.existingAppID}]);
         },
         error => {
             let err: any;
             err = error.error.message;
           
             this.isError = true;
             this.sendMessage(error.error.message);
         });
    }

   
  }

 
  deleteAssessment(modal: ModalComponent) {
    modal.hide();
    this.isError = false;
    
    this.assessmentService.deleteAssessment(this.existingAppID)
        .subscribe(
            data => {
               this.sendMessage("The Assessment was successfully deleted!");
               this.cleanMessage = false;
               this.router.navigate(['home']);
            },
            error => {
                let err: any;
                err = error.error.message;
              
              //  this.isError = true;
                this.sendMessage(error.error.message);
            }
        );
        

  }

  backClicked() {
    this.router.navigate(['home']);
  }
  
  infoAppDetailsClick() {
    if (this.existingAppID)// Already created Assessment
      this.router.navigate(['infoAppDetails', { assessmentID: this.existingAppID }]);
    else if (this.assessmentID) // New assessment
      this.router.navigate(['infoAppDetails', { assessmentID: this.assessmentID }]);
  }

  decisionMatrixClick() {
    if (this.existingAppID)// Already created Assessment
      this.router.navigate(['matrix-summary', { assessmentID: this.existingAppID }]);
    else if (this.assessmentID) // New assessment
      this.router.navigate(['matrix-summary', { assessmentID: this.assessmentID }]);
  }

  hostingCalculatorClick(){
    if (this.existingAppID)// Already created Assessment
      this.router.navigate(['calc', { assessmentID: this.existingAppID }]);
    else if (this.assessmentID) // New assessment
      this.router.navigate(['calc', { assessmentID: this.assessmentID }]);
  }


  resultsClick() {
    this.router.navigate(['results', { assessmentID: this.existingAppID }]);
  }

  isLocked() {
    return this.lockMatrix;
  }
  
  isAdmin() {
      return this.authService.isAdmin();
  }

  sendMessage(message:any): void {
    this.messageService.changeMessage(message);
  }

  ngOnDestroy() {
      if (this.cleanMessage) {
        this.messageService.clearMessage();
      }
      this.cleanMessage = true;

  }


}
