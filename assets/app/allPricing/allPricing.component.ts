import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HostingCalculatorService } from '../hosting_calculator/hostingCalculator.service';
import { StorageCloudPriceService } from '../hosting_calculator/storageCloudPrice.service';
import { NetworkPriceService } from '../hosting_calculator/networkPrice.service';
import { AuthService } from '../auth/auth.service';
import { BbyPricingValues } from '../hosting_calculator/bbyPricingValues.model';
import { storageCloudPrice } from '../hosting_calculator/storageCloudPrice.model';
import { OtherConstants } from '../hosting_calculator/otherconstants.model';
import { networkPrice } from '../hosting_calculator/networkPrice.model';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'allPricing',
  templateUrl: './allPricing.component.html',
  styleUrls: ['./allPricing.component.css']
})
export class AllPricingComponent {
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
  azureStoragePricingValues: storageCloudPrice[] = [];
  azureStorageValues: storageCloudPrice[] = [];
  bbyOtherPricingValues: OtherConstants[] = [];
  bbyOtherValues: OtherConstants[] = [];
  gcpNetworkPricingValues: networkPrice[] = [];
  gcpNetworkValues: networkPrice[] = [];
  awsNetworkPricingValues: networkPrice[] = [];
  awsNetworkValues: networkPrice[] = [];
  azureNetworkPricingValues: networkPrice[] = [];
  azureNetworkValues: networkPrice[] = [];
  bbyCS : String = "";
  bbyCM : String = "";
  bbyCL : String = "";
  bbyCXL : String = "";
  bbyCXXL : String = "";
  bbyCXXXL : String = "";
  bbyCJumbo : String = "";
  bbyRS : String = "";
  bbyRM : String = "";
  bbyRL : String = "";
  bbyRXL : String = "";
  bbyRXXL : String = "";
  bbyRXXXL : String = "";
  bbyRJumbo : String = "";
  bbyWS : String = "";
  bbyWM : String = "";
  bbyWL : String = "";
  bbyWXL : String = "";
  bbyWXXL : String = "";
  bbyWXXXL : String = "";
  bbyWJumbo : String = "";
  awsCS : String = "";
  awsCM : String = "";
  awsCL : String = "";
  awsCXL : String = "";
  awsCXXL : String = "";
  awsCXXXL : String = "";
  awsCJumbo : String = "";
  awsRS : String = "";
  awsRM : String = "";
  awsRL : String = "";
  awsRXL : String = "";
  awsRXXL : String = "";
  awsRXXXL : String = "";
  awsRJumbo : String = "";
  awsWS : String = "";
  awsWM : String = "";
  awsWL : String = "";
  awsWXL : String = "";
  awsWXXL : String = "";
  awsWXXXL : String = "";
  awsWJumbo : String = "";
  gcpCS : String = "";
  gcpCM : String = "";
  gcpCL : String = "";
  gcpCXL : String = "";
  gcpCXXL : String = "";
  gcpCXXXL : String = "";
  gcpCJumbo : String = "";
  gcpRS : String = "";
  gcpRM : String = "";
  gcpRL : String = "";
  gcpRXL : String = "";
  gcpRXXL : String = "";
  gcpRXXXL : String = "";
  gcpRJumbo : String = "";
  gcpWS : String = "";
  gcpWM : Number = 0;
  gcpWL : Number = 0;
  gcpWXL : Number = 0;
  gcpWXXL : String = "";
  gcpWXXXL : Number = 0;
  gcpWJumbo : String = "";
  azureCS : String = "";
  azureCM : String = "";
  azureCL : String = "";
  azureCXL : String = "";
  azureCXXL : String = "";
  azureCXXXL : String = "";
  azureCJumbo : String = "";
  azureRS : String = "";
  azureRM : String = "";
  azureRL : String = "";
  azureRXL : String = "";
  azureRXXL : String = "";
  azureRXXXL : String = "";
  azureRJumbo : String = "";
  azureWS : String = "";
  azureWM : String = "";
  azureWL : String = "";
  azureWXL : String = "";
  azureWXXL : String = "";
  azureWXXXL : String = "";
  azureWJumbo : String = "";
  bby1 : String = "";
  bby2 : String = "";
  bby3 : String = "";
  bby4 : String = "";
  bby5 : String = "";
  aws1 : String = "";
  aws2 : String = "";
  aws3 : String = "";
  aws4 : String = "";
  aws5 : String = "";
  gcp1 : String = "";
  gcp2 : String = "";
  gcp3 : String = "";
  gcp4 : String = "";
  gcp5 : String = "";
  bes : String = "";
  paas : String = "";
  awsD : String = "";
  azureD : String = "";
  gcpD : String = "";
  riazureDis : String = "";
  riawsDis : String = "";
  sugcpDis : String = "";
  awsN1 : String = "";
  awsN2 : Number = 0;
  awsN3 : Number = 0;
  awsN4 : Number = 0;
  gcpN1 : String = "";
  gcpN2 : String = "";
  gcpN3 : Number = 0;
  gcpN4 : Number = 0;
  azureN1 : String = "";
  azureN2 : String = "";
  azureN3 : Number = 0;
  azureN4 : Number = 0;
  azure1 : String = "";
  azure2 : String = "";
  azure3 : String = "";
  azure4 : String = "";
  azure5 : String = "";
  loading : boolean = false;
  loadingAzure : boolean = false;
  loadingGcp: boolean = false;
  refresh : boolean = false;
  refreshGcp : boolean = false;
  refreshAzure : boolean = false;

  constructor(private router: Router, private pricingService: HostingCalculatorService, 
    private storageService: StorageCloudPriceService, private networkService: NetworkPriceService,
    private authService: AuthService) {}


  ngOnInit() {

if (!this.authService.isLoggedIn())
    {
      this.router.navigateByUrl('/auth/signin');
    }

    this.bbyComputeValues = [];
    this.gcpComputeValues = [];
    this.gcpComputePricingValues = [];
    this.awsComputeValues = [];
    this.azureComputeValues = [];
    this.bbyStorageValues = [];
    this.gcpStorageValues = [];
    this.awsStorageValues = [];
    this.azureStorageValues = [];
    this.bbyOtherValues = [];
    this.bbyOtherPricingValues = [];
    this.gcpNetworkValues = [];
    this.awsNetworkValues = [];
    this.azureNetworkValues = [];
    this.loading = false;
    this.loadingAzure = false;
    this.loadingGcp =  false;
    this.refresh = false;
    this.refreshGcp = false;
    this.refreshAzure = false;

    this.InitialLoad();
  }

