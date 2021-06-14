import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../public/api';
import {Observable} from 'rxjs';
import {HeatTreatment, HtDetail, HtStart} from '../public/interface/heat-treatment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeatTreatmentService {

  constructor( private http: HttpClient) { }

  getHts(): Observable<Array<HeatTreatment>> { // 热处理管理
    return this.http.get<Array<HeatTreatment>>(API.HTS);
  }

  getHtById(id: string): Observable<HtDetail> { // 热处理详情
    return this.http.get<HtDetail>(API.HT + `/${id}`).pipe(
        tap(
            detail => {
              detail.linkDetail.furnacePutted = [];
              detail.linkDetail.freights.forEach(
                  freight => {
                      freight.detailRolls = freight.detailRolls.filter(
                        detailRoll => {
                          if (detailRoll.position && detailRoll.status === 'EXECUTING') {
                            detail.linkDetail.furnacePutted[Number(detailRoll.position)] = freight;
                          }
                          return detailRoll.status === 'EXECUTING';
                        }
                    );
                  }
              );
              detail.device.monitorList.forEach(data1 => {
                data1.otherInfo = {
                    actualTemp: 0,
                    deviation: 0, // 偏差值
                    targetTemp: 0
                };
              });
            }
        )
    );
  }
    getHtHistoryById(id: string): Observable<HtDetail> {
        return this.http.get<HtDetail>(API.HT_HISTORY + `/${id}`).pipe(
            tap(
                detail => {
                    detail.linkDetail.furnacePutted = [];
                    detail.linkDetail.freights.forEach(
                        freight => {
                            freight.detailRolls = freight.detailRolls.filter(
                                detailRoll => {
                                    if (detailRoll.position && detailRoll.status === 'EXECUTING') {
                                        detail.linkDetail.furnacePutted[Number(detailRoll.position)] = freight;
                                    }
                                    return detailRoll.status === 'EXECUTING';
                                }
                            );
                        }
                    );
                    detail.device.monitorList.forEach(data1 => {
                        data1.otherInfo = {
                            actualTemp: 0,
                            deviation: 0, // 偏差值
                            targetTemp: 0
                        };
                    });
                }
            )
        );
    }

  startMonitor(option: HtStart): Observable<any> { // 开始热处理监控
      return this.http.post(API.HT_START, option);
  }
  afterStartMonitor(option: HtStart): Observable<any> { // 开始热处理监控之前，判断一下是不是都装炉了
    return this.http.post(API.HT_START_AFTER, option);
}
  endMonitor(option: {id: number}): Observable<any> { // 停止热处理监控
      return this.http.post(API.HT_END, option);
  }
  updateMonitor(option: HtStart): Observable<any> { // 更新更新矫正时间 / 切换平均值/最大值/最小值
      return this.http.post(API.HT_UPDATE, option);
  }
  pauseMonitor(option: {htRecordId: number, type: 'START' | 'END'}): Observable<any> { // 暂停热处理监控
      return this.http.post(API.HT_PAUSE, option);
  }
  ignoreMonitor(id) { // 忽略警报
      return this.http.post(API.HT_CLEAR + `/${id}`, {});
  }

  startOrEndBeforeMonitor(id: number | string, superviseType: 'START' | 'END'): Observable<any> { // 开始/结束 热处理前监控
      return this.http.post(API.HT_SUPERVISE_START, {id, superviseType});
  }

  findStartSuperviseHt(id) { // 热处理监控记录列表
      return this.http.get(`${API.HT_FIND_START_SUPERVISE_HT}/${id}`);

  }
}
