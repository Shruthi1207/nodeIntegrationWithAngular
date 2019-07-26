import { Score } from './score.model';
import { MigrationGoal } from '../migration-goals/migrationGoal.model';
import { MigrationGoalService } from '../migration-goals/migration-goal.service';
import { Barrier } from '../barriers/barrier.model';
import { BarrierService } from '../barriers/barrier.service';
import { AssessmentMigrationGoal } from '../migration-goals/assessmentMigrationGoal.model';
import { AssessmentBarrier } from '../barriers/assessmentBarrier.model';
import { Observable } from 'rxjs/Rx';
import { AssessmentMigrationGoalService } from '../migration-goals/assessment-migration-goal.service';
import { AssessmentBarrierService } from '../barriers/assessment-barrier.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { Location } from '@angular/common';
import { HostingCalculatorService } from "../hosting_calculator/hostingCalculator.service";
import { AssessmentCalculation } from "../hosting_calculator/assessmentCalculation.model";
import { HostingResult } from "../hosting_calculator/hostingResult.model";
import { AssessmentService } from '../new-assessment/start/assessment.service';
import { Assessment } from '../new-assessment/start/appDetail.model';
import { AppDetailsService } from '../info about app/appDetails.service';
import { AssessmentAppDetails } from '../info about app/assessmentAppDetails.model';
import { AppDetailsQuestions } from '../info about app/appDetails.model';
import { debug } from 'util';

