import { Injectable } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import * as XLSX from 'xlsx';
import {Router} from '@angular/router';
import {API} from '../public/api';

@Injectable({
  providedIn: 'root'
})
export class DataReportService {
  public get currentUrl() {
    return this.router.url.split('/')[2];
  }
  public updateHasRouteParams = new Subject();
  public get getIframeHeight() {
    return window.innerHeight - 250;
  }
  constructor(private http: HttpClient,
              private message: NzMessageService,
              private router: Router  ) { }
  getReports(title, params, url): Observable<any> {
    for (const key in params) {
      if (params[key] === '' || params[key] === null) {
        delete params[key];
      }
    }
    return this.http.get(url , {responseType: 'blob', params}).pipe(
      catchError((error) => {
        const blob = new Blob([error.error]);
        const reader = new FileReader();
        reader.readAsText(blob);
        reader.onload = (e) => {
          const message = JSON.parse(e.target['result']).message;
          this.message.error(message);
        };
        return of(null);
      }),
      map(excel => {
        const content = excel;
        const eLink = document.createElement('a');
        eLink.download = title + '.xls';
        const blob = new Blob([content]);
        eLink.href = URL.createObjectURL(blob);
        const reader = new FileReader();
        reader.readAsBinaryString(blob);
        return new Promise( function(resolve) {
          reader.onload = (e) => {
            const data = e.target['result'];
            const workbook = XLSX.read(data, {type: 'binary'});
            const sheetNames = workbook.SheetNames;
            let tableContent: string[] = [];
            workbook.SheetNames.forEach(item => {
              try {
                tableContent.push(XLSX.utils.sheet_to_html(workbook.Sheets[item]));
              } catch (e) {
                console.log('workbook.SheetNames.forEach', e);
              }
            });
            tableContent = tableContent.map(table => table.split('<table>')[1].split('</table>')[0]);
            resolve({
              tableContent,
              eLink,
              sheetNames
            });
          };
        });

      })
    );
  }

  savePowerMultiple(option) {
    return this.http.post(API.POWER_MULTIPLE, option);
  }
  getIP(): string {
    return location.protocol + '//' + location.hostname + ':9090';
  }
}
