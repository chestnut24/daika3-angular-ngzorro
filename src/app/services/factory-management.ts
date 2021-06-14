import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecordList } from '../public/interface/factory-management';
import { API } from '../public/api';
import { ResponseResult, Pagination } from '../public/interface/common';

@Injectable({
    providedIn: 'root'
})
export class FactoryManagementService {
    // 9.出厂管理
    constructor(private http: HttpClient) { }
    // 获取完成列表
    getRecordListA(data: {
        productionNo?: string,
        startTime?: Date,
        endTime?: Date,
        freightNumber?: string
        // tslint:disable-next-line: align
    }, pageNum: number, pageSize: number): Observable<Pagination<RecordList>> {
        return this.http.get<Pagination<RecordList>>(API.FACTORY_FINISH_LIST, {
            params: {
                productionNo: data.productionNo,
                startTime: data.startTime ? data.startTime.getTime().toString() : '',
                endTime: data.endTime ? data.endTime.getTime().toString() : '',
                freightNumber: data.freightNumber,
                pageNum: (pageNum - 1).toString(),
                pageSize: pageSize.toString(),
            }
        });
    }
    // 获取转辊列表
    getRecordListB(data: {
        productionNo?: string,
        startTime?: Date,
        endTime?: Date,
        freightNumber?: string
        // tslint:disable-next-line: align
    }, pageNum: number, pageSize: number): Observable<Pagination<RecordList>> {
        return this.http.get<Pagination<RecordList>>(API.FACTORY_ROLL_LIST, {
            params: {
                productionNo: data.productionNo,
                startTime: data.startTime ? data.startTime.getTime().toString() : '',
                endTime: data.endTime ? data.endTime.getTime().toString() : '',
                freightNumber: data.freightNumber,
                pageNum: (pageNum - 1).toString(),
                pageSize: pageSize.toString(),
            }
        });
    }
    // 保存环节
    changeRecordStatus(id: number): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(API.FACTORY_CHANGE, {id});
    }

}
