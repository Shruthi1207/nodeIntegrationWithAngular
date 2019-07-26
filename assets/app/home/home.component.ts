import { MessageService } from '../shared/services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ModalComponent } from "ng2-bs3-modal";
import { AssessmentService } from "../new-assessment/start/assessment.service";
import { Assessment } from "../new-assessment/start/appDetail.model";
import { AuthService } from "../auth/auth.service";


@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})

export class HomeComponent {
  
  @ViewChild('ExistingAppModal')
  ExistingAppModalComponent: ModalComponent;
  // @ViewChild('ExistingAppsComponent')
  //    ExistingAppModal: ModalComponent;
  // 
  private assessments: Assessment[] = [];  
  isError: boolean = false;
  message: any;
  
  constructor(private router: Router, private assessmentService: AssessmentService,
    private authService: AuthService, private messageService: MessageService) { }

  ngOnInit() {    
    this.messageService.currentMessage.subscribe(message => this.message = message);
    if(!this.authService.isLoggedIn())
      this.router.navigateByUrl('/auth/signin');
  }

  startNew = function () {
    this.router.navigateByUrl('/start');
  };

  
  OpenExisting(id: string) {
    console.log(id);
    this.router.navigate(['start', {id:id}]);
    //this.router.navigateByUrl('/start');
  }

 
  OpenExistingAppModal() {   
    this.assessments = []; 
    this.assessmentService.getUserAssessments()
      .subscribe(
      (assessments: Assessment[]) => {
        assessments.forEach(b => {
          this.assessments.push(b);
        })
      }
      );
    this.ExistingAppModalComponent.open();
  }

  ngOnDestroy() {
    this.messageService.clearMessage();
  }

  
}
