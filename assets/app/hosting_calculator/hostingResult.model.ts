export class HostingResult {
    gcpAutoScalingPrice: any;
    awsAutoScalingPrice: any;
    azureAutoScalingPrice: any;
    BBYElasticitySavings: any;
    SANCapacity = 0;
    FileNASCapacity = 0;
    ObjectCapacity = 0;
    BKPCapacity = 0;

    sanSSDCostAWSStorage; FileNASCostAWSStorage; objectCostAWSStorage; backupCostAWSStorage;
    sanSSDCostGCPStorage ; FileNASCostGCPStorage; objectCostGCPStorage; backupCostGCPStorage;
    sanSSDCostAzureStorage; FileNASCostAzureStorage; objectCostAzureStorage; backupCostAzureStorage ;
    backupCost: number;
    objectCost: number;
    FileNASCost: number;
    sanSSDCost: number;



    BBYMonthlyCostComputeArray: any[];
    AWSMonthlyCostComputeArray: any[];
    AZUREMonthlyCostComputeArray: any[];
    GCPMonthlyCostComputeArray: any[];
    AzureTOTALPerServerTotalPerType: number;
    AWSTOTALPerServerTotalPerType: number;
    GCPTOTALPerServerTotalPerType: number;
    TotalPerServerTotalPerType: number;
    BBYMonthlyCostComputeTotalPerType: number;
    AzureComputeTotalPerType: number;
    AWSComputeTotalPerType: number;
    GCPComputeTotalPerType: number;
    AzureSavingsPerMonthTotal: number;
    AWSSavingsPerMonthTotal: number;
    GCPSavingsPerMonthtotal: number;
    PaSSAzureSavingsPerMonthTotal: number;
    PaSSAWSSavingsPerMonthTotal: number;
    PaSSGCPSavingsPerMonthtotal: number;
    _id?: string;

    AzureFinalDiscounts: number; AWSFinalDiscounts: number;
    GCPFinalDiscounts: number;
    azureNetworkCost;awsNetworkCost;gcpNetworkCost;
    RISUAzureDiscountedPrice;RISUAWSDiscountedPrice;RISUGCPDiscountedPrice;
    osPriceBBYType: boolean;
    // ,AWSMonthlyCostComputeArray : any[],
    // AZUREMonthlyCostComputeArray : any[],
    // GCPMonthlyCostComputeArray : any[],

    AverageAutoScalingSaving:number;
    AWSDiscount: number;
    riAWSDiscount: number;
    GCPDiscount: number;
    suGCPDiscount: number;
    AzureDiscount: number;
    riAzureDiscount: number;

    constructor(AverageAutoScalingSaving,
        AWSDiscount,
        riAWSDiscount,
        
        GCPDiscount,
        suGCPDiscount,
        
        AzureDiscount,
        riAzureDiscount ,

        osPriceBBYType,
        RISUAzureDiscountedPrice,RISUAWSDiscountedPrice,RISUGCPDiscountedPrice,
        BBYElasticitySavings,azureAutoScalingPrice,awsAutoScalingPrice,gcpAutoScalingPrice,
        azureNetworkCost,awsNetworkCost,gcpNetworkCost,
        sanSSDCost,
        FileNASCost,
        objectCost,
        backupCost,

        sanSSDCostAWSStorage, FileNASCostAWSStorage, objectCostAWSStorage, backupCostAWSStorage,
        sanSSDCostGCPStorage , FileNASCostGCPStorage, objectCostGCPStorage, backupCostGCPStorage,
        sanSSDCostAzureStorage:number, FileNASCostAzureStorage:number, objectCostAzureStorage:number, backupCostAzureStorage :number,

        SANCapacity,
        FileNASCapacity ,
        ObjectCapacity,
        BKPCapacity, BBYMonthlyCostComputeArray: any[], BBYMonthlyCostComputeTotalPerType: number,
        AzureComputeTotalPerType: number,
        AWSComputeTotalPerType: number,
        GCPComputeTotalPerType: number,
        TotalPerServerTotalPerType: number, AzureTOTALPerServerTotalPerType: number,
        AWSTOTALPerServerTotalPerType: number, GCPTOTALPerServerTotalPerType: number,
        AzureSavingsPerMonthTotal: number, AWSSavingsPerMonthTotal: number,
        GCPSavingsPerMonthtotal: number, PaSSAzureSavingsPerMonthTotal: number,
        PaSSAWSSavingsPerMonthTotal: number, PaSSGCPSavingsPerMonthtotal: number,
        AzureFinalDiscounts: number, AWSFinalDiscounts: number,
        GCPFinalDiscounts: number, _id?: string) {

            
            this.AverageAutoScalingSaving = AverageAutoScalingSaving;
            this.AWSDiscount = AWSDiscount;
            this.riAWSDiscount= riAWSDiscount;
            this.GCPDiscount= GCPDiscount;
            this.suGCPDiscount =suGCPDiscount;
            this.AzureDiscount=AzureDiscount;
            this.riAzureDiscount=riAzureDiscount;


            this.osPriceBBYType = osPriceBBYType;
            this.RISUAzureDiscountedPrice = RISUAzureDiscountedPrice;
            this.RISUAWSDiscountedPrice= RISUAWSDiscountedPrice;
            this.RISUGCPDiscountedPrice= RISUGCPDiscountedPrice;
            this.BBYElasticitySavings =BBYElasticitySavings;
            this.azureAutoScalingPrice=azureAutoScalingPrice;
            this.awsAutoScalingPrice=awsAutoScalingPrice;
            this.gcpAutoScalingPrice =gcpAutoScalingPrice;
            this.azureNetworkCost = azureNetworkCost;
            this.awsNetworkCost= awsNetworkCost;
            this.gcpNetworkCost= gcpNetworkCost;
        this.sanSSDCostAWSStorage = sanSSDCostAWSStorage;
        this.FileNASCostAWSStorage = FileNASCostAWSStorage;
        this.objectCostAWSStorage = objectCostAWSStorage;
        this.backupCostAWSStorage = backupCostAWSStorage;

        this.sanSSDCostGCPStorage = sanSSDCostGCPStorage;
        this.FileNASCostGCPStorage = FileNASCostGCPStorage;
        this.objectCostGCPStorage = objectCostGCPStorage;
        this.backupCostGCPStorage = backupCostGCPStorage;

        this.sanSSDCostAzureStorage = sanSSDCostAzureStorage;
        this.FileNASCostAzureStorage = FileNASCostAzureStorage;
        this.objectCostAzureStorage = objectCostAzureStorage;
        this.backupCostAzureStorage = backupCostAzureStorage;

        this.backupCost = backupCost;
        this.objectCost = objectCost;
        this.FileNASCost = FileNASCost;
        this.sanSSDCost = sanSSDCost;


        this.SANCapacity = SANCapacity;
        this.FileNASCapacity = FileNASCapacity;
        this.ObjectCapacity = ObjectCapacity;
        this.BKPCapacity = BKPCapacity;


        this.BBYMonthlyCostComputeArray = BBYMonthlyCostComputeArray;
        //  this.AWSMonthlyCostComputeArray = AWSMonthlyCostComputeArray;
        //  this.AZUREMonthlyCostComputeArray = AZUREMonthlyCostComputeArray;
        //  this.GCPMonthlyCostComputeArray = GCPMonthlyCostComputeArray;
        this.BBYMonthlyCostComputeTotalPerType = BBYMonthlyCostComputeTotalPerType;
        this.AzureComputeTotalPerType = AzureComputeTotalPerType;
        this.AWSComputeTotalPerType = AWSComputeTotalPerType;
        this.GCPComputeTotalPerType = GCPComputeTotalPerType;
        this.AzureTOTALPerServerTotalPerType = AzureTOTALPerServerTotalPerType;
        this.AWSTOTALPerServerTotalPerType = AWSTOTALPerServerTotalPerType;
        this.GCPTOTALPerServerTotalPerType = GCPTOTALPerServerTotalPerType;
        this.TotalPerServerTotalPerType = TotalPerServerTotalPerType;
        this.AzureSavingsPerMonthTotal = AzureSavingsPerMonthTotal;
        this.AWSSavingsPerMonthTotal = AWSSavingsPerMonthTotal;
        this.GCPSavingsPerMonthtotal = GCPSavingsPerMonthtotal;
        this.PaSSAzureSavingsPerMonthTotal = PaSSAzureSavingsPerMonthTotal;
        this.PaSSAWSSavingsPerMonthTotal = PaSSAWSSavingsPerMonthTotal;
        this.PaSSGCPSavingsPerMonthtotal = PaSSGCPSavingsPerMonthtotal;

        this.AzureFinalDiscounts = AzureFinalDiscounts;
        this.AWSFinalDiscounts = AWSFinalDiscounts;
        this.GCPFinalDiscounts = GCPFinalDiscounts;

        this._id = _id;
    }
}