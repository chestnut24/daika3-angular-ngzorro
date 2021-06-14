import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { NgCheckResult, QualityInspectionResult, Result, CheckType } from './interface/quality-inspection-management';
import { ApprovalStatus, SpeedupType } from './interface/configuration-management';
import { MonitorStandard } from './interface/heat-treatment';
import { BeforeNgDeal, ProcessStatus, RollStatus } from './interface/roll-resume';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'stringToNumber' })
export class StringToNumber implements PipeTransform {
  transform(value: string): number {
    return parseFloat(value);
  }
}

@Pipe({ name: 'qimResult' })
export class QimResultPipe implements PipeTransform {
  transform(value: Result | QualityInspectionResult | NgCheckResult | CheckType): string {
    switch (value) {
      case CheckType.EXEMPT: return '免检';
      case Result.CHECKED: return '已检';
      case Result.NOT_CHECK: return '未检';
      case QualityInspectionResult.ONGOING: return '填写中';
      case QualityInspectionResult.NOT_CHECK: return '未填写';
      case QualityInspectionResult.OK: return '合格';
      case QualityInspectionResult.NG: return '不合格';
      case QualityInspectionResult.SCRAPPED: return '报废';
      case QualityInspectionResult.SECOND_CHECK: return '二次质检';
      case NgCheckResult.IGNORE: return '合格';
      case NgCheckResult.NOT_DEAL: return '未处理';
      case NgCheckResult.SCRAPPED: return '报废';
      case NgCheckResult.SECOND_CHECK: return '二次质检';
      case NgCheckResult.SECOND_HT: return '二次热处理';
      default: return value;
    }
  }
}

@Pipe({ name: 'isBlank' })
export class IsBlank implements PipeTransform {
  transform(value: string): string {
    // tslint:disable-next-line:triple-equals
    return value == 'YES' ? '是' : '否';
  }
}

@Pipe({ name: 'rollStatus' })
export class RollStatusChange implements PipeTransform {
  transform(value: RollStatus): string {
    switch (value) {
      case RollStatus.ENTER: return '入厂';
      case RollStatus.IN: return '在厂';
      case RollStatus.SCRAP: return '报废';
      case RollStatus.CHANGE: return '转辊';
    }
  }
}

@Pipe({ name: 'processStatus' })
export class ProcessStatusChange implements PipeTransform {
  transform(value: ProcessStatus): string {
    switch (value) {
      case ProcessStatus.TO_BEFORE_QC: return '待热前质检';
      case ProcessStatus.TO_PLAN: return '待计划';
      case ProcessStatus.TO_PUT: return '待入炉';
      case ProcessStatus.TO_HT: return '待热处理';
      case ProcessStatus.TO_TAKE: return '待出炉';
      case ProcessStatus.TO_COOLING: return '待正火冷却';
      case ProcessStatus.TO_AFTER_QC: return '待热后质检';
      case ProcessStatus.COMPLETED: return '完成';
      case ProcessStatus.SCRAPPED: return '报废';
      case ProcessStatus.HT: return '热处理中';
    }
  }
}

@Pipe({ name: 'preliminaryOrFinal' })
export class PreliminaryOrFinalPipe implements PipeTransform {
  transform(value: ApprovalStatus): string {
    switch (value) {
      case ApprovalStatus.NOT_APPROVAL:
      case ApprovalStatus.FIRST_REJECTED:
      case ApprovalStatus.SECOND_REJECTED:
      case ApprovalStatus.APPROVAL:
      case ApprovalStatus.CANCELLATION:
      case null: return '初审';
      default: return '终审';
    }
  }
}

