import { Component, OnInit } from '@angular/core';
import {DataReportService} from '../../../../services/data-report.service';

@Component({
  selector: 'app-output-data',
  templateUrl: './output-data.component.html',
  styleUrls: ['./output-data.component.scss']
})
export class OutputDataComponent implements OnInit {
  src = this.dataReport.getIP() + '/smartbi/vision/openresource.jsp?resid=I40289212016f88228822975c016f97bec97e1ae4&user=delong_ht&password=BI-Delong-HT';
  constructor(public dataReport: DataReportService) { }

  ngOnInit() {
  }

}
