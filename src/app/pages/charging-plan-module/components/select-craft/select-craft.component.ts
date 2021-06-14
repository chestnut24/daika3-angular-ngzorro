import { Component, OnInit } from '@angular/core';
import { CraftList } from 'src/app/public/interface/charging-plan';
import { ChargingPlanService } from '../../../../services/charging-plan.service';

export interface CraftListChoose extends CraftList {
    isChoose?: boolean;
    remark?: string;
}

@Component({
    selector: 'app-select-craft',
    templateUrl: './select-craft.component.html',
    styleUrls: ['./select-craft.component.scss']
})
export class SelectCraftComponent implements OnInit {
    // 搜索条件
    sendData = {
        searchText: ''
    };
    // 备注框
    inputValue = '';
    // 列表
    leftcraftsList: Array<CraftListChoose> = [];
    // 选中的工艺
    chooseCraft: CraftListChoose;


    constructor(
        private httpFunction: ChargingPlanService,
    ) { }

    ngOnInit() {
        this.getCraftList();
    }

    // 获取工艺列表
    getCraftList(): void {
        this.httpFunction.getCraftsList(this.sendData.searchText).subscribe(data => {
            this.leftcraftsList = data;
            this.leftcraftsList.forEach(item => {
                item.isChoose = false;
            });
        });
    }
    // 点击选择单列
    getCraft(data: CraftListChoose): void {
        this.leftcraftsList.forEach(item => {
            item.isChoose = false;
        });
        data.isChoose = true;
        this.chooseCraft = data;
    }
}
