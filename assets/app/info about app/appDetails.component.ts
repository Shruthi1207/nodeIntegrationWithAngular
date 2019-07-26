import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl,ReactiveFormsModule } from '@angular/forms';
import { AppDetailsService } from './appDetails.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AssessmentAppDetails } from "./assessmentAppDetails.model";
import { AuthService } from "../auth/auth.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './appDetails.component.html',
  styleUrls: ['./appDetails.component.css']
})

export class AppDetailsComponent implements OnInit {
  assessmentID: any;
  appDetailsGroup: FormGroup = new FormGroup({
    appArchitecture1: new FormControl(""),
    appArchitecture2: new FormControl(""),
    appArchitecture3: new FormControl(""),
    appArchitecture4: new FormControl(""),
    appArchitecture5: new FormControl(""),
    appArchitecture6: new FormControl(""),
    appArchitecture7: new FormControl(""),
    // appArchitecture8a: new FormControl(""),
    // appArchitecture8b: new FormControl(""),
    // appArchitecture8c: new FormControl(""),
    // appArchitecture8d: new FormControl(""),
    // appArchitecture8e: new FormControl(""),
    // appArchitecture8f: new FormControl(""),
    // appArchitecture8g: new FormControl(""),
    appWorkload: new FormControl(""),
    appWorkloadText: new FormControl(""),
    netServicesa: new FormControl(""),
    netServicesb: new FormControl(""),
    netServicesc: new FormControl(""),
    netServicesd: new FormControl(""),
    netServicesText: new FormControl(""),
    hostLocationa: new FormControl(""),
    hostLocationb: new FormControl(""),
    hostLocationc: new FormControl(""),
    pciCompliance: new FormControl(""),
    integrationd: new FormControl(""),
    integrationa: new FormControl(""),
    integrationb: new FormControl(""),
    integrationc: new FormControl(""),
    
    sla1: new FormControl(""),
    sla2a: new FormControl(""),
    // sla2b: new FormControl(""),
    sla2c: new FormControl(""),
    sla2d: new FormControl(""),
    sla3: new FormControl(""),
    bcdr1a: new FormControl(""),
    bcdr1b: new FormControl(""),
    bcdr1c: new FormControl(""),
    bcdr1d: new FormControl(""),
    bcdr1e: new FormControl(""),
    bcdr2a: new FormControl(""),
    bcdr2b: new FormControl(""),
    bcdr2c: new FormControl(""),
    bcdr2d: new FormControl(""),
    bcdr2e: new FormControl(""),
    //bcdr3: new FormControl(""),
    appDatabasea: new FormControl(""),
    appDatabaseb: new FormControl(""),
    appDatabasec: new FormControl(""),
    appDatabased: new FormControl(""),
    appDatabasee: new FormControl(""),
    appDatabaseText: new FormControl(""),
    appDependancyText: new FormControl(""),
    appDependancy: new FormControl(""),
    appSecurity1: new FormControl(""),
    appSecurity2a: new FormControl(""),
    appSecurity2b: new FormControl(""),
    appSecurity2c: new FormControl(""),
    appSecurity2d: new FormControl(""),
    appSecurity3: new FormControl(""),
    appSecurity4: new FormControl(""),
    appSecurity5: new FormControl(""),
    appSecurity6: new FormControl(""),
    appSecurity7: new FormControl(""),
    appSecurity8: new FormControl(""),
   // appSecurity9: new FormControl(""),
    appSecurity10: new FormControl(""),
    appSecurity10Text: new FormControl(""),
    appSecurity11: new FormControl(""),
    appSecurity12: new FormControl(""),
    appSecurity13: new FormControl(""),
    appSecurity14: new FormControl(""),    
    appSecurity16a: new FormControl(""),
    // appSecurity16b: new FormControl(""),
    appSecurity16c: new FormControl(""),
    appSecurity16d: new FormControl(""),
    appSecurity17: new FormControl(""),
    appSecurity18: new FormControl(""),
    appSecurity19: new FormControl(""),
    appSecurity20: new FormControl(""),
   // appSecurity21: new FormControl(""),
  });
  assessmentAppDetails: AssessmentAppDetails;
  saved : boolean = false;
  savedAlready : boolean = false;
  public myPicture:string;
  app8a: string = "";

