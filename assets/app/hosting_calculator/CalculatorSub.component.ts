import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HostingCalculator } from "./hostingCalculator.model";
import { Observable } from "rxjs/Rx";


@Component({
    selector: 'my-form-sub-component',
    templateUrl: './calculatorsub.component.html',
    styleUrls: ['./calculatorSub.component.css']
})
export class CalculatorSubComponent implements OnInit {
    @Input() myFormm: FormGroup; // This component is passed a FormGroup from the base component template
    azurepricing: HostingCalculator[] = [];
    AWSpricing: HostingCalculator[] = [];
    GCPpricing: HostingCalculator[] = [];
    bbypricing: HostingCalculator[] = [];
    constructor(
    ) { }
    ngOnInit() {
    }
    UsedForDBValueChange(event: Event) {
        this.setPaasSavingPerMonth();
    }
    setPaasSavingPerMonth() {
        const usedForDb = this.myFormm.get('usedForDb');

        const PaSSAzureSavingsPerMonth = this.myFormm.get('PaSSAzureSavingsPerMonth');
        const PaSSAWSSavingsPerMonth = this.myFormm.get('PaSSAWSSavingsPerMonth');
        const PaSSGCPSavingsPerMonth = this.myFormm.get('PaSSGCPSavingsPerMonth');
        const PaSSSavingsPerMonth = this.myFormm.get('PaSSSavingsPerMonth');

        if (usedForDb.value != "yes") {
            PaSSSavingsPerMonth.patchValue("");
            PaSSAzureSavingsPerMonth.patchValue("");
            PaSSAWSSavingsPerMonth.patchValue("");
            PaSSGCPSavingsPerMonth.patchValue("");
        }
    }


    setSavingPerMonths() {
        const periodicWorkload = this.myFormm.get('periodicWorkload');
        const base = this.myFormm.get('base');
        const monthsOfHighUsage = this.myFormm.get('monthsOfHighUsage');
        const SavingsPerMonth = this.myFormm.get('SavingsPerMonth');

        const AzureSavingsPerMonth = this.myFormm.get('AzureSavingsPerMonth');
        const AWSSavingsPerMonth = this.myFormm.get('AWSSavingsPerMonth');
        const GCPSavingsPerMonth = this.myFormm.get('GCPSavingsPerMonth');
        if (periodicWorkload.value != "yes") {
            monthsOfHighUsage.patchValue("");
            base.patchValue("");
            SavingsPerMonth.patchValue("");
            AzureSavingsPerMonth.patchValue("");
            AWSSavingsPerMonth.patchValue("");
            GCPSavingsPerMonth.patchValue("");
        }
    }
    ElasticitySavingsParametersChange(event: Event) {
        this.setSavingPerMonths();
    }
    ServerSizeValueChange(event: Event) {
        const noOfServers = this.myFormm.get('noOfServers');

        const IsClustered = this.myFormm.get('IsClustered');
        if (+noOfServers.value > 1) {
            IsClustered.enable();
        } else {
            IsClustered.disable();
        }
        this.storageDataChange(null);

    }

    storageDataChange(event: Event) {
        this.setSavingPerMonths();
        this.setPaasSavingPerMonth();

    }
}
