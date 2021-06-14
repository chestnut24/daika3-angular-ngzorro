import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {CoolingPages} from '../public/interface/normalizing-cooling';
import {
  BeforeQuality,
  CheckRecordsBefore,
  NormalizingCooling,
  EnterFurnace,
  ResumeDetail,
  TakeFurnace, ChargingPlan, ChargingPlanCraft, HeatTreatment, Freight,
} from '../public/interface/roll-resume';
import {AfterQuality, CheckRecords, EntryRecord, RollRecord} from '../public/interface/roll-resume';
import {HttpClient} from '@angular/common/http';
import {API} from '../public/api';
import {Pagination} from '../public/interface/common';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RollResumeService {
  constructor(
      private  http: HttpClient,
  ) { }
  getResumeDetail(params): Observable<ResumeDetail> { // 轧辊明细表
    return this.http.get<ResumeDetail>(API.ROLL_DETAILS, {params});
  }
  getRollRecord(params): Observable<RollRecord> { // 转辊记录
    return this.http.get <RollRecord> (API.ROLL_RECORD, {params});
  }
  getAfterQuality(params): Observable<AfterQuality<CheckRecords>> { // 热后质检记录
    return this.http.get <AfterQuality<CheckRecords>> (API.AFTER_RECORDS, {params});
  }
  getBeforeQuality(params): Observable<BeforeQuality<CheckRecordsBefore>> { // 热前质检记录
    return this.http.get <BeforeQuality<CheckRecordsBefore>> (API.BEFORE_RECORDS, {params});
  }
  getEnterFurnace(params): Observable<EnterFurnace> { // 入炉记录
    return this.http.get<EnterFurnace>(API.ENTER_FURNACE_RECORDS, {params});
  }
  getTakeFurnace(params): Observable<TakeFurnace> { // 出炉记录
    return this.http.get<TakeFurnace>(API.TAKE_FURNACE_RECORDS, {params});
  }
  getNormalizingCooling(params): Observable<NormalizingCooling> { // 正火冷却
    return this.http.get<NormalizingCooling>(API.NORMALIZING_COOLING_RECORDS, {params});
  }
  getEntryRecord(params): Observable<EntryRecord> { // 入厂记录
    return this.http.get<EntryRecord>(API.ENTRY_RECORD, {params});
  }
  getChargingPlan(params): Observable<ChargingPlan> { // 装炉计划
    return this.http.get<ChargingPlan>(API.CHARGING_PLAN_RECORD, {params});
  }
  getCraft(params): Observable<ChargingPlanCraft> { // 获取装炉计划工艺
    return this.http.get<ChargingPlanCraft>(API.RECORD_CRAFT + `?craftId=${params}`);
  }
  getHeatTreatment(params): Observable<HeatTreatment> { // 获取热处理
    return this.http.get<HeatTreatment>(API.HEAT_TREATMENT_RECORD, {params});
  }
  getFreight(params): Observable<Pagination<Freight>> { // 获取热处理
    return this.http.get<Pagination<Freight>>(API.FREIGHT_INFO + `?rollId=${params}`);
  }
}
