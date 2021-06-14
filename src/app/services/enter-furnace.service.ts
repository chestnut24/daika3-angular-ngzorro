import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../public/interface/common';
import { API } from '../public/api';
import { HttpClient } from '@angular/common/http';
import {
    CraftInquiry, CraftReturn, DetailInquiry, Plans,
    PlansInquiry,
    SavePutWorkMeter, SaveTakeWorkMeter,
} from '../public/interface/enter-furnace';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EnterFurnaceService {

    constructor(private http: HttpClient) { }
    // 入炉作业清单-装炉计划查询 get
    inquirePlans(params: PlansInquiry): Observable<Pagination<Plans>> {
        return this.http.get<Pagination<Plans>>(API.PLANS, { params }).pipe(
            tap(
                pagination => {
                    pagination.content.forEach(
                        item => {
                            item.links.forEach(
                                link => {
                                    link.details.forEach(
                                        detailInit => {
                                            detailInit.device.isPut = 0;
                                        },
                                    );
                                }
                            );
                        }
                    );
                    pagination.content.forEach(
                        item => {
                            let total = 0; // 用于统计总的detail数
                            item.links.forEach(
                                link => {
                                    link.details.forEach(
                                        detail => {
                                            let cooling = 0; // 记录是否有正火冷却以及全部结束，无或者全部结束为0
                                            let totalFre = 0; // 记录每个detail中轧辊
                                            let totalNP = 0; // 记录每个detail中未入炉的轧辊生产号
                                            let totalNT = 0; // 记录每个detail中未出炉的轧辊生产号
                                            let totalOut = 0;
                                            total++;
                                            detail.freights.forEach(
                                                freight => {
                                                    freight.notPutRolls = [''];
                                                    freight.notTakeRolls = [''];
                                                    totalFre += freight.detailRolls.length;
                                                    freight.detailRolls.forEach(
                                                        detailRoll => {
                                                            if (detailRoll.status && detailRoll.status === 'NOT_PUT') { // 记录每个freight中未入炉的生产号
                                                                totalNP++; // 累加每个detail中未入炉的轧辊生产号
                                                                freight.notPutRolls.push(detailRoll.roll.productNo);
                                                            } else if (detailRoll.status === 'IN_FURNACE' || detailRoll.status === 'EXECUTING') {
                                                                totalNT++; // 累加每个detail中未出炉的轧辊生产号
                                                                freight.notTakeRolls.push(detailRoll.roll.productNo);
                                                            } else if (detailRoll.status === 'OUT_FURNACE') {
                                                                totalOut++;
                                                            }
                                                            // 判断是否有正火冷却阶段，且正火冷却是否结束
                                                            if ((detail.craft && detail.craft.needCooling && detail.craft.needCooling === 'YES') && detailRoll.coolingMapList.length !== 0) {
                                                                detailRoll.coolingMapList.forEach(
                                                                    coolingList => {
                                                                        if (coolingList.status === 0 || coolingList.status === 1 || coolingList.status === 2) {
                                                                            cooling = 1;
                                                                        }
                                                                    }
                                                                );
                                                            }
                                                        }
                                                    );
                                                }
                                            );
                                            detail.isCooling = cooling;
                                            detail.totalFreight = totalFre;
                                            detail.totalNotPut = totalNP;
                                            detail.totalNotTake = totalNT;
                                            detail.totalOut = totalOut;
                                            let detailIdLet = 0;
                                            if (totalNT !== 0) {
                                                detailIdLet = detail.device.id;
                                                pagination.content.forEach(
                                                    itemP => {
                                                        itemP.links.forEach(
                                                            linkP => {
                                                                linkP.details.forEach(
                                                                    detailInit => {
                                                                        if (detailIdLet === detailInit.device.id) {
                                                                            detailInit.device.isPut = 1;
                                                                        }
                                                                    },
                                                                );
                                                            }
                                                        );
                                                    }
                                                );
                                            }
                                        }
                                    );
                                }
                            );
                            item.totalTr = total;
                        }
                    );
                }
            ));
    }
    // 入炉作业操作-显示 get
    inquireDetail(params): Observable<DetailInquiry> {
        return this.http.get<DetailInquiry>(API.PUT_LINK, { params }).pipe(
            tap(
                detail => {
                    detail.furnacePutted = [];
                    detail.freights.forEach(
                        freight => {
                            freight.detailRolls.forEach(
                                detailRoll => {
                                    if (detailRoll.position && detailRoll.status === 'IN_FURNACE' || detailRoll.status === 'EXECUTING') {
                                        detail.furnacePutted[Number(detailRoll.position)] = freight;
                                    }
                                }
                            );
                        }
                    );
                }
            )
        );
    }
    // 入炉作业操作-保存轧辊入炉/撤销 post
    savePutFreight(params: { id: number, position: string, status: string }): Observable<any> {
        return this.http.post<any>(API.PUT_WORK + '/PUT_FURNACE', params);
    }
    // 入炉作业操作-抄表读数 post
    savePutMeter(params: SavePutWorkMeter): Observable<any> {
        return this.http.post<any>(API.PUT_METER, params);
    }
    // 入炉作业操作-按照工艺名称查询 get
    inquirePutCrafts(params: CraftInquiry): Observable<Pagination<CraftReturn>> {
        return this.http.get<Pagination<CraftReturn>>(API.PLANS, { params });
    }
    // 出炉作业操作-保存轧辊出炉 post
    saveTakeFreight(params: { id: number, position: string, status: string }): Observable<any> {
        return this.http.post<any>(API.PUT_WORK + '/TAKE_FURNACE', params);
    }
    // 出炉作业操作-抄表读数 post
    saveTakeMeter(params: SaveTakeWorkMeter): Observable<any> {
        return this.http.post<any>(API.TAKE_METER, params);
    }
    //   入炉作业操作-压辊操作 post
    savePutFreightYa(params: { rollId: number, pushNum: number, detailId: number }): Observable<any> {
        return this.http.post<any>(API.ENTRY_ROLL_MARK, params);
    }
}
