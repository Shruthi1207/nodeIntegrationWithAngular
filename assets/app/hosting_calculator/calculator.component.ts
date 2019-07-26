import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/Rx";
import { Location } from '@angular/common';
import { CalculatorSubComponent } from "./CalculatorSub.component";
import { AssessmentService } from "../new-assessment/start/assessment.service";
import { Assessment } from "../new-assessment/start/appDetail.model";
import { HostingCalculatorService } from "./hostingCalculator.service";
import { AssessmentCalculation } from "./assessmentCalculation.model";
import { HostingResult } from "./hostingResult.model";
import { HostingCalculator } from './hostingCalculator.model';
import { storageCloudPrice } from './storageCloudPrice.model';
import { networkPrice } from './networkPrice.model';
import { OtherConstants } from './otherconstants.model';
import { StorageCloudPriceService } from './storageCloudPrice.service';
import { NetworkPriceService } from './networkPrice.service';


@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {    
    RISUAzureDiscountedPrice =0;
    RISUAWSDiscountedPrice =0;
    RISUGCPDiscountedPrice =0;
    
    OsWeight=0;
    temp3=0;
    AverageAutoScalingSaving =0;
    AverageCost:number =0;
    WeightedAvgCost:number =0;
    WeightedCost:number =0;
    gcpAutoScalingPrice: number;
    awsAutoScalingPrice: number;
    azureAutoScalingPrice: number;
    bbyAutoScalingPrice: number;
    gcpNetworkCost: number;
    awsNetworkCost: number;
    azureNetworkCost: number;
    GCPStorageCost: number;
    AWSStorageCost: number;
    AZUREStorageCost: number;
    BBYStorageCost: number;
    AZUREFileNASCost: number;
    AZUREobjectCost: number;
    AZUREbackupCost: number;
    AZUREsanCost: number;
    
    AWSFileNASCost: number;
    AWSobjectCost: number;
    AWSbackupCost: number;
    AWSsanCost: number;

    GCPFileNASCost: number;
    GCPobjectCost: number;
    GCPbackupCost: number;
    GCPsanCost: number;



    BBYFileNASCost: number;
    BBYobjectCost: number;
    BBYbackupCost: number;
    BBYsanCost: number;
    sanSSDCostAWSStorage; FileNASCostAWSStorage; objectCostAWSStorage; backupCostAWSStorage;
    sanSSDCostGCPStorage ; FileNASCostGCPStorage; objectCostGCPStorage; backupCostGCPStorage;
    sanSSDCostAzureStorage:number; FileNASCostAzureStorage:number; objectCostAzureStorage:number; backupCostAzureStorage :number;
    backupCost: number;
    objectCost: number;
    FileNASCost: number;
    sanSSDCost: number;
    
    BBYMonthlyCostComputeArray: any[];
    AWSMonthlyCostComputeArray: any[];
    AZUREMonthlyCostComputeArray: any[];
    GCPMonthlyCostComputeArray: any[];

    azurepricing: HostingCalculator[] = [];
    AWSpricing: HostingCalculator[] = [];
    GCPpricing: HostingCalculator[] = [];
    bbypricing: HostingCalculator[] = [];

    azureStorageCloudPrice: storageCloudPrice[] = [];
    awsStorageCloudPrice: storageCloudPrice[] = [];
    gcpStorageCloudPrice: storageCloudPrice[] = [];
    bbyStorageCloudPrice: storageCloudPrice[] = [];

    networkPrices: networkPrice[] = [];

    private OtherConstants: OtherConstants[] = [];
    private PaaSsavings: number;
    public AzureDiscount: number;
    public AWSDiscount: number;
    public GCPDiscount: number;
    public riAzureDiscount: number;
    public riAWSDiscount: number;
    public suGCPDiscount: number;
    public BBYElasticitySavings: number;
    public osPriceSource: number;
    public osPriceBBYType :boolean;
    

    alreadyCreatedServer: any[] = [];
    servers: any[];
    assessmentCalculation: AssessmentCalculation;
    oldAssessmentCalculation: AssessmentCalculation;
    existingAssessment: Assessment;
    
    existingAppID: any;
    @ViewChild(CalculatorSubComponent) calculatorSubComponent: CalculatorSubComponent;
    myForm: FormGroup;
    BBYMonthlyCostComputeTotalPerTypes: number = 0;

    BBYMonthlyCostComputeTotalPerType = 0;
    BBYMonthlyCostStorageTotalPerType = 0;
    TotalPerServerTotalPerType = 0;

    totallines=0;
    SANCapacity=0;
    FileNASCapacity=0;
    ObjectCapacity=0;
    BKPCapacity =0;
    RetentionDays =0;
    totalNeworkingCount =0;

    AzureComputeTotalPerType = 0;
    AzureStorageTotalPerType = 0;
    AzureNetworkTotalPerType = 0;
    AzureTOTALPerServerTotalPerType = 0;
    AWSComputeTotalPerType = 0;
    AWSStorageTotalPerType = 0;
    AWSNetworkTotalPerType = 0;
    AWSTOTALPerServerTotalPerType = 0;
    GCPComputeTotalPerType = 0;
    GCPStorageTotalPerType = 0;
    GCPNetworkTotalPerType = 0;
    GCPTOTALPerServerTotalPerType: 0;

    AzureSavingsPerMonthTotal = 0;
    AWSSavingsPerMonthTotal = 0;
    GCPSavingsPerMonthtotal = 0;

    PaSSAzureSavingsPerMonthTotal = 0;
    PaSSAWSSavingsPerMonthTotal = 0;
    PaSSGCPSavingsPerMonthtotal = 0;

    sumDailyDataChangeRate=0;
    sumSanFileObject =0;

    AzureFinalDiscounts = 0;
    AWSFinalDiscounts = 0;
    GCPFinalDiscounts = 0;

    monthDiff(from, to) {
        var months = to.getMonth() - from.getMonth()
            + (12 * (to.getFullYear() - from.getFullYear()));

        if (to.getDate() < from.getDate()) {
            months--;
        }
        return months;
    }
    ngOnInit(): void {

        this.route.params.subscribe((data) => {
            this.existingAppID = data.assessmentID || ''; // existingAppID is unique ID from mongodb.
            console.log("this.appID" + this.existingAppID);
        });
        let newForm = this.fb.group({
            //  appearsOnce: ['InitialValue', [, Validators.maxLength(25)]],
            formArray: this.fb.array([])
        });

        if (this.existingAppID) {

            this.hostingCalculatorService.getAssessmentCalculation(this.existingAppID)
                .subscribe((assessmentCalculation: AssessmentCalculation) => {
                    this.oldAssessmentCalculation = assessmentCalculation;
                    console.log("this.assessmentCalculationvar" + this.oldAssessmentCalculation);
                    console.log("this.assessmentCalculationvar" + JSON.stringify(this.oldAssessmentCalculation));
                    if (assessmentCalculation != null && assessmentCalculation.servers != null) {
                        this.alreadyCreatedServer = assessmentCalculation.servers;
                        const arrayControl = <FormArray>newForm.controls['formArray'];
                        this.alreadyCreatedServer.forEach(item => {
                            let newGroup = this.fb.group({

                                server: [item.server, []],
                                noOfServers: [item.noOfServers, []],
                                IsClustered: [item.IsClustered, []],
                                environment: [item.environment, []],
                                size: [item.size, []],
                                os: [item.os, []],
                                usedForDb: [item.usedForDb, []],

                                periodicWorkload: [item.periodicWorkload, []],
                                base: [item.base, []],
                                monthsOfHighUsage: [item.monthsOfHighUsage, []],

                                
                                sanSSD: [item.sanSSD, []],
                                FileNAS: [item.FileNAS, []],
                                Object: [item.Object, []],
                                dailyDataChangeRate: [item.dailyDataChangeRate, []],
                                RetentionDays: [item.RetentionDays, []],//
                                backupSize: [item.backupSize, []],

                                ////
                                ExpectedOutboundTransfer: [item.ExpectedOutboundTransfer, []],
                                BBYMonthlyCostCompute: [item.BBYMonthlyCostCompute, []],
                                BBYMonthlyCostStorage: [item.BBYMonthlyCostStorage, []],
                                TotalPerServer: [item.TotalPerServer, []],
                                // 

                                AzureCompute: [item.AzureCompute, []],
                                AzureStorage: [item.AzureStorage, []],
                                AzureNetwork: [item.AzureNetwork, []],
                                AzureTotalPerServer: [item.AzureTotalPerServer, []],
                                AWSCompute: [item.AWSCompute, []],
                                AWSStorage: [item.AWSStorage, []],
                                AWSNetwork: [item.AWSNetwork, []],
                                AWSTotalPerServer: [item.AWSTotalPerServer, []],
                                GCPCompute: [item.GCPCompute, []],
                                GCPStorage: [item.GCPStorage, []],
                                GCPNetwork: [item.GCPNetwork, []],
                                GCPTotalPerServer: [item.GCPTotalPerServer, []],
                                SavingsPerMonth: [item.SavingsPerMonth, []],
                                AzureSavingsPerMonth: [item.AzureSavingsPerMonth, []],
                                AWSSavingsPerMonth: [item.AWSSavingsPerMonth, []],
                                GCPSavingsPerMonth: [item.GCPSavingsPerMonth, []],
                                PaSSSavingsPerMonth: [item.PaSSSavingsPerMonth, []],
                                PaSSAzureSavingsPerMonth: [item.PaSSAzureSavingsPerMonth, []],
                                PaSSAWSSavingsPerMonth: [item.PaSSAWSSavingsPerMonth, []],
                                PaSSGCPSavingsPerMonth: [item.PaSSGCPSavingsPerMonth, []],


                            });
                            arrayControl.push(newGroup);
                        });
                    } else {// no servers found.
                        const arrayControl = <FormArray>newForm.controls['formArray'];
                        let newGroup = this.fb.group({

                            server: ['', []],
                            noOfServers: [1, []],
                            IsClustered: new FormControl({ value: 'no', disabled: true }),
                            environment: ['', []],
                            size: ['', []],
                            os: ['', []],
                            usedForDb: ['no', []],

                            periodicWorkload: ['no', []],
                            base: ['', []],
                            monthsOfHighUsage: ['', []],

                            
                            sanSSD: ['', []],
                            FileNAS: ['', []],
                            Object: ['', []],
                            dailyDataChangeRate: [1, []],
                            RetentionDays: [17, []],//
                            backupSize: ['', []],

                            ////
                            ExpectedOutboundTransfer: ['', []],
                            BBYMonthlyCostCompute: ['', []],
                            BBYMonthlyCostStorage: ['', []],
                            TotalPerServer: ['', []],
                            // 

                            AzureCompute: ['', []],
                            AzureStorage: ['', []],
                            AzureNetwork: ['', []],
                            AzureTotalPerServer: ['', []],
                            AWSCompute: ['', []],
                            AWSStorage: ['', []],
                            AWSNetwork: ['', []],
                            AWSTotalPerServer: ['', []],
                            GCPCompute: ['', []],
                            GCPStorage: ['', []],
                            GCPNetwork: ['', []],
                            GCPTotalPerServer: ['', []],
                            SavingsPerMonth: ['', []],
                            AzureSavingsPerMonth: ['', []],
                            AWSSavingsPerMonth: ['', []],
                            GCPSavingsPerMonth: ['', []],
                            PaSSSavingsPerMonth: ['', []],
                            PaSSAzureSavingsPerMonth: ['', []],
                            PaSSAWSSavingsPerMonth: ['', []],
                            PaSSGCPSavingsPerMonth: ['', []],

                        });
                        arrayControl.push(newGroup);
                    }

                });



        }
        this.myForm = newForm;
        this.bbypricing = [];
        this.azurepricing = [];
        this.AWSpricing = [];
        this.GCPpricing = [];

        //        Observable.forkJoin(
        this.hostingCalculatorService.getPricing().map((price: HostingCalculator[]) => {
            price.forEach(b => {

                if (b.type == "bby") {
                    this.bbypricing.push(b);
                }
                else if (b.type == "azure") {
                    this.azurepricing.push(b);
                }
                else if (b.type == "AWS") {
                    this.AWSpricing.push(b);
                }
                else if (b.type == "GCP") {
                    this.GCPpricing.push(b);
                }
            }),
                error => console.error(error)
        }).finally(() => {
            console.log("data in bbypricing" + this.bbypricing);

        }).subscribe();
        //, this.storageCloudPriceService.getstorageCloudPrice()
        this.storageCloudPriceService.getstorageCloudPrice().map((price: storageCloudPrice[]) => {
            price.forEach(b => {

                if (b.storagetype == "azure") {
                    this.azureStorageCloudPrice.push(b);
                }
                else if (b.storagetype == "aws") {
                    this.awsStorageCloudPrice.push(b);
                }
                else if (b.storagetype == "gcp") {
                    this.gcpStorageCloudPrice.push(b);
                }
                else if (b.storagetype == "bby") {
                    this.bbyStorageCloudPrice.push(b);
                }
            }),
                error => console.error(error)
        }).finally(() => { }).subscribe();

        this.networkPriceService.getnetworkPrice().map((price: networkPrice[]) => {
            price.forEach(b => {

                if (b.networktype == "azure") {
                    this.networkPrices.push(b);
                }
                else if (b.networktype == "aws") {
                    this.networkPrices.push(b);
                }
                else if (b.networktype == "gcp") {
                    this.networkPrices.push(b);
                }
                else if (b.networktype == "bby") {
                    this.networkPrices.push(b);
                }
            }),
                error => console.error(error)
        }).finally(() => { }).subscribe();
        this.hostingCalculatorService.getOtherConstants().map((otherConstants: OtherConstants[]) => {
            otherConstants.forEach(b => {

                if (b.name == "PaaS savings") {
                    this.PaaSsavings = b.value;                    
                }
                else if (b.name == "Azure Discount") {
                    this.AzureDiscount = b.value;
                }
                else if (b.name == "AWS Discount") {
                    this.AWSDiscount = b.value;
                }
                else if (b.name == "GCP Discount") {
                    this.GCPDiscount = b.value;
                }
                else if (b.name == "RI Azure Discount") {
                    this.riAzureDiscount = b.value;
                }
                else if (b.name == "RI AWS Discount") {
                    this.riAWSDiscount = b.value;
                }
                else if (b.name == "SU GCP Discount") {
                    this.suGCPDiscount = b.value;
                }
                else if (b.name == "OS Price Source") {
                    this.osPriceSource = b.value;
                }
                else if(b.name == "BBY Elasticity savings"){                    
                    this.BBYElasticitySavings = b.value;
                    console.log("BBYElasticitySavings" + b.value);
                }

            }),
                error => console.error(error)
        }).finally(() => { }).subscribe();

        // )
        //   .finally(() => { console.log("finished at " + Date.now()); }).subscribe(() => console.log("running...." + Date.now()));



    }
    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
        private assessmentService: AssessmentService,
        private hostingCalculatorService: HostingCalculatorService, private storageCloudPriceService: StorageCloudPriceService,
        private networkPriceService: NetworkPriceService) {
    }
    addInput(): void {
        const arrayControl = <FormArray>this.myForm.controls['formArray'];
        let newGroup = this.fb.group({

            server: ['', []],
            noOfServers: [1, []],
            IsClustered: new FormControl({ value: 'no', disabled: true }),
            environment: ['', []],
            size: ['', []],
            os: ['', []],
            usedForDb: ['no', []],

            periodicWorkload: ['no', []],
            base: ['', []],
            monthsOfHighUsage: ['', []],

            
            sanSSD: ['', []],
            FileNAS: ['', []],
            Object: ['', []],
            dailyDataChangeRate: [1, []],
            RetentionDays: [17, []],
            backupSize: ['', []],
            ExpectedOutboundTransfer: ['', []],
            BBYMonthlyCostCompute: ['', []],
            BBYMonthlyCostStorage: ['', []],
            TotalPerServer: ['', []],

            // TotalPerServer
            AzureCompute: ['', []],
            AzureStorage: ['', []],
            AzureNetwork: ['', []],
            AzureTotalPerServer: ['', []],
            AWSCompute: ['', []],
            AWSStorage: ['', []],
            AWSNetwork: ['', []],
            AWSTotalPerServer: ['', []],
            GCPCompute: ['', []],
            GCPStorage: ['', []],
            GCPNetwork: ['', []],
            GCPTotalPerServer: ['', []],
            SavingsPerMonth: ['', []],
            AzureSavingsPerMonth: ['', []],
            AWSSavingsPerMonth: ['', []],
            GCPSavingsPerMonth: ['', []],
            PaSSSavingsPerMonth: ['', []],
            PaSSAzureSavingsPerMonth: ['', []],
            PaSSAWSSavingsPerMonth: ['', []],
            PaSSGCPSavingsPerMonth: ['', []],



        });
        arrayControl.push(newGroup);
    }
    delInput(index: number): void {
        const arrayControl = <FormArray>this.myForm.controls['formArray'];
        arrayControl.removeAt(index);
    }
    onSubmit(): void {
        this.OsWeight =0;
        this.temp3 =0;
        var myData = [];
        this.BBYMonthlyCostComputeTotalPerType = 0;
        this.BBYMonthlyCostStorageTotalPerType = 0;
        this.TotalPerServerTotalPerType = 0;
        this.AzureComputeTotalPerType = 0;
        this.AzureStorageTotalPerType = 0;
        this.AzureNetworkTotalPerType = 0;
        this.AzureTOTALPerServerTotalPerType = 0;
        this.AWSComputeTotalPerType = 0;
        this.AWSStorageTotalPerType = 0;
        this.AWSNetworkTotalPerType = 0;
        this.AWSTOTALPerServerTotalPerType = 0;
        this.GCPComputeTotalPerType = 0;
        this.GCPStorageTotalPerType = 0;
        this.GCPNetworkTotalPerType = 0;
        this.GCPTOTALPerServerTotalPerType = 0;
        this.AzureSavingsPerMonthTotal = 0;
        this.AWSSavingsPerMonthTotal = 0;
        this.GCPSavingsPerMonthtotal = 0;
        this.totallines =0;
        this.SANCapacity=0;
        this.FileNASCapacity=0;
        this.ObjectCapacity=0;

        console.log("this.azurepricing" + this.azurepricing);
        //console.log(this.myForm.value);
        
                        
            this.BBYMonthlyCostComputeArray= [];
            this.AWSMonthlyCostComputeArray= [];
            this.AZUREMonthlyCostComputeArray= [];
            this.GCPMonthlyCostComputeArray= [];

        
        this.myForm.value.formArray.forEach(element => {
            console.log(element)
            this.totallines ++;
            var obj = {
                server: element.server,
                noOfServers: element.noOfServers,
                IsClustered: element.IsClustered,
                environment: element.environment,
                size: element.size,
                os: element.os,
                usedForDb: element.usedForDb,

                periodicWorkload: element.periodicWorkload,
                base: +element.base,
                monthsOfHighUsage: +element.monthsOfHighUsage,
                
                sanSSD: +element.sanSSD,
                FileNAS: +element.FileNAS,
                Object: +element.Object,
                dailyDataChangeRate: +element.dailyDataChangeRate,
                RetentionDays: +element.RetentionDays,
                backupSize: 0,
                ExpectedOutboundTransfer: +element.ExpectedOutboundTransfer,


                BBYMonthlyCostCompute: 0,
                BBYMonthlyCostStorage: 0,
                TotalPerServer: 0,
                AzureCompute: 0,
                AzureStorage: 0,
                AzureNetwork: 0,
                AzureTotalPerServer: 0,
                AWSCompute: 0,
                AWSStorage: 0,
                AWSNetwork: 0,
                AWSTotalPerServer: 0,
                GCPCompute: 0,
                GCPStorage: 0,
                GCPNetwork: 0,
                GCPTotalPerServer: 0,
                SavingsPerMonth: 0, 
                BasePercenageUseForCalculation:0,                
                ModifiedSavingsPermonth:0,                  
                AzureSavingsPerMonth: 0,
                AWSSavingsPerMonth: 0,
                GCPSavingsPerMonth: 0,
                PaSSSavingsPerMonth: +element.PaSSSavingsPerMonth,
                PaSSAzureSavingsPerMonth: +element.PaSSAzureSavingsPerMonth,
                PaSSAWSSavingsPerMonth: +element.PaSSAWSSavingsPerMonth,
                PaSSGCPSavingsPerMonth: +element.PaSSGCPSavingsPerMonth,
                
            };


            // Set Backup Size Start
            obj.backupSize = ( +obj.sanSSD + +obj.FileNAS + +obj.Object) +
                (( +obj.sanSSD + +obj.FileNAS + +obj.Object) * ((+obj.dailyDataChangeRate) / 100) * +obj.RetentionDays)
            // Set Backup Size Complete
            if(this.osPriceSource == +"1"){
               // Use BBY OS Pricing
               this.osPriceBBYType = true; // in this case, for Os compte we will use bbyPriceRate
            }else if(this.osPriceSource == +"2") {
                // Use CSP OS Pricing
                this.osPriceBBYType = false;
            }


            //--------    BBYMonthlyCostCompute start-------------------------------------------------
            this.bbypricing.forEach(priceElement => {
                if (priceElement.size == obj.size) {
                    console.log("loopeing1");
                    if (obj.os == 'CentOS') {
                        console.log("hello 1"+ priceElement.centos +obj.size + obj.os + obj.noOfServers);                        
                        obj.BBYMonthlyCostCompute = (+priceElement.centos * 740 * +obj.noOfServers);

                        if(this.BBYMonthlyCostComputeArray.findIndex(x => (x.size==obj.size && x.os == obj.os))==-1){
                            this.BBYMonthlyCostComputeArray.push({ size : obj.size, os : obj.os, noOfServers : obj.noOfServers, bbyPriceRate: +priceElement.centos, azurePriceRate: 0 ,awsPriceRate: 0 ,gcpPriceRate: 0,VMbbyPriceRate: +priceElement.VM,azurePriceRateVMOnly: 0 ,gcpPriceRateVMOnly: 0 ,awsPriceRateVMOnly: 0   })
                        }else{
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).noOfServers = this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).noOfServers + +obj.noOfServers ;
                        }
                    }
                    else if (obj.os == 'RHEL') {
                        console.log("hello 2"+priceElement.RH+ obj.size + obj.os + obj.noOfServers);
                        obj.BBYMonthlyCostCompute = (+priceElement.RH * 740 * +obj.noOfServers);

                        if(this.BBYMonthlyCostComputeArray.findIndex(x => (x.size==obj.size && x.os == obj.os))==-1){
                            this.BBYMonthlyCostComputeArray.push({ size : obj.size, os : obj.os, noOfServers : obj.noOfServers, bbyPriceRate: +priceElement.RH , azurePriceRate: 0 ,awsPriceRate: 0 ,gcpPriceRate: 0,VMbbyPriceRate: +priceElement.VM,azurePriceRateVMOnly: 0 ,gcpPriceRateVMOnly: 0 ,awsPriceRateVMOnly: 0})
                        }else{
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).noOfServers = this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).noOfServers + +obj.noOfServers ;
                        }
                    }
                    else if (obj.os == 'Windows') {
                        console.log("hello 3"+priceElement.W+ obj.size + obj.os + obj.noOfServers);
                        obj.BBYMonthlyCostCompute = (+priceElement.W * 740 * +obj.noOfServers);

                        if(this.BBYMonthlyCostComputeArray.findIndex(x => (x.size==obj.size && x.os == obj.os))==-1){
                            this.BBYMonthlyCostComputeArray.push({ size : obj.size, os : obj.os, noOfServers : obj.noOfServers, bbyPriceRate: +priceElement.W , azurePriceRate: 0 ,awsPriceRate: 0 ,gcpPriceRate: 0,VMbbyPriceRate: +priceElement.VM,azurePriceRateVMOnly: 0,gcpPriceRateVMOnly: 0 ,awsPriceRateVMOnly: 0 })
                        }else{
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).noOfServers = this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).noOfServers + +obj.noOfServers ;
                        }
                    }
                    
                }
            });
            // ---------------  complete BBYMonthlyCostCompute-----------------------------------------------------------------
            //  --------------------------AzureCompute Start-------------------------------------
            var centosPrice =0;
            this.azurepricing.forEach(PriceElement => {
                if (PriceElement.size == obj.size) {
                    console.log("loopeing2");
                    console.log("Centos price for this size "+ PriceElement.centos);
                    centosPrice= +PriceElement.centos;
                    if (obj.os == 'CentOS') {
                        console.log(PriceElement.centos);
                        obj.AzureCompute = (+PriceElement.centos * 740 * +obj.noOfServers);

                        if(this.BBYMonthlyCostComputeArray.findIndex(x => (x.size==obj.size && x.os == obj.os))!=-1){
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).azurePriceRate = +PriceElement.centos - centosPrice ;
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).azurePriceRateVMOnly = centosPrice  ;
                        }
                    }
                    else if (obj.os == 'RHEL') {
                        console.log(PriceElement.RH);
                        obj.AzureCompute = (+PriceElement.RH * 740 * +obj.noOfServers);

                        if(this.BBYMonthlyCostComputeArray.findIndex(x => (x.size==obj.size && x.os == obj.os))!=-1){
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).azurePriceRate = +PriceElement.RH - centosPrice;
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).azurePriceRateVMOnly = centosPrice;
                        }
                    }
                    else if (obj.os == 'Windows') {
                        console.log(PriceElement.W);
                        obj.AzureCompute = (+PriceElement.W * 740 * +obj.noOfServers);

                        if(this.BBYMonthlyCostComputeArray.findIndex(x => (x.size==obj.size && x.os == obj.os))!=-1){
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).azurePriceRate = +PriceElement.W - centosPrice;
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).azurePriceRateVMOnly = centosPrice ;
                        }
                    }
                }
            });
            ///// ---------------------------complete AzureCompute-------------------------
            //  --------------------------AWSComputeCompute Start-------------------------------------
            this.AWSpricing.forEach(PriceElement => {
                if (PriceElement.size == obj.size) {
                    console.log("loopeing3");console.log("Centos price for this size "+ PriceElement.centos);
                    centosPrice= +PriceElement.centos;
                    if (obj.os == 'CentOS') {
                        console.log(PriceElement.centos);
                        obj.AWSCompute = (+PriceElement.centos * 740 * +obj.noOfServers);
                        if(this.BBYMonthlyCostComputeArray.findIndex(x => (x.size==obj.size && x.os == obj.os))!=-1){
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).awsPriceRate = +PriceElement.centos - centosPrice;
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).awsPriceRateVMOnly = centosPrice;
                        }
                    }
                    else if (obj.os == 'RHEL') {
                        console.log(PriceElement.RH);
                        obj.AWSCompute = (+PriceElement.RH * 740 * +obj.noOfServers);
                        if(this.BBYMonthlyCostComputeArray.findIndex(x => (x.size==obj.size && x.os == obj.os))!=-1){
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).awsPriceRate = +PriceElement.RH - centosPrice;
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).awsPriceRateVMOnly = centosPrice ;
                        }
                    }
                    else if (obj.os == 'Windows') {
                        console.log(PriceElement.W);
                        obj.AWSCompute = (+PriceElement.W * 740 * +obj.noOfServers);
                        if(this.BBYMonthlyCostComputeArray.findIndex(x => (x.size==obj.size && x.os == obj.os))!=-1){
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).awsPriceRate = +PriceElement.W - centosPrice;
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).awsPriceRateVMOnly  = centosPrice;
                        }
                    }
                }
            });
            ///// ---------------------------complete AWSComputeCompute-------------------------
            //  --------------------------GCPComputeCompute Start-------------------------------------
            this.GCPpricing.forEach(PriceElement => {
                if (PriceElement.size == obj.size) {
                    console.log("loopeing4");console.log("Centos price for this size "+ PriceElement.centos);
                    centosPrice= +PriceElement.centos;
                    if (obj.os == 'CentOS') {
                        console.log(PriceElement.centos);
                        obj.GCPCompute = (+PriceElement.centos * 740 * +obj.noOfServers);
                        if(this.BBYMonthlyCostComputeArray.findIndex(x => (x.size==obj.size && x.os == obj.os))!=-1){
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).gcpPriceRate = +PriceElement.centos - centosPrice ;
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).gcpPriceRateVMOnly = centosPrice ;
                        }
                    }
                    else if (obj.os == 'RHEL') {
                        console.log(PriceElement.RH);
                        obj.GCPCompute = (+PriceElement.RH * 740 * +obj.noOfServers);
                        if(this.BBYMonthlyCostComputeArray.findIndex(x => (x.size==obj.size && x.os == obj.os))!=-1){
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).gcpPriceRate = +PriceElement.RH - centosPrice;
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).gcpPriceRateVMOnly = centosPrice ;
                        }
                    }
                    else if (obj.os == 'Windows') {
                        console.log(PriceElement.W);
                        obj.GCPCompute = (+PriceElement.W * 740 * +obj.noOfServers);
                        if(this.BBYMonthlyCostComputeArray.findIndex(x => (x.size==obj.size && x.os == obj.os))!=-1){
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).gcpPriceRate = +PriceElement.W - centosPrice;
                            this.BBYMonthlyCostComputeArray.find(x => (x.size==obj.size && x.os == obj.os) ).gcpPriceRateVMOnly = centosPrice ;
                        }
                    }
                }
            });
            ///// ---------------------------complete GCPComputeCompute-------------------------
            
            if (obj.IsClustered == "no") {
                this.SANCapacity += +obj.sanSSD * +obj.noOfServers;
                this.FileNASCapacity += +obj.FileNAS * +obj.noOfServers;
                this.ObjectCapacity += +obj.Object * +obj.noOfServers;                
            }else{
                this.SANCapacity += +obj.sanSSD;
                this.FileNASCapacity += +obj.FileNAS;
                this.ObjectCapacity += +obj.Object;
            }
            //totallines


            // ---------- set BBY Monthly Cost Storage----------------------------------------
           // var  sanSSDCost, FileNASCost, objectCost, backupCost;
            this.bbyStorageCloudPrice.forEach(element => {

                
                if (element.tierindex == 1) {
                    this.sanSSDCost = +element.cost;
                }
                else if (element.tierindex == 3) {
                    this.FileNASCost = +element.cost;
                }
                else if (element.tierindex == 4) {
                    this.objectCost = +element.cost;
                }
                else if (element.tierindex == 5) {
                    this.backupCost = +element.cost;
                }
            });
            var totalcost =  (this.sanSSDCost * +obj.sanSSD)
                + (this.FileNASCost * +obj.FileNAS) + (this.objectCost * +obj.Object)
                + (this.backupCost * +obj.backupSize);
            //If # servers is n and Is Cluster? is YES – do not multiply storage cost by n, 
            //else (if NO is selected for Is Cluster?) – multiply storage cost by n
            if (obj.IsClustered == "no") {
                totalcost = totalcost * +obj.noOfServers;
            }
            obj.BBYMonthlyCostStorage = totalcost;

            // ---------- set AzureStorage Monthly Cost Storage----------------------------------------        
            
            this.azureStorageCloudPrice.forEach(element => {

                if (element.tierindex == 1) {
                    this.sanSSDCostAzureStorage = +element.cost;
                }
                else if (element.tierindex == 3) {
                    this.FileNASCostAzureStorage = +element.cost;
                }
                else if (element.tierindex == 4) {
                    this.objectCostAzureStorage = +element.cost;
                }
                else if (element.tierindex == 5) {
                    this.backupCostAzureStorage = +element.cost;
                }
            });
            var totalcostAzureStorage =  (this.sanSSDCostAzureStorage * +obj.sanSSD)
                + (this.FileNASCostAzureStorage * +obj.FileNAS) + (this.objectCostAzureStorage * +obj.Object)
                + (this.backupCostAzureStorage * +obj.backupSize);
            // BBYMonthlyCostStorage //=L39*$C$15+M39*$C$16+N39*$C$17+O39*$C$18+R39*$C$19
            totalcostAzureStorage = totalcostAzureStorage * +obj.noOfServers;
            obj.AzureStorage = totalcostAzureStorage;
            // --------set AzureStorage Monthly Cost Storage complete--------------------------------------------

            // ---------- set AWSStorage Monthly Cost Storage----------------------------------------
            
            this.awsStorageCloudPrice.forEach(element => {

                if (element.tierindex == 1) {
                    this.sanSSDCostAWSStorage = +element.cost;
                }
                else if (element.tierindex == 3) {
                    this.FileNASCostAWSStorage = +element.cost;
                }
                else if (element.tierindex == 4) {
                    this.objectCostAWSStorage = +element.cost;
                }
                else if (element.tierindex == 5) {
                    this.backupCostAWSStorage = +element.cost;
                }
            });
            var totalcostAWSStorage =  (this.sanSSDCostAWSStorage * +obj.sanSSD)
                + (this.FileNASCostAWSStorage * +obj.FileNAS) + (this.objectCostAWSStorage * +obj.Object)
                + (this.backupCostAWSStorage * +obj.backupSize);
            totalcostAWSStorage = totalcostAWSStorage * +obj.noOfServers;
            obj.AWSStorage = totalcostAWSStorage;
            // --------set AWSStorage Monthly Cost Storage complete--------------------------------------------

            // ---------- set GCPStorage Monthly Cost Storage----------------------------------------
            
            this.gcpStorageCloudPrice.forEach(element => {

                if (element.tierindex == 1) {
                    this.sanSSDCostGCPStorage = +element.cost;
                }
                else if (element.tierindex == 3) {
                    this.FileNASCostGCPStorage = +element.cost;
                }
                else if (element.tierindex == 4) {
                    this.objectCostGCPStorage = +element.cost;
                }
                else if (element.tierindex == 5) {
                    this.backupCostGCPStorage = +element.cost;
                }
            });
            var totalcostGCPStorage =  (this.sanSSDCostGCPStorage * +obj.sanSSD)
                + (this.FileNASCostGCPStorage * +obj.FileNAS) + (this.objectCostGCPStorage * +obj.Object)
                + (this.backupCostGCPStorage * +obj.backupSize);
            totalcostGCPStorage = totalcostGCPStorage * +obj.noOfServers;
            obj.GCPStorage = totalcostGCPStorage;
            // --------set GCPStorage Monthly Cost Storage complete--------------------------------------------

            // Set networkPrices start
            this.networkPrices.forEach(element => {
                if (element.index == +obj.ExpectedOutboundTransfer) {
                    if (element.networktype == 'azure') {
                        console.log(element.cost);
                        obj.AzureNetwork = (+element.cost * +obj.noOfServers);
                    }
                    else if (element.networktype == 'aws') {
                        console.log(element.cost);
                        obj.AWSNetwork = (+element.cost * +obj.noOfServers);
                    }
                    else if (element.networktype == 'gcp') {
                        console.log(element.cost);
                        obj.GCPNetwork = (+element.cost * +obj.noOfServers);
                    }
                }
            });

            if(+obj.ExpectedOutboundTransfer == 1) //"Small (< 1 TB)"
            {
                if (obj.IsClustered == "no") {
                    this.totalNeworkingCount = +this.totalNeworkingCount  + 1* +obj.noOfServers;
                }else{
                    this.totalNeworkingCount = +this.totalNeworkingCount + 1* 1;
                }
            }else if(+obj.ExpectedOutboundTransfer == 2) //"Medium (1 - 5 TB)"
            {
                if (obj.IsClustered == "no") {
                    this.totalNeworkingCount = +this.totalNeworkingCount  + 5* +obj.noOfServers;
                }else{
                    this.totalNeworkingCount = +this.totalNeworkingCount + 5* 1;
                }
            }else if(+obj.ExpectedOutboundTransfer == 3) //"Large (5 - 10 TB)"
            {
                if (obj.IsClustered == "no") {
                    this.totalNeworkingCount = +this.totalNeworkingCount  + 10* +obj.noOfServers;
                }else{
                    this.totalNeworkingCount = +this.totalNeworkingCount + 10* 1;
                }
            }else if(+obj.ExpectedOutboundTransfer == 4) //"Extra Large (10-20 TB)"
            {
                if (obj.IsClustered == "no") {
                    this.totalNeworkingCount = +this.totalNeworkingCount  + 20* +obj.noOfServers;
                }else{
                    this.totalNeworkingCount = +this.totalNeworkingCount + 20* 1;
                }
            }            


            // End networkPrices price
            console.log("obj.TotalPerServer "+ +obj.BBYMonthlyCostCompute + "  "+ obj.BBYMonthlyCostStorage);
            //console.log("obj.TotalPerServer "+ +obj.BBYMonthlyCostCompute + "  "+ obj.BBYMonthlyCostStorage);
            //console.log("obj.TotalPerServer "+ +obj.BBYMonthlyCostCompute + "  "+ obj.BBYMonthlyCostStorage);
           // console.log("obj.TotalPerServer "+ +obj.BBYMonthlyCostCompute + "  "+ obj.BBYMonthlyCostStorage);
            obj.TotalPerServer = ((+obj.BBYMonthlyCostCompute + +obj.BBYMonthlyCostStorage));
            obj.AzureTotalPerServer = (+obj.AzureCompute + +obj.AzureStorage + +obj.AzureNetwork);
            obj.AWSTotalPerServer = (+obj.AWSCompute + +obj.AWSStorage + +obj.AWSNetwork);
            obj.GCPTotalPerServer = (+obj.GCPCompute + +obj.GCPStorage + +obj.GCPNetwork);
            
            if (obj.periodicWorkload == "yes") {
                // 100%-((D49)+((12-D49)*C49))/12
                //=100%-((G129+((12-G129)*F129)))/12
               // var a=   100-  ( +obj.monthsOfHighUsage + ((12 - +obj.monthsOfHighUsage) * (+obj.base / 100)))/12 
               obj.BasePercenageUseForCalculation = +obj.base; 
                console.log("calculate autoscaling savings "+ (1 - (+obj.monthsOfHighUsage + ((12 - +obj.monthsOfHighUsage) * (+obj.base / 100))) / 12) * 100);
                var monthsOfHighUsageValue = (1 - (+obj.monthsOfHighUsage + ((12 - +obj.monthsOfHighUsage) * (+obj.base / 100))) / 12) * 100;
                console.log("monthsOfHighUsageValue"+ monthsOfHighUsageValue);
                obj.SavingsPerMonth = (monthsOfHighUsageValue);
                obj.ModifiedSavingsPermonth = (monthsOfHighUsageValue);
                
                obj.AzureSavingsPerMonth = (monthsOfHighUsageValue * +obj.AzureCompute * .01);
                obj.AWSSavingsPerMonth = (monthsOfHighUsageValue * +obj.AWSCompute * .01);
                obj.GCPSavingsPerMonth = (monthsOfHighUsageValue * +obj.GCPCompute * .01);
            }
            else {
                obj.monthsOfHighUsage = 0;
                obj.base = 0;
                obj.SavingsPerMonth = 0;
                obj.AzureSavingsPerMonth = 0;
                obj.AWSSavingsPerMonth = 0;
                obj.GCPSavingsPerMonth = 0;
                obj.BasePercenageUseForCalculation =100;
                obj.ModifiedSavingsPermonth = 100;
            }
            
            console.log("obj.SavingsPerMonth" + obj.SavingsPerMonth);
            console.log("obj.BBYMonthlyCostCompute" + obj.BBYMonthlyCostCompute);
            console.log("obj.ModifiedSavingsPermonth" + obj.ModifiedSavingsPermonth);
            // this.WeightedCost +=  (obj.SavingsPerMonth * obj.BBYMonthlyCostCompute) * .01;
            this.WeightedCost +=  (obj.ModifiedSavingsPermonth * obj.BBYMonthlyCostCompute) * .01;

            var temp1 =0 ;
            var currentWeight =0;
            temp1 = (((12 - +obj.monthsOfHighUsage)* (+obj.BasePercenageUseForCalculation )) + (100 * +obj.monthsOfHighUsage ))/12 ;
            console.log("temp1 "+ temp1);

            if(obj.size == "Small (2/8)"){
                currentWeight = 1 * obj.noOfServers;            
            }
            else if(obj.size == "Medium (4/32)"){
                currentWeight = 2 * obj.noOfServers;
            }
            else if(obj.size == "Large (8/64)"){
                currentWeight = 3 * obj.noOfServers;
            }
            else if(obj.size == "X-Large (16/64)"){
                currentWeight = 4 * obj.noOfServers;
            }
            else if(obj.size == "XXL (32/128)"){
                currentWeight = 5 * obj.noOfServers;
            }
            else if(obj.size == "XXXL (64/480)"){
                currentWeight = 6 * obj.noOfServers;
            }
            else if(obj.size == "Jumbo (>64 and >480)"){
                currentWeight = 7 * obj.noOfServers;
            }
            console.log("currentWeight * temp1 " + currentWeight * temp1);
            this.temp3 += currentWeight * temp1;
            console.log("this.temp3" + this.temp3);
            this.OsWeight += currentWeight;
            


            if (obj.usedForDb == "yes") {
            
                obj.PaSSSavingsPerMonth = (this.PaaSsavings);
                obj.PaSSAzureSavingsPerMonth = ((+obj.AzureCompute + +obj.AzureStorage) * this.PaaSsavings * .01);
                obj.PaSSAWSSavingsPerMonth = ((+obj.AWSCompute + +obj.AWSStorage) * this.PaaSsavings * .01);
                obj.PaSSGCPSavingsPerMonth = ((+obj.GCPCompute + +obj.GCPStorage) * this.PaaSsavings * .01);

            }
            else {
                obj.PaSSSavingsPerMonth = 0;
                obj.PaSSAzureSavingsPerMonth = 0;
                obj.PaSSAWSSavingsPerMonth = 0;
                obj.PaSSGCPSavingsPerMonth = 0;
            }

            this.BBYMonthlyCostComputeTotalPerType += +obj.BBYMonthlyCostCompute;
            this.BBYMonthlyCostStorageTotalPerType += +obj.BBYMonthlyCostStorage;
            this.TotalPerServerTotalPerType += +obj.TotalPerServer;

            this.AzureComputeTotalPerType += +obj.AzureCompute;
            this.AzureStorageTotalPerType += +obj.AzureStorage;
            this.AzureNetworkTotalPerType += +obj.AzureNetwork;
            this.AzureTOTALPerServerTotalPerType += +obj.AzureTotalPerServer;

            this.AWSComputeTotalPerType += +obj.AWSCompute;
            this.AWSStorageTotalPerType += +obj.AWSStorage;
            this.AWSNetworkTotalPerType += +obj.AWSNetwork;
            this.AWSTOTALPerServerTotalPerType += +obj.AWSTotalPerServer;

            this.GCPComputeTotalPerType += +obj.GCPCompute;
            this.GCPStorageTotalPerType += +obj.GCPStorage;
            this.GCPNetworkTotalPerType += +obj.GCPNetwork;
            this.GCPTOTALPerServerTotalPerType += +obj.GCPTotalPerServer;

            this.AzureSavingsPerMonthTotal += +obj.AzureSavingsPerMonth;
            this.AWSSavingsPerMonthTotal += +obj.AWSSavingsPerMonth;
            this.GCPSavingsPerMonthtotal += +obj.GCPSavingsPerMonth;

            this.PaSSAzureSavingsPerMonthTotal += +obj.PaSSAzureSavingsPerMonth;
            this.PaSSAWSSavingsPerMonthTotal += +obj.PaSSAWSSavingsPerMonth;
            this.PaSSGCPSavingsPerMonthtotal += +obj.PaSSGCPSavingsPerMonth;

            this.sumDailyDataChangeRate += +obj.dailyDataChangeRate;
            this.RetentionDays = +obj.RetentionDays;
            myData.push(obj);
        });
        
        console.log("this.SANCapacity  " + this.SANCapacity);
        console.log("this.FileNASCapacity " + this.FileNASCapacity);
        console.log("this.ObjectCapacity" + this.ObjectCapacity); 
        this.sumSanFileObject = +this.SANCapacity + +this.FileNASCapacity + +this.ObjectCapacity;  
        this.BKPCapacity=  ( (this.sumDailyDataChangeRate/(this.totallines*100)) * this.sumSanFileObject  * this.RetentionDays)   + this.sumSanFileObject
        console.log("this.BKPCapacity"+ this.BKPCapacity);

        this.BBYsanCost =  this.sanSSDCost * this.SANCapacity;
        this.BBYbackupCost =  this.backupCost * this.BKPCapacity;
        this.BBYobjectCost =  this.objectCost * this.ObjectCapacity;
        this.BBYFileNASCost =  this.FileNASCost * this.FileNASCapacity;
        
        this.BBYStorageCost = this.BBYsanCost + this.BBYbackupCost + this.BBYobjectCost +  this.BBYFileNASCost;

        this.AZUREsanCost =  this.sanSSDCostAzureStorage * this.SANCapacity;
        this.AZUREbackupCost =  this.backupCostAzureStorage * this.BKPCapacity;
        this.AZUREobjectCost =  this.objectCostAzureStorage * this.ObjectCapacity;
        this.AZUREFileNASCost =  this.FileNASCostAzureStorage * this.FileNASCapacity;

        this.AZUREStorageCost = this.AZUREsanCost + this.AZUREbackupCost + this.AZUREobjectCost +  this.AZUREFileNASCost;

        this.AWSsanCost =  this.sanSSDCostAWSStorage * this.SANCapacity;
        this.AWSbackupCost =  this.backupCostAWSStorage * this.BKPCapacity;
        this.AWSobjectCost =  this.objectCostAWSStorage * this.ObjectCapacity;
        this.AWSFileNASCost =  this.FileNASCostAWSStorage * this.FileNASCapacity;

        this.AWSStorageCost = this.AWSsanCost + this.AWSbackupCost + this.AWSobjectCost +  this.AWSFileNASCost;

        this.GCPsanCost =  this.sanSSDCostGCPStorage * this.SANCapacity;
        this.GCPbackupCost =  this.backupCostGCPStorage * this.BKPCapacity;
        this.GCPobjectCost =  this.objectCostGCPStorage * this.ObjectCapacity;
        this.GCPFileNASCost =  this.FileNASCostGCPStorage * this.FileNASCapacity;

        this.GCPStorageCost = this.GCPsanCost + this.GCPbackupCost + this.GCPobjectCost +  this.GCPFileNASCost;
        
        console.log("this.totalNeworkingCount"+ this.totalNeworkingCount);

        this.azureNetworkCost = +(this.networkPrices.filter(element => element.index == 1 && element.networktype == 'azure')[0].cost) *
            this.totalNeworkingCount;
        this.awsNetworkCost = +(this.networkPrices.filter(element => element.index == 1 && element.networktype == 'aws')[0].cost) *
            this.totalNeworkingCount;
        this.gcpNetworkCost = +(this.networkPrices.filter(element => element.index == 1 && element.networktype == 'gcp')[0].cost) *
            this.totalNeworkingCount;
        
         // 
        var AzureFinalPrice =   this.AzureComputeTotalPerType + (this.SANCapacity * this.sanSSDCostAzureStorage + this.FileNASCapacity * this.FileNASCostAzureStorage
        + this.ObjectCapacity * this.objectCostAzureStorage + this.BKPCapacity * this.backupCostAzureStorage) + this.azureNetworkCost;

            
        //this.AzureFinalDiscounts = this.AzureTOTALPerServerTotalPerType - this.AzureDiscount * this.AzureTOTALPerServerTotalPerType * .01;
        this.AzureFinalDiscounts = AzureFinalPrice - this.AzureDiscount * AzureFinalPrice * .01; //***** this is EA*******


        var AwsFinalPrice =   this.AWSComputeTotalPerType + (this.SANCapacity * this.sanSSDCostAWSStorage + this.FileNASCapacity * this.FileNASCostAWSStorage
            + this.ObjectCapacity * this.objectCostAWSStorage + this.BKPCapacity * this.backupCostAWSStorage) + this.awsNetworkCost;
    
            //this.AzureFinalDiscounts = this.AzureTOTALPerServerTotalPerType - this.AzureDiscount * this.AzureTOTALPerServerTotalPerType * .01;
        this.AWSFinalDiscounts = AwsFinalPrice - this.AWSDiscount * AwsFinalPrice * .01; //***** this is EA ********

        var GCPFinalPrice =    this.GCPComputeTotalPerType + (this.SANCapacity * this.sanSSDCostGCPStorage + this.FileNASCapacity * this.FileNASCostGCPStorage
            + this.ObjectCapacity * this.objectCostGCPStorage + this.BKPCapacity * this.backupCostGCPStorage) + this.gcpNetworkCost ;
    
            //this.AzureFinalDiscounts = this.AzureTOTALPerServerTotalPerType - this.AzureDiscount * this.AzureTOTALPerServerTotalPerType * .01;
        this.GCPFinalDiscounts = GCPFinalPrice - this.GCPDiscount * GCPFinalPrice * .01; //****** this is EA********


        //this.AWSFinalDiscounts =this.AWSTOTALPerServerTotalPerType - this.AWSDiscount * this.AWSTOTALPerServerTotalPerType * .01;
        //this.GCPFinalDiscounts = this.GCPTOTALPerServerTotalPerType - this.GCPDiscount * this.GCPTOTALPerServerTotalPerType * .01;

         this.bbyAutoScalingPrice = this.TotalPerServerTotalPerType * (100 - this.BBYElasticitySavings) *.01;
         this.WeightedAvgCost = this.WeightedCost /this.totallines;
         this.AverageCost = this.BBYMonthlyCostComputeTotalPerType/this.totallines;
         //this.AverageAutoScalingSaving = this.WeightedAvgCost / this.AverageCost;
         this.AverageAutoScalingSaving =  (this.temp3 /this.OsWeight) *.01;
         console.log("this.AverageAutoScalingSaving = " + this.AverageAutoScalingSaving +" "+ this.temp3 +" /"+ + this.OsWeight  );
         //obj.BBYMonthlyCostCompute
         console.log("this.WeightedAvgCost" + this.WeightedAvgCost + "  " + this.WeightedCost  + "  "  + this.AverageCost);
         //obj.WeightedCost
             // +obj.BBYMonthlyCostCompute   obj.SavingsPerMonth    this.totallines
        // this.azureAutoScalingPrice = this.AzureFinalDiscounts * this.AverageAutoScalingSaving;
        // this.awsAutoScalingPrice = this.AWSFinalDiscounts * this.AverageAutoScalingSaving;
        // this.gcpAutoScalingPrice = this.GCPFinalDiscounts * this.AverageAutoScalingSaving;

         var storageCostAzure = this.SANCapacity * this.sanSSDCostAzureStorage + this.FileNASCapacity * this.FileNASCostAzureStorage
         + this.ObjectCapacity * this.objectCostAzureStorage + this.BKPCapacity * this.backupCostAzureStorage;
         console.log("storageCostAzure="+ storageCostAzure); //azureNetworkCost // AzureComputeTotalPerType
 
         var storageCostAWS = this.SANCapacity * this.sanSSDCostAWSStorage + this.FileNASCapacity * this.FileNASCostAWSStorage
         + this.ObjectCapacity * this.objectCostAWSStorage + this.BKPCapacity * this.backupCostAWSStorage;
         console.log("storageCostAWS="+ storageCostAWS); //awsNetworkCost // AWSComputeTotalPerType
 
         var storageCostGCP = this.SANCapacity * this.sanSSDCostGCPStorage + this.FileNASCapacity * this.FileNASCostGCPStorage
         + this.ObjectCapacity * this.objectCostGCPStorage + this.BKPCapacity * this.backupCostGCPStorage;
         console.log("storageCostGCP="+ storageCostGCP); //gcpNetworkCost // GCPComputeTotalPerType
            
         this.RISUAzureDiscountedPrice = ((this.AzureComputeTotalPerType - (this.AzureDiscount *.01 * this.AzureComputeTotalPerType )) - 
         ((this.AzureComputeTotalPerType - (this.AzureDiscount*.01 * this.AzureComputeTotalPerType)) * this.riAzureDiscount *.01)) + 
         (storageCostAzure - (this.AzureDiscount *.01 * storageCostAzure)) + 
         (this.azureNetworkCost - (this.AzureDiscount *.01 * this.azureNetworkCost)) ; //((D8-E2*D8)-(D8-E2*D8)*C2)+(D9-E2*D9)+(D10-E2*D10)
         console.log("RISUAzureDiscountedPrice="+ this.RISUAzureDiscountedPrice);
         this.azureAutoScalingPrice = this.RISUAzureDiscountedPrice * this.AverageAutoScalingSaving; 
         
         this.RISUAWSDiscountedPrice = ((this.AWSComputeTotalPerType - (this.AWSDiscount *.01 * this.AWSComputeTotalPerType )) - 
         ((this.AWSComputeTotalPerType - (this.AWSDiscount*.01 * this.AWSComputeTotalPerType)) * this.riAWSDiscount *.01)) + 
         (storageCostAWS - (this.AWSDiscount *.01 * storageCostAWS)) + 
         (this.awsNetworkCost - (this.AWSDiscount *.01 * this.awsNetworkCost)) ; 
         console.log("RISUAWSDiscountedPrice="+ this.RISUAWSDiscountedPrice);
         this.awsAutoScalingPrice = this.RISUAWSDiscountedPrice * this.AverageAutoScalingSaving;

         this.RISUGCPDiscountedPrice = ((this.GCPComputeTotalPerType - (this.GCPDiscount *.01 * this.GCPComputeTotalPerType )) - 
         ((this.GCPComputeTotalPerType - (this.GCPDiscount*.01 * this.GCPComputeTotalPerType)) * this.suGCPDiscount *.01)) + 
         (storageCostGCP - (this.GCPDiscount *.01 * storageCostGCP)) + 
         (this.gcpNetworkCost - (this.GCPDiscount *.01 * this.gcpNetworkCost)) ; 
            console.log("RISUGCPDiscountedPrice="+ this.RISUGCPDiscountedPrice); 
            this.gcpAutoScalingPrice = this.GCPFinalDiscounts * this.AverageAutoScalingSaving;

        console.log("this.azureNetworkCost"+ this.azureNetworkCost);
        console.log("this.awsNetworkCost"+ this.awsNetworkCost);
        console.log("this.gcpNetworkCost"+ this.gcpNetworkCost);

        console.log("Results 1:1  " + this.TotalPerServerTotalPerType);
        console.log("Results 1:1 Azure " + this.AzureTOTALPerServerTotalPerType);
        console.log("Results 1:1  AWS" + this.AWSTOTALPerServerTotalPerType);
        console.log("Results 1:1  GCP" + this.GCPTOTALPerServerTotalPerType);


        console.log("Reperformed for elasticity Azure " + this.AzureSavingsPerMonthTotal);
        console.log("Reperformed for elasticity  AWS" + this.AWSSavingsPerMonthTotal);
        console.log("Reperformed for elasticity  GCP" + this.GCPSavingsPerMonthtotal);


        console.log("Refactored for DBaaS Azure " + this.PaSSAzureSavingsPerMonthTotal);//to use
        console.log("Refactored for DBaaS  AWS" + this.PaSSAWSSavingsPerMonthTotal);
        console.log("Refactored for DBaaS  GCP" + this.PaSSGCPSavingsPerMonthtotal);
        
        
        console.log("Discount (reserved instances) Azure " + this.AzureFinalDiscounts);
        console.log("Discount (reserved instances)  AWS" + this.AWSFinalDiscounts);
        console.log("Discount (reserved instances)  GCP" + this.GCPFinalDiscounts);
        
        

        // SANCapacity=0;
        // FileNASCapacity=0;
        // ObjectCapacity=0;
        // BKPCapacity =0;
        


        var result = new HostingResult(
            this.AverageAutoScalingSaving,
            this.AWSDiscount,
            this.riAWSDiscount,this.GCPDiscount,this.suGCPDiscount,this.AzureDiscount,this.riAzureDiscount,
            this.osPriceBBYType,
            this.RISUAzureDiscountedPrice,this.RISUAWSDiscountedPrice,this.RISUGCPDiscountedPrice,
            this.BBYElasticitySavings,this.azureAutoScalingPrice,this.awsAutoScalingPrice,this.gcpAutoScalingPrice,
            this.azureNetworkCost,this.awsNetworkCost,this.gcpNetworkCost,
            this.sanSSDCost,
            this.FileNASCost,
            this.objectCost,
            this.backupCost,
            this.sanSSDCostAWSStorage, this.FileNASCostAWSStorage, this.objectCostAWSStorage, this.backupCostAWSStorage,
            this.sanSSDCostGCPStorage , this.FileNASCostGCPStorage,this.objectCostGCPStorage, this.backupCostGCPStorage,
            this.sanSSDCostAzureStorage, this.FileNASCostAzureStorage, this.objectCostAzureStorage, this.backupCostAzureStorage ,
            
            this.SANCapacity,this.FileNASCapacity,this.ObjectCapacity,this.BKPCapacity,
            this.BBYMonthlyCostComputeArray,this.BBYMonthlyCostComputeTotalPerType,
            this.AzureComputeTotalPerType,this.AWSComputeTotalPerType,this.GCPComputeTotalPerType,
            this.TotalPerServerTotalPerType, this.AzureTOTALPerServerTotalPerType,
            this.AWSTOTALPerServerTotalPerType, this.GCPTOTALPerServerTotalPerType,
            this.AzureSavingsPerMonthTotal, this.AWSSavingsPerMonthTotal,
            this.GCPSavingsPerMonthtotal,
            this.PaSSAzureSavingsPerMonthTotal, this.PaSSAWSSavingsPerMonthTotal,
            this.PaSSGCPSavingsPerMonthtotal, this.AzureFinalDiscounts,
            this.AWSFinalDiscounts, this.GCPFinalDiscounts
            
        );
        
        

        if (this.oldAssessmentCalculation) {
            // Update
            this.oldAssessmentCalculation.servers = myData;
            this.oldAssessmentCalculation.results = result;
            this.oldAssessmentCalculation.hostingCostUpdated = false;
            this.hostingCalculatorService.updateAssessmentCalculation(this.oldAssessmentCalculation)
                .finally(() => console.log(" updateAssessmentBarrier done"))
                .subscribe();
        }
        else { // new
            this.assessmentCalculation = new AssessmentCalculation(this.existingAppID,
                myData, result,false);
            this.hostingCalculatorService.addAssessmentCalculation(this.assessmentCalculation)
                .finally(() => console.log("done"))
                .subscribe();
        }


        this.router.navigate(['results', { assessmentID: this.existingAppID }]);
        

    }
    infoAppDetailsClick(){
        this.router.navigate(['infoAppDetails', { assessmentID: this.existingAppID }]);
    }
    matrixSummaryClick(){
        this.router.navigate(['matrix-summary', { assessmentID: this.existingAppID }]);
    }
    assessmentHomeClick(){
        this.router.navigate(['start', {id:this.existingAppID}]);
      }
      resultsClick() {
        this.router.navigate(['results', { assessmentID: this.existingAppID }]);
      }
    cancel() {
        this.router.navigate(['start', { id: this.existingAppID }]);
    }



}
