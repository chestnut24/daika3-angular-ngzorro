import { Injectable } from '@angular/core';
import { EntryRecord, EntryRecordAdd, EntryRecordSearch, SelfCheck, HtHistoryList } from '../public/interface/entry-record';
import { Observable } from 'rxjs';
import { API } from '../public/api';
import { HttpClient } from '@angular/common/http';
import { ResponseResult, Pagination } from '../public/interface/common';

@Injectable({
  providedIn: 'root'
})
export class EntryRecordService {

  constructor(
    private http: HttpClient
  ) { }
  // 添加入厂记录 或修改
  AddEntryRecord(params: EntryRecordAdd): Observable<EntryRecordAdd> {
    return this.http.post<EntryRecordAdd>(API.ENTRY_RECORD_ADD, params);
  }
  // 入厂记录查询
  SearchEntryRecord(params): Observable<EntryRecordSearch<EntryRecord>> {
    return this.http.get<EntryRecordSearch<EntryRecord>>(API.ENTRY_RECORD_SEARCH, { params });
  }
  // 入厂记录删除
  deleteRoll(id): Observable<ResponseResult> {
    return this.http.delete<ResponseResult>(`${API.ENTRY_ROLL_DEL}/${id}`);
  }
  // HEAT_HISTORY_LIST
  // 热处理过程记录列表
  htHistoryList(params): Observable<Pagination<HtHistoryList>> {
    return this.http.get<Pagination<HtHistoryList>>(API.HEAT_HISTORY_LIST, { params });
  }
}
