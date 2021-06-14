import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CoolingDetails, CoolingGun, CoolingPages, CoolingSaves, Product} from '../public/interface/normalizing-cooling';
import {API} from '../public/api';

@Injectable({
  providedIn: 'root'
})
export class NormalizingCoolingService {
  begin = true;
  constructor(
      private  http: HttpClient
  ) { }
  getCooling(params): Observable<CoolingPages> { // 获取正火冷却
    return this.http.get<CoolingPages>(API.NORMALIZING_COOLING, {params});
  }
  saveCooling(params): Observable<CoolingSaves> { // 保存温度
    return this.http.post<CoolingSaves>(API.COOLING_SAVES, params);
  }
  getDetails(params): Observable<CoolingDetails> {
    return this.http.get<CoolingDetails>(API.COOLING_DETAILS, {params});
  }
  getGun(): Observable<CoolingGun[]> { // 查询测温枪
    return this.http.get<CoolingGun[]>(API.COOLING_GUN);
  }
  getWorkingGun(params): Observable<CoolingGun[]> { // 查询测温枪
  return this.http.get<CoolingGun[]>(API.WORKING_GUN + `?coolingId=${params}`);
}
}
