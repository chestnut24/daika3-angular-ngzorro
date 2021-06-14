import {Component, Input, OnInit} from '@angular/core';
import {SelfCheck} from '../../../../public/interface/quality-inspection-management';
import {QualityInspectionManagementService} from '../../../../services/quality-inspection-management.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-quality-inspection-approval',
  templateUrl: './quality-inspection-approval.component.html',
  styleUrls: ['./quality-inspection-approval.component.scss']
})
export class QualityInspectionApprovalComponent implements OnInit {
  @Input() data: SelfCheck;
  result: string;
  remark: string;
  constructor(public qualityInspectionManagement: QualityInspectionManagementService) { }

  ngOnInit() {
  }
  save(): Observable<any> {
    const isBefore = this.qualityInspectionManagement.getCurrentUrl().includes('before');
    return this.qualityInspectionManagement.saveNg(isBefore ? 'BEFORE_QUALITY_CHECK' : 'AFTER_QUALITY_CHECK', {
      id: isBefore ? this.data.beforeQualityCheck.id : this.data.afterQualityCheck.id,
      result: this.result,
      remark: this.remark,
    });
  }

}
