import { StartComponent } from './new-assessment/start/start.component';
import { DecisionMatrixSummaryComponent } from './decision-matrix/matrix-summary.component';
import { ResultsComponent } from './results/results.component';
import { MigrationGoalListComponent } from './migration-goals/migration-goal-list.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { BarrierListComponent } from './barriers/barrier-list.component';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AppDetailsComponent } from "./info about app/appDetails.component";
import { Help1Component } from "./help/help1.component";
import { Help2Component } from "./help/help2.component";
import { Help3Component } from "./help/help3.component";
import { AssumptionsComponent } from "./assumptions/assumptions.component";
import { AllPricingComponent } from "./allpricing/allPricing.component";
import { ManageAccountComponent } from "./auth/manage-account.component";
import { CalculatorComponent } from "./hosting_calculator/calculator.component";
import { BbyPricingComponent } from "./hosting_calculator/bbyPricing.component";
import { EditBarriersComponent } from './admin/editBarriers.component';
import { EditMigratonGoalsComponent } from './admin/editmigratonGoals.component';




const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'start', component: StartComponent },
    { path: 'barriers', component: BarrierListComponent },
    { path: 'migrationgoals', component: MigrationGoalListComponent },
    { path: 'auth/signin', component: SigninComponent },
    { path: 'auth/signup', component: SignupComponent },
    { path: 'auth/account', component: ManageAccountComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'infoAppDetails', component: AppDetailsComponent },
    { path: 'help', component: Help1Component },
    { path: 'help2', component: Help2Component },
    { path: 'help3', component: Help3Component },
    { path: 'assumptions', component: AssumptionsComponent },
    { path: 'allPricing', component: AllPricingComponent },
    { path: 'matrix-summary', component: DecisionMatrixSummaryComponent },
    { path: 'calc', component: CalculatorComponent },    
    { path: 'bby', component: BbyPricingComponent }, 
    { path: 'EditBarriers', component: EditBarriersComponent },  
    { path: 'EditMigrationGoals', component: EditMigratonGoalsComponent },  
];

export const routing = RouterModule.forRoot(APP_ROUTES);