@Pipe({ name: 'approvalStatus' })
export class ApprovalStatusPipe implements PipeTransform {
  transform(value: ApprovalStatus): string {
    switch (value) {
      // case ApprovalStatus.NOT_APPROVAL: return '待初审'; // '未一审';
      case ApprovalStatus.NOT_APPROVAL: return '待校对'; // '未一审';
      // case ApprovalStatus.FIRST_REJECTED: return '待修改'; // '一审驳回';
      // case ApprovalStatus.SECOND_REJECTED: return '待修改'; // '二审驳回';
      // case ApprovalStatus.FIRST_APPROVED: return '待终审'; // '一审通过';
      // case ApprovalStatus.SECOND_APPROVED: return '启用'; // '二审通过';
      case ApprovalStatus.APPROVAL: return '启用';
      case ApprovalStatus.CANCELLATION: return '废止';
      default: return value;
    }
  }
}

@Pipe({ name: 'passOrReject' })
export class PassOrRejectPipe implements PipeTransform {
  transform(value: ApprovalStatus): string {
    switch (value) {
      // case ApprovalStatus.NOT_APPROVAL: return '未一审';
      // case ApprovalStatus.FIRST_REJECTED: return '驳回';
      // case ApprovalStatus.SECOND_REJECTED: return '驳回';
      // case ApprovalStatus.FIRST_APPROVED: return '通过';
      // case ApprovalStatus.SECOND_APPROVED: return '通过';
      case ApprovalStatus.NOT_APPROVAL: return '驳回';
      case ApprovalStatus.APPROVAL: return '通过';
      case ApprovalStatus.CANCELLATION: return '废止';
      default: return value;
    }
  }
}

@Pipe({
  name: 'minuteSecond'
})
export class MinuteSecondPipe implements PipeTransform {

  transform(value: number, args: any[] = []): string | null {
    if (args[0] && args[1]) {
      if (typeof value !== 'number' || isNaN(value) || (!value && value !== 0)) { return null; }
      const minute = Math.floor(value / (60 * 1000));
      const second = Math.floor((value - minute * 60 * 1000) / 1000);
      if (args[2] === 'HOUR') {
        const hour = Math.floor(value / (60 * 60 * 1000));
        const minuteHour = Math.floor((value - hour * 60 * 60 * 1000) / (60 * 1000));
        const secondHour = Math.floor((value - hour * 60 * 60 * 1000 - minuteHour * 60 * 1000) / 1000);
        return `${hour}:${minuteHour}'${secondHour}"`;
      }
      return `${minute}'${second}"`;
    }
    return null;
  }

}
@Pipe({
  name: 'speedupType'
})
export class SpeedupTypePipe implements PipeTransform {

  transform(value: SpeedupType): string | null {
    switch (value) {
      case SpeedupType.CONSTANT: return '恒温';
      case SpeedupType.FULL_SPEED: return '全速';
      case SpeedupType.FURNACE_COOLING: return '炉冷';
      case SpeedupType.NORMAL: return '常规';
      default: return value;
    }
  }

}
@Pipe({
  name: 'monitorStandard'
})
export class MonitorStandardPipe implements PipeTransform {

  transform(value: MonitorStandard): string | null {
    switch (value) {
      case MonitorStandard.AVG: return '平均值';
      case MonitorStandard.MAX: return '最大值';
      case MonitorStandard.MIN: return '最小值';
      default: return value;
    }
  }

}


@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value: any, args?: any): any {
    return this.sanitized.bypassSecurityTrustResourceUrl(value);
  }

}


@NgModule({
  declarations: [
    IsBlank, QimResultPipe, PreliminaryOrFinalPipe, ApprovalStatusPipe, PassOrRejectPipe,
    StringToNumber,
    IsBlank,
    MinuteSecondPipe,
    SpeedupTypePipe,
    MonitorStandardPipe,
    SafeHtmlPipe,
    RollStatusChange,
    ProcessStatusChange
  ],

  exports: [
    IsBlank, QimResultPipe, PreliminaryOrFinalPipe, ApprovalStatusPipe, PassOrRejectPipe,
    StringToNumber,
    MinuteSecondPipe,
    SpeedupTypePipe,
    MonitorStandardPipe,
    SafeHtmlPipe,
    RollStatusChange,
    ProcessStatusChange
  ],
  providers: []
})
export class PipesModule { }
