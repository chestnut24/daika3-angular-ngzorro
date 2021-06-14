import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../public/api';
import {Observable} from 'rxjs';
import {Pagination} from '../public/interface/common';
import {SelfCheck} from '../public/interface/quality-inspection-management';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QualityInspectionManagementService {

  constructor(private http: HttpClient, private router: Router) {this.getCurrentUrl(); }
  getCurrentUrl(): string {
    return this.router.url.split('/')[2];
  }
  getBeforeSelfList(params): Observable<Pagination<SelfCheck>> { // 热前自检
    return this.http.get<Pagination<SelfCheck>>(API.BEFORE_SELF_CHECK, {params});
  }
  getBeforeQualityList(params): Observable<Pagination<SelfCheck>> { // 热前质检
    return this.http.get<Pagination<SelfCheck>>(API.BEFORE_QUALITY_CHECK, {params});
  }

  saveCheck(url: string, selfOrQuality: 'self' | 'quality', option): Observable<any> { // 保存热前/热后 自检/质检
    return this.http.post(`/api/${selfOrQuality}/${url}/save`, option);
  }

  getBeforeNgList(params): Observable<Pagination<SelfCheck>> { // 热前不合格
    return this.http.get<Pagination<SelfCheck>>(API.BEFORE_NG, {params});
  }

  getAfterSelfList(params): Observable<Pagination<SelfCheck>> { // 热后自检
    return this.http.get<Pagination<SelfCheck>>(API.AFTER_SELF_CHECK, {params});
  }
  getAfterQualityList(params): Observable<Pagination<SelfCheck>> { // 热后质检
    return this.http.get<Pagination<SelfCheck>>(API.AFTER_QUALITY_CHECK, {params});
  }

  getAfterNgList(params): Observable<Pagination<SelfCheck>> { // 热后不合格
    return this.http.get<Pagination<SelfCheck>>(API.AFTER_NG, {params});
  }
  saveNg(url: string, option): Observable<any> {
    return this.http.post(`/api/ng/${url}/save`, option);
  }}
