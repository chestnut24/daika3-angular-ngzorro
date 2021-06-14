import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EnterFurnaceService} from '../../../../../../services/enter-furnace.service';
import {DetailInquiry} from '../../../../../../public/interface/enter-furnace';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-furnace-operation',
  templateUrl: './furnace-operation.component.html',
  styleUrls: ['./furnace-operation.component.scss']
})
export class FurnaceOperationComponent implements OnInit {
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private enterFurnaceService: EnterFurnaceService,
  ) { }
  detailId: number; // 本详情的id
  putOrTake = 'put'; // 控制入炉还是出炉的属性 put是入炉 take是出炉
  tableData: DetailInquiry; // 用来接收接口的数据

  ngOnInit() {
    // 通过订阅的方式获取路由id
    // this.route.params.subscribe(data => {
    //   this.linkId = data.id;
    //   console.log(this.linkId);
    // });
    // 通过snapshot的方式获取id
    this.detailId = this.route.snapshot.params.id;
    const path = this.router.url.split('/')[1];
    if (path === 'enterFurnace') { // 通过url来判断是入炉还是出炉
          this.putOrTake = 'put';
      } else {
          this.putOrTake = 'take';
      }
    this.initData();
  }
  initData(): void { // 重新获取过来的值
      this.enterFurnaceService.inquireDetail({detailId: this.detailId}).subscribe((data) => {
          this.tableData = data;
          // console.log('this.tableData.fur:' + this.tableData.furnaceListPutted2);
      });
  }
}
