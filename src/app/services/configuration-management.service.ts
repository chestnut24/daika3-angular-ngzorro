import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { switchMap, catchError, tap, share, map } from 'rxjs/operators';

import {
  Freight,
  FreightEditInfo,
  FreightInquiry,
  DeviceProductionList,
  ModifyContentPlanB,
} from '../public/interface/configuration-management';
import { Observable } from 'rxjs';
import { API } from '../public/api';
import { Pagination, ResponseResult } from '../public/interface/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Craft, CraftApproval, CraftGetParams, MaterialRange,
  TypeList, AreaList,
  ProductionAddData, DeviceProductionSave,
  MonitorList, MonitorAddData, MonitorInfo,
  ModificationLogGet,
  ModifyContent,
  ModifyList
} from '../public/interface/configuration-management';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationManagementService {

  constructor(private http: HttpClient) { }

  /* 轧辊货号管理-编辑货号 */
  saveFreight(freight: FreightEditInfo): Observable<Freight> {
    return this.http.post<Freight>(API.FREIGHT_SAVE, freight);
  }
  /* 轧辊货号管理-查询货号 */
  inquireFreight(params: FreightInquiry): Observable<Pagination<Freight>> {
    return this.http.get<Pagination<Freight>>(API.FREIGHT, { params });
  }
  /* 轧辊货号管理-删除货号 */
  deleteFreight(id: number): Observable<ResponseResult> { // 删除货号
    return this.http.delete<ResponseResult>(API.FREIGHT + `/${id}`);
  }
  mockTest(params) {
    return this.http.get('/api/test', { params });
  }

  // 设备管理-生产

  // 获取设备类型-生产
  getProductionTypeList(): Observable<TypeList[]> {
    return this.http.get<TypeList[]>(API.PRODUCTION_FIND_ALL_TYPE);
  }
  // 删除设备类型-生产
  delProductionType(id: number): Observable<ResponseResult> {
    return this.http.delete<ResponseResult>(`${API.PRODUCTION_DELETE_TYPE}/${id}`);
  }
  // 添加/修改设备类型-生产
  addProductionType(data: { typeName: string, parentId?: number, id?: number }): Observable<ResponseResult> {
    return this.http.post<ResponseResult>(API.PRODUCTION_SAVE_TYPE, data);
  }


  // 区域
  // 获取设备区域-生产
  getProductionAreaList(): Observable<AreaList[]> {
    return this.http.get<AreaList[]>(API.PRODUCTION_FIND_ALL_AREA);
  }
  // 添加/修改设备区域-生产
  addProductionArea(data: { areaName: string, id?: number }): Observable<ResponseResult> {
    return this.http.post<ResponseResult>(API.PRODUCTION_SAVE_AREA, data);
  }
  // JSON.stringify(data)


  // 列表
  // 获取生产设备列表
  // tslint:disable-next-line:max-line-length
  getProductFindList(data: { pageNum: string, pageSize: string, typeid?: string, areaid?: string, nameOrNumber?: string }): Observable<Pagination<DeviceProductionList>> {
    return this.http.get<Pagination<DeviceProductionList>>(API.PRODUCTION_FIND_lIST_ALL, {
      params: data,
    });
  }
  // 删除生产设备
  delProduction(id: number): Observable<ResponseResult> {
    return this.http.delete<ResponseResult>(`${API.PRODUCTION_DELETE}/${id}`);
  }
  // 添加生产设备-编辑生产设备
  addProduction(data: DeviceProductionSave): Observable<ResponseResult> {
    return this.http.post<ResponseResult>(API.PRODUCTION_SAVE, data);
  }
  // 查询单个数据
  getProductionInfo(id: number): Observable<ProductionAddData> {
    return this.http.get<ProductionAddData>(`${API.PRODUCTION_FIND_BY_ID}/${id}`);
  }

  // 设备管理-监测
  // 获取设备类型-监测
  getMonitorTypeList(): Observable<TypeList[]> {
    return this.http.get<TypeList[]>(API.MONITOR_FIND_ALL_TYPE);
  }
  // 删除设备类型-监测
  delMonitorType(id: number): Observable<ResponseResult> {
    return this.http.delete<ResponseResult>(`${API.MONITOR_DELETE_TYPE}/${id}`);
  }
  // 添加/修改设备类型-监测
  addMonitorType(data: { typeName: string, parentId?: number, id?: number }): Observable<ResponseResult> {
    return this.http.post<ResponseResult>(API.MONITOR_SAVE_TYPE, data);
  }

  // 列表
  // 获取监测设备列表
  // tslint:disable-next-line:max-line-length
  getMonitorFindList(data: { pageNum: string, pageSize: string, typeid?: string, areaid?: string, nameOrNumber?: string }): Observable<Pagination<MonitorList>> {
    return this.http.get<Pagination<MonitorList>>(API.MONITOR_FIND_lIST, {
      params: data,
    });
  }
  // 获取监测设备列表中没有绑定区域的
  getMonitorFindListOne(): Observable<MonitorList[]> {
    return this.http.get<MonitorList[]>(API.MONITOR_FIND_lIST_NOAREA);
  }
  // 删除监测设备*************************
  delMonitor(id: number): Observable<ResponseResult> {
    return this.http.delete<ResponseResult>(`${API.MONITOR_DELETE}/${id}`);
  }
  // 添加监测设备-编辑监测设备
  addMonitor(data: MonitorAddData): Observable<ResponseResult> {
    return this.http.post<ResponseResult>(API.MONITOR_SAVE, data);
  }
  // 查询单个数据-监测
  getMonitorInfo(data: { id: number }): Observable<MonitorInfo> {
    return this.http.get<MonitorInfo>(`${API.MONITOR_FIND_BY_ID}/${data.id}`);
  }

  // 获取修改日志列表数据
  modifyLogGet(params: ModificationLogGet): Observable<Pagination<ModifyContent<ModifyList>>> {
    return this.http.get<Pagination<ModifyContent<ModifyList>>>(API.MODIFICATION_LIST, { params });

  }
  modifyLogGetplanB(params: ModificationLogGet): Observable<Pagination<ModifyContentPlanB>> {
    return this.http.get<Pagination<ModifyContentPlanB>>(API.MODIFICATION_LIST_B, { params });

  }
  // // 获取修改日志列表详情
  // modifyListGet(id: number): Observable<ModifyDetails<ModifyList>> {
  //   return this.http.get<ModifyDetails<ModifyList>>(API.MODIFICATION_LIST + `/${id}`);
  // }

  // 添加工艺
  addCraft(craft: Craft): Observable<Craft> {
    return this.http.post<Craft>(API.CRAFT, craft);
  }

  // 获取工艺列表
  getCraftList(params: CraftGetParams): Observable<Pagination<Craft>> {
    return this.http.get<Pagination<Craft>>(API.CRAFTS, { params }).pipe(tap(
      data => {
        data.content.map(item => {
          if (item.specificationRange) {
            item.specificationRange = item.specificationRange.split(',');
            item.specificationRange.splice(2, 0, '∅');
            item.specificationRange = item.specificationRange.join('');
          }
        });
      }
    ));
  }

  // 查看审批记录
  getCraftApprovals(params: HttpParams): Observable<Pagination<CraftApproval>> {
    return this.http.get<Pagination<CraftApproval>>(API.CRAFT_APPROVALS, { params });
  }

  // 工艺审批
  saveCraftApproval(option: CraftApproval): Observable<any> {
    return this.http.post(API.CRAFT_APPROVAL, option);
  }

  // 获取材质范围列表
  getCraftMaterials(): Observable<Pagination<MaterialRange>> {
    return this.http.get<Pagination<MaterialRange>>(API.CRAFT_MATERIALS, {
      params: {
        pageNum: '0',
        pageSize: '9999'
      }
    });
  }

  // 根据id获取工艺
  getCraftFormId(id: string): Observable<Craft> {
    return this.http.get<Craft>(API.CRAFT + `/${id}`);
  }

  // 根据id删除工艺
  deleteCraft(id: string): Observable<any> {
    return this.http.delete(API.CRAFT + `/${id}`);
  }
}