@Component({
    selector: "app-results",
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
    gcpAutoScalingPrice: number;
    awsAutoScalingPrice: number;
    azureAutoScalingPrice: number;
    GCPFinalPrice: number;
    AwsFinalPrice: number;
    AzureFinalPrice: number;
    GCPFinalDiscounts: number;
    AWSFinalDiscounts: number;
    AzureFinalDiscounts: number;
    RISUGCPDiscountedPrice: number;
    RISUAWSDiscountedPrice: number;
    RISUAzureDiscountedPrice: number;
    bbyAutoScalingPrice: number=0;
    BBYPublishedPrice: number=0;

    BBYStorageTotalPerType: number =0;
    AzureStorageTotalPerType: number=0;
    AWSStorageTotalPerType: number=0;    
    GCPStorageTotalPerType: number=0;
    

    BBYMonthlyCostComputeTotalPerType: number =0;
    AzureComputeTotalPerType: number=0;
    AWSComputeTotalPerType: number=0;    
    GCPComputeTotalPerType: number=0;
    

    ExpandStoragePricing: boolean = false;
    ExpandComputePricing: boolean = false;

    assessmentAppDetails: AssessmentAppDetails;
    selectedAssessmentAppDetails: any[] = [];
    appDetailsQuestions = new Map<string, AppDetailsQuestions>();
    appId: string;
    appName: string;
    warning: string;
    assessmentID: any;
    hasRunOnInit: boolean;
    barrierScores: any[] = [1, 1, 1, 1, 1, 1, 1];
    migrationGoalScores: any[] = [1, 1, 1, 1, 1, 1, 1];
    finalRawScores: any[] = [];
    finalScores: Score[] = [];
    isDone = false;
    assessmentBarrier: AssessmentBarrier;
    selectedCloudBarriers: any[] = [];
    barriers = new Map<string, Barrier>();

    assessmentMigrationGoal: AssessmentMigrationGoal;
    selectedMigrationGoals: any[] = [];
    selectedMigrationGoals3Weight: any[] = [];
    selectedMigrationGoals5Weight: any[] = [];
    goals = new Map<string, MigrationGoal>();
    shouldSeeMoreBarriers: boolean = false;
    shouldSeeMoreMigrationGoals: boolean = false;
    shouldSeeMoreMigrationGoals3: boolean = false;
    shouldSeeMoreMigrationGoals5: boolean = false;
    shouldSeeAssessmentAppDetails: boolean = false;
    showScores: boolean = false;
    ExpandPrice: boolean = false;
    ExpandDiscountedPrice: boolean = false;
    result: HostingResult;

    constructor(private location: Location, private assessmentBarrierService: AssessmentBarrierService, private assessmentMigrationGoalService: AssessmentMigrationGoalService
        , private route: ActivatedRoute, private authService: AuthService, private hostingCalculatorService: HostingCalculatorService
        , private router: Router, private barrierService: BarrierService, private migrationGoalService: MigrationGoalService,
        private assessmentService: AssessmentService, private appDetailsService: AppDetailsService
    ) { }


    ngOnInit() {
        this.hasRunOnInit = true;

        this.route.params.subscribe((data) => {
            this.assessmentID = data.assessmentID || ''; // existingAppID is unique ID from mongodb.
        });

        this.computeResults();
    }



    computeResults() {
        //  this.sleep(0).then(() => {
        Observable.forkJoin(

            this.appDetailsService.getAssessmentAppDetailsSelections(this.assessmentID)
                .map((assessmentAppDetails: AssessmentAppDetails) => {

                    this.assessmentAppDetails = assessmentAppDetails;
                    //   this.appDetailsGroup.patchValue(JSON.parse(this.assessmentAppDetails.selections));  

                }),
            this.assessmentBarrierService.getAssessmentBarrierSelections(this.assessmentID).map(
                (assessmentBarrier: AssessmentBarrier) => {
                    if (assessmentBarrier) {
                        this.assessmentBarrier = assessmentBarrier;
                        this.barrierScores = assessmentBarrier.scores;
                    }
                }),

            this.assessmentMigrationGoalService.getAssessmentMigrationGoalSelections(this.assessmentID).map(
                (assessmentMigrationGoal: AssessmentMigrationGoal) => {
                    if (assessmentMigrationGoal) {
                        this.assessmentMigrationGoal = assessmentMigrationGoal;
                        this.migrationGoalScores = assessmentMigrationGoal.scores;
                    }
                }),

            this.barrierService.getBarriers().map((barriers: Barrier[]) => {
                barriers.forEach(barrier => {
                    this.barriers.set(barrier.id, new Barrier(barrier.text, barrier.grouping, barrier.id, barrier.rank));
                })
            }),

            this.appDetailsService.getAppdetailsQuestions().map((appDetails: AppDetailsQuestions[]) => {
                appDetails.forEach(appDetailsQuestion => {
                    this.appDetailsQuestions.set(appDetailsQuestion.formcontrol, new AppDetailsQuestions(appDetailsQuestion.text, appDetailsQuestion.id, appDetailsQuestion.formcontrol,
                        appDetailsQuestion.subtype, appDetailsQuestion.controltype, appDetailsQuestion.parenttext, appDetailsQuestion.selected, appDetailsQuestion.mainParentText
                        , appDetailsQuestion.commonkey));
                })
            }),

            this.migrationGoalService.getMigrationGoals().map((migrationGoals: MigrationGoal[]) => {
                migrationGoals.forEach(migrationGoal => {
                    this.goals.set(migrationGoal.id, new MigrationGoal(migrationGoal.text, migrationGoal.grouping, migrationGoal.id, migrationGoal.rank));
                })
            }),

            this.hostingCalculatorService.getAssessmentCalculation(this.assessmentID).map(
                (assessmentCalculation: AssessmentCalculation) => {
                    console.log("assessmentCalculation" + assessmentCalculation);
                    //had to comment out below line as it was throwing null pointer exception and impacting
                    //the rest of results page.
                    //   console.log("assessmentCalculation.results"+assessmentCalculation.results);

                    if (assessmentCalculation && assessmentCalculation.results) {
                        this.result = assessmentCalculation.results[0];
                        this.result.SANCapacity = Math.round(this.result.SANCapacity);
                        this.result.FileNASCapacity = Math.round(this.result.FileNASCapacity);
                        this.result.ObjectCapacity = Math.round(this.result.ObjectCapacity);
                        this.result.BKPCapacity = Math.round(this.result.BKPCapacity);
                        if (assessmentCalculation.hostingCostUpdated == true) {
                            this.warning = "Hosting Cost has been updated. Please resubmit to get updated results!!";
                        }
                        else {
                            this.warning = "";
                        }
                        this.setComputeTotalPerType();
                        this.setStoragreTotalPerType();
                        this.setPublishedPricing();                        
                        this.setDiscountedPrice();
                        this.setFinalDiscounts();
                        this.setbbyAutoScalingPrice();
                    }
                }
            ),
            this.assessmentService.getAssessment(this.assessmentID).map(
                (assessment: Assessment) => {
                    this.appName = assessment.appName;
                    this.appId = assessment.appId;
                }),

        )
            .finally(() => {
                let comboScores: any[] = [];
                comboScores.push(this.barrierScores);
                comboScores.push(this.migrationGoalScores);
                const myObservables$ = comboScores.map((xs: any) => Observable.from(xs));
                const zipped$ = (a$) => Observable.zip(...myObservables$);

                const subscriber = zipped$(myObservables$).subscribe(x => {
                    //     console.log("scorerow: " + x);
                    let rollingTotal: number = 1;
                    for (var i = 0; i < x.length; i++) {
                        let score = x[i] as number;
                        //   console.log("math: " + rollingTotal + "*" + score);
                        rollingTotal = rollingTotal * score;
                    }
                    this.finalRawScores.push(rollingTotal);
                })
                const maxScore: number = Math.max(...this.finalRawScores);
                for (let score of this.finalRawScores) {
                    if (score == 0) {
                        this.finalScores.push(new Score(score, "Not an Option", "no-option final-cell"));
                    }
                    else if (score == maxScore) {
                        this.finalScores.push(new Score(score, "Best Match", "best-match final-cell"));
                    }
                    else {
                        if (score / maxScore > .65) {
                            this.finalScores.push(new Score(score, "Viable Option", "viable final-cell"));
                        }
                        else {
                            this.finalScores.push(new Score(score, "Not Optimal", "not-optimal final-cell"));
                        }
                    }
                }
                this.sortSelectedCloudBarriers();
                this.sortSelectedMigrationGoals();
                this.setAssessmentAppDetails();
                this.isDone = true;
            })
            .subscribe(),
            error => console.log(error)
    }

    setFinalDiscounts(){
        this.AzureFinalDiscounts = this.AzureFinalPrice - this.result.AzureDiscount * this.AzureFinalPrice * .01; //***** this is EA*******
        this.AWSFinalDiscounts = this.AwsFinalPrice - this.result.AWSDiscount * this.AwsFinalPrice * .01; //***** this is EA ********
        this.GCPFinalDiscounts = this.GCPFinalPrice - this.result.GCPDiscount * this.GCPFinalPrice * .01; //****** this is EA********
    }

    setDiscountedPrice(){
        this.RISUAzureDiscountedPrice = ((this.AzureComputeTotalPerType - (this.result.AzureDiscount *.01 * this.AzureComputeTotalPerType )) - 
        ((this.AzureComputeTotalPerType - (this.result.AzureDiscount*.01 * this.AzureComputeTotalPerType)) * this.result.riAzureDiscount *.01)) + 
        (this.AzureStorageTotalPerType - (this.result.AzureDiscount *.01 * this.AzureStorageTotalPerType)) + 
        (this.result.azureNetworkCost - (this.result.AzureDiscount *.01 * this.result.azureNetworkCost)) ; 

        this.RISUAWSDiscountedPrice = ((this.AWSComputeTotalPerType - (this.result.AWSDiscount *.01 * this.AWSComputeTotalPerType )) - 
        ((this.AWSComputeTotalPerType - (this.result.AWSDiscount*.01 * this.AWSComputeTotalPerType)) * this.result.riAWSDiscount *.01)) + 
        (this.AWSStorageTotalPerType - (this.result.AWSDiscount *.01 * this.AWSStorageTotalPerType)) + 
        (this.result.awsNetworkCost - (this.result.AWSDiscount *.01 * this.result.awsNetworkCost)) ; 


        this.RISUGCPDiscountedPrice = ((this.GCPComputeTotalPerType - (this.result.GCPDiscount *.01 * this.GCPComputeTotalPerType )) - 
        ((this.GCPComputeTotalPerType - (this.result.GCPDiscount*.01 * this.GCPComputeTotalPerType)) * this.result.suGCPDiscount *.01)) + 
        (this.GCPStorageTotalPerType - (this.result.GCPDiscount *.01 * this.GCPStorageTotalPerType)) + 
        (this.result.gcpNetworkCost - (this.result.GCPDiscount *.01 * this.result.gcpNetworkCost)) ; 
    }

    setbbyAutoScalingPrice(){
        this.bbyAutoScalingPrice = this.BBYPublishedPrice * (100 - this.result.BBYElasticitySavings) *.01;
        this.azureAutoScalingPrice = this.RISUAzureDiscountedPrice * this.result.AverageAutoScalingSaving; 
        this.awsAutoScalingPrice = this.RISUAWSDiscountedPrice * this.result.AverageAutoScalingSaving;
        this.gcpAutoScalingPrice = this.RISUGCPDiscountedPrice * this.result.AverageAutoScalingSaving;

    }

    setPublishedPricing(){  
        this.BBYPublishedPrice = this.BBYMonthlyCostComputeTotalPerType + this.BBYStorageTotalPerType ;
        this.AzureFinalPrice = this.AzureComputeTotalPerType + this.AzureStorageTotalPerType  + this.result.azureNetworkCost;
        this.AwsFinalPrice = this.AWSComputeTotalPerType + this.AWSStorageTotalPerType + this.result.awsNetworkCost;
        this.GCPFinalPrice = this.GCPComputeTotalPerType + this.GCPStorageTotalPerType + this.result.gcpNetworkCost;
    }

    setStoragreTotalPerType(){
        this.BBYStorageTotalPerType = this.result.SANCapacity * this.result.sanSSDCost + this.result.FileNASCapacity * this.result.FileNASCost + this.result.ObjectCapacity
        * this.result.objectCost + this.result.BKPCapacity * this.result.backupCost;

        this.AzureStorageTotalPerType = this.result.SANCapacity * this.result.sanSSDCostAzureStorage + this.result.FileNASCapacity * this.result.FileNASCostAzureStorage
        + this.result.ObjectCapacity * this.result.objectCostAzureStorage + this.result.BKPCapacity * this.result.backupCostAzureStorage;

        this.AWSStorageTotalPerType = this.result.SANCapacity * this.result.sanSSDCostAWSStorage + this.result.FileNASCapacity * this.result.FileNASCostAWSStorage
        + this.result.ObjectCapacity * this.result.objectCostAWSStorage + this.result.BKPCapacity * this.result.backupCostAWSStorage;

        this.GCPStorageTotalPerType = this.result.SANCapacity * this.result.sanSSDCostGCPStorage + this.result.FileNASCapacity * this.result.FileNASCostGCPStorage
        + this.result.ObjectCapacity * this.result.objectCostGCPStorage + this.result.BKPCapacity * this.result.backupCostGCPStorage;
    }

    setComputeTotalPerType() {
        
        if (!this.result.osPriceBBYType) {
            for (let s of this.result.BBYMonthlyCostComputeArray) {
                this.AzureComputeTotalPerType +=( (s.azurePriceRate + s.azurePriceRateVMOnly) * (s.noOfServers) * 740 )  ;
                this.AWSComputeTotalPerType += ((s.awsPriceRate+ s.awsPriceRateVMOnly)* (s.noOfServers)* 740);
                this.GCPComputeTotalPerType += ((s.gcpPriceRate+ s.gcpPriceRateVMOnly)* (s.noOfServers)* 740);
                this.BBYMonthlyCostComputeTotalPerType += ((s.bbyPriceRate+ s.VMbbyPriceRate)* (s.noOfServers)* 740);
            }
        }
        else {
            for (let s of this.result.BBYMonthlyCostComputeArray) {
                this.AzureComputeTotalPerType += ((s.bbyPriceRate + s.azurePriceRateVMOnly)* (s.noOfServers)* 740);
                this.AWSComputeTotalPerType += ((s.bbyPriceRate+ s.awsPriceRateVMOnly)* (s.noOfServers)* 740);
                this.GCPComputeTotalPerType += ((s.bbyPriceRate+ s.gcpPriceRateVMOnly)* (s.noOfServers)* 740);
                this.BBYMonthlyCostComputeTotalPerType +=( (s.bbyPriceRate+ s.VMbbyPriceRate)* (s.noOfServers)* 740);
            }
        }
    }

    getMaxProperty(arrayOfObjects, property) {
        const arrayOfValues = arrayOfObjects.map(obj => obj[property]);
        return Math.max(...arrayOfValues);
    }

    getScoreText(score: number) {
        if (score > 0) {
            return "Viable Option";
        }
        return "Not an Option";
    }

    cancel() {
        this.location.back();
    }

    sortSelectedCloudBarriers() {
        const sb: any[] = [];
        if (this.assessmentBarrier) {
            JSON.parse(this.assessmentBarrier.selections, function (key, value) {
                if (value == true) {
                    sb.push(key);
                }
            })
            for (let s of sb) {
                this.selectedCloudBarriers.push(this.barriers.get(s));
            }
            this.selectedCloudBarriers.sort((a, b) => {
                if (a.rank < b.rank) return -1;
                else if (a.rank > b.rank) return 1;
                else return 0;
            });
        }
    }
    setAssessmentAppDetails() {
        const sb: any[] = [];
        if (this.assessmentAppDetails) {

            JSON.parse(this.assessmentAppDetails.selections, function (key, value) {
                if (value == true || value == 'yes' || value == 'no' || value != '') {
                    // sb.push(key,value);
                    sb.push({ productkey: key, productValue: value });
                }
            })

            for (let s of sb) {
                if (this.appDetailsQuestions.get(s.productkey)) {
                    if (this.appDetailsQuestions.get(s.productkey).subtype != "subpart") {
                        if (this.appDetailsQuestions.get(s.productkey).controltype == "checkbox") {
                            this.selectedAssessmentAppDetails.push({ text: this.appDetailsQuestions.get(s.productkey).text, value: this.appDetailsQuestions.get(s.productkey).parenttext, commonkey: this.appDetailsQuestions.get(s.productkey).commonkey });
                        }
                        else
                            this.selectedAssessmentAppDetails.push({ text: this.appDetailsQuestions.get(s.productkey).text, value: s.productValue + " ", commonkey: this.appDetailsQuestions.get(s.productkey).commonkey });

                    }
                    else if (this.appDetailsQuestions.get(s.productkey).controltype != "textbox") {
                        if (this.selectedAssessmentAppDetails.length > 0 && this.appDetailsQuestions.get(s.productkey).commonkey == this.selectedAssessmentAppDetails[this.selectedAssessmentAppDetails.length - 1].commonkey) {
                            this.selectedAssessmentAppDetails[this.selectedAssessmentAppDetails.length - 1].value =
                                this.selectedAssessmentAppDetails[this.selectedAssessmentAppDetails.length - 1].value.toString() + "," +
                                this.appDetailsQuestions.get(s.productkey).text.toString();
                        }
                        else {
                            this.selectedAssessmentAppDetails.push({ text: this.appDetailsQuestions.get(s.productkey).mainParentText, value: this.appDetailsQuestions.get(s.productkey).text, commonkey: this.appDetailsQuestions.get(s.productkey).commonkey });
                        }


                    }
                    else {
                        if (this.selectedAssessmentAppDetails.length > 0 && this.appDetailsQuestions.get(s.productkey).commonkey == this.selectedAssessmentAppDetails[this.selectedAssessmentAppDetails.length - 1].commonkey) {
                            this.selectedAssessmentAppDetails[this.selectedAssessmentAppDetails.length - 1].value =
                                this.selectedAssessmentAppDetails[this.selectedAssessmentAppDetails.length - 1].value.toString() + "," +
                                s.productValue.toString();
                        }
                        else {
                            this.selectedAssessmentAppDetails.push({ text: this.appDetailsQuestions.get(s.productkey).mainParentText, value: s.productValue.toString(), commonkey: this.appDetailsQuestions.get(s.productkey).commonkey });
                        }
                        // considerin this is not radio button. if any case will come, will change the value. 
                    }

                }
            }
            // debugger;
            // this.selectedAssessmentAppDetails.sort((a, b) => {
            //     if (a.rank < b.rank) return -1;
            //     else if (a.rank > b.rank) return 1;
            //     else return 0;
            // });
        }
    }
    sortSelectedMigrationGoals() {
        const mg: any[] = [];
        const mg3: any[] = [];
        const mg5: any[] = [];

        if (this.assessmentMigrationGoal) {
            JSON.parse(this.assessmentMigrationGoal.selections, function (key, value) {
                if (value > 0) {
                    mg.push(key);
                }
                if (value == 3) {
                    mg3.push(key);
                }
                if (value == 5) {
                    mg5.push(key);
                }
            })
            for (let m of mg) {
                this.selectedMigrationGoals.push(this.goals.get(m));
            }
            for (let m of mg3) {
                this.selectedMigrationGoals3Weight.push(this.goals.get(m));
            }
            for (let m of mg5) {
                this.selectedMigrationGoals5Weight.push(this.goals.get(m));
            }
            this.selectedMigrationGoals.sort((a, b) => {
                if (a.rank < b.rank) return -1;
                else if (a.rank > b.rank) return 1;
                else return 0;
            });

            this.selectedMigrationGoals3Weight.sort((a, b) => {
                if (a.rank < b.rank) return -1;
                else if (a.rank > b.rank) return 1;
                else return 0;
            });
            this.selectedMigrationGoals5Weight.sort((a, b) => {
                if (a.rank < b.rank) return -1;
                else if (a.rank > b.rank) return 1;
                else return 0;
            });

        }
    }

    getSelectedBarriersCount() {
        if (this.selectedCloudBarriers) {
            return this.selectedCloudBarriers.length;
        }
        return 0;
    }
    // selectedCloudBarriers
    getAssessmentAppDetailsCount() {
        if (this.selectedAssessmentAppDetails) {
            return this.selectedAssessmentAppDetails.length;
        }
        return 0;
    }

    getSelectedMigrationGoalsCount() {
        if (this.selectedMigrationGoals) {
            return this.selectedMigrationGoals.length;
        }
        return 0;
    }
    getSelectedMigrationGoalsCountWeight3() {
        if (this.selectedMigrationGoals3Weight) {
            return this.selectedMigrationGoals3Weight.length;
        }
        return 0;
    }
    getSelectedMigrationGoalsCountWeight5() {
        if (this.selectedMigrationGoals5Weight) {
            return this.selectedMigrationGoals5Weight.length;
        }
        return 0;
    }

    seeMoreBarriers(val: boolean) {
        this.shouldSeeMoreBarriers = val;
    }
    seeMoreAssessmentAppDetails(val: boolean) {
        this.shouldSeeAssessmentAppDetails = val;
    }
    toggleSeeMoreAssessmentAppDetails(val: boolean) {
        this.shouldSeeAssessmentAppDetails = val;
    }


    seeMoreMigrationGoals(val: boolean) {
        this.shouldSeeMoreMigrationGoals = val;
    }

    seeMoreMigrationGoals3(val: boolean) {
        this.shouldSeeMoreMigrationGoals3 = val;
    }

    seeMoreMigrationGoals5(val: boolean) {
        this.shouldSeeMoreMigrationGoals5 = val;
    }

    getViewableBarrierCount() {
        if (this.shouldSeeMoreBarriers) {
            return this.selectedCloudBarriers.length;
        }
        return 3;
    }
    getViewableAssessmentAppDetailsCount() {
        if (this.shouldSeeAssessmentAppDetails) {
            return this.selectedAssessmentAppDetails.length;
        }
        return 3;
    }

    getViewableGoalCount() {
        if (this.shouldSeeMoreMigrationGoals) {
            return this.selectedMigrationGoals.length;
        }
        return 3;
    }
    getViewableGoalCountWeight3() {
        if (this.shouldSeeMoreMigrationGoals3) {
            return this.selectedMigrationGoals3Weight.length;
        }
        return 3;
    }
    getViewableGoalCountWeight5() {
        if (this.shouldSeeMoreMigrationGoals5) {
            return this.selectedMigrationGoals5Weight.length;
        }
        return 3;
    }

    toggleShowScores() {
        this.showScores = !this.showScores;
    }
    toggleStoragePricing() {
        this.ExpandStoragePricing = !this.ExpandStoragePricing;
    }
    togglePricing() {
        this.ExpandPrice = !this.ExpandPrice;
    }

    toggleDiscountedPricing() {
        this.ExpandDiscountedPrice = !this.ExpandDiscountedPrice;
    }

    toggleComputePricing() {
        this.ExpandComputePricing = !this.ExpandComputePricing;
    }

    areThereBarrierSelections() {
        return (this.selectedCloudBarriers.length > 0) ? true : false;
    }

    areThereSelectedAssessmentAppDetails() {
        return (this.selectedAssessmentAppDetails.length > 0) ? true : false;
    }

    areThereBenefitSelections() {
        return (this.selectedMigrationGoals.length > 0) ? true : false;
    }
    areThereMigrationGoals3Weight() {
        return (this.selectedMigrationGoals3Weight.length > 0) ? true : false;

    }
    areThereMigrationGoals5Weight() {
        return (this.selectedMigrationGoals5Weight.length > 0) ? true : false;
    }

    print(printSectionId: string) {
        let popupWinindow;
        let innerContents = document.getElementById(printSectionId).innerHTML;
        let windowHeight = document.getElementById(printSectionId).clientHeight;
        let windowWidth = document.getElementById(printSectionId).clientWidth;


        popupWinindow = window.open('', '_blank', 'width=' + windowWidth + ',height=' + windowHeight + ',scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="/stylesheets/print.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }
    decisionMatrixClick() {//this.assessmentID
        this.router.navigate(['matrix-summary', { assessmentID: this.assessmentID }]);
    }
    hostingCalculatorClick() {
        this.router.navigate(['calc', { assessmentID: this.assessmentID }]);
    }
    assessmentHomeClick() {
        this.router.navigate(['start', { id: this.assessmentID }]);
    }
    infoAppDetailsClick() {
        this.router.navigate(['infoAppDetails', { assessmentID: this.assessmentID }]);
    }

}