import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Router } from '@angular/router';
import { Observable, throwError, Subject } from 'rxjs';
import { switchMap, catchError, tap, share, map } from 'rxjs/operators';

import {
    PlanAdd, CraftList, DeviceInfo, AreaInfo,
    PlansTableListInfo, PlansTableList, PlanRollsList, PlansTableListDetails, TableFeightList, PlanRollsListHT
} from '../public/interface/charging-plan';
import { API } from '../public/api';
import { ResponseResult, Pagination, PaginationResolver, ResponseDate } from '../public/interface/common';

@Injectable({
    providedIn: 'root'
})
export class ChargingPlanService {
    // 4.装炉计划
    constructor(private http: HttpClient) { }

    // 新增计划
    addNewPlan(): Observable<PlanAdd> {
        return this.http.post<PlanAdd>(API.PLAN_SAVE, {});
    }
    // 选择工艺
    getCraftsList(searchText?: string): Observable<CraftList[]> {
        return this.http.get<CraftList[]>(API.PLAN_CRAFTS, {
            params: {
                searchText
            },
        });
    }
    // 选择设备
    getDevicesList(): Observable<DeviceInfo[]> {
        return this.http.get<DeviceInfo[]>(API.PLAN_DEVICES);
    }
    // 选择区域
    getAreasList(): Observable<AreaInfo[]> {
        return this.http.get<AreaInfo[]>(API.PLAN_AREAS);
    }
    // 选择热处理轧辊
    getRollsList(freightNumber?: string, productNo?: string, furnacePlanId?: number): Observable<ResponseDate<PlanRollsListHT[]>> {
        return this.http.get<ResponseDate<PlanRollsListHT[]>>(API.PLAN_ROLLS_HT, {
            params: {
                freightNumber,
                productNo,
                furnacePlanId: furnacePlanId.toString()
            },
        });
    }
    // 保存环节
    savePlanLink(data: any): Observable<PlansTableListInfo> {
        return this.http.post<PlansTableListInfo>(API.PLAN_LINK_SAVE, data);
    }
    // 删除环节 PLAN_LIST_ONE_DEL
    // 列表撤销操作
    delPlanLink(id: number): Observable<ResponseResult> {
        return this.http.delete<ResponseResult>(`${API.PLAN_LIST_ONE_DEL}/${id}`);
    }
    // 获取计划列表
    // tslint:disable-next-line: max-line-length
    getPlanTableList(data: { startTime?: string, createdDt?: string, freightNumber?: string, status?: string }, pageNum: number, pageSize: number): Observable<Pagination<PlansTableList>> {
        return this.http.get<Pagination<PlansTableList>>(API.PLAN_LIST, {
            params: {
                startTime: data.startTime ? data.startTime : '',
                createdDt: data.createdDt ? data.createdDt : '',
                freightNumber: data.freightNumber ? data.freightNumber : '',
                status: data.status ? data.status : '',
                pageNum: (pageNum - 1).toString(),
                pageSize: pageSize.toString(),
            }
        });
    }
    // 查看明细
    getPlanLinkOne(planId: number): Observable<PlansTableList> {
        return this.http.get<PlansTableList>(`${API.PLAN_INFO}/${planId}`);
    }
    // 列表撤销操作
    delPlan(id: number): Observable<ResponseResult> {
        return this.http.delete<ResponseResult>(`${API.PLAN_DELETE}/${id}`);
    }
    // 根据单id换取id组
    changeArrId(Did: number, list): Array<number> {
        let array = [];
        // tslint:disable-next-line: no-shadowed-variable
        function findId(id: number, typeList, arr): void {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < typeList.length; i++) {
                arr.push(typeList[i].key);
                if (typeList[i].key === id) {
                    array = [...arr];
                    break;
                } else if (typeList[i].children && typeList[i].children.length) {
                    findId(id, typeList[i].children, arr);
                }
                arr.pop();
            }
        }
        findId(Did, list, []);
        return array;
    }
    // 分解从环节开始组起来的列表到货号list
    dataProcess(data: Array<{
        id: number;
        planId: number;
        name: string; // 环节
        details: Array<PlansTableListDetails>;
    }>): Array<TableFeightList> {
        const Arr = [];
        if (data && data.length) {
            data.forEach((detail, ia) => {
                detail.details.forEach((freight, ib) => {
                    if (freight.freights && freight.freights.length) {
                        freight.freights.forEach((roll, ic) => {
                            const status1 = [];
                            const status2 = [];
                            const status3 = [];
                            roll.detailRolls.forEach((product, id) => {
                                // let freightRowspan = 0;
                                // if (ic === 0) {
                                //     freightRowspan = roll.rolls.length;
                                // }
                                // [NOT_PUT, IN_FURNACE, EXECUTING, OUT_FURNACE]
                                if (product.status === 'IN_FURNACE' || product.status === 'EXECUTING' || product.status === 'OUT_FURNACE') {
                                    status1.push(product);
                                }
                                if (product.status === 'EXECUTING' || product.status === 'OUT_FURNACE') {
                                    status2.push(product);
                                }
                                if (product.status === 'OUT_FURNACE') {
                                    status3.push(product);
                                }
                            });
                            let detailRowspan = 0;
                            if (ic === 0) {
                                detailRowspan = freight.freights.length;
                            }
                            Arr.push({
                                ...roll,
                                detailStartTime: freight.startTime,
                                detailEndTime: freight.endTime,
                                craftName: detail.name,
                                detailDevice: freight.device ? freight.device.name : null,
                                detailCraft: freight.craft ? freight.craft.name : null,
                                freightList: roll.detailRolls,
                                freightNumber: roll.freightNumber,
                                freight: roll,
                                freightID: roll.id,
                                detail: freight,
                                detailID: freight.id,
                                craft: detail,
                                craftID: detail ? detail.id : null,
                                detailRowspan,
                                status1,
                                status2,
                                status3,
                            });
                        });
                    } else {
                        Arr.push({
                            detailStartTime: freight.startTime,
                            detailEndTime: freight.endTime,
                            craftName: detail.name,
                            detailDevice: freight.device ? freight.device.name : null,
                            detailCraft: freight.craft ? freight.craft.name : null,
                            freightList: [],
                            freightNumber: null,
                            freight: null,
                            freightID: null,
                            detail: freight,
                            detailID: freight.id,
                            craft: detail,
                            craftID: detail ? detail.id : null,
                            detailRowspan: 1,
                            status1: [],
                            status2: [],
                            status3: [],
                        });
                    }
                });
            });
            if (Arr && Arr.length) {
                const craftA = this.shaixuanCraftID(Arr, Arr[0].craftID);
                return craftA;
            }
        } else {
            return [];
        }
    }
    // 筛选id拼合并
    shaixuanCraftID(List: Array<TableFeightList>, id: number): Array<TableFeightList> {
        const Arr = [];
        const Brr = [];
        List.forEach((item, index) => {
            if (item.craftID === id) {
                Arr.push(item);
            } else {
                Brr.push(item);
            }
        });
        let listCanEdit = false;
        Arr.forEach((item, index) => {
            if (item.status1 && item.status1.length === 0) {
                listCanEdit = true;
            }
        });
        Arr.forEach((item, index) => {
            if (index === 0) {
                item.craftRowspan = Arr.length;
                item.listCanEdit = listCanEdit;
            }
        });
        if (Brr.length) {
            let Crr = [];
            Crr = this.shaixuanCraftID(Brr, Brr[0].craftID);
            Crr.forEach(item => {
                Arr.push(item);
            });

            return Arr;
        } else {
            return Arr;
        }
    }
}
