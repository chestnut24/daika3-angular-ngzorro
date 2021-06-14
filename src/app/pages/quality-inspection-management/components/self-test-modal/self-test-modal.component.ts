import {Component, Input, OnInit} from '@angular/core';
import {SelfCheck} from '../../../../public/interface/quality-inspection-management';
import {Observable} from 'rxjs';
import {QualityInspectionManagementService} from '../../../../services/quality-inspection-management.service';
import {NzMessageService} from 'ng-zorro-antd';
import {DelongTableService} from '../../../../services/delong-table.service';

@Component({
  selector: 'app-self-test-modal',
  templateUrl: './self-test-modal.component.html',
  styleUrls: ['./self-test-modal.component.scss']
})
export class SelfTestModalComponent implements OnInit {
  @Input() data: SelfCheck;
  disabled = {
    canInput1: true,
    canInput2: false,
    canInput3: false,
    canInput4: false,
  };
  modalData;
  constructor(private qualityInspectionManagement: QualityInspectionManagementService,
              private message: NzMessageService,
              private delongTable: DelongTableService<SelfCheck>) { }

  ngOnInit() {
      const isBefore = this.qualityInspectionManagement.getCurrentUrl().includes('before');
      const selfCheck = isBefore ? this.data.beforeSelfCheck : this.data.afterSelfCheck;
      if (selfCheck.isExempt === 'YES') {
          selfCheck.isExempt = true;
      } else {
          selfCheck.isExempt = false;
      }
      console.log(this.data);
  }

  save(modal): void {
    const isBefore = this.qualityInspectionManagement.getCurrentUrl().includes('before');
    this.modalData = {
        rollId: this.data.id,
        exteriorCheck: isBefore ? this.data.beforeSelfCheck.exteriorCheck : null,
        isExempt: (isBefore ? this.data.beforeSelfCheck.isExempt : this.data.afterSelfCheck.isExempt) ? 'YES' : 'NO',
        exemptReason: isBefore ? this.data.beforeSelfCheck.exemptReason : this.data.afterSelfCheck.exemptReason,
        hardnessCheck1: isBefore ? this.data.beforeSelfCheck.hardnessCheck1 : this.data.afterSelfCheck.hardnessCheck1,
        hardnessCheck2: isBefore ? this.data.beforeSelfCheck.hardnessCheck2 : this.data.afterSelfCheck.hardnessCheck2,
        hardnessCheck3: isBefore ? this.data.beforeSelfCheck.hardnessCheck3 : this.data.afterSelfCheck.hardnessCheck3,
        hardnessCheck4: isBefore ? this.data.beforeSelfCheck.hardnessCheck4 : this.data.afterSelfCheck.hardnessCheck4,
        hardnessCheck5: isBefore ? this.data.beforeSelfCheck.hardnessCheck5 : this.data.afterSelfCheck.hardnessCheck5,
        hardnessCheck6: isBefore ? this.data.beforeSelfCheck.hardnessCheck6 : this.data.afterSelfCheck.hardnessCheck6,
        hardnessCheck7: isBefore ? this.data.beforeSelfCheck.hardnessCheck7 : this.data.afterSelfCheck.hardnessCheck7,
        unit1: isBefore ? this.data.beforeSelfCheck.unit1 : this.data.afterSelfCheck.unit1,
        unit2: isBefore ? this.data.beforeSelfCheck.unit2 : this.data.afterSelfCheck.unit2,
        // exteriorUserId: isBefore ? this.data.beforeSelfCheck.exteriorUser.id : this.data.afterSelfCheck.exteriorUser.id,
        type: isBefore ? 'BEFORE_SELF_CHECK' : 'AFTER_SELF_CHECK',
        id: isBefore ? this.data.beforeSelfCheck.id : this.data.afterSelfCheck.id,
    };
    this.qualityInspectionManagement.saveCheck(isBefore ? 'BEFORE_SELF_CHECK' : 'AFTER_SELF_CHECK',
        'self',
        this.modalData).subscribe(() => {
        this.message.success('保存成功');
        this.delongTable.settingInit();
        modal.destroy();
    }, error => {
        this.message.error(`保存失败 ${error.error.message}`);
    });
  }

}
