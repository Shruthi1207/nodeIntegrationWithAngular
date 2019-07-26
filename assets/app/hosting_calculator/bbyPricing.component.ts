import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl,ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HostingCalculator } from './hostingCalculator.model';
import { HostingCalculatorService } from './hostingCalculator.service';
import { StorageCloudPriceService } from './storageCloudPrice.service';
import { NetworkPriceService } from './networkPrice.service';
import {Http, Headers, Response} from '@angular/http';
import { BbyPricingValues } from './bbyPricingValues.model';
import { storageCloudPrice } from './storageCloudPrice.model';
import { networkPrice } from './networkPrice.model';
import { OtherConstants } from './otherconstants.model';
import { BbyPricing } from './BbyPricing.model';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'bby-pricing',
  templateUrl: './bbyPricing.component.html',
  styleUrls: ['./bbyPricing.component.css']
})


export class BbyPricingComponent implements OnInit {
  bbyGroup: FormGroup = new FormGroup({
    // appArchitecture1: new FormControl(""),
    OSPriceSource: new FormControl("", Validators.required), 
    VM1: new FormControl("", Validators.required), 
    VM2: new FormControl("", Validators.required),
    VM3: new FormControl("", Validators.required),
    VM4: new FormControl("", Validators.required),
    VM5: new FormControl("", Validators.required), 
    VM6: new FormControl("", Validators.required),
    VM7: new FormControl("", Validators.required),
    centos1: new FormControl("", Validators.required), 
    centos2: new FormControl("", Validators.required),
    centos3: new FormControl("", Validators.required),
    centos4: new FormControl("", Validators.required),
    centos5: new FormControl("", Validators.required), 
    centos6: new FormControl("", Validators.required),
    centos7: new FormControl("", Validators.required),
    RH1: new FormControl("", Validators.required),
    RH2: new FormControl("", Validators.required),
    RH3: new FormControl("", Validators.required),
    RH4: new FormControl("", Validators.required),
    RH5: new FormControl("", Validators.required),
    RH6: new FormControl("", Validators.required),
    RH7: new FormControl("", Validators.required),
    W1: new FormControl("", Validators.required),
    W2: new FormControl("", Validators.required),
    W3: new FormControl("", Validators.required),
    W4: new FormControl("", Validators.required),
    W5: new FormControl("", Validators.required),
    W6: new FormControl("", Validators.required),
    W7: new FormControl("", Validators.required),
    // Sperf: new FormControl("", Validators.required),
    San: new FormControl("", Validators.required),
    NAS: new FormControl("", Validators.required),
    Obj: new FormControl("", Validators.required),
    Bkup: new FormControl("", Validators.required),
    azureDis: new FormControl("", Validators.required),  
    awsDis: new FormControl("", Validators.required),
    gcpDis: new FormControl("", Validators.required),
    riazureDis: new FormControl("", Validators.required),  
    riawsDis: new FormControl("", Validators.required),
    sugcpDis: new FormControl("", Validators.required),    
    bes: new FormControl("", Validators.required),
    paas: new FormControl("", Validators.required),
    // dep: new FormControl("", Validators.required),
  });
   bbyComputePricingValues: BbyPricingValues[] = [];
   bbyComputeValues: BbyPricingValues[] = [];
   gcpComputePricingValues: BbyPricingValues[] = [];
   gcpComputeValues: BbyPricingValues[] = [];
   awsComputePricingValues: BbyPricingValues[] = [];
   awsComputeValues: BbyPricingValues[] = [];
   azureComputePricingValues: BbyPricingValues[] = [];
   azureComputeValues: BbyPricingValues[] = [];
   bbyStoragePricingValues: storageCloudPrice[] = [];
   bbyStorageValues: storageCloudPrice[] = [];
   gcpStoragePricingValues: storageCloudPrice[] = [];
   gcpStorageValues: storageCloudPrice[] = [];
   awsStoragePricingValues: storageCloudPrice[] = [];
   awsStorageValues: storageCloudPrice[] = [];
   bbyOtherPricingValues: OtherConstants[] = [];
   bbyOtherValues: OtherConstants[] = [];
   gcpNetworkPricingValues: networkPrice[] = [];
   gcpNetworkValues: networkPrice[] = [];
   awsNetworkPricingValues: networkPrice[] = [];
   awsNetworkValues: networkPrice[] = [];
   bbyPricing: BbyPricing;
   success: boolean = false;
   refresh: boolean = false;
   loading : boolean = false;
   isInitialized: boolean = true;

    constructor(private location: Location, private fb: FormBuilder, private router: Router,
      private route: ActivatedRoute, private pricingService: HostingCalculatorService, 
      private storageService: StorageCloudPriceService, private networkService: NetworkPriceService,
      private authService: AuthService) {
    }
    
    ngOnInit() {
      this.isInitialized = false;
      if (!this.authService.isAdmin())
      this.router.navigateByUrl('/auth/signin');
      
      this.loading= false;
      this.success = false;
      this.pricingService.getBbyPricing()
      .map((bbyPricing: BbyPricing) => {
          this.bbyPricing = bbyPricing;
          if (this.bbyPricing) {
            this.bbyGroup.patchValue(JSON.parse(this.bbyPricing.entries));  
          }
      }).subscribe(); 
      this.bbyComputeValues = [];
      this.gcpComputeValues = [];
      this.awsComputeValues = [];
      this.azureComputeValues = [];
      this.bbyComputePricingValues = [];
      this.gcpComputePricingValues = [];
      this.awsComputePricingValues = [];
      this.azureComputePricingValues =[];
      this.bbyStoragePricingValues = [];
      this.gcpStoragePricingValues = [];
      this.awsStoragePricingValues = [];
      this.bbyStorageValues = [];
      this.gcpStorageValues = [];
      this.awsStorageValues = [];
      this.bbyOtherValues = [];
      this.bbyOtherPricingValues = [];
      this.gcpNetworkValues = [];
      this.awsNetworkValues = [];
      this.gcpNetworkPricingValues = [];
      this.awsNetworkPricingValues = [];
      
      Observable.forkJoin(
      this.pricingService.getBbyComputePricing()
        .map(
            data => {
              console.log("d1: " + data);
              for(let x of data){
                if(x.type == "bby"){
                    this.bbyComputeValues.push(new BbyPricingValues(x.type,x.size,x.centos,x.RH,x.W,x.VM, x._id));
                }
                if(x.type == "GCP"){
                    this.gcpComputeValues.push(new BbyPricingValues(x.type,x.size,x.centos,x.RH,x.W,x.VM,x._id));
                }
                if(x.type == "AWS"){
                  this.awsComputeValues.push(new BbyPricingValues(x.type,x.size,x.centos,x.RH,x.W,x.VM,x._id));
              }
              if(x.type == "azure"){
                this.azureComputeValues.push(new BbyPricingValues(x.type,x.size,x.centos,x.RH,x.W,x.VM,x._id));
            }
              }
            },
            error => console.error(error),
        ),

        this.storageService.getBbyStoragePricing()
        .map(
            data => {
              console.log("d2: " +data);
              for(let x of data){
                if(x.storagetype == "bby"){
                  this.bbyStorageValues.push(new storageCloudPrice(x.storagetype,x.tierindex,x.tier,x.cost,x._id));
                }
                if(x.storagetype == "gcp"){
                  this.gcpStorageValues.push(new storageCloudPrice(x.storagetype,x.tierindex,x.tier,x.cost,x._id));
                }
                if(x.storagetype == "aws"){
                  this.awsStorageValues.push(new storageCloudPrice(x.storagetype,x.tierindex,x.tier,x.cost,x._id));
                }
              }
            },
            error => console.error(error),
        ),

        this.pricingService.getBbyOtherPricing()
        .map(
            data => {
              console.log("d3: " +data);
              for(let x of data){
                this.bbyOtherValues.push(new OtherConstants(x.name,x.value,x._id));
              }
            },
            error => console.error(error),
        ),

        this.networkService.getGcpNetworkPricing()
      .map( 
          data => {
            console.log("d4: " +data);
            for(let x of data){
              if(x.networktype == "gcp"){
              this.gcpNetworkValues.push(new networkPrice(x.networktype,x.index,x.networkRange,x.cost,x._id));
              }
              if(x.networktype == "aws"){
                this.awsNetworkValues.push(new networkPrice(x.networktype,x.index,x.networkRange,x.cost,x._id));
              }
            }
          },
          error => console.error(error),
      )
      ).finally(() => {
        this.isInitialized = true;
        console.log("Finished loading pricing data!");

      }).subscribe();
    }