  InitialLoad() {
    Observable.forkJoin(
      this.pricingService.getBbyComputePricing()
        .map(
            data => {
              for(let x of data){
                if(x.type == "bby"){
                    this.bbyComputeValues.push(new BbyPricingValues(x.type,x.size,x.centos,x.RH,x.W,x._id));
                }
                if(x.type == "GCP"){
                    this.gcpComputeValues.push(new BbyPricingValues(x.type,x.size,x.centos,x.RH,x.W,x._id));
                }
                if(x.type == "AWS"){
                  this.awsComputeValues.push(new BbyPricingValues(x.type,x.size,x.centos,x.RH,x.W,x._id));
              }
              if(x.type == "azure"){
                this.azureComputeValues.push(new BbyPricingValues(x.type,x.size,x.centos,x.RH,x.W,x._id));
            }
              }
              if(this.bbyComputeValues.length > 0){
                console.log(this.bbyComputeValues);
                for(let y of this.bbyComputeValues){
                  if(y.size == "Small (2/8)"){
                    this.bbyCS = y.centos;
                    this.bbyRS = y.RH;
                    this.bbyWS = y.W;
                  }
                  if(y.size == "Medium (4/32)"){
                    this.bbyCM = y.centos;
                    this.bbyRM = y.RH;
                    this.bbyWM = y.W;
                  }
                  if(y.size == "Large (8/64)"){
                    this.bbyCL = y.centos;
                    this.bbyRL = y.RH;
                    this.bbyWL = y.W;
                  }
                  if(y.size == "X-Large (16/64)"){
                    this.bbyCXL = y.centos;
                    this.bbyRXL = y.RH;
                    this.bbyWXL = y.W;
                  }
                  if(y.size == "XXL (32/128)"){
                    this.bbyCXXL = y.centos;
                    this.bbyRXXL = y.RH;
                    this.bbyWXXL = y.W;
                  }
                  if(y.size == "XXXL (64/480)"){
                    this.bbyCXXXL = y.centos;
                    this.bbyRXXXL = y.RH;
                    this.bbyWXXXL = y.W;
                  }
                  if(y.size == "Jumbo (>64 and >480)"){
                    this.bbyCJumbo = y.centos;
                    this.bbyRJumbo = y.RH;
                    this.bbyWJumbo = y.W;
                  } 
                }
              }
              if(this.awsComputeValues.length > 0){
                console.log(this.awsComputeValues);
                for(let y of this.awsComputeValues){
                  if(y.size == "Small (2/8)"){
                    this.awsCS = y.centos;
                    this.awsRS = y.RH;
                    this.awsWS = y.W;
                  }
                  if(y.size == "Medium (4/32)"){
                    this.awsCM = y.centos;
                    this.awsRM = y.RH;
                    this.awsWM = y.W;
                  }
                  if(y.size == "Large (8/64)"){
                    this.awsCL = y.centos;
                    this.awsRL = y.RH;
                    this.awsWL = y.W;
                  }
                  if(y.size == "X-Large (16/64)"){
                    this.awsCXL = y.centos;
                    this.awsRXL = y.RH;
                    this.awsWXL = y.W;
                  }
                  if(y.size == "XXL (32/128)"){
                    this.awsCXXL = y.centos;
                    this.awsRXXL = y.RH;
                    this.awsWXXL = y.W;
                  }
                  if(y.size == "XXXL (64/480)"){
                    this.awsCXXXL = y.centos;
                    this.awsRXXXL = y.RH;
                    this.awsWXXXL = y.W;
                  }
                  if(y.size == "Jumbo (>64 and >480)"){
                    this.awsCJumbo = y.centos;
                    this.awsRJumbo = y.RH;
                    this.awsWJumbo = y.W;
                  } 
                }
              }
              if(this.gcpComputeValues.length > 0){
                console.log(this.gcpComputeValues);
                for(let y of this.gcpComputeValues){
                  if(y.size == "Small (2/8)"){
                    this.gcpCS = y.centos;
                    this.gcpRS = y.RH;
                    this.gcpWS = y.W;
                  }
                  if(y.size == "Medium (4/32)"){
                    this.gcpCM = y.centos;
                    this.gcpRM = y.RH;
                    this.gcpWM = Number(y.W);
                  }
                  if(y.size == "Large (8/64)"){
                    this.gcpCL = y.centos;
                    this.gcpRL = y.RH;
                    this.gcpWL = Number(y.W);
                  }
                  if(y.size == "X-Large (16/64)"){
                    this.gcpCXL = y.centos;
                    this.gcpRXL = y.RH;
                    this.gcpWXL = Number(y.W);
                  }
                  if(y.size == "XXL (32/128)"){
                    this.gcpCXXL = y.centos;
                    this.gcpRXXL = y.RH;
                    this.gcpWXXL = y.W;
                  }
                  if(y.size == "XXXL (64/480)"){
                    this.gcpCXXXL = y.centos;
                    this.gcpRXXXL = y.RH;
                    this.gcpWXXXL = Number(y.W);
                  }
                  if(y.size == "Jumbo (>64 and >480)"){
                    this.gcpCJumbo = y.centos;
                    this.gcpRJumbo = y.RH;
                    this.gcpWJumbo = y.W;
                  } 
                }
              }
              if(this.azureComputeValues.length > 0){
                console.log(this.azureComputeValues);
                for(let y of this.azureComputeValues){
                  if(y.size == "Small (2/8)"){
                    this.azureCS = y.centos;
                    this.azureRS = y.RH;
                    this.azureWS = y.W;
                  }
                  if(y.size == "Medium (4/32)"){
                    this.azureCM = y.centos;
                    this.azureRM = y.RH;
                    this.azureWM = y.W;
                  }
                  if(y.size == "Large (8/64)"){
                    this.azureCL = y.centos;
                    this.azureRL = y.RH;
                    this.azureWL = y.W;
                  }
                  if(y.size == "X-Large (16/64)"){
                    this.azureCXL = y.centos;
                    this.azureRXL = y.RH;
                    this.azureWXL = y.W;
                  }
                  if(y.size == "XXL (32/128)"){
                    this.azureCXXL = y.centos;
                    this.azureRXXL = y.RH;
                    this.azureWXXL = y.W;
                  }
                  if(y.size == "XXXL (64/480)"){
                    this.azureCXXXL = y.centos;
                    this.azureRXXXL = y.RH;
                    this.azureWXXXL = y.W;
                  }
                  if(y.size == "Jumbo (>64 and >480)"){
                    this.azureCJumbo = y.centos;
                    this.azureRJumbo = y.RH;
                    this.azureWJumbo = y.W;
                  } 
                }
              }
            },
            error => console.error(error),
        ),

        this.storageService.getBbyStoragePricing()
        .map(
            data => {
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
                if(x.storagetype == "azure"){
                  this.azureStorageValues.push(new storageCloudPrice(x.storagetype,x.tierindex,x.tier,x.cost,x._id));
                }
              }
              if(this.bbyStorageValues.length > 0){
                for (let y of this.bbyStorageValues){
                  // if(y.tierindex == 2){
                  //   this.bbyStoragePricingValues.push(new storageCloudPrice("bby",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",this.bbyGroup.value.Sperf,y._id));
                  // }
                  if(y.tierindex == 1){
                    this.bby1 = y.cost
                  }
                  if(y.tierindex == 3){
                    this.bby3 = y.cost;
                  }
                  if(y.tierindex == 4){
                    this.bby4 = y.cost;
                  }
                  if(y.tierindex == 5){
                    this.bby5 = y.cost;
                  }
                }
              }
              if(this.awsStorageValues.length > 0){
                for (let y of this.awsStorageValues){
                  // if(y.tierindex == 2){
                  //   this.bbyStoragePricingValues.push(new storageCloudPrice("bby",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",this.bbyGroup.value.Sperf,y._id));
                  // }
                  if(y.tierindex == 1){
                    this.aws1 = y.cost
                  }
                  if(y.tierindex == 3){
                    this.aws3 = y.cost;
                  }
                  if(y.tierindex == 4){
                    this.aws4 = y.cost;
                  }
                  if(y.tierindex == 5){
                    this.aws5 = y.cost;
                  }
                }
              }
              if(this.gcpStorageValues.length > 0){
                for (let y of this.gcpStorageValues){
                  // if(y.tierindex == 2){
                  //   this.bbyStoragePricingValues.push(new storageCloudPrice("bby",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",this.bbyGroup.value.Sperf,y._id));
                  // }
                  if(y.tierindex == 1){
                    this.gcp1 = y.cost
                  }
                  if(y.tierindex == 3){
                    this.gcp3 = y.cost;
                  }
                  if(y.tierindex == 4){
                    this.gcp4 = y.cost;
                  }
                  if(y.tierindex == 5){
                    this.gcp5 = y.cost;
                  }
                }
              }
              if(this.azureStorageValues.length > 0){
                for (let y of this.azureStorageValues){
                  // if(y.tierindex == 2){
                  //   this.bbyStoragePricingValues.push(new storageCloudPrice("bby",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",this.bbyGroup.value.Sperf,y._id));
                  // }
                  if(y.tierindex == 1){
                    this.azure1 = y.cost
                  }
                  if(y.tierindex == 3){
                    this.azure3 = y.cost;
                  }
                  if(y.tierindex == 4){
                    this.azure4 = y.cost;
                  }
                  if(y.tierindex == 5){
                    this.azure5 = y.cost;
                  }
                }
              }
            },
            error => console.error(error),
        ),

        this.pricingService.getBbyOtherPricing()
        .map(
            data => {
              for(let x of data){
                this.bbyOtherValues.push(new OtherConstants(x.name,x.value,x._id));
              }
              for (let y of this.bbyOtherValues){
                if(y.name == "Azure Discount"){
                  this.azureD = (y.value).toString();
                }
                if(y.name == "AWS Discount"){
                  this.awsD = (y.value).toString();
                }
                if(y.name == "GCP Discount"){
                  this.gcpD = (y.value).toString();
                }
                if(y.name == "RI Azure Discount"){
                  this.riazureDis = (y.value).toString();
                }
                if(y.name == "RI AWS Discount"){
                  this.riawsDis = (y.value).toString();
                }
                if(y.name == "SU GCP Discount"){
                  this.sugcpDis = (y.value).toString();
                }
                if(y.name == "BBY Elasticity savings"){
                  this.bes = (y.value).toString();
                }
                if(y.name == "PaaS savings"){
                  this.paas = (y.value).toString();
                }
                if(y.name == "Depreciation Terms"){
                }
              }
            },
            error => console.error(error),
        ),

        this.networkService.getGcpNetworkPricing()
      .map( 
          data => {
            for(let x of data){
              if(x.networktype == "gcp"){
              this.gcpNetworkValues.push(new networkPrice(x.networktype,x.index,x.networkRange,x.cost,x._id));
              }
              if(x.networktype == "aws"){
                this.awsNetworkValues.push(new networkPrice(x.networktype,x.index,x.networkRange,x.cost,x._id));
              }
              if(x.networktype == "azure"){
                this.azureNetworkValues.push(new networkPrice(x.networktype,x.index,x.networkRange,x.cost,x._id));
              }
            }
            for(let y of this.awsNetworkValues){
              if(this.awsNetworkValues.length > 0){
                if(y.index == 1){
                  this.awsN1 = y.cost;
                }
                if(y.index == 2){
                  this.awsN2 = Number(y.cost);
                }
                if(y.index == 3){
                  this.awsN3 = Number(y.cost);
                }
                if(y.index == 4){
                  this.awsN4 = Number(y.cost);
                }
              }
            }
            for(let y of this.gcpNetworkValues){
              if(this.gcpNetworkValues.length > 0){
                if(y.index == 1){
                  this.gcpN1 = y.cost;
                }
                if(y.index == 2){
                  this.gcpN2 = y.cost;
                }
                if(y.index == 3){
                  this.gcpN3 = Number(y.cost);
                }
                if(y.index == 4){
                  this.gcpN4 = Number(y.cost);
                }
              }
            }
            for(let y of this.azureNetworkValues){
              if(this.azureNetworkValues.length > 0){
                if(y.index == 1){
                  this.azureN1 = y.cost;
                }
                if(y.index == 2){
                  this.azureN2 = y.cost;
                }
                if(y.index == 3){
                  this.azureN3 = Number(y.cost);
                }
                if(y.index == 4){
                  this.azureN4 = Number(y.cost);
                }
              }
            }
          },
          error => console.error(error),
      )
      ).finally(() => {

      }).subscribe();

  }

  AutoRefreshAzure() {
    this.loadingAzure= true;
    this.pricingService.getAzurePricing()
    .subscribe(
      jsonData => {
          console.log(jsonData);
          this.loadingAzure= true;
          for (var i = 0; i < jsonData.length; ++i) {
            var VM_size = jsonData[i].meterName
            if(jsonData[i].meterName == "Standard_D11_v2 VM (Windows) - US East") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var std_D11_v2_win_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         else if(jsonData[i].meterName == "Standard_D12_v2 VM_Promo (Windows) - US East - Promo") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var std_D12_v2_win_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         else if(jsonData[i].meterName == "Standard_D13_v2 VM_Promo (Windows) - US East - Promo") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var std_D13_v2_win_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         else if(jsonData[i].meterName == "Standard_F16_v2 VM (Windows) - US East") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var std_F16_v2_win_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         else if(jsonData[i].meterName == "Standard_D32_v3 VM (Windows) - US East") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var std_D32_v3_win_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         else if(jsonData[i].meterName == "Standard_E64_v3 VM (Windows) - US East") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var std_E64_v3_win_PRICE=Math.round((Unit_Price*100)*100)/10000;;
         }
         if(jsonData[i].meterName == "Standard_D11_v2 VM - US East") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var std_D11_v2_CentOS_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         else if(jsonData[i].meterName == "Standard_D13_v2 VM_Promo - US East - Promo") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var std_D12_v2_CentOS_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         
         else if(jsonData[i].meterName == "Standard_D13_v2 VM_Promo - US East - Promo") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var std_D13_v2_CentOS_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         else if(jsonData[i].meterName == "Standard_F16_v2 VM - US East") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var std_F16_v2_CentOS_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         else if(jsonData[i].meterName == "Standard_D32_v3 VM - US East") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var std_D32_v3_CentOS_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         else if(jsonData[i].meterName == "Standard_E64_v3 VM - US East") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var std_E64_v3_CentOS_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         if(jsonData[i].meterName == "Red Hat Enterprise Linux (2 core)") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var RHEL_2core_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         else if(jsonData[i].meterName == "Red Hat Enterprise Linux (4 core)") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var RHEL_4core_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         else if(jsonData[i].meterName == "Red Hat Enterprise Linux (8 core)") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var RHEL_8core_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         else if(jsonData[i].meterName == "Red Hat Enterprise Linux (16 core)") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var RHEL_16core_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         else if(jsonData[i].meterName == "Red Hat Enterprise Linux (32 core)") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var RHEL_32core_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         else if(jsonData[i].meterName == "Red Hat Enterprise Linux (64 core)") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var RHEL_64core_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
     if(jsonData[i].meterName == "Storage Locally Redundant Standard Managed Disk/S4 - US East") 
         {
           var One_GB_LR_Standard_ManagedDisk=jsonData[i].unitPrice/32;
           One_GB_LR_Standard_ManagedDisk = Math.round(One_GB_LR_Standard_ManagedDisk * 1000)/1000;
         }		
     if(jsonData[i].meterName == "Locally Redundant Storage Premium Storage - Page Blob/P10 - US East") 
         {
           var One_GB_LR_Premium_ManagedDisk=jsonData[i].unitPrice/128;
           One_GB_LR_Premium_ManagedDisk=One_GB_LR_Premium_ManagedDisk*1;
           One_GB_LR_Premium_ManagedDisk=Math.round((One_GB_LR_Premium_ManagedDisk*100)*100)/10000;
           One_GB_LR_Premium_ManagedDisk = Math.round(One_GB_LR_Premium_ManagedDisk * 1000)/1000;
         }		
     if(jsonData[i].meterName == "Storage Locally Redundant Standard IO - Cool Block Blob - US East") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var One_GB_LR_COOL_Block_Blob=Math.round((Unit_Price*100)*100)/10000;
           One_GB_LR_COOL_Block_Blob = Math.round(One_GB_LR_COOL_Block_Blob * 1000)/1000;
         }					
     if(jsonData[i].meterName == "Locally Redundant Storage Standard IO - File") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var One_GB_LR_FILE=Math.round((Unit_Price*100)*100)/10000;
         }	
     if(jsonData[i].meterName == "Data Transfer Out - Zone 1") 
         {
           var Unit=jsonData[i].unitOfMeasure
           Unit = Unit.substr(0,Unit.indexOf(' ')); 
           var Unit_int=Unit*1;
           var Unit_Price=jsonData[i].unitPrice/Unit_int;
           var DataTransferOut_PRICE=Math.round((Unit_Price*100)*100)/10000;
         }
         }
     console.log("std_D11_v2_win_PRICE: " + std_D11_v2_win_PRICE);
     console.log("std_A4m_v2_win_PRICE: " + std_D12_v2_win_PRICE);
     console.log("std_A8m_v2_win_PRICE: " + std_D13_v2_win_PRICE);
     console.log("std_F16_v2_win_PRICE: " + std_F16_v2_win_PRICE);
     console.log("std_D32_v3_win_PRICE: " + std_D32_v3_win_PRICE);
     console.log("std_E64_v3_win_PRICE: " + std_E64_v3_win_PRICE);
     console.log("std_D11_v2_CentOS_PRICE: " + std_D11_v2_CentOS_PRICE);
     console.log("std_D12_v2_CentOS_PRICE: " + std_D12_v2_CentOS_PRICE);
     console.log("std_D13_v2_CentOS_PRICE: " + std_D13_v2_CentOS_PRICE);
     console.log("std_F16_v2_CentOS_PRICE: " + std_F16_v2_CentOS_PRICE);
     console.log("std_D32_v3_CentOS_PRICE: " + std_D32_v3_CentOS_PRICE);
     console.log("std_E64_v3_CentOS_PRICE: " + std_E64_v3_CentOS_PRICE);
     RHEL_2core_PRICE = RHEL_2core_PRICE + std_D11_v2_CentOS_PRICE;
     RHEL_4core_PRICE = RHEL_4core_PRICE + std_D12_v2_CentOS_PRICE;
     RHEL_8core_PRICE = RHEL_8core_PRICE + std_D13_v2_CentOS_PRICE;
     RHEL_16core_PRICE = RHEL_16core_PRICE + std_F16_v2_CentOS_PRICE;
     RHEL_32core_PRICE = RHEL_32core_PRICE + std_D32_v3_CentOS_PRICE;
     RHEL_64core_PRICE = RHEL_64core_PRICE + std_E64_v3_CentOS_PRICE;
     console.log("RHEL_2core_PRICE: " + RHEL_2core_PRICE);
     console.log("RHEL_4core_PRICE: " + RHEL_4core_PRICE);
     console.log("RHEL_8core_PRICE: " + RHEL_8core_PRICE);
     console.log("RHEL_16core_PRICE: " + RHEL_16core_PRICE);
     console.log("RHEL_32core_PRICE: " + RHEL_32core_PRICE);
     console.log("RHEL_64core_PRICE: " + RHEL_64core_PRICE);
     console.log("One_GB_LR_FILE: " + One_GB_LR_FILE);
     console.log("One_GB_LR_Standard_ManagedDisk: " + One_GB_LR_Standard_ManagedDisk);
     console.log("One_GB_LR_Premium_ManagedDisk: " + One_GB_LR_Premium_ManagedDisk);
     console.log("One_GB_LR_COOL_Block_Blob: " + One_GB_LR_COOL_Block_Blob);
     console.log("DataTransferOut_PRICE: " + DataTransferOut_PRICE);
          
     if(this.azureComputeValues.length > 0) {
      this.pricingService.getBbyComputePricing()
      .subscribe(
          data => {
            this.azureComputePricingValues = [];
            for (let y of this.azureComputeValues){
              if(y.size == "Small (2/8)"){
                this.azureComputePricingValues.push(new BbyPricingValues("azure","Small (2/8)",std_D11_v2_CentOS_PRICE.toString(),RHEL_2core_PRICE.toString(),std_D11_v2_win_PRICE.toString(),y._id));
              }
              if(y.size == "Medium (4/32)"){
                this.azureComputePricingValues.push(new BbyPricingValues("azure","Medium (4/32)",std_D12_v2_CentOS_PRICE.toString(),RHEL_4core_PRICE.toString(),std_D12_v2_win_PRICE.toString(),y._id));
              }
              if(y.size == "Large (8/64)"){
                this.azureComputePricingValues.push(new BbyPricingValues("azure","Large (8/64)",std_D13_v2_CentOS_PRICE.toString(),RHEL_8core_PRICE.toString(),std_D13_v2_win_PRICE.toString(),y._id));
              }
              if(y.size == "X-Large (16/64)"){
                this.azureComputePricingValues.push(new BbyPricingValues("azure","X-Large (16/64)",std_F16_v2_CentOS_PRICE.toString(),RHEL_16core_PRICE.toString(),std_F16_v2_win_PRICE.toString(),y._id));
              }
              if(y.size == "XXL (32/128)"){
                this.azureComputePricingValues.push(new BbyPricingValues("azure","XXL (32/128)",std_D32_v3_CentOS_PRICE.toString(),RHEL_32core_PRICE.toString(),std_D32_v3_win_PRICE.toString(),y._id));
              }
              if(y.size == "XXXL (64/480)"){
                this.azureComputePricingValues.push(new BbyPricingValues("azure","XXXL (64/480)",std_E64_v3_CentOS_PRICE.toString(),RHEL_64core_PRICE.toString(),std_E64_v3_win_PRICE.toString(),y._id));
              }
              if(y.size == "Jumbo (>64 and >480)"){
                this.azureComputePricingValues.push(new BbyPricingValues("azure","Jumbo (>64 and >480)",this.bbyCJumbo,this.bbyRJumbo,this.bbyWJumbo,y._id));
              }
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
    else if(this.azureComputeValues.length == 0) {
      this.azureComputePricingValues = [];
      this.azureComputePricingValues.push(new BbyPricingValues("azure","Small (2/8)",std_D11_v2_CentOS_PRICE.toString(),RHEL_2core_PRICE.toString(),std_D11_v2_win_PRICE.toString()));
      this.azureComputePricingValues.push(new BbyPricingValues("azure","Medium (4/32)",std_D12_v2_CentOS_PRICE.toString(),RHEL_4core_PRICE.toString(),std_D12_v2_win_PRICE.toString()));
      this.azureComputePricingValues.push(new BbyPricingValues("azure","Large (8/64)",std_D13_v2_CentOS_PRICE.toString(),RHEL_8core_PRICE.toString(),std_D13_v2_win_PRICE.toString()));
      this.azureComputePricingValues.push(new BbyPricingValues("azure","X-Large (16/64)",std_F16_v2_CentOS_PRICE.toString(),RHEL_16core_PRICE.toString(),std_F16_v2_win_PRICE.toString()));
      this.azureComputePricingValues.push(new BbyPricingValues("azure","XXL (32/128)",std_D32_v3_CentOS_PRICE.toString(),RHEL_32core_PRICE.toString(),std_D32_v3_win_PRICE.toString()));
      this.azureComputePricingValues.push(new BbyPricingValues("azure","XXXL (64/480)",std_E64_v3_CentOS_PRICE.toString(),RHEL_64core_PRICE.toString(),std_E64_v3_win_PRICE.toString()));
      this.azureComputePricingValues.push(new BbyPricingValues("azure","Jumbo (>64 and >480)",this.bbyCJumbo,this.bbyRJumbo,this.bbyWJumbo));
            for(let x of this.azureComputePricingValues){
            this.pricingService.addBbyComputePricing(x)
            .subscribe(
                data => {
                },
                error => console.error(error),
            );
          }
    }
    if(this.azureStorageValues.length > 0) {
      this.storageService.getBbyStoragePricing()
      .subscribe(
          data => {
            this.azureStoragePricingValues = [];
            for (let y of this.azureStorageValues){
              if(y.tierindex == 2){
                this.azureStoragePricingValues.push(new storageCloudPrice("azure",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",One_GB_LR_FILE.toString(),y._id));
              }
              if(y.tierindex == 1){
                this.azureStoragePricingValues.push(new storageCloudPrice("azure",1,"SAN-SSD (used for VMs)",One_GB_LR_FILE.toString(),y._id));
              }
              if(y.tierindex == 3){
                this.azureStoragePricingValues.push(new storageCloudPrice("azure",3,"NAS",One_GB_LR_Standard_ManagedDisk.toString(),y._id));
              }
              if(y.tierindex == 4){
                this.azureStoragePricingValues.push(new storageCloudPrice("azure",4,"Object",One_GB_LR_Premium_ManagedDisk.toString(),y._id));
              }
              if(y.tierindex == 5){
                this.azureStoragePricingValues.push(new storageCloudPrice("azure",5,"Backup",One_GB_LR_COOL_Block_Blob.toString(),y._id));
              }
            }
            for(let x of this.azureStoragePricingValues){
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
    else if(this.azureStorageValues.length == 0) {
      this.azureStoragePricingValues = [];
      this.azureStoragePricingValues.push(new storageCloudPrice("azure",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",One_GB_LR_FILE.toString()));
      this.azureStoragePricingValues.push(new storageCloudPrice("azure",1,"SAN-SSD (used for VMs)",One_GB_LR_FILE.toString()));
      this.azureStoragePricingValues.push(new storageCloudPrice("azure",3,"NAS",One_GB_LR_Standard_ManagedDisk.toString()));
      this.azureStoragePricingValues.push(new storageCloudPrice("azure",4,"Object",One_GB_LR_Premium_ManagedDisk.toString()));
      this.azureStoragePricingValues.push(new storageCloudPrice("azure",5,"Backup",One_GB_LR_COOL_Block_Blob.toString()));
            for(let x of this.azureStoragePricingValues){
            this.storageService.addBbyStoragePricing(x)
            .subscribe(
                data => {
                },
                error => console.error(error),
            );
          }
    }

 var Azure_Data_out1 = (DataTransferOut_PRICE * 1024).toString();
    var Azure_Data_out2 = (Number(Azure_Data_out1) * 5).toString();
    var Azure_Data_out3 = (Number(Azure_Data_out2) * 2).toString();
    var Azure_Data_out4 = (Number(Azure_Data_out3) * 2).toString();

    if(this.azureNetworkValues.length > 0) {
      this.networkService.getGcpNetworkPricing()
      .subscribe(
          data => {
            this.azureNetworkPricingValues = [];
            for (let y of this.azureNetworkValues){
              if(y.index == 1){
                this.azureNetworkPricingValues.push(new networkPrice("azure",1,"<1TB",Azure_Data_out1,y._id));
              }
              if(y.index == 2){
                this.azureNetworkPricingValues.push(new networkPrice("azure",2,"1-5 TB",Azure_Data_out2,y._id));
              }
              if(y.index == 3){
                this.azureNetworkPricingValues.push(new networkPrice("azure",3,"5-10TB",Azure_Data_out3,y._id));
              }
              if(y.index == 4){
                this.azureNetworkPricingValues.push(new networkPrice("azure",4,"10-20TB",Azure_Data_out4,y._id));
              }
            }
            for(let x of this.azureNetworkPricingValues){
            this.networkService.updateGcpNetworkPricing(x)
            .subscribe(
                data => {
                  this.InitialLoad();
                  this.loadingAzure = false;
                  this.refreshAzure = true;
                  parent.scrollTo(0, 0);
                },
                error => console.error(error),
            );
          }
          },
          error => console.error(error),
      );
    }
    else if(this.azureNetworkValues.length == 0) {
      this.azureNetworkPricingValues = [];
      this.azureNetworkPricingValues.push(new networkPrice("azure",1,"<1TB",Azure_Data_out1));
      this.azureNetworkPricingValues.push(new networkPrice("azure",2,"1-5 TB",Azure_Data_out2));
      this.azureNetworkPricingValues.push(new networkPrice("azure",3,"5-10TB",Azure_Data_out3));
      this.azureNetworkPricingValues.push(new networkPrice("azure",4,"10-20TB",Azure_Data_out4));
            for(let x of this.azureNetworkPricingValues){
            this.networkService.addGcpNetworkPricing(x)
            .subscribe(
                data => {
                  this.InitialLoad();
                  this.loadingAzure = false;
                  this.refreshAzure = true;
                  parent.scrollTo(0, 0);
                },
                error => console.error(error),
            );
          }
    }


   
      },
      error => console.error(error),
  );

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

  AutoRefreshGcp() {
      this.pricingService.getGCPPricing()
      .subscribe(
          data => {
            console.log(data);
            this.loadingGcp= true;
            var JSON_str1 = JSON.stringify(data.gcp_price_list);
            JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-2", "CP_COMPUTEENGINE_VMIMAGE_N1_STANDARD_Z");
            var ezJSON = JSON.parse(JSON_str1);
            var VM_n1_std_2 = JSON.stringify(ezJSON.CP_COMPUTEENGINE_VMIMAGE_N1_STANDARD_Z.us);
            var VM_n1_std_2 = (Number(VM_n1_std_2)*1).toString();
        
            var JSON_str1 = JSON.stringify(data.gcp_price_list);
            JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-VMIMAGE-N1-HIGHMEM-4", "CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_Z");
            var ezJSON = JSON.parse(JSON_str1);
            var VM_n1_HM_4 = JSON.stringify(ezJSON.CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_Z.us);
            var VM_n1_HM_4  = (Number(VM_n1_HM_4) *1).toString();
        
            var JSON_str1 = JSON.stringify(data.gcp_price_list);
            JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-VMIMAGE-N1-HIGHMEM-8", "CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_ZZ");
            var ezJSON = JSON.parse(JSON_str1);
            var VM_n1_HM_8 = JSON.stringify(ezJSON.CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_ZZ.us);
            var VM_n1_HM_8  =(Number(VM_n1_HM_8) *1).toString();
        
            var JSON_str1 = JSON.stringify(data.gcp_price_list);
            JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-VMIMAGE-N1-HIGHMEM-16", "CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_ZZZ");
            var ezJSON = JSON.parse(JSON_str1);
            var VM_n1_HM_16 = JSON.stringify(ezJSON.CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_ZZZ.us);
            var VM_n1_HM_16  =(Number(VM_n1_HM_16) *1).toString();
            
            var JSON_str1 = JSON.stringify(data.gcp_price_list);
            JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-32", "CP_COMPUTEENGINE_VMIMAGE_N1_STANDARD_Y");
            var ezJSON = JSON.parse(JSON_str1);
            var VM_n1_std_32 = JSON.stringify(ezJSON.CP_COMPUTEENGINE_VMIMAGE_N1_STANDARD_Y.us);
            var VM_n1_std_32 =(Number(VM_n1_std_32)*1).toString();
            
            var JSON_str1 = JSON.stringify(data.gcp_price_list);
            JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-VMIMAGE-N1-HIGHMEM-64", "CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_ZZZZ");
            var ezJSON = JSON.parse(JSON_str1);
            var VM_n1_HM_64 = JSON.stringify(ezJSON.CP_COMPUTEENGINE_VMIMAGE_N1_HIGHMEM_ZZZZ.us);
            var VM_n1_HM_64  =(Number(VM_n1_HM_64)*1).toString();
        
            var JSON_str1 = JSON.stringify(data.gcp_price_list);
            JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-OS", "CP_COMPUTEENGINE_OS");
            var ezJSON = JSON.parse(JSON_str1);
            var Win_high = JSON.stringify(ezJSON.CP_COMPUTEENGINE_OS.win.high);
            var Win_high  =(Number(Win_high)*1).toString();
        
            var JSON_str1 = JSON.stringify(data.gcp_price_list);
            JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-OS", "CP_COMPUTEENGINE_OS");
            var ezJSON = JSON.parse(JSON_str1);
            var Rhel_high = JSON.stringify(ezJSON.CP_COMPUTEENGINE_OS.rhel.high);
            var Rhel_high  = (Number(Rhel_high)*1).toString();
            

            var JSON_str1 = JSON.stringify(data.gcp_price_list);
            JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-STORAGE-PD-CAPACITY", "CP_COMPUTEENGINE_STORAGE_PD_CAPACITY");
            var ezJSON = JSON.parse(JSON_str1);
            var STD_pd_disk = JSON.stringify(ezJSON.CP_COMPUTEENGINE_STORAGE_PD_CAPACITY.us);
            
            
            var JSON_str1 = JSON.stringify(data.gcp_price_list);
            JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-STORAGE-PD-SSD", "CP_COMPUTEENGINE_STORAGE_PD_SSD");
            var ezJSON = JSON.parse(JSON_str1);
            var STD_pd_ssd_disk = JSON.stringify(ezJSON.CP_COMPUTEENGINE_STORAGE_PD_SSD.us);
            
            
            var JSON_str1 = JSON.stringify(data.gcp_price_list);
            JSON_str1=JSON_str1.replace("CP-BIGSTORE-STORAGE-REGIONAL", "CP_BIGSTORE_STORAGE_REGIONAL");
            var ezJSON = JSON.parse(JSON_str1);
            var regional_disk = JSON.stringify(ezJSON.CP_BIGSTORE_STORAGE_REGIONAL.us);
            
            
            var JSON_str1 = JSON.stringify(data.gcp_price_list);
            JSON_str1=JSON_str1.replace("CP-NEARLINE-STORAGE", "CP_NEARLINE_STORAGE");
            var ezJSON = JSON.parse(JSON_str1);
            var nearline_disk = JSON.stringify(ezJSON.CP_NEARLINE_STORAGE.us);
            
            
            var JSON_str1 = JSON.stringify(data.gcp_price_list);
            JSON_str1=JSON_str1.replace("CP-COMPUTEENGINE-INTERNET-EGRESS-NA-NA", "CP_COMPUTEENGINE_INTERNET_EGRESS_NA_NA");
            var ezJSON = JSON.parse(JSON_str1);
            var Data_out_str = JSON.stringify(ezJSON.CP_COMPUTEENGINE_INTERNET_EGRESS_NA_NA.tiers);
            Data_out_str=Data_out_str.replace("10240", "mid_tier");
            var ezJSON1 = JSON.parse(Data_out_str);
            var GCP_Data_out = JSON.stringify(ezJSON1.mid_tier);
            
            var VM_n1_std_2_W=Math.round(((Number(VM_n1_std_2)+Number(Win_high)*2))*1000)/1000;
            var VM_n1_HM_4_W=Math.round((Number(VM_n1_HM_4)+Number(Win_high)*4)*1000)/1000;
            var VM_n1_HM_8_W=Math.round((Number(VM_n1_HM_8)+Number(Win_high)*8)*1000)/1000;
            var VM_n1_HM_16_W=Math.round((Number(VM_n1_HM_16)+Number(Win_high)*16)*1000)/1000;
            var VM_n1_std_32_W=Math.round((Number(VM_n1_std_32)+Number(Win_high)*32)*1000)/1000;
            var VM_n1_HM_64_W=Math.round((Number(VM_n1_HM_64)+Number(Win_high)*64)*1000)/1000;
        
            var VM_n1_std_2_RH=Math.round((Number(VM_n1_std_2)+Number(Rhel_high))*1000)/1000;
            var VM_n1_HM_4_RH=Math.round((Number(VM_n1_HM_4)+Number(Rhel_high))*1000)/1000;
            var VM_n1_HM_8_RH=Math.round((Number(VM_n1_HM_8)+Number(Rhel_high))*1000)/1000;
            var VM_n1_HM_16_RH=Math.round((Number(VM_n1_HM_16)+Number(Rhel_high))*1000)/1000;
            var VM_n1_std_32_RH=Math.round((Number(VM_n1_std_32)+Number(Rhel_high))*1000)/1000;
            var VM_n1_HM_64_RH=Math.round((Number(VM_n1_HM_64)+Number(Rhel_high))*1000)/1000;

            var VM_n1_std_2_CentOS=Math.round(Number(VM_n1_std_2) * 1000)/1000;
            var VM_n1_HM_4_CentOS= Math.round(Number(VM_n1_HM_4) * 1000)/1000;
            var VM_n1_HM_8_CentOS=Math.round(Number(VM_n1_HM_8) * 1000)/1000;
            var VM_n1_HM_16_CentOS=Math.round(Number(VM_n1_HM_16) * 1000)/1000;
            var VM_n1_std_32_CentOS=Math.round(Number(VM_n1_std_32) * 1000)/1000;
            var VM_n1_HM_64_CentOS=Math.round(Number(VM_n1_HM_64) * 1000)/1000;

            var STD_pd_disk  =(Number(STD_pd_disk)*1).toString();
            var STD_pd_ssd_disk  =(Number(STD_pd_ssd_disk)*1).toString();
            var regional_disk  = (Number(regional_disk)*1).toString();
            var nearline_disk  = (Number(nearline_disk)*1).toString();
            var GCP_Data_out  = (Number(GCP_Data_out)*1).toString();
            var GCP_Data_out1  = (Number(GCP_Data_out)*1024).toString();
            var GCP_Data_out2  = (Number(GCP_Data_out1)*5).toString();
            var GCP_Data_out3  = (Number(GCP_Data_out2)*2).toString();
            var GCP_Data_out4 = (Number(GCP_Data_out3)*2).toString();
            
            if(this.gcpComputeValues.length > 0) {
              this.pricingService.getBbyComputePricing()
              .subscribe(
                  data => {
                    this.gcpComputePricingValues = [];
                    for (let y of this.gcpComputeValues){
                      if(y.size == "Small (2/8)"){
                        this.gcpComputePricingValues.push(new BbyPricingValues("GCP","Small (2/8)",VM_n1_std_2_CentOS.toString(),VM_n1_std_2_RH.toString(),VM_n1_std_2_W.toString(),y._id));
                      }
                      if(y.size == "Medium (4/32)"){
                        this.gcpComputePricingValues.push(new BbyPricingValues("GCP","Medium (4/32)",VM_n1_HM_4_CentOS.toString(),VM_n1_HM_4_RH.toString(),VM_n1_HM_4_W.toString(),y._id));
                      }
                      if(y.size == "Large (8/64)"){
                        this.gcpComputePricingValues.push(new BbyPricingValues("GCP","Large (8/64)",VM_n1_HM_8_CentOS.toString(),VM_n1_HM_8_RH.toString(),VM_n1_HM_8_W.toString(),y._id));
                      }
                      if(y.size == "X-Large (16/64)"){
                        this.gcpComputePricingValues.push(new BbyPricingValues("GCP","X-Large (16/64)",VM_n1_HM_16_CentOS.toString(),VM_n1_HM_16_RH.toString(),VM_n1_HM_16_W.toString(),y._id));
                      }
                      if(y.size == "XXL (32/128)"){
                        this.gcpComputePricingValues.push(new BbyPricingValues("GCP","XXL (32/128)",VM_n1_std_32_CentOS.toString(),VM_n1_std_32_RH.toString(),VM_n1_std_32_W.toString(),y._id));
                      }
                      if(y.size == "XXXL (64/480)"){
                        this.gcpComputePricingValues.push(new BbyPricingValues("GCP","XXXL (64/480)",VM_n1_HM_64_CentOS.toString(),VM_n1_HM_64_RH.toString(),VM_n1_HM_64_W.toString(),y._id));
                      }
                      if(y.size == "Jumbo (>64 and >480)"){
                        this.gcpComputePricingValues.push(new BbyPricingValues("GCP","Jumbo (>64 and >480)",this.bbyCJumbo,this.bbyRJumbo,this.bbyWJumbo,y._id));
                      }
                    }
                    for(let x of this.gcpComputePricingValues){
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
            else if(this.gcpComputeValues.length == 0) {
              this.gcpComputePricingValues = [];
              this.gcpComputePricingValues.push(new BbyPricingValues("GCP","Small (2/8)",VM_n1_std_2_CentOS.toString(),VM_n1_std_2_RH.toString(),VM_n1_std_2_W.toString()));
              this.gcpComputePricingValues.push(new BbyPricingValues("GCP","Medium (4/32)",VM_n1_HM_4_CentOS.toString(),VM_n1_HM_4_RH.toString(),VM_n1_HM_4_W.toString()));
              this.gcpComputePricingValues.push(new BbyPricingValues("GCP","Large (8/64)",VM_n1_HM_8_CentOS.toString(),VM_n1_HM_8_RH.toString(),VM_n1_HM_8_W.toString()));
              this.gcpComputePricingValues.push(new BbyPricingValues("GCP","X-Large (16/64)",VM_n1_HM_16_CentOS.toString(),VM_n1_HM_16_RH.toString(),VM_n1_HM_16_W.toString()));
              this.gcpComputePricingValues.push(new BbyPricingValues("GCP","XXL (32/128)",VM_n1_std_32_CentOS.toString(),VM_n1_std_32_RH.toString(),VM_n1_std_32_W.toString()));
              this.gcpComputePricingValues.push(new BbyPricingValues("GCP","XXXL (64/480)",VM_n1_HM_64_CentOS.toString(),VM_n1_HM_64_RH.toString(),VM_n1_HM_64_W.toString()));
              this.gcpComputePricingValues.push(new BbyPricingValues("GCP","Jumbo (>64 and >480)",this.bbyCJumbo,this.bbyRJumbo,this.bbyWJumbo));
                    for(let x of this.gcpComputePricingValues){
                    this.pricingService.addBbyComputePricing(x)
                    .subscribe(
                        data => {
                        },
                        error => console.error(error),
                    );
                  }
            }
      
            if(this.gcpStorageValues.length > 0) {
              this.storageService.getBbyStoragePricing()
              .subscribe(
                  data => {
                    this.gcpStoragePricingValues = [];
                    for (let y of this.gcpStorageValues){
                      if(y.tierindex == 2){
                        this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",STD_pd_disk,y._id));
                      }
                      if(y.tierindex == 1){
                        this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",1,"SAN-SSD (used for VMs)",STD_pd_ssd_disk,y._id));
                      }
                      if(y.tierindex == 3){
                        this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",3,"NAS",regional_disk,y._id));
                      }
                      if(y.tierindex == 4){
                        this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",4,"Object",regional_disk,y._id));
                      }
                      if(y.tierindex == 5){
                        this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",5,"Backup",nearline_disk,y._id));
                      }
                    }
                    for(let x of this.gcpStoragePricingValues){
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
            else if(this.gcpStorageValues.length == 0) {
              this.gcpStoragePricingValues = [];
              this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",STD_pd_disk));
              this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",1,"SAN-SSD (used for VMs)",STD_pd_ssd_disk));
              this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",3,"NAS",regional_disk));
              this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",4,"Object",regional_disk));
              this.gcpStoragePricingValues.push(new storageCloudPrice("gcp",5,"Backup",nearline_disk));
                    for(let x of this.gcpStoragePricingValues){
                    this.storageService.addBbyStoragePricing(x)
                    .subscribe(
                        data => {
                        },
                        error => console.error(error),
                    );
                  }
            }

            if(this.gcpNetworkValues.length > 0) {
                this.networkService.getGcpNetworkPricing()
                .subscribe(
                    data => {
                      this.gcpNetworkPricingValues = [];
                      for (let y of this.gcpNetworkValues){
                        if(y.index == 1){
                          this.gcpNetworkPricingValues.push(new networkPrice("gcp",1,"<1TB",GCP_Data_out1,y._id));
                        }
                        if(y.index == 2){
                          this.gcpNetworkPricingValues.push(new networkPrice("gcp",2,"1-5 TB",GCP_Data_out2,y._id));
                        }
                        if(y.index == 3){
                          this.gcpNetworkPricingValues.push(new networkPrice("gcp",3,"5-10TB",GCP_Data_out3,y._id));
                        }
                        if(y.index == 4){
                          this.gcpNetworkPricingValues.push(new networkPrice("gcp",4,"10-20TB",GCP_Data_out4,y._id));
                        }
                      }
                      for(let x of this.gcpNetworkPricingValues){
                      this.networkService.updateGcpNetworkPricing(x)
                      .subscribe(
                          data => {
                            this.InitialLoad();
                            this.loadingGcp = false;
                            this.refreshGcp = true;
                            parent.scrollTo(0, 0);
                          },
                          error => console.error(error),
                      );
                    }
                    },
                    error => console.error(error),
                );
              }
              else if(this.gcpNetworkValues.length == 0) {
                this.gcpNetworkPricingValues = [];
                this.gcpNetworkPricingValues.push(new networkPrice("gcp",1,"<1TB",GCP_Data_out1));
                this.gcpNetworkPricingValues.push(new networkPrice("gcp",2,"1-5 TB",GCP_Data_out2));
                this.gcpNetworkPricingValues.push(new networkPrice("gcp",3,"5-10TB",GCP_Data_out3));
                this.gcpNetworkPricingValues.push(new networkPrice("gcp",4,"10-20TB",GCP_Data_out4));
                      for(let x of this.gcpNetworkPricingValues){
                      this.networkService.addGcpNetworkPricing(x)
                      .subscribe(
                          data => {
                            this.InitialLoad();
                            this.loadingGcp = false;
                            this.refreshGcp = true;
                            parent.scrollTo(0, 0);
                          },
                          error => console.error(error),
                      );
                    }
              }
              //this.loading = false;
              //this.InitialLoad();
              //this.loadingGcp = false;
              //this.refreshGcp = true;
              //parent.scrollTo(0, 0);
           } );
           //this.loading = false;
           //this.refresh = true;
           //parent.scrollTo(0, 0);
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

  AutoRefresh(){
    this.loading = true;
      this.pricingService.getAWSPricing2()
      .subscribe(
          data => {
            console.log(data);
            this.loading = true;
            var importedJSON = data;
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.CY7FJB29V5S82GDR);
              var n = ezJSON.search("USD");
              var i=n+6;
              var j=n+11;
              var temp_Rate = ezJSON.slice(i,j);
              var i3_16XL_Win_Rate = (Number(temp_Rate) *1).toString();

              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
                var ezJSON = ezJSON.replace("65GMDPHNVSXX2ME2", "EZ65GMDPHNVSXX2ME2" );
                var goodJSON = JSON.parse(ezJSON);
                var goodJSON_str=JSON.stringify(goodJSON.EZ65GMDPHNVSXX2ME2);
                var n = goodJSON_str.search("USD");
                  i=n+6;
                  j=n+11
                var temp_Rate = goodJSON_str.slice(i,j);
              var i3_16XL_RHEL_Rate =(Number(temp_Rate) *1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.WTADZ55ETP6ZEN73);
                var n = ezJSON.search("USD");
              i=n+6;
              j=n+11
              var temp_Rate = ezJSON.slice(i,j);
              var i3_16XL_CentOS_Rate = (Number(temp_Rate) *1).toString();
              
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
                var ezJSON = ezJSON.replace("2E46DZFG7PF8J74U", "EZ2E46DZFG7PF8J74U" );
                var goodJSON = JSON.parse(ezJSON);
                var goodJSON_str=JSON.stringify(goodJSON.EZ2E46DZFG7PF8J74U);
                var n = goodJSON_str.search("USD");
                  i=n+6;
                  j=n+11
                var temp_Rate = goodJSON_str.slice(i,j);
              var m4_4XL_Win_Rate = (Number(temp_Rate) *1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.WJEZCQK5TDDFFY4S);
                var n = ezJSON.search("USD");
              i=n+6;
              j=n+11
              var temp_Rate = ezJSON.slice(i,j);
              var m4_4XL_RHEL_Rate = (Number(temp_Rate) *1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.GSMN37GEEUV2CC27);
                var n = ezJSON.search("USD");
              i=n+6;
              j=n+11
              var temp_Rate = ezJSON.slice(i,j);
              var m4_4XL_CentOS_Rate = (Number(temp_Rate) *1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.VC2BBD4RTJM8XTNZ);
                var n = ezJSON.search("USD");
              i=n+6;
              j=n+11
              var temp_Rate = ezJSON.slice(i,j);
              var m4_L_Win_Rate = (Number(temp_Rate) *1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.Q236HUQXMUFFR9AN);
                var n = ezJSON.search("USD");
              i=n+6;
              j=n+11
              var temp_Rate = ezJSON.slice(i,j);
              var m4_L_CentOS_Rate = (Number(temp_Rate) *1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.RS3U6QTRF7YFXNA9);
                var n = ezJSON.search("USD");
              i=n+6;
              j=n+11
              var temp_Rate = ezJSON.slice(i,j);
              var m4_L_RHEL_Rate = (Number(temp_Rate) *1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
                var ezJSON = ezJSON.replace("6M9945UQ8PP35XM5", "EZ6M9945UQ8PP35XM5" );
                var goodJSON = JSON.parse(ezJSON);
                var goodJSON_str=JSON.stringify(goodJSON.EZ6M9945UQ8PP35XM5);
                var n = goodJSON_str.search("USD");
                  i=n+6;
                  j=n+11
                var temp_Rate = goodJSON_str.slice(i,j);
              var r3_8XL_RHEL_Rate = (Number(temp_Rate) *1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
                var ezJSON = ezJSON.replace("9HQMNHK96SR834AM", "EZ9HQMNHK96SR834AM" );
                var goodJSON = JSON.parse(ezJSON);
                var goodJSON_str=JSON.stringify(goodJSON.EZ9HQMNHK96SR834AM);
                var n = goodJSON_str.search("USD");
                  i=n+6;
                  j=n+11
                var temp_Rate = goodJSON_str.slice(i,j);
              var r3_8XL_Win_Rate = (Number(temp_Rate) *1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
                var ezJSON = ezJSON.replace("3VWERDY4UHEZUS9F", "EZ3VWERDY4UHEZUS9F" );
                var goodJSON = JSON.parse(ezJSON);
                var goodJSON_str=JSON.stringify(goodJSON.EZ3VWERDY4UHEZUS9F);
                var n = goodJSON_str.search("USD");
                  i=n+6;
                  j=n+11
                var temp_Rate = goodJSON_str.slice(i,j);
              var r3_8XL_CentOS_Rate = (Number(temp_Rate) *1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.WJQUC4VU72GCUXP4);
                var n = ezJSON.search("USD");
              i=n+6;
              j=n+11
              var temp_Rate = ezJSON.slice(i,j);
              var r4_2xl_Win_Rate = (Number(temp_Rate) *1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.R4CKBWU7M6GSC7QB);
                var n = ezJSON.search("USD");
              i=n+6;
              j=n+11
              var temp_Rate = ezJSON.slice(i,j);
              var r4_2xl_CentOS_Rate = (Number(temp_Rate)*1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
                var ezJSON = ezJSON.replace("796R87PX3YU4QJYB", "EZ796R87PX3YU4QJYB" );
                var goodJSON = JSON.parse(ezJSON);
                var goodJSON_str=JSON.stringify(goodJSON.EZ796R87PX3YU4QJYB);
                var n = goodJSON_str.search("USD");
                  i=n+6;
                  j=n+11
                var temp_Rate = goodJSON_str.slice(i,j);
              var r4_2xl_RHEL_Rate = (Number(temp_Rate)*1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.BTRHHGGU55RP69QE );
                var n = ezJSON.search("USD");
              i=n+6;
              j=n+11
              var temp_Rate = ezJSON.slice(i,j);
              var r4_xl_Win_Rate = (Number(temp_Rate) *1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
                var ezJSON = ezJSON.replace("9F2Q74QEE8HZE6A8", "EZ9F2Q74QEE8HZE6A8" );
                var goodJSON = JSON.parse(ezJSON);
                var goodJSON_str=JSON.stringify(goodJSON.EZ9F2Q74QEE8HZE6A8);
                var n = goodJSON_str.search("USD");
                  i=n+6;
                  j=n+11
                var temp_Rate = goodJSON_str.slice(i,j);
              var r4_XL_CentOS_Rate = (Number(temp_Rate) *1).toString();
            
              var ezJSON=JSON.stringify(importedJSON.terms.OnDemand);
                var ezJSON = ezJSON.replace("73R87VUK3BUGHWNT", "EZ73R87VUK3BUGHWNT" );
                var goodJSON = JSON.parse(ezJSON);
                var goodJSON_str=JSON.stringify(goodJSON.EZ73R87VUK3BUGHWNT);
                var n = goodJSON_str.search("USD");
                  i=n+6;
                  j=n+11
                var temp_Rate = goodJSON_str.slice(i,j);
              var r4_xl_RHEL_Rate = (Number(temp_Rate) *1).toString();

              if(this.awsComputeValues.length > 0) {
                this.pricingService.getBbyComputePricing()
                .subscribe(
                    data => {
                      this.awsComputePricingValues = [];
                      for (let y of this.awsComputeValues){
                        if(y.size == "Small (2/8)"){
                          this.awsComputePricingValues.push(new BbyPricingValues("AWS","Small (2/8)",m4_L_CentOS_Rate,m4_L_RHEL_Rate,m4_L_Win_Rate,y._id));
                        }
                        if(y.size == "Medium (4/32)"){
                          this.awsComputePricingValues.push(new BbyPricingValues("AWS","Medium (4/32)",r4_XL_CentOS_Rate,r4_xl_RHEL_Rate,r4_xl_Win_Rate,y._id));
                        }
                        if(y.size == "Large (8/64)"){
                          this.awsComputePricingValues.push(new BbyPricingValues("AWS","Large (8/64)",r4_2xl_CentOS_Rate,r4_2xl_RHEL_Rate,r4_2xl_Win_Rate,y._id));
                        }
                        if(y.size == "X-Large (16/64)"){
                          this.awsComputePricingValues.push(new BbyPricingValues("AWS","X-Large (16/64)",m4_4XL_CentOS_Rate,m4_4XL_RHEL_Rate,m4_4XL_Win_Rate,y._id));
                        }
                        if(y.size == "XXL (32/128)"){
                          this.awsComputePricingValues.push(new BbyPricingValues("AWS","XXL (32/128)",r3_8XL_CentOS_Rate,r3_8XL_RHEL_Rate,r3_8XL_Win_Rate,y._id));
                        }
                        if(y.size == "XXXL (64/480)"){
                          this.awsComputePricingValues.push(new BbyPricingValues("AWS","XXXL (64/480)",i3_16XL_CentOS_Rate,i3_16XL_RHEL_Rate,i3_16XL_Win_Rate,y._id));
                        }
                        if(y.size == "Jumbo (>64 and >480)"){
                          this.awsComputePricingValues.push(new BbyPricingValues("AWS","Jumbo (>64 and >480)",this.bbyCJumbo,this.bbyRJumbo,this.bbyWJumbo,y._id));
                        }
                      }
                      for(let x of this.awsComputePricingValues){
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
              else if(this.awsComputeValues.length == 0) {
                this.awsComputePricingValues = [];
                this.awsComputePricingValues.push(new BbyPricingValues("AWS","Small (2/8)",m4_L_CentOS_Rate,m4_L_RHEL_Rate,m4_L_Win_Rate));
                this.awsComputePricingValues.push(new BbyPricingValues("AWS","Medium (4/32)",r4_XL_CentOS_Rate,r4_xl_RHEL_Rate,r4_xl_Win_Rate));
                this.awsComputePricingValues.push(new BbyPricingValues("AWS","Large (8/64)",r4_2xl_CentOS_Rate,r4_2xl_RHEL_Rate,r4_2xl_Win_Rate));
                this.awsComputePricingValues.push(new BbyPricingValues("AWS","X-Large (16/64)",m4_4XL_CentOS_Rate,m4_4XL_RHEL_Rate,m4_4XL_Win_Rate));
                this.awsComputePricingValues.push(new BbyPricingValues("AWS","XXL (32/128)",r3_8XL_CentOS_Rate,r3_8XL_RHEL_Rate,r3_8XL_Win_Rate));
                this.awsComputePricingValues.push(new BbyPricingValues("AWS","XXXL (64/480)",i3_16XL_CentOS_Rate,i3_16XL_RHEL_Rate,i3_16XL_Win_Rate));
                this.awsComputePricingValues.push(new BbyPricingValues("AWS","Jumbo (>64 and >480)",this.bbyCJumbo,this.bbyRJumbo,this.bbyWJumbo));
                      for(let x of this.awsComputePricingValues){
                      this.pricingService.addBbyComputePricing(x)
                      .subscribe(
                          data => {
                          },
                          error => console.error(error),
                      );
                    }
              }
              this.loading =false;
              this.InitialLoad();
              this.refresh = true;
              parent.scrollTo(0, 0);
            } );
            
     this.pricingService.getAWSPricing3()
     .subscribe(
         data => {
           console.log(data);
           this.loading = true;
           //var importedJSON = JSON.parse(data);
           var importedJSON7 = data;
           var ezJSON=JSON.stringify(importedJSON7.terms.OnDemand);
             var ezJSON = ezJSON.replace("YPGKVRB2EKTVDJDT.JRTCKXETXF", "YPGKVRB2EKTVDJDT_JRTCKXETXF" );
           var goodJSON = JSON.parse(ezJSON);
             var goodJSON_str=JSON.stringify(goodJSON.YPGKVRB2EKTVDJDT.YPGKVRB2EKTVDJDT_JRTCKXETXF.priceDimensions);
           var ezJSON2=goodJSON_str.replace("YPGKVRB2EKTVDJDT.JRTCKXETXF.D42MF2PVJS", "YPGKVRB2EKTVDJDT_JRTCKXETXF_D42MF2PVJS");
           var goodJSON2 = JSON.parse(ezJSON2);
             var goodJSON_str2=JSON.stringify(goodJSON2.YPGKVRB2EKTVDJDT_JRTCKXETXF_D42MF2PVJS.pricePerUnit.USD);
           var S3_Std_Rate=goodJSON_str2.slice(1,6);
           var S3_Std_Rate = (Number(S3_Std_Rate)*1).toString();
           
           var ezJSON7=JSON.stringify(importedJSON7.terms.OnDemand);
             var ezJSON7 = ezJSON7.replace("FNWV6QQJ34ZTYY9U.JRTCKXETXF", "FNWV6QQJ34ZTYY9U_JRTCKXETXF" );
           var goodJSON7 = JSON.parse(ezJSON7);
             var goodJSON_str7=JSON.stringify(goodJSON7.FNWV6QQJ34ZTYY9U.FNWV6QQJ34ZTYY9U_JRTCKXETXF.priceDimensions);
           var ezJSON27=goodJSON_str7.replace("FNWV6QQJ34ZTYY9U.JRTCKXETXF.6YS6EN2CT7", "FNWV6QQJ34ZTYY9U_JRTCKXETXF_6YS6EN2CT7");
           var goodJSON27 = JSON.parse(ezJSON27);
             var goodJSON_str27=JSON.stringify(goodJSON27.FNWV6QQJ34ZTYY9U_JRTCKXETXF_6YS6EN2CT7.pricePerUnit.USD);
           var S3_Std_IA_Rate=goodJSON_str27.slice(1,6);
           var S3_Std_IA_Rate = (Number(S3_Std_IA_Rate)*1).toString();
           this.pricingService.getAWSPricing4()
           .subscribe(
               data => {
                 console.log(data);
                 this.loading = true;
                 var importedJSON7 = data;
                 var ezJSON=JSON.stringify(importedJSON7.terms.OnDemand);
                   var ezJSON = ezJSON.replace("N2KSPSR4CBU2H6PT.JRTCKXETXF", "N2KSPSR4CBU2H6PT_JRTCKXETXF" );
                 var goodJSON = JSON.parse(ezJSON);
                   var goodJSON_str=JSON.stringify(goodJSON.N2KSPSR4CBU2H6PT.N2KSPSR4CBU2H6PT_JRTCKXETXF.priceDimensions);
                 var ezJSON2=goodJSON_str.replace("N2KSPSR4CBU2H6PT.JRTCKXETXF.6YS6EN2CT7", "N2KSPSR4CBU2H6PT_JRTCKXETXF_6YS6EN2CT7");
                 var goodJSON2 = JSON.parse(ezJSON2);
                   var goodJSON_str2=JSON.stringify(goodJSON2.N2KSPSR4CBU2H6PT_JRTCKXETXF_6YS6EN2CT7.pricePerUnit.USD);
                 var EBS_SSD_Rate=goodJSON_str2.slice(1,6);
                 var EBS_SSD_Rate = (Number(EBS_SSD_Rate) *1).toString();
                 
                 var ezJSON_str3=JSON.stringify(importedJSON7.terms.OnDemand);
                 ezJSON_str3 = ezJSON_str3.replace("2JK59QCVJ4SRX7DN", "EZ2JK59QCVJ4SRX7DN");
                 var goodJSON8 = JSON.parse(ezJSON_str3);	
                 var ezJSON_str4=JSON.stringify(goodJSON8.EZ2JK59QCVJ4SRX7DN);
                 var ezJSON_str4 = ezJSON_str4.replace("2JK59QCVJ4SRX7DN.JRTCKXETXF", "EZ2JK59QCVJ4SRX7DN_JRTCKXETXF" );
                 var goodJSON9 = JSON.parse(ezJSON_str4);
                 var ezJSON_str5=JSON.stringify(goodJSON9.EZ2JK59QCVJ4SRX7DN_JRTCKXETXF.priceDimensions);
                 var ezJSON_str5 = ezJSON_str5.replace("2JK59QCVJ4SRX7DN.JRTCKXETXF.6YS6EN2CT7", "EZ2JK59QCVJ4SRX7DN_JRTCKXETXF_6YS6EN2CT7" );
                 var goodJSON10 = JSON.parse(ezJSON_str5);
                 var ezJSON_str6=JSON.stringify(goodJSON10.EZ2JK59QCVJ4SRX7DN_JRTCKXETXF_6YS6EN2CT7.pricePerUnit.USD);
                 var EBS_HDD_Rate=ezJSON_str6.slice(1,6);
                 var EBS_HDD_Rate = (Number(EBS_HDD_Rate) *1).toString();
                 this.pricingService.getAWSPricing1()
                 .subscribe(
                     data => {
                       console.log(data);
                       this.loading = true;
                       var importedJSON = data;
                       var ezJSON=JSON.stringify(importedJSON.terms.OnDemand.YFV3RHAD3CDDP3VE);
                       var n = ezJSON.search("USD");
                       var i=n+6;
                       var j=n+11
                       var EFS_Rate = ezJSON.slice(i,j);
                       var EFS_Rate = (Number(EFS_Rate)*1).toString();

                       if(this.awsStorageValues.length > 0) {
                         this.storageService.getBbyStoragePricing()
                         .subscribe(
                             data => {
                               this.awsStoragePricingValues = [];
                               for (let y of this.awsStorageValues){
                                //  if(y.tierindex == 2){
                                //    this.awsStoragePricingValues.push(new storageCloudPrice("aws",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",EBS_HDD_Rate,y._id));
                                //  }
                                 if(y.tierindex == 1){
                                   this.awsStoragePricingValues.push(new storageCloudPrice("aws",1,"SAN-SSD (used for VMs)",EBS_SSD_Rate,y._id));
                                 }
                                 if(y.tierindex == 3){
                                   this.awsStoragePricingValues.push(new storageCloudPrice("aws",3,"NAS",EFS_Rate,y._id));
                                 }
                                 if(y.tierindex == 4){
                                   this.awsStoragePricingValues.push(new storageCloudPrice("aws",4,"Object",S3_Std_Rate,y._id));
                                 }
                                 if(y.tierindex == 5){
                                   this.awsStoragePricingValues.push(new storageCloudPrice("aws",5,"Backup",S3_Std_IA_Rate,y._id));
                                 }
                               }
                               for(let x of this.awsStoragePricingValues){
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
                       else if(this.awsStorageValues.length == 0) {
                         this.awsStoragePricingValues = [];
                        //  this.awsStoragePricingValues.push(new storageCloudPrice("aws",2,"SAN-HDD (used for VMs)Managed Disk-STD-LRS",EBS_HDD_Rate));
                         this.awsStoragePricingValues.push(new storageCloudPrice("aws",1,"SAN-SSD (used for VMs)",EBS_SSD_Rate));
                         this.awsStoragePricingValues.push(new storageCloudPrice("aws",3,"NAS",EFS_Rate));
                         this.awsStoragePricingValues.push(new storageCloudPrice("aws",4,"Object",S3_Std_Rate));
                         this.awsStoragePricingValues.push(new storageCloudPrice("aws",5,"Backup",S3_Std_IA_Rate));
                               for(let x of this.awsStoragePricingValues){
                               this.storageService.addBbyStoragePricing(x)
                               .subscribe(
                                   data => {
                                   },
                                   error => console.error(error),
                               );
                             }
                       }
                      //this.loading= false;
                      } );
                     // this.loading= false;
                 } );
                // this.loading= false;
           } );
                 this.pricingService.getAWSPricing5()
                 .subscribe(
                     data => {
                       console.log(data);
                       this.loading = true;
                       var importedJSON = data;
                         var ezJSON_str3=JSON.stringify(importedJSON.terms.OnDemand);
                         ezJSON_str3 = ezJSON_str3.replace("36H7S3NU9B7S3UT5", "EZ36H7S3NU9B7S3UT5");
                         var goodJSON8 = JSON.parse(ezJSON_str3);	
                         var ezJSON_str4=JSON.stringify(goodJSON8.EZ36H7S3NU9B7S3UT5);
                         var ezJSON_str4 = ezJSON_str4.replace("36H7S3NU9B7S3UT5.JRTCKXETXF", "EZ36H7S3NU9B7S3UT5_JRTCKXETXF" );
                         var goodJSON9 = JSON.parse(ezJSON_str4);
                         var ezJSON_str5=JSON.stringify(goodJSON9.EZ36H7S3NU9B7S3UT5_JRTCKXETXF.priceDimensions);
                         var ezJSON_str5 = ezJSON_str5.replace("36H7S3NU9B7S3UT5.JRTCKXETXF.VF6T3GAUKQ", "EZ36H7S3NU9B7S3UT5_JRTCKXETXF_VF6T3GAUKQ" );
                         var goodJSON10 = JSON.parse(ezJSON_str5);
                         var ezJSON_str6=JSON.stringify(goodJSON10.EZ36H7S3NU9B7S3UT5_JRTCKXETXF_VF6T3GAUKQ.pricePerUnit.USD);
                         var AWS_OUT_Trnsfr=ezJSON_str6.slice(1,6);
                         var AWS_OUT_Trnsfr_Rate = (Number(AWS_OUT_Trnsfr)*1).toString();
                         var AWS_Data_out1  = (Number(AWS_OUT_Trnsfr_Rate)*1024).toString();
                         var AWS_Data_out2  = (Number(AWS_Data_out1)*5).toString();
                         var AWS_Data_out3  = (Number(AWS_Data_out2)*2).toString();
                         var AWS_Data_out4 = (Number(AWS_Data_out3)*2).toString();
                         if(this.awsNetworkValues.length > 0) {
                           this.networkService.getGcpNetworkPricing()
                           .subscribe(
                               data => {
                                 this.awsNetworkPricingValues = [];
                                 for (let y of this.awsNetworkValues){
                                   if(y.index == 1){
                                     this.awsNetworkPricingValues.push(new networkPrice("aws",1,"<1TB",AWS_Data_out1,y._id));
                                   }
                                   if(y.index == 2){
                                     this.awsNetworkPricingValues.push(new networkPrice("aws",2,"1-5 TB",AWS_Data_out2,y._id));
                                   }
                                   if(y.index == 3){
                                     this.awsNetworkPricingValues.push(new networkPrice("aws",3,"5-10TB",AWS_Data_out3,y._id));
                                   }
                                   if(y.index == 4){
                                     this.awsNetworkPricingValues.push(new networkPrice("aws",4,"10-20TB",AWS_Data_out4,y._id));
                                   }
                                 }
                                 for(let x of this.awsNetworkPricingValues){
                                 this.networkService.updateGcpNetworkPricing(x)
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
                         else if(this.awsNetworkValues.length == 0) {
                           this.awsNetworkPricingValues = [];
                           this.awsNetworkPricingValues.push(new networkPrice("aws",1,"<1TB",AWS_Data_out1));
                           this.awsNetworkPricingValues.push(new networkPrice("aws",2,"1-5 TB",AWS_Data_out2));
                           this.awsNetworkPricingValues.push(new networkPrice("aws",3,"5-10TB",AWS_Data_out3));
                           this.awsNetworkPricingValues.push(new networkPrice("aws",4,"10-20TB",AWS_Data_out4));
                                 for(let x of this.awsNetworkPricingValues){
                                 this.networkService.addGcpNetworkPricing(x)
                                 .subscribe(
                                     data => {
                                     },
                                     error => console.error(error),
                                 );
                               }
                         }
                         //this.loading = true;
                       } );
  }
}