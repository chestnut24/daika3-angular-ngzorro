import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DelongTableService} from '../../../services/delong-table.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../interface/user';
import {TitleType} from '../delong-table/delong-table.component';
import {ConfigurationManagementService} from '../../../services/configuration-management.service';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
})
export class Page404Component implements OnInit {
  titleList: Array<TitleType> = [
    {name: '姓名', canSort: true, sortField: 'name'},
    {name: 'id', canSort: false, sortField: 'id'},
    {name: '手机号', canSort: true, sortField: 'phone'},
  ];
  constructor(public delongTable: DelongTableService<User>,
              private user: UserService,
              private configurationManagement: ConfigurationManagementService) { }

  ngOnInit() {
    this.delongTable.observeFunction = this.configurationManagement.mockTest.bind(this.configurationManagement);
  }

}