    onSubmit() {
      if (this.bbyPricing) {
        //edit
        this.bbyPricing.entries = JSON.stringify(this.bbyGroup.value);
        this.pricingService.updateBbyPricing(this.bbyPricing)
            .subscribe(
                result => {
                }
            );
      }
      else {
        //create
        const bbyPricing = new BbyPricing(
          JSON.stringify(this.bbyGroup.value));
        this.pricingService.addBbyPricing(bbyPricing)
          .subscribe(
              data => {
              },
              error => console.error(error),
          );
      }
      
      if(this.bbyComputeValues.length > 0) {
        this.pricingService.getBbyComputePricing()
        .subscribe(
            data => {
              this.bbyComputePricingValues = [];
              this.awsComputePricingValues = [];
              this.gcpComputePricingValues = [];
              this.azureComputePricingValues = [];
              for (let y of this.bbyComputeValues){
                if(y.size == "Small (2/8)"){
                  this.bbyComputePricingValues.push(new BbyPricingValues("bby","Small (2/8)",this.bbyGroup.value.centos1,this.bbyGroup.value.RH1,this.bbyGroup.value.W1,this.bbyGroup.value.VM1,y._id));
                }
                if(y.size == "Medium (4/32)"){
                  this.bbyComputePricingValues.push(new BbyPricingValues("bby","Medium (4/32)",this.bbyGroup.value.centos2,this.bbyGroup.value.RH2,this.bbyGroup.value.W2,this.bbyGroup.value.VM2,y._id));
                }
                if(y.size == "Large (8/64)"){
                  this.bbyComputePricingValues.push(new BbyPricingValues("bby","Large (8/64)",this.bbyGroup.value.centos3,this.bbyGroup.value.RH3,this.bbyGroup.value.W3,this.bbyGroup.value.VM3,y._id));
                }
                if(y.size == "X-Large (16/64)"){
                  this.bbyComputePricingValues.push(new BbyPricingValues("bby","X-Large (16/64)",this.bbyGroup.value.centos4,this.bbyGroup.value.RH4,this.bbyGroup.value.W4,this.bbyGroup.value.VM4,y._id));
                }
                if(y.size == "XXL (32/128)"){
                  this.bbyComputePricingValues.push(new BbyPricingValues("bby","XXL (32/128)",this.bbyGroup.value.centos5,this.bbyGroup.value.RH5,this.bbyGroup.value.W5,this.bbyGroup.value.VM5,y._id));
                }
                if(y.size == "XXXL (64/480)"){
                  this.bbyComputePricingValues.push(new BbyPricingValues("bby","XXXL (64/480)",this.bbyGroup.value.centos6,this.bbyGroup.value.RH6,this.bbyGroup.value.W6,this.bbyGroup.value.VM6,y._id));
                }
                if(y.size == "Jumbo (>64 and >480)"){
                  this.bbyComputePricingValues.push(new BbyPricingValues("bby","Jumbo (>64 and >480)",this.bbyGroup.value.centos7,this.bbyGroup.value.RH7,this.bbyGroup.value.W7,this.bbyGroup.value.VM7,y._id));
                }
              }
              for (let y of this.gcpComputeValues){
                
                if(y.size == "Jumbo (>64 and >480)"){
                  debugger;
                  this.gcpComputePricingValues.push(new BbyPricingValues("GCP","Jumbo (>64 and >480)",this.bbyGroup.value.centos7,this.bbyGroup.value.RH7,this.bbyGroup.value.W7,this.bbyGroup.value.VM7,y._id));
                }
              }
              for (let y of this.awsComputeValues){
                if(y.size == "Jumbo (>64 and >480)"){
                  this.awsComputePricingValues.push(new BbyPricingValues("AWS","Jumbo (>64 and >480)",this.bbyGroup.value.centos7,this.bbyGroup.value.RH7,this.bbyGroup.value.W7,this.bbyGroup.value.VM7,y._id));
                }
              }
              for (let y of this.azureComputeValues){
                if(y.size == "Jumbo (>64 and >480)"){
                  this.azureComputePricingValues.push(new BbyPricingValues("azure","Jumbo (>64 and >480)",this.bbyGroup.value.centos7,this.bbyGroup.value.RH7,this.bbyGroup.value.W7,this.bbyGroup.value.VM7,y._id));
                }
              }
              for(let x of this.bbyComputePricingValues){
              this.pricingService.updateBbyComputePricing(x)
              .subscribe(
                  data => {
                  },
                  error => console.error(error),
              );
              
            }
            for(let x of this.gcpComputePricingValues){
              this.pricingService.updateBbyComputePricing(x)
              .subscribe(
                  data => {
                  },
                  error => console.error(error),
              );
              
            }
            for(let x of this.awsComputePricingValues){
              this.pricingService.updateBbyComputePricing(x)
              .subscribe(
                  data => {
                  },
                  error => console.error(error),
              );
              
            }
            for(let x of this.azureComputePricingValues){
              this.pricingService.updateBbyComputePricing(x)
              .subscribe(
                  data => {
                  },
                  error => console.error(error),
              );
              
            }
            },
            error => console.error(error),
        );
      }
      else if(this.bbyComputeValues.length == 0) {
        this.bbyComputePricingValues = [];
        this.bbyComputePricingValues.push(new BbyPricingValues("bby","Small (2/8)",this.bbyGroup.value.centos1,this.bbyGroup.value.RH1,this.bbyGroup.value.W1,this.bbyGroup.value.VM1));
        this.bbyComputePricingValues.push(new BbyPricingValues("bby","Medium (4/32)",this.bbyGroup.value.centos2,this.bbyGroup.value.RH2,this.bbyGroup.value.W2,this.bbyGroup.value.VM2));
        this.bbyComputePricingValues.push(new BbyPricingValues("bby","Large (8/64)",this.bbyGroup.value.centos3,this.bbyGroup.value.RH3,this.bbyGroup.value.W3,this.bbyGroup.value.VM3));
        this.bbyComputePricingValues.push(new BbyPricingValues("bby","X-Large (16/64)",this.bbyGroup.value.centos4,this.bbyGroup.value.RH4,this.bbyGroup.value.W4,this.bbyGroup.value.VM4));
        this.bbyComputePricingValues.push(new BbyPricingValues("bby","XXL (32/128)",this.bbyGroup.value.centos5,this.bbyGroup.value.RH5,this.bbyGroup.value.W5,this.bbyGroup.value.VM5));
        this.bbyComputePricingValues.push(new BbyPricingValues("bby","XXXL (64/480)",this.bbyGroup.value.centos6,this.bbyGroup.value.RH6,this.bbyGroup.value.W6,this.bbyGroup.value.VM6));
        this.bbyComputePricingValues.push(new BbyPricingValues("bby","Jumbo (>64 and >480)",this.bbyGroup.value.centos7,this.bbyGroup.value.RH7,this.bbyGroup.value.W7,this.bbyGroup.value.VM7));
              for(let x of this.bbyComputePricingValues){
              this.pricingService.addBbyComputePricing(x)
              .subscribe(
                  data => {
                  },
                  error => console.error(error),
              );
            }
      }
      if(this.bbyStorageValues.length > 0) {
        this.storageService.getBbyStoragePricing()
        .subscribe(
            data => {
              this.bbyStoragePricingValues = [];
              for (let y of this.bbyStorageValues){
                // if(y.tierindex == 2){
                //   this.bbyStoragePricingValues.push(new storageCloudPrice("bby",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",this.bbyGroup.value.Sperf,y._id));
                // }
                if(y.tierindex == 1){
                  this.bbyStoragePricingValues.push(new storageCloudPrice("bby",1,"SAN-SSD (used for VMs)",this.bbyGroup.value.San,y._id));
                }
                if(y.tierindex == 3){
                  this.bbyStoragePricingValues.push(new storageCloudPrice("bby",3,"NAS",this.bbyGroup.value.NAS,y._id));
                }
                if(y.tierindex == 4){
                  this.bbyStoragePricingValues.push(new storageCloudPrice("bby",4,"Object",this.bbyGroup.value.Obj,y._id));
                }
                if(y.tierindex == 5){
                  this.bbyStoragePricingValues.push(new storageCloudPrice("bby",5,"Backup",this.bbyGroup.value.Bkup,y._id));
                }
              }
              for(let x of this.bbyStoragePricingValues){
              this.storageService.updateBbyStoragePricing(x)
              .subscribe(
                  data => {
                  },
                  error => console.error(error),
              );
            }
            },
            error => console.error(error),
        );
      }
      else if(this.bbyStorageValues.length == 0) {
        this.bbyStoragePricingValues = [];
        // this.bbyStoragePricingValues.push(new storageCloudPrice("bby",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",this.bbyGroup.value.Sperf));
        this.bbyStoragePricingValues.push(new storageCloudPrice("bby",1,"SAN-SSD (used for VMs)",this.bbyGroup.value.San));
        this.bbyStoragePricingValues.push(new storageCloudPrice("bby",3,"NAS",this.bbyGroup.value.NAS));
        this.bbyStoragePricingValues.push(new storageCloudPrice("bby",4,"Object",this.bbyGroup.value.Obj));
        this.bbyStoragePricingValues.push(new storageCloudPrice("bby",5,"Backup",this.bbyGroup.value.Bkup));
              for(let x of this.bbyStoragePricingValues){
              this.storageService.addBbyStoragePricing(x)
              .subscribe(
                  data => {
                  },
                  error => console.error(error),
              );
            }
      }
      if(this.bbyOtherValues.length > 0) {
        this.pricingService.getBbyOtherPricing()
        .subscribe(
            data => {
              this.bbyOtherPricingValues = [];
              for (let y of this.bbyOtherValues){
                if(y.name == "Azure Discount"){
                  this.bbyOtherPricingValues.push(new OtherConstants("Azure Discount",Number(this.bbyGroup.value.azureDis),y._id));
                }
                if(y.name == "AWS Discount"){
                  this.bbyOtherPricingValues.push(new OtherConstants("AWS Discount",Number(this.bbyGroup.value.awsDis),y._id));
                }
                if(y.name == "GCP Discount"){
                  this.bbyOtherPricingValues.push(new OtherConstants("GCP Discount",Number(this.bbyGroup.value.gcpDis),y._id));
                }
                if(y.name == "RI Azure Discount"){
                  this.bbyOtherPricingValues.push(new OtherConstants("RI Azure Discount",Number(this.bbyGroup.value.riazureDis),y._id));
                }
                if(y.name == "RI AWS Discount"){
                  this.bbyOtherPricingValues.push(new OtherConstants("RI AWS Discount",Number(this.bbyGroup.value.riawsDis),y._id));
                }
                if(y.name == "SU GCP Discount"){
                  this.bbyOtherPricingValues.push(new OtherConstants("SU GCP Discount",Number(this.bbyGroup.value.sugcpDis),y._id));
                } 
                if(y.name == "OS Price Source"){
                  this.bbyOtherPricingValues.push(new OtherConstants("OS Price Source",this.bbyGroup.value.OSPriceSource,y._id));
                }                                
                if(y.name == "BBY Elasticity savings"){
                  this.bbyOtherPricingValues.push(new OtherConstants("BBY Elasticity savings",Number(this.bbyGroup.value.bes),y._id));
                }
                if(y.name == "PaaS savings"){
                  this.bbyOtherPricingValues.push(new OtherConstants("PaaS savings",Number(this.bbyGroup.value.paas),y._id));
                }
                // if(y.name == "Depreciation Terms"){
                //   this.bbyOtherPricingValues.push(new OtherConstants("Depreciation Terms",Number(this.bbyGroup.value.dep),y._id));
                // }
              }
              for(let x of this.bbyOtherPricingValues){
              this.pricingService.updateBbyOtherPricing(x)
              .subscribe(
                  data => {
                  },
                  error => console.error(error),
              );
            }
            },
            error => console.error(error),
        );
      }
      else if(this.bbyOtherValues.length == 0) {
        debugger;
        this.bbyOtherPricingValues = [];
        this.bbyOtherPricingValues.push(new OtherConstants("Azure Discount",Number(this.bbyGroup.value.azureDis)));
        this.bbyOtherPricingValues.push(new OtherConstants("AWS Discount",Number(this.bbyGroup.value.awsDis)));
        this.bbyOtherPricingValues.push(new OtherConstants("GCP Discount",Number(this.bbyGroup.value.gcpDis)));
        this.bbyOtherPricingValues.push(new OtherConstants("RI Azure Discount",Number(this.bbyGroup.value.riazureDis)));
        this.bbyOtherPricingValues.push(new OtherConstants("RI AWS Discount",Number(this.bbyGroup.value.riawsDis)));
        this.bbyOtherPricingValues.push(new OtherConstants("SU GCP Discount",Number(this.bbyGroup.value.sugcpDis)));
        this.bbyOtherPricingValues.push(new OtherConstants("OS Price Source",Number(this.bbyGroup.value.OSPriceSource)));
        this.bbyOtherPricingValues.push(new OtherConstants("BBY Elasticity savings",Number(this.bbyGroup.value.bes)));
        this.bbyOtherPricingValues.push(new OtherConstants("PaaS savings",Number(this.bbyGroup.value.paas)));
        // this.bbyOtherPricingValues.push(new OtherConstants("Depreciation Terms",Number(this.bbyGroup.value.dep)));
              for(let x of this.bbyOtherPricingValues){
              this.pricingService.addBbyOtherPricing(x)
              .subscribe(
                  data => {
                  },
                  error => console.error(error),
              );
            }
      }
      this.success = true;
      parent.scrollTo(0, 0);
      this.pricingService.getAllAssessmentCalculation()
      .subscribe(
          data => {
            console.log(data);
            for(let x of data){
              x.hostingCostUpdated = true;
            this.pricingService.updateAssessmentCalculation(x)
            .subscribe(
                data => {
                },
                error => console.error(error),
            );
          }
          },
          error => console.error(error),
      );
     }

