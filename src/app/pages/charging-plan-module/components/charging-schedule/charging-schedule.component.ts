import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChargingPlanService } from '../../../../services/charging-plan.service';
import { PlansTableList, CraftList } from '../../../../public/interface/charging-plan';

@Component({
    selector: 'app-charging-schedule',
    templateUrl: './charging-schedule.component.html',
    styleUrls: ['./charging-schedule.component.scss']
})
export class ChargingScheduleComponent implements OnInit {
    // 传入本页的id
    planId: number;
    // 本页列表数据（假）
    planInfo: PlansTableList;

    tableList = [];

    tablePadding = 17; // 保持表格宽度的数据

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        private httpFunction: ChargingPlanService,
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.planId = Number(params.get('fid'));
        });
        this.getPlanLinkOne();
    }

    // 获取详情列表
    getPlanLinkOne(): void {
        this.httpFunction.getPlanLinkOne(this.planId).subscribe(data => {
            this.planInfo = data;
            this.tableList = this.httpFunction.dataProcess(data.links.sort((a,b)=>a.id-b.id));
        });
    }
    sumData(list: Array<number>): number {
        let sum = 0;
        list.forEach(a => {
            sum += a;
        });
        return sum;
    }
    // 查看装炉计划
    goLookPlan(): void {
        this.router.navigate(['/chargingPlan/lookPlan', this.planId]);
    }
    // 跳转工艺新增页面展示
    goAddCraft(craft: CraftList): void {
        this.router.navigate(['/configuration/addCraft', craft.id]);
    }
    // 三个跳转1.入炉记录2.热处理记录3.出炉记录
    goEntryPage(id: number, i: number): void {
        if ( i === 1 ) {
            this.router.navigate(['/enterFurnace/operation', id]);
        } else if ( i === 2 ) {
            this.router.navigate(['/heatTreatment', id]);
        } else if ( i === 3 ) {
            this.router.navigate(['/takeFurnace/operation', id]);
        }
    }
}