  constructor(private location: Location, private fb: FormBuilder, private appDetailsService: AppDetailsService, private router: Router,private route: ActivatedRoute,private authService: AuthService) {}

  ngOnInit() {
    this.myPicture = '../../images/Workloads.jpg';
    console.log(this.myPicture);
    this.savedAlready = false;
    this.saved = false;
    if(!this.authService.isLoggedIn())
      this.router.navigateByUrl('/auth/signin');

    this.route.params.subscribe((data) => {
      this.assessmentID = data.assessmentID || ''; // existingAppID is unique ID from mongodb.
      console.log("this.assessmentID" + this.assessmentID);
    });
    
    this.appDetailsService.getAssessmentAppDetailsSelections(this.assessmentID)
    .subscribe((assessmentAppDetails: AssessmentAppDetails) => {
        this.assessmentAppDetails = assessmentAppDetails;
     //   this.appDetailsGroup.patchValue(JSON.parse(this.assessmentAppDetails.selections));  
   
        if (this.assessmentAppDetails) {
          this.savedAlready = true;
          this.appDetailsGroup.patchValue(JSON.parse(this.assessmentAppDetails.selections));
        }
    }); 
   
  }
  
  

  onSubmit() {
    if (this.assessmentAppDetails) {
      //edit
      if(this.appDetailsGroup.value.appArchitecture7 == "yes")
      {
        // this.appDetailsGroup.value.appArchitecture8a = "";
        // this.appDetailsGroup.value.appArchitecture8b = "";
        // this.appDetailsGroup.value.appArchitecture8c = "";
        // this.appDetailsGroup.value.appArchitecture8d = "";
        // this.appDetailsGroup.value.appArchitecture8e = "";
        // this.appDetailsGroup.value.appArchitecture8f = "";
        // this.appDetailsGroup.value.appArchitecture8g = "";
      }
      if(this.appDetailsGroup.value.integrationd == "no")
      {
        this.appDetailsGroup.value.integrationa = "";
        this.appDetailsGroup.value.integrationb = "";
        this.appDetailsGroup.value.integrationc = "";
      }
      this.assessmentAppDetails.selections = JSON.stringify(this.appDetailsGroup.value);
      this.appDetailsService.updateAssessmentAppDetailsSelections(this.assessmentAppDetails)
          .subscribe(
              result => {
                // this.router.navigateByUrl('/infoAppSecurity');
                //this.router.navigate(['matrix-summary', { assessmentID: this.assessmentID }]);
              }
          );
      this.saved = true;
      parent.scrollTo(0, 0);
  }
  else {
      //create
      const assessmentAppDetails = new AssessmentAppDetails(
        this.assessmentID, JSON.stringify(this.appDetailsGroup.value));
      this.appDetailsService.addAssessmentAppDetails(assessmentAppDetails)
        .subscribe(
            data => {
              // this.router.navigateByUrl('/infoAppSecurity');
              //this.router.navigate(['matrix-summary', { assessmentID: this.assessmentID }]);
            },
            error => console.error(error),
        );
        this.saved = true;
        parent.scrollTo(0, 0);
  }
}

activei() {
  (<HTMLInputElement>(document.getElementById("i1"))).disabled = false;
  (<HTMLInputElement>(document.getElementById("i2"))).disabled = false;
  (<HTMLInputElement>(document.getElementById("i3"))).disabled = false;
}

disablei() {
  (<HTMLInputElement>(document.getElementById("i1"))).checked = false;
  (<HTMLInputElement>(document.getElementById("i2"))).checked = false;
  (<HTMLInputElement>(document.getElementById("i3"))).checked = false;
  (<HTMLInputElement>(document.getElementById("i1"))).disabled = true;
  (<HTMLInputElement>(document.getElementById("i2"))).disabled = true;
  (<HTMLInputElement>(document.getElementById("i3"))).disabled = true;
}

back() {
  this.location.back(); 
}

cancel() {
   this.router.navigate(['start', { id: this.assessmentID }]);
}
assessmentHomeClick(){
  this.router.navigate(['start', {id:this.assessmentID}]);
}
decisionMatrixClick(){
  this.router.navigate(['matrix-summary', {assessmentID:this.assessmentID}]);
}

hostingCalculatorClick(){
    this.router.navigate(['calc', { assessmentID: this.assessmentID }]);
}

resultsClick() {
  this.router.navigate(['results', { assessmentID: this.assessmentID }]);
}
}