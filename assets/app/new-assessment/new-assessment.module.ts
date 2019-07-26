import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { SharedModule } from '../shared/shared.module';

import { AssessmentService } from "./start/assessment.service";

const newAssessmentRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'start',
    component: StartComponent
  }
]);
@NgModule({
  imports: [
    newAssessmentRouting,
    CommonModule,
    SharedModule,
    
  ],
  declarations: [StartComponent],
  providers: [AssessmentService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NewAssessmentModule { }
