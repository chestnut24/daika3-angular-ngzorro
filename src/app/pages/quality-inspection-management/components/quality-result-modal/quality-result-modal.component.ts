import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeforeQualityCheck, SelfCheck } from '../../../../public/interface/quality-inspection-management';
import { QualityInspectionManagementService } from '../../../../services/quality-inspection-management.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-quality-result-modal',
    templateUrl: './quality-result-modal.component.html',
    styleUrls: ['./quality-result-modal.component.scss']
})
export class QualityResultModalComponent implements OnInit {
    form: FormGroup;
    @Input() data: SelfCheck;
    @Input() type: string;
    constructor(private fb: FormBuilder, private qualityInspectionManagement: QualityInspectionManagementService) { }

    ngOnInit() {
        if (this.qualityInspectionManagement.getCurrentUrl().includes('before')) {
            if (this.type === '化学') {
                this.form = this.fb.group({
                    chemistryCheck: [this.data.beforeQualityCheck.chemistryCheck, [Validators.required]],
                    flawCheck: [null],
                    hardnessCheck: [null],
                    metalCheck: [null],
                    sizeCheck: [null],
                });
            } else if (this.type === '金相') {
                this.form = this.fb.group({
                    metalCheck: [this.data.beforeQualityCheck.metalCheck, [Validators.required]],
                    chemistryCheck: [null],
                    flawCheck: [null],
                    hardnessCheck: [null],
                    sizeCheck: [null],
                });
            } else if (this.type === '探伤') {
                this.form = this.fb.group({
                    flawCheck: [this.data.beforeQualityCheck.flawCheck, [Validators.required]],
                    chemistryCheck: [null],
                    hardnessCheck: [null],
                    metalCheck: [null],
                    sizeCheck: [null],
                });
            } else if (this.type === '硬度') {
                this.form = this.fb.group({
                    hardnessCheck: [this.data.beforeQualityCheck.hardnessCheck, [Validators.required]],
                    chemistryCheck: [null],
                    flawCheck: [null],
                    metalCheck: [null],
                    sizeCheck: [null],
                });
            } else if (this.type === '尺寸') {
                this.form = this.fb.group({
                    sizeCheck: [this.data.beforeQualityCheck.sizeCheck, [Validators.required]],
                    chemistryCheck: [null],
                    flawCheck: [null],
                    hardnessCheck: [null],
                    metalCheck: [null],
                });
            }

            // this.form = this.fb.group({
            //     chemistryCheck: [this.data.beforeQualityCheck.chemistryCheck, [Validators.required]],
            //     flawCheck: [this.data.beforeQualityCheck.flawCheck, [Validators.required]],
            //     hardnessCheck: [this.data.beforeQualityCheck.hardnessCheck, [Validators.required]],
            //     metalCheck: [this.data.beforeQualityCheck.metalCheck, [Validators.required]],
            //     sizeCheck: [this.data.beforeQualityCheck.sizeCheck, [Validators.required]],
            // });
        } else {
            console.log(this.data);
            if (this.type === '化学') {
                this.form = this.fb.group({
                    chemistryCheck: [this.data.afterQualityCheck.chemistryCheck, [Validators.required]],
                    flawCheck: [null],
                    hardnessCheck: [null],
                    metalCheck: [null],
                    sizeCheck: [null],
                });
            } else if (this.type === '金相') {
                this.form = this.fb.group({
                    chemistryCheck: [null],
                    flawCheck: [null],
                    hardnessCheck: [null],
                    metalCheck: [this.data.afterQualityCheck.metalCheck, [Validators.required]],
                    sizeCheck: [null],
                });
            } else if (this.type === '探伤') {
                this.form = this.fb.group({
                    chemistryCheck: [null],
                    flawCheck: [this.data.afterQualityCheck.flawCheck, [Validators.required]],
                    hardnessCheck: [null],
                    metalCheck: [null],
                    sizeCheck: [null],
                });
            } else if (this.type === '硬度') {
                this.form = this.fb.group({
                    chemistryCheck: [null],
                    flawCheck: [null],
                    hardnessCheck: [this.data.afterQualityCheck.hardnessCheck, [Validators.required]],
                    metalCheck: [null],
                    sizeCheck: [null],
                });
            } else if (this.type === '尺寸') {
                this.form = this.fb.group({
                    chemistryCheck: [null],
                    flawCheck: [null],
                    hardnessCheck: [null],
                    metalCheck: [null],
                    sizeCheck: [this.data.afterQualityCheck.sizeCheck, [Validators.required]],
                });
            }
            // this.form = this.fb.group({
            //     chemistryCheck: [this.data.afterQualityCheck.chemistryCheck, [Validators.required]],
            //     flawCheck: [this.data.afterQualityCheck.flawCheck, [Validators.required]],
            //     hardnessCheck: [this.data.afterQualityCheck.hardnessCheck, [Validators.required]],
            //     metalCheck: [this.data.afterQualityCheck.metalCheck, [Validators.required]],
            //     sizeCheck: [this.data.afterQualityCheck.sizeCheck, [Validators.required]],
            // });
        }

    }
    save(): Observable<any> {
        return this.qualityInspectionManagement.saveCheck(
            this.qualityInspectionManagement.getCurrentUrl().includes('before') ? 'BEFORE_QUALITY_CHECK' : 'AFTER_QUALITY_CHECK',
            'quality',
            Object.assign({
                rollId: this.data.id,
                type: this.qualityInspectionManagement.getCurrentUrl().includes('before') ? 'BEFORE_QUALITY_CHECK' : 'AFTER_QUALITY_CHECK',
                id: this.qualityInspectionManagement.getCurrentUrl().includes('before') ? this.data.beforeQualityCheck.id : this.data.afterQualityCheck.id,
                isSecond: (this.data.beforeQualityCheck ? this.data.beforeQualityCheck.result === 'SECOND_CHECK' : this.data.afterQualityCheck.result === 'SECOND_CHECK') ? '0' : '1'
            }, this.form.value));
    }

    getNewTime(time) {
        let str = null;
        if (time){
            str = new Date(time).getTime();
        }
        return str;
    }

}
