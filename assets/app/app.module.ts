import { AssessmentService } from './new-assessment/start/assessment.service';
import { MessageService } from './shared/services';
import { ConfigService } from './config.service';
import { DecisionMatrixSummaryComponent } from './decision-matrix/matrix-summary.component';
import { ResultsComponent } from './results/results.component';
import { AssessmentMigrationGoalService } from './migration-goals/assessment-migration-goal.service';
import { AssessmentBarrierService } from './barriers/assessment-barrier.service';
import { MigrationGoalService } from './migration-goals/migration-goal.service';
import { MigrationGoalListComponent } from './migration-goals/migration-goal-list.component';
import { BarrierService } from './barriers/barrier.service';
import { AppDetailsService } from './info about app/appDetails.service';
import { ErrorComponent } from './errors/error.component';
import { ErrorService } from './errors/error.service';
import { AuthService } from './auth/auth.service';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { SharedModule } from './shared/shared.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { BarrierListComponent } from "./barriers/barrier-list.component";
import { routing } from "./app.routing";
import { HeaderComponent } from "./shared/index";
import { FooterComponent } from "./shared/index";
import { ModalComponent } from './shared/index';
import { HomeComponent } from "./home/home.component";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
//import { NewAssessmentModule } from "./new-assessment/new-assessment.module";
import { StartComponent} from "./new-assessment/start/start.component";
import { AppDetailsComponent } from "./info about app/appDetails.component";
import { Help1Component } from "./help/help1.component";
import { Help2Component } from "./help/help2.component";
import { Help3Component } from "./help/help3.component";
import { AssumptionsComponent } from "./assumptions/assumptions.component";
import { AllPricingComponent } from "./allpricing/allPricing.component";
import { ManageAccountComponent } from "./auth/manage-account.component";
import { HostingCalculatorService } from "./hosting_calculator/hostingCalculator.service";
import { StorageCloudPriceService } from "./hosting_calculator/storageCloudPrice.service";
import { CalculatorComponent } from "./hosting_calculator/calculator.component";
import { CalculatorSubComponent } from "./hosting_calculator/CalculatorSub.component";
import { BbyPricingComponent } from "./hosting_calculator/bbyPricing.component";

import { NetworkPriceService } from "./hosting_calculator/networkPrice.service";

import {TooltipModule} from "ngx-tooltip";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EditBarriersComponent } from './admin/editBarriers.component';
import { EditMigratonGoalsComponent } from './admin/editmigratonGoals.component';




@NgModule({
    declarations: [
        AppComponent,
        StartComponent,
        BarrierListComponent,
        MigrationGoalListComponent,
        HeaderComponent,
        FooterComponent,
        SigninComponent,
        SignupComponent,
        ErrorComponent,
        ResultsComponent,
        HomeComponent,
        AppDetailsComponent,
        Help1Component,
        Help2Component,
        Help3Component,
        AssumptionsComponent,
        AllPricingComponent,
        DecisionMatrixSummaryComponent,
        ModalComponent,
        ManageAccountComponent,
        CalculatorComponent,
        CalculatorSubComponent,
        BbyPricingComponent,
        EditBarriersComponent,
        EditMigratonGoalsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        SharedModule,
        Ng2Bs3ModalModule,
        
        TooltipModule,
        Ng2SmartTableModule,    
      //  NewAssessmentModule
    ],
    bootstrap: [AppComponent],
    providers: [
        ConfigService, {
            provide: APP_INITIALIZER, 
            useFactory: (config: ConfigService) => () => config.load(),
            deps: [ConfigService], 
            multi: true
        },
        AssessmentService, AuthService, BarrierService, AssessmentBarrierService, MigrationGoalService, 
        AssessmentMigrationGoalService, AppDetailsService, ErrorService, MessageService,
        HostingCalculatorService,StorageCloudPriceService,NetworkPriceService],
})
export class AppModule {

}