    //  AutoRefresh() {
    //    this.loading = true;
    //   this.pricingService.getAWSPricing2()
    //   .subscribe(
    //       data => {
    //         console.log(data);
    //         this.loading = true;
    //         var importedJSON = data;
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.CY7FJB29V5S82GDR);
    //           var n = ezJSON.search("USD");
    //           var i=n+6;
    //           var j=n+11;
    //           var temp_Rate = ezJSON.slice(i,j);
    //           var i3_16XL_Win_Rate = (Number(temp_Rate) *1).toString();

    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
    //             var ezJSON = ezJSON.replace("65GMDPHNVSXX2ME2", "EZ65GMDPHNVSXX2ME2" );
    //             var goodJSON = JSON.parse(ezJSON);
    //             var goodJSON_str=JSON.stringify(goodJSON.EZ65GMDPHNVSXX2ME2);
    //             var n = goodJSON_str.search("USD");
    //               i=n+6;
    //               j=n+11
    //             var temp_Rate = goodJSON_str.slice(i,j);
    //           var i3_16XL_RHEL_Rate =(Number(temp_Rate) *1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.WTADZ55ETP6ZEN73);
    //             var n = ezJSON.search("USD");
    //           i=n+6;
    //           j=n+11
    //           var temp_Rate = ezJSON.slice(i,j);
    //           var i3_16XL_CentOS_Rate = (Number(temp_Rate) *1).toString();
              
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
    //             var ezJSON = ezJSON.replace("2E46DZFG7PF8J74U", "EZ2E46DZFG7PF8J74U" );
    //             var goodJSON = JSON.parse(ezJSON);
    //             var goodJSON_str=JSON.stringify(goodJSON.EZ2E46DZFG7PF8J74U);
    //             var n = goodJSON_str.search("USD");
    //               i=n+6;
    //               j=n+11
    //             var temp_Rate = goodJSON_str.slice(i,j);
    //           var m4_4XL_Win_Rate = (Number(temp_Rate) *1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.WJEZCQK5TDDFFY4S);
    //             var n = ezJSON.search("USD");
    //           i=n+6;
    //           j=n+11
    //           var temp_Rate = ezJSON.slice(i,j);
    //           var m4_4XL_RHEL_Rate = (Number(temp_Rate) *1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.GSMN37GEEUV2CC27);
    //             var n = ezJSON.search("USD");
    //           i=n+6;
    //           j=n+11
    //           var temp_Rate = ezJSON.slice(i,j);
    //           var m4_4XL_CentOS_Rate = (Number(temp_Rate) *1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.VC2BBD4RTJM8XTNZ);
    //             var n = ezJSON.search("USD");
    //           i=n+6;
    //           j=n+11
    //           var temp_Rate = ezJSON.slice(i,j);
    //           var m4_L_Win_Rate = (Number(temp_Rate) *1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.Q236HUQXMUFFR9AN);
    //             var n = ezJSON.search("USD");
    //           i=n+6;
    //           j=n+11
    //           var temp_Rate = ezJSON.slice(i,j);
    //           var m4_L_CentOS_Rate = (Number(temp_Rate) *1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.RS3U6QTRF7YFXNA9);
    //             var n = ezJSON.search("USD");
    //           i=n+6;
    //           j=n+11
    //           var temp_Rate = ezJSON.slice(i,j);
    //           var m4_L_RHEL_Rate = (Number(temp_Rate) *1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
    //             var ezJSON = ezJSON.replace("6M9945UQ8PP35XM5", "EZ6M9945UQ8PP35XM5" );
    //             var goodJSON = JSON.parse(ezJSON);
    //             var goodJSON_str=JSON.stringify(goodJSON.EZ6M9945UQ8PP35XM5);
    //             var n = goodJSON_str.search("USD");
    //               i=n+6;
    //               j=n+11
    //             var temp_Rate = goodJSON_str.slice(i,j);
    //           var r3_8XL_RHEL_Rate = (Number(temp_Rate) *1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
    //             var ezJSON = ezJSON.replace("9HQMNHK96SR834AM", "EZ9HQMNHK96SR834AM" );
    //             var goodJSON = JSON.parse(ezJSON);
    //             var goodJSON_str=JSON.stringify(goodJSON.EZ9HQMNHK96SR834AM);
    //             var n = goodJSON_str.search("USD");
    //               i=n+6;
    //               j=n+11
    //             var temp_Rate = goodJSON_str.slice(i,j);
    //           var r3_8XL_Win_Rate = (Number(temp_Rate) *1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
    //             var ezJSON = ezJSON.replace("3VWERDY4UHEZUS9F", "EZ3VWERDY4UHEZUS9F" );
    //             var goodJSON = JSON.parse(ezJSON);
    //             var goodJSON_str=JSON.stringify(goodJSON.EZ3VWERDY4UHEZUS9F);
    //             var n = goodJSON_str.search("USD");
    //               i=n+6;
    //               j=n+11
    //             var temp_Rate = goodJSON_str.slice(i,j);
    //           var r3_8XL_CentOS_Rate = (Number(temp_Rate) *1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.WJQUC4VU72GCUXP4);
    //             var n = ezJSON.search("USD");
    //           i=n+6;
    //           j=n+11
    //           var temp_Rate = ezJSON.slice(i,j);
    //           var r4_2xl_Win_Rate = (Number(temp_Rate) *1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.R4CKBWU7M6GSC7QB);
    //             var n = ezJSON.search("USD");
    //           i=n+6;
    //           j=n+11
    //           var temp_Rate = ezJSON.slice(i,j);
    //           var r4_2xl_CentOS_Rate = (Number(temp_Rate)*1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
    //             var ezJSON = ezJSON.replace("796R87PX3YU4QJYB", "EZ796R87PX3YU4QJYB" );
    //             var goodJSON = JSON.parse(ezJSON);
    //             var goodJSON_str=JSON.stringify(goodJSON.EZ796R87PX3YU4QJYB);
    //             var n = goodJSON_str.search("USD");
    //               i=n+6;
    //               j=n+11
    //             var temp_Rate = goodJSON_str.slice(i,j);
    //           var r4_2xl_RHEL_Rate = (Number(temp_Rate)*1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.BTRHHGGU55RP69QE );
    //             var n = ezJSON.search("USD");
    //           i=n+6;
    //           j=n+11
    //           var temp_Rate = ezJSON.slice(i,j);
    //           var r4_xl_Win_Rate = (Number(temp_Rate) *1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
    //             var ezJSON = ezJSON.replace("9F2Q74QEE8HZE6A8", "EZ9F2Q74QEE8HZE6A8" );
    //             var goodJSON = JSON.parse(ezJSON);
    //             var goodJSON_str=JSON.stringify(goodJSON.EZ9F2Q74QEE8HZE6A8);
    //             var n = goodJSON_str.search("USD");
    //               i=n+6;
    //               j=n+11
    //             var temp_Rate = goodJSON_str.slice(i,j);
    //           var r4_XL_CentOS_Rate = (Number(temp_Rate) *1).toString();
            
    //           var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
    //             var ezJSON = ezJSON.replace("73R87VUK3BUGHWNT", "EZ73R87VUK3BUGHWNT" );
    //             var goodJSON = JSON.parse(ezJSON);
    //             var goodJSON_str=JSON.stringify(goodJSON.EZ73R87VUK3BUGHWNT);
    //             var n = goodJSON_str.search("USD");
    //               i=n+6;
    //               j=n+11
    //             var temp_Rate = goodJSON_str.slice(i,j);
    //           var r4_xl_RHEL_Rate = (Number(temp_Rate) *1).toString();

    //           if(this.awsComputeValues.length > 0) {
    //             this.pricingService.getBbyComputePricing()
    //             .subscribe(
    //                 data => {
    //                   this.awsComputePricingValues = [];
    //                   for (let y of this.awsComputeValues){
    //                     if(y.size == "S"){
    //                       this.awsComputePricingValues.push(new BbyPricingValues("AWS","S",m4_L_CentOS_Rate,m4_L_RHEL_Rate,m4_L_Win_Rate,y._id));
    //                     }
    //                     if(y.size == "M"){
    //                       this.awsComputePricingValues.push(new BbyPricingValues("AWS","M",r4_XL_CentOS_Rate,r4_xl_RHEL_Rate,r4_xl_Win_Rate,y._id));
    //                     }
    //                     if(y.size == "L"){
    //                       this.awsComputePricingValues.push(new BbyPricingValues("AWS","L",r4_2xl_CentOS_Rate,r4_2xl_RHEL_Rate,r4_2xl_Win_Rate,y._id));
    //                     }
    //                     if(y.size == "XL"){
    //                       this.awsComputePricingValues.push(new BbyPricingValues("AWS","XL",m4_4XL_CentOS_Rate,m4_4XL_RHEL_Rate,m4_4XL_Win_Rate,y._id));
    //                     }
    //                     if(y.size == "XXL"){
    //                       this.awsComputePricingValues.push(new BbyPricingValues("AWS","XXL",r3_8XL_CentOS_Rate,r3_8XL_RHEL_Rate,r3_8XL_Win_Rate,y._id));
    //                     }
    //                     if(y.size == "XXXL"){
    //                       this.awsComputePricingValues.push(new BbyPricingValues("AWS","XXXL",i3_16XL_CentOS_Rate,i3_16XL_RHEL_Rate,i3_16XL_Win_Rate,y._id));
    //                     }
    //                   }
    //                   for(let x of this.awsComputePricingValues){
    //                   this.pricingService.updateBbyComputePricing(x)
    //                   .subscribe(
    //                       data => {
    //                       },
    //                       error => console.error(error),
    //                   );
    //                 }
    //                 },
    //                 error => console.error(error),
    //             );
    //           }
    //           else if(this.awsComputeValues.length == 0) {
    //             this.awsComputePricingValues = [];
    //             this.awsComputePricingValues.push(new BbyPricingValues("AWS","S",m4_L_CentOS_Rate,m4_L_RHEL_Rate,m4_L_Win_Rate));
    //             this.awsComputePricingValues.push(new BbyPricingValues("AWS","M",r4_XL_CentOS_Rate,r4_xl_RHEL_Rate,r4_xl_Win_Rate));
    //             this.awsComputePricingValues.push(new BbyPricingValues("AWS","L",r4_2xl_CentOS_Rate,r4_2xl_RHEL_Rate,r4_2xl_Win_Rate));
    //             this.awsComputePricingValues.push(new BbyPricingValues("AWS","XL",m4_4XL_CentOS_Rate,m4_4XL_RHEL_Rate,m4_4XL_Win_Rate));
    //             this.awsComputePricingValues.push(new BbyPricingValues("AWS","XXL",r3_8XL_CentOS_Rate,r3_8XL_RHEL_Rate,r3_8XL_Win_Rate));
    //             this.awsComputePricingValues.push(new BbyPricingValues("AWS","XXXL",i3_16XL_CentOS_Rate,i3_16XL_RHEL_Rate,i3_16XL_Win_Rate));
    //                   for(let x of this.awsComputePricingValues){
    //                   this.pricingService.addBbyComputePricing(x)
    //                   .subscribe(
    //                       data => {
    //                       },
    //                       error => console.error(error),
    //                   );
    //                 }
    //           }
    //           this.loading =false;
    //         } );
            
    //  this.pricingService.getAWSPricing3()
    //  .subscribe(
    //      data => {
    //        console.log(data);
    //        this.loading = true;
    //        //var importedJSON = JSON.parse(data);
    //        var importedJSON7 = data;
    //        var ezJSON=JSON.stringify(importedJSON7.terms.OnDemand);
    //          var ezJSON = ezJSON.replace("YPGKVRB2EKTVDJDT.JRTCKXETXF", "YPGKVRB2EKTVDJDT_JRTCKXETXF" );
    //        var goodJSON = JSON.parse(ezJSON);
    //          var goodJSON_str=JSON.stringify(goodJSON.YPGKVRB2EKTVDJDT.YPGKVRB2EKTVDJDT_JRTCKXETXF.priceDimensions);
    //        var ezJSON2=goodJSON_str.replace("YPGKVRB2EKTVDJDT.JRTCKXETXF.D42MF2PVJS", "YPGKVRB2EKTVDJDT_JRTCKXETXF_D42MF2PVJS");
    //        var goodJSON2 = JSON.parse(ezJSON2);
    //          var goodJSON_str2=JSON.stringify(goodJSON2.YPGKVRB2EKTVDJDT_JRTCKXETXF_D42MF2PVJS.pricePerUnit.USD);
    //        var S3_Std_Rate=goodJSON_str2.slice(1,6);
    //        var S3_Std_Rate = (Number(S3_Std_Rate)*1).toString();
           
    //        var ezJSON7=JSON.stringify(importedJSON7.terms.OnDemand);
    //          var ezJSON7 = ezJSON7.replace("FNWV6QQJ34ZTYY9U.JRTCKXETXF", "FNWV6QQJ34ZTYY9U_JRTCKXETXF" );
    //        var goodJSON7 = JSON.parse(ezJSON7);
    //          var goodJSON_str7=JSON.stringify(goodJSON7.FNWV6QQJ34ZTYY9U.FNWV6QQJ34ZTYY9U_JRTCKXETXF.priceDimensions);
    //        var ezJSON27=goodJSON_str7.replace("FNWV6QQJ34ZTYY9U.JRTCKXETXF.6YS6EN2CT7", "FNWV6QQJ34ZTYY9U_JRTCKXETXF_6YS6EN2CT7");
    //        var goodJSON27 = JSON.parse(ezJSON27);
    //          var goodJSON_str27=JSON.stringify(goodJSON27.FNWV6QQJ34ZTYY9U_JRTCKXETXF_6YS6EN2CT7.pricePerUnit.USD);
    //        var S3_Std_IA_Rate=goodJSON_str27.slice(1,6);
    //        var S3_Std_IA_Rate = (Number(S3_Std_IA_Rate)*1).toString();
    //        this.pricingService.getAWSPricing4()
    //        .subscribe(
    //            data => {
    //              console.log(data);
    //              this.loading = true;
    //              var importedJSON7 = data;
    //              var ezJSON=JSON.stringify(importedJSON7.terms.OnDemand);
    //                var ezJSON = ezJSON.replace("N2KSPSR4CBU2H6PT.JRTCKXETXF", "N2KSPSR4CBU2H6PT_JRTCKXETXF" );
    //              var goodJSON = JSON.parse(ezJSON);
    //                var goodJSON_str=JSON.stringify(goodJSON.N2KSPSR4CBU2H6PT.N2KSPSR4CBU2H6PT_JRTCKXETXF.priceDimensions);
    //              var ezJSON2=goodJSON_str.replace("N2KSPSR4CBU2H6PT.JRTCKXETXF.6YS6EN2CT7", "N2KSPSR4CBU2H6PT_JRTCKXETXF_6YS6EN2CT7");
    //              var goodJSON2 = JSON.parse(ezJSON2);
    //                var goodJSON_str2=JSON.stringify(goodJSON2.N2KSPSR4CBU2H6PT_JRTCKXETXF_6YS6EN2CT7.pricePerUnit.USD);
    //              var EBS_SSD_Rate=goodJSON_str2.slice(1,6);
    //              var EBS_SSD_Rate = (Number(EBS_SSD_Rate) *1).toString();
                 
    //              var ezJSON_str3=JSON.stringify(importedJSON7.terms.OnDemand);
    //              ezJSON_str3 = ezJSON_str3.replace("2JK59QCVJ4SRX7DN", "EZ2JK59QCVJ4SRX7DN");
    //              var goodJSON8 = JSON.parse(ezJSON_str3);	
    //              var ezJSON_str4=JSON.stringify(goodJSON8.EZ2JK59QCVJ4SRX7DN);
    //              var ezJSON_str4 = ezJSON_str4.replace("2JK59QCVJ4SRX7DN.JRTCKXETXF", "EZ2JK59QCVJ4SRX7DN_JRTCKXETXF" );
    //              var goodJSON9 = JSON.parse(ezJSON_str4);
    //              var ezJSON_str5=JSON.stringify(goodJSON9.EZ2JK59QCVJ4SRX7DN_JRTCKXETXF.priceDimensions);
    //              var ezJSON_str5 = ezJSON_str5.replace("2JK59QCVJ4SRX7DN.JRTCKXETXF.6YS6EN2CT7", "EZ2JK59QCVJ4SRX7DN_JRTCKXETXF_6YS6EN2CT7" );
    //              var goodJSON10 = JSON.parse(ezJSON_str5);
    //              var ezJSON_str6=JSON.stringify(goodJSON10.EZ2JK59QCVJ4SRX7DN_JRTCKXETXF_6YS6EN2CT7.pricePerUnit.USD);
    //              var EBS_HDD_Rate=ezJSON_str6.slice(1,6);
    //              var EBS_HDD_Rate = (Number(EBS_HDD_Rate) *1).toString();
    //              this.pricingService.getAWSPricing1()
    //              .subscribe(
    //                  data => {
    //                    console.log(data);
    //                    this.loading = true;
    //                    var importedJSON = data;
    //                    var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.YFV3RHAD3CDDP3VE);
    //                    var n = ezJSON.search("USD");
    //                    var i=n+6;
    //                    var j=n+11
    //                    var EFS_Rate = ezJSON.slice(i,j);
    //                    var EFS_Rate = (Number(EFS_Rate)*1).toString();

    //                    if(this.awsStorageValues.length > 0) {
    //                      this.storageService.getBbyStoragePricing()
    //                      .subscribe(
    //                          data => {
    //                            this.awsStoragePricingValues = [];
    //                            for (let y of this.awsStorageValues){
    //                             //  if(y.tierindex == 2){
    //                             //    this.awsStoragePricingValues.push(new storageCloudPrice("aws",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",EBS_HDD_Rate,y._id));
    //                             //  }
    //                              if(y.tierindex == 1){
    //                                this.awsStoragePricingValues.push(new storageCloudPrice("aws",1,"SAN-SSD (used for VMs)",EBS_SSD_Rate,y._id));
    //                              }
    //                              if(y.tierindex == 3){
    //                                this.awsStoragePricingValues.push(new storageCloudPrice("aws",3,"NAS",EFS_Rate,y._id));
    //                              }
    //                              if(y.tierindex == 4){
    //                                this.awsStoragePricingValues.push(new storageCloudPrice("aws",4,"Object",S3_Std_Rate,y._id));
    //                              }
    //                              if(y.tierindex == 5){
    //                                this.awsStoragePricingValues.push(new storageCloudPrice("aws",5,"Backup",S3_Std_IA_Rate,y._id));
    //                              }
    //                            }
    //                            for(let x of this.awsStoragePricingValues){
    //                            this.storageService.updateBbyStoragePricing(x)
    //                            .subscribe(
    //                                data => {
    //                                },
    //                                error => console.error(error),
    //                            );
    //                          }
    //                          },
    //                          error => console.error(error),
    //                      );
    //                    }
    //                    else if(this.awsStorageValues.length == 0) {
    //                      this.awsStoragePricingValues = [];
    //                     //  this.awsStoragePricingValues.push(new storageCloudPrice("aws",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",EBS_HDD_Rate));
    //                      this.awsStoragePricingValues.push(new storageCloudPrice("aws",1,"SAN-SSD (used for VMs)",EBS_SSD_Rate));
    //                      this.awsStoragePricingValues.push(new storageCloudPrice("aws",3,"NAS",EFS_Rate));
    //                      this.awsStoragePricingValues.push(new storageCloudPrice("aws",4,"Object",S3_Std_Rate));
    //                      this.awsStoragePricingValues.push(new storageCloudPrice("aws",5,"Backup",S3_Std_IA_Rate));
    //                            for(let x of this.awsStoragePricingValues){
    //                            this.storageService.addBbyStoragePricing(x)
    //                            .subscribe(
    //                                data => {
    //                                },
    //                                error => console.error(error),
    //                            );
    //                          }
    //                    }
    //                   //this.loading= false;
    //                   } );
    //                  // this.loading= false;
    //              } );
    //             // this.loading= false;
    //        } );
    //              this.pricingService.getAWSPricing5()
    //              .subscribe(
    //                  data => {
    //                    console.log(data);
    //                    this.loading = true;
    //                    var importedJSON = data;
    //                      var ezJSON_str3=JSON.stringify(importedJSON.terms.OnDemand);
    //                      ezJSON_str3 = ezJSON_str3.replace("36H7S3NU9B7S3UT5", "EZ36H7S3NU9B7S3UT5");
    //                      var goodJSON8 = JSON.parse(ezJSON_str3);	
    //                      var ezJSON_str4=JSON.stringify(goodJSON8.EZ36H7S3NU9B7S3UT5);
    //                      var ezJSON_str4 = ezJSON_str4.replace("36H7S3NU9B7S3UT5.JRTCKXETXF", "EZ36H7S3NU9B7S3UT5_JRTCKXETXF" );
    //                      var goodJSON9 = JSON.parse(ezJSON_str4);
    //                      var ezJSON_str5=JSON.stringify(goodJSON9.EZ36H7S3NU9B7S3UT5_JRTCKXETXF.priceDimensions);
    //                      var ezJSON_str5 = ezJSON_str5.replace("36H7S3NU9B7S3UT5.JRTCKXETXF.VF6T3GAUKQ", "EZ36H7S3NU9B7S3UT5_JRTCKXETXF_VF6T3GAUKQ" );
    //                      var goodJSON10 = JSON.parse(ezJSON_str5);
    //                      var ezJSON_str6=JSON.stringify(goodJSON10.EZ36H7S3NU9B7S3UT5_JRTCKXETXF_VF6T3GAUKQ.pricePerUnit.USD);
    //                      var AWS_OUT_Trnsfr=ezJSON_str6.slice(1,6);
    //                      var AWS_OUT_Trnsfr_Rate = (Number(AWS_OUT_Trnsfr)*1).toString();
    //                      var AWS_Data_out1  = (Number(AWS_OUT_Trnsfr_Rate)*1024).toString();
    //                      var AWS_Data_out2  = (Number(AWS_OUT_Trnsfr_Rate)*5).toString();
    //                      var AWS_Data_out3  = (Number(AWS_OUT_Trnsfr_Rate)*2).toString();
    //                      var AWS_Data_out4 = (Number(AWS_OUT_Trnsfr_Rate)*2).toString();
    //                      if(this.awsNetworkValues.length > 0) {
    //                        this.networkService.getGcpNetworkPricing()
    //                        .subscribe(
    //                            data => {
    //                              this.awsNetworkPricingValues = [];
    //                              for (let y of this.awsNetworkValues){
    //                                if(y.index == 1){
    //                                  this.awsNetworkPricingValues.push(new networkPrice("aws",1,"<1TB",AWS_Data_out1,y._id));
    //                                }
    //                                if(y.index == 2){
    //                                  this.awsNetworkPricingValues.push(new networkPrice("aws",2,"1-5 TB",AWS_Data_out2,y._id));
    //                                }
    //                                if(y.index == 3){
    //                                  this.awsNetworkPricingValues.push(new networkPrice("aws",3,"5-10TB",AWS_Data_out3,y._id));
    //                                }
    //                                if(y.index == 4){
    //                                  this.awsNetworkPricingValues.push(new networkPrice("aws",4,"10-20TB",AWS_Data_out4,y._id));
    //                                }
    //                              }
    //                              for(let x of this.awsNetworkPricingValues){
    //                              this.networkService.updateGcpNetworkPricing(x)
    //                              .subscribe(
    //                                  data => {
    //                                  },
    //                                  error => console.error(error),
    //                              );
    //                            }
    //                            },
    //                            error => console.error(error),
    //                        );
    //                      }
    //                      else if(this.awsNetworkValues.length == 0) {
    //                        this.awsNetworkPricingValues = [];
    //                        this.awsNetworkPricingValues.push(new networkPrice("aws",1,"<1TB",AWS_Data_out1));
    //                        this.awsNetworkPricingValues.push(new networkPrice("aws",2,"1-5 TB",AWS_Data_out2));
    //                        this.awsNetworkPricingValues.push(new networkPrice("aws",3,"5-10TB",AWS_Data_out3));
    //                        this.awsNetworkPricingValues.push(new networkPrice("aws",4,"10-20TB",AWS_Data_out4));
    //                              for(let x of this.awsNetworkPricingValues){
    //                              this.networkService.addGcpNetworkPricing(x)
    //                              .subscribe(
    //                                  data => {
    //                                  },
    //                                  error => console.error(error),
    //                              );
    //                            }
    //                      }
    //                      //this.loading = true;
    //                    } );
                       
    //   this.pricingService.getGCPPricing()
    //   .subscribe(
    //       data => {
    //         console.log(data);
    //         this.loading = true;
    //         var JSON_str1 = JSON.stringify(data.gcp_price_list);
    //         JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-2", "CP_COMPUTEENGINE_VMIMAGE_N1_STANDARD_Z");
    //         var ezJSON = JSON.parse(JSON_str1);
    //         var VM_n1_std_2 = JSON.stringify(ezJSON.CP_COMPUTEENGINE_VMIMAGE_N1_STANDARD_Z.us);
    //         var VM_n1_std_2 = (Number(VM_n1_std_2)*1).toString();
        
    //         var JSON_str1 = JSON.stringify(data.gcp_price_list);
    //         JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-VMIMAGE-N1-HIGHMEM-4", "CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_Z");
    //         var ezJSON = JSON.parse(JSON_str1);
    //         var VM_n1_HM_4 = JSON.stringify(ezJSON.CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_Z.us);
    //         var VM_n1_HM_4  = (Number(VM_n1_HM_4) *1).toString();
        
    //         var JSON_str1 = JSON.stringify(data.gcp_price_list);
    //         JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-VMIMAGE-N1-HIGHMEM-8", "CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_ZZ");
    //         var ezJSON = JSON.parse(JSON_str1);
    //         var VM_n1_HM_8 = JSON.stringify(ezJSON.CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_ZZ.us);
    //         var VM_n1_HM_8  =(Number(VM_n1_HM_8) *1).toString();
        
    //         var JSON_str1 = JSON.stringify(data.gcp_price_list);
    //         JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-VMIMAGE-N1-HIGHMEM-16", "CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_ZZZ");
    //         var ezJSON = JSON.parse(JSON_str1);
    //         var VM_n1_HM_16 = JSON.stringify(ezJSON.CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_ZZZ.us);
    //         var VM_n1_HM_16  =(Number(VM_n1_HM_16) *1).toString();
            
    //         var JSON_str1 = JSON.stringify(data.gcp_price_list);
    //         JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-32", "CP_COMPUTEENGINE_VMIMAGE_N1_STANDARD_Y");
    //         var ezJSON = JSON.parse(JSON_str1);
    //         var VM_n1_std_32 = JSON.stringify(ezJSON.CP_COMPUTEENGINE_VMIMAGE_N1_STANDARD_Y.us);
    //         var VM_n1_std_32 =(Number(VM_n1_std_32)*1).toString();
            
    //         var JSON_str1 = JSON.stringify(data.gcp_price_list);
    //         JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-VMIMAGE-N1-HIGHMEM-64", "CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_ZZZZ");
    //         var ezJSON = JSON.parse(JSON_str1);
    //         var VM_n1_HM_64 = JSON.stringify(ezJSON.CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_ZZZZ.us);
    //         var VM_n1_HM_64  =(Number(VM_n1_HM_64)*1).toString();
        
    //         var JSON_str1 = JSON.stringify(data.gcp_price_list);
    //         JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-OS", "CP_COMPUTEENGINE_OS");
    //         var ezJSON = JSON.parse(JSON_str1);
    //         var Win_high = JSON.stringify(ezJSON.CP_COMPUTEENGINE_OS.win.high);
    //         var Win_high  =(Number(Win_high)*1).toString();
        
    //         var JSON_str1 = JSON.stringify(data.gcp_price_list);
    //         JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-OS", "CP_COMPUTEENGINE_OS");
    //         var ezJSON = JSON.parse(JSON_str1);
    //         var Rhel_high = JSON.stringify(ezJSON.CP_COMPUTEENGINE_OS.rhel.high);
    //         var Rhel_high  = (Number(Rhel_high)*1).toString();
            

    //         var JSON_str1 = JSON.stringify(data.gcp_price_list);
    //         JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-STORAGE-PD-CAPACITY", "CP_COMPUTEENGINE_STORAGE_PD_CAPACITY");
    //         var ezJSON = JSON.parse(JSON_str1);
    //         var STD_pd_disk = JSON.stringify(ezJSON.CP_COMPUTEENGINE_STORAGE_PD_CAPACITY.us);
            
            
    //         var JSON_str1 = JSON.stringify(data.gcp_price_list);
    //         JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-STORAGE-PD-SSD", "CP_COMPUTEENGINE_STORAGE_PD_SSD");
    //         var ezJSON = JSON.parse(JSON_str1);
    //         var STD_pd_ssd_disk = JSON.stringify(ezJSON.CP_COMPUTEENGINE_STORAGE_PD_SSD.us);
            
            
    //         var JSON_str1 = JSON.stringify(data.gcp_price_list);
    //         JSON_str1=JSON_str1.replace("CP-BIGSTORE-STORAGE-REGIONAL", "CP_BIGSTORE_STORAGE_REGIONAL");
    //         var ezJSON = JSON.parse(JSON_str1);
    //         var regional_disk = JSON.stringify(ezJSON.CP_BIGSTORE_STORAGE_REGIONAL.us);
            
            
    //         var JSON_str1 = JSON.stringify(data.gcp_price_list);
    //         JSON_str1=JSON_str1.replace("CP-NEARLINE-STORAGE", "CP_NEARLINE_STORAGE");
    //         var ezJSON = JSON.parse(JSON_str1);
    //         var nearline_disk = JSON.stringify(ezJSON.CP_NEARLINE_STORAGE.us);
            
            
    //         var JSON_str1 = JSON.stringify(data.gcp_price_list);
    //         JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-INTERNET-EGRESS-NA-NA", "CP_COMPUTEENGINE_INTERNET_EGRESS_NA_NA");
    //         var ezJSON = JSON.parse(JSON_str1);
    //         var Data_out_str = JSON.stringify(ezJSON.CP_COMPUTEENGINE_INTERNET_EGRESS_NA_NA.tiers);
    //         Data_out_str=Data_out_str.replace("10240", "mid_tier");
    //         var ezJSON1 = JSON.parse(Data_out_str);
    //         var GCP_Data_out = JSON.stringify(ezJSON1.mid_tier);
            
    //         var VM_n1_std_2_W=(Number(VM_n1_std_2)+Number(Win_high)*2);
    //         var VM_n1_HM_4_W=Number(VM_n1_HM_4)+Number(Win_high)*4;
    //         var VM_n1_HM_8_W=Number(VM_n1_HM_8)+Number(Win_high)*8;
    //         var VM_n1_HM_16_W=Number(VM_n1_HM_16)+Number(Win_high)*16;
    //         var VM_n1_std_32_W=Number(VM_n1_std_32)+Number(Win_high)*32;
    //         var VM_n1_HM_64_W=Number(VM_n1_HM_64)+Number(Win_high)*64;
        
    //         var VM_n1_std_2_RH=Number(VM_n1_std_2)+Number(Rhel_high);
    //         var VM_n1_HM_4_RH=Number(VM_n1_HM_4)+Number(Rhel_high);
    //         var VM_n1_HM_8_RH=Number(VM_n1_HM_8)+Number(Rhel_high);
    //         var VM_n1_HM_16_RH=Number(VM_n1_HM_16)+Number(Rhel_high);
    //         var VM_n1_std_32_RH=Number(VM_n1_std_32)+Number(Rhel_high);
    //         var VM_n1_HM_64_RH=Number(VM_n1_HM_64)+Number(Rhel_high);

    //         console.log(VM_n1_std_2_RH);
        
    //         var VM_n1_std_2_CentOS=VM_n1_std_2;
    //         var VM_n1_HM_4_CentOS=VM_n1_HM_4;
    //         var VM_n1_HM_8_CentOS=VM_n1_HM_8;
    //         var VM_n1_HM_16_CentOS=VM_n1_HM_16;
    //         var VM_n1_std_32_CentOS=VM_n1_std_32;
    //         var VM_n1_HM_64_CentOS=VM_n1_HM_64;

    //         var STD_pd_disk  =(Number(STD_pd_disk)*1).toString();
    //         var STD_pd_ssd_disk  =(Number(STD_pd_ssd_disk)*1).toString();
    //         var regional_disk  = (Number(regional_disk)*1).toString();
    //         var nearline_disk  = (Number(nearline_disk)*1).toString();
    //         var GCP_Data_out  = (Number(GCP_Data_out)*1).toString();
    //         var GCP_Data_out1  = (Number(GCP_Data_out)*1024).toString();
    //         var GCP_Data_out2  = (Number(GCP_Data_out1)*5).toString();
    //         var GCP_Data_out3  = (Number(GCP_Data_out2)*2).toString();
    //         var GCP_Data_out4 = (Number(GCP_Data_out3)*2).toString();
            
    //         if(this.gcpComputeValues.length > 0) {
    //           this.pricingService.getBbyComputePricing()
    //           .subscribe(
    //               data => {
    //                 this.gcpComputePricingValues = [];
    //                 for (let y of this.gcpComputeValues){
    //                   if(y.size == "S"){
    //                     this.gcpComputePricingValues.push(new BbyPricingValues("GCP","S",VM_n1_std_2_CentOS,VM_n1_std_2_RH.toString(),VM_n1_std_2_W.toString(),y._id));
    //                   }
    //                   if(y.size == "M"){
    //                     this.gcpComputePricingValues.push(new BbyPricingValues("GCP","M",VM_n1_HM_4_CentOS,VM_n1_HM_4_RH.toString(),VM_n1_HM_4_W.toString(),y._id));
    //                   }
    //                   if(y.size == "L"){
    //                     this.gcpComputePricingValues.push(new BbyPricingValues("GCP","L",VM_n1_HM_8_CentOS,VM_n1_HM_8_RH.toString(),VM_n1_HM_8_W.toString(),y._id));
    //                   }
    //                   if(y.size == "XL"){
    //                     this.gcpComputePricingValues.push(new BbyPricingValues("GCP","XL",VM_n1_HM_16_CentOS,VM_n1_HM_16_RH.toString(),VM_n1_HM_16_W.toString(),y._id));
    //                   }
    //                   if(y.size == "XXL"){
    //                     this.gcpComputePricingValues.push(new BbyPricingValues("GCP","XXL",VM_n1_std_32_CentOS,VM_n1_std_32_RH.toString(),VM_n1_std_32_W.toString(),y._id));
    //                   }
    //                   if(y.size == "XXXL"){
    //                     this.gcpComputePricingValues.push(new BbyPricingValues("GCP","XXXL",VM_n1_HM_64_CentOS,VM_n1_HM_64_RH.toString(),VM_n1_HM_64_W.toString(),y._id));
    //                   }
    //                 }
    //                 for(let x of this.gcpComputePricingValues){
    //                 this.pricingService.updateBbyComputePricing(x)
    //                 .subscribe(
    //                     data => {
    //                     },
    //                     error => console.error(error),
    //                 );
    //               }
    //               },
    //               error => console.error(error),
    //           );
    //         }
    //         else if(this.gcpComputeValues.length == 0) {
    //           this.gcpComputePricingValues = [];
    //           this.gcpComputePricingValues.push(new BbyPricingValues("GCP","S",VM_n1_std_2_CentOS,VM_n1_std_2_RH.toString(),VM_n1_std_2_W.toString()));
    //           this.gcpComputePricingValues.push(new BbyPricingValues("GCP","M",VM_n1_HM_4_CentOS,VM_n1_HM_4_RH.toString(),VM_n1_HM_4_W.toString()));
    //           this.gcpComputePricingValues.push(new BbyPricingValues("GCP","L",VM_n1_HM_8_CentOS,VM_n1_HM_8_RH.toString(),VM_n1_HM_8_W.toString()));
    //           this.gcpComputePricingValues.push(new BbyPricingValues("GCP","XL",VM_n1_HM_16_CentOS,VM_n1_HM_16_RH.toString(),VM_n1_HM_16_W.toString()));
    //           this.gcpComputePricingValues.push(new BbyPricingValues("GCP","XXL",VM_n1_std_32_CentOS,VM_n1_std_32_RH.toString(),VM_n1_std_32_W.toString()));
    //           this.gcpComputePricingValues.push(new BbyPricingValues("GCP","XXXL",VM_n1_HM_64_CentOS,VM_n1_HM_64_RH.toString(),VM_n1_HM_64_W.toString()));
    //                 for(let x of this.gcpComputePricingValues){
    //                 this.pricingService.addBbyComputePricing(x)
    //                 .subscribe(
    //                     data => {
    //                     },
    //                     error => console.error(error),
    //                 );
    //               }
    //         }
      
    //         if(this.gcpStorageValues.length > 0) {
    //           this.storageService.getBbyStoragePricing()
    //           .subscribe(
    //               data => {
    //                 this.gcpStoragePricingValues = [];
    //                 for (let y of this.gcpStorageValues){
    //                   if(y.tierindex == 2){
    //                     this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",STD_pd_disk,y._id));
    //                   }
    //                   if(y.tierindex == 1){
    //                     this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",1,"SAN-SSD (used for VMs)",STD_pd_ssd_disk,y._id));
    //                   }
    //                   if(y.tierindex == 3){
    //                     this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",3,"NAS",regional_disk,y._id));
    //                   }
    //                   if(y.tierindex == 4){
    //                     this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",4,"Object",regional_disk,y._id));
    //                   }
    //                   if(y.tierindex == 5){
    //                     this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",5,"Backup",nearline_disk,y._id));
    //                   }
    //                 }
    //                 for(let x of this.gcpStoragePricingValues){
    //                 this.storageService.updateBbyStoragePricing(x)
    //                 .subscribe(
    //                     data => {
    //                     },
    //                     error => console.error(error),
    //                 );
    //               }
    //               },
    //               error => console.error(error),
    //           );
    //         }
    //         else if(this.gcpStorageValues.length == 0) {
    //           this.gcpStoragePricingValues = [];
    //           this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",STD_pd_disk));
    //           this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",1,"SAN-SSD (used for VMs)",STD_pd_ssd_disk));
    //           this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",3,"NAS",regional_disk));
    //           this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",4,"Object",regional_disk));
    //           this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",5,"Backup",nearline_disk));
    //                 for(let x of this.gcpStoragePricingValues){
    //                 this.storageService.addBbyStoragePricing(x)
    //                 .subscribe(
    //                     data => {
    //                     },
    //                     error => console.error(error),
    //                 );
    //               }
    //         }

    //         if(this.gcpNetworkValues.length > 0) {
    //             this.networkService.getGcpNetworkPricing()
    //             .subscribe(
    //                 data => {
    //                   this.gcpNetworkPricingValues = [];
    //                   for (let y of this.gcpNetworkValues){
    //                     if(y.index == 1){
    //                       this.gcpNetworkPricingValues.push(new networkPrice("gcp",1,"<1TB",GCP_Data_out1,y._id));
    //                     }
    //                     if(y.index == 2){
    //                       this.gcpNetworkPricingValues.push(new networkPrice("gcp",2,"1-5 TB",GCP_Data_out2,y._id));
    //                     }
    //                     if(y.index == 3){
    //                       this.gcpNetworkPricingValues.push(new networkPrice("gcp",3,"5-10TB",GCP_Data_out3,y._id));
    //                     }
    //                     if(y.index == 4){
    //                       this.gcpNetworkPricingValues.push(new networkPrice("gcp",4,"10-20TB",GCP_Data_out4,y._id));
    //                     }
    //                   }
    //                   for(let x of this.gcpNetworkPricingValues){
    //                   this.networkService.updateGcpNetworkPricing(x)
    //                   .subscribe(
    //                       data => {
    //                       },
    //                       error => console.error(error),
    //                   );
    //                 }
    //                 },
    //                 error => console.error(error),
    //             );
    //           }
    //           else if(this.gcpNetworkValues.length == 0) {
    //             this.gcpNetworkPricingValues = [];
    //             this.gcpNetworkPricingValues.push(new networkPrice("gcp",1,"<1TB",GCP_Data_out1));
    //             this.gcpNetworkPricingValues.push(new networkPrice("gcp",2,"1-5 TB",GCP_Data_out2));
    //             this.gcpNetworkPricingValues.push(new networkPrice("gcp",3,"5-10TB",GCP_Data_out3));
    //             this.gcpNetworkPricingValues.push(new networkPrice("gcp",4,"10-20TB",GCP_Data_out4));
    //                   for(let x of this.gcpNetworkPricingValues){
    //                   this.networkService.addGcpNetworkPricing(x)
    //                   .subscribe(
    //                       data => {
    //                       },
    //                       error => console.error(error),
    //                   );
    //                 }
    //           }
    //           //this.loading = false;
    //        } );
    //        //this.loading = false;
    //        this.refresh = true;
    //        parent.scrollTo(0, 0);
    //        this.pricingService.getAllAssessmentCalculation()
    //        .subscribe(
    //            data => {
    //              console.log(data);
    //              for(let x of data){
    //                x.hostingCostUpdated = true;
    //              this.pricingService.updateAssessmentCalculation(x)
    //              .subscribe(
    //                  data => {
    //                  },
    //                  error => console.error(error),
    //              );
    //            }
    //            },
    //            error => console.error(error),
    //        );
    //  }

    back() {
      this.location.back(); 
    }
  }
