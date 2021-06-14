import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {ConfigurationManagementService} from '../../../../../../services/configuration-management.service';
import {ModifyContent, ModifyList} from '../../../../../../public/interface/configuration-management';
import {UserService} from '../../../../../../services/user.service';
@Component({
  selector: 'app-nz-show-component',
  templateUrl: './nz-show-component.component.html',
  styleUrls: ['./nz-show-component.component.scss']
})
export class NzShowComponentComponent implements OnInit {
   @Input() showContent: ModifyContent<ModifyList>;
  public modifyList: any[] = [];
  changeUser: string;
  tplModal: NzModalRef;
  constructor(
      private modalService: NzModalService,
      private configurationManagement: ConfigurationManagementService,
      private user: UserService
  ) { }
  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void { // 创建弹窗
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '792',
      nzOnOk: () => console.log('Click ok')
    });
    this.modifyList = this.showContent.updateLogChild;
  }
  destroyTplModal(): void {
    this.tplModal.destroy();
  }

  ngOnInit() {

  }

}
