import { Component, OnInit } from '@angular/core';
import {DataReportService} from '../../../../services/data-report.service';

@Component({
  selector: 'app-in-production-data',
  templateUrl: './in-production-data.component.html',
  styleUrls: ['./in-production-data.component.scss']
})
export class InProductionDataComponent implements OnInit {
  tabList = [
    {src: this.dataReport.getIP() + '/smartbi/vision/openresource.jsp?resid=I40289212016f88228822975c016f97d544f11d9f&user=delong_ht&password=BI-Delong-HT', name: '接辊记录'},
    {src: this.dataReport.getIP() + '/smartbi/vision/openresource.jsp?resid=I40289212016f88228822975c016f988ba64a2418&user=delong_ht&password=BI-Delong-HT', name: '待处理记录'},
    {src: this.dataReport.getIP() + '/smartbi/vision/openresource.jsp?resid=I40289212016f88228822975c016f98f6a24e27f2&user=delong_ht&password=BI-Delong-HT', name: '炉内在制'},
    {src: this.dataReport.getIP() + '/smartbi/vision/openresource.jsp?resid=I40289212016f88228822975c016f98a5b4db25ce&user=delong_ht&password=BI-Delong-HT', name: '热后待转'},
    {src: this.dataReport.getIP() + '/smartbi/vision/openresource.jsp?resid=I40289212016f88228822975c016f980337321f1d&user=delong_ht&password=BI-Delong-HT', name: '转辊记录'},
  ];
  constructor(public dataReport: DataReportService) { }

  ngOnInit() {
  }

}
