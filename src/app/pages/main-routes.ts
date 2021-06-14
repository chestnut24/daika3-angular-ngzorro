import { Routes } from '@angular/router';
import { Page404Component } from '../public/components/page404/page404.component';
import { RoleListComponent } from './user/role-list/role-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { ConfigurationManagementComponent } from './configuration-management/configuration-management.component';
import { CraftManagementComponent } from './configuration-management/components/craft-management/craft-management.component';
import { AddCraftComponent } from './configuration-management/components/add-craft/add-craft.component';
import { NumberManagementComponent } from './configuration-management/components/number-management/number-management.component';
import { ModificationLogComponent } from './configuration-management/components/modification-log/modification-log.component';
import { EnterFurnaceComponent } from './enter-furnace/enter-furnace.component';
import { FurnaceListComponent } from './enter-furnace/component/furnace-list/furnace-list.component';
import { FurnaceOperationComponent } from './enter-furnace/component/furnace-list/component/furnace-operation/furnace-operation.component';
import { EntryRecordComponent } from './entry-record/entry-record.component';
// tslint:disable-next-line:max-line-length
import { DeviceProductManagementComponent } from './configuration-management/components/device-product-management/device-product-management.component';
// tslint:disable-next-line:max-line-length
import { DeviceMonitorManagementComponent } from './configuration-management/components/device-monitor-management/device-monitor-management.component';
// 4.装炉计划
import { ChargingPlanModuleComponent } from './charging-plan-module/charging-plan-module.component';
import { PlanListComponent } from './charging-plan-module/components/plan-list/plan-list.component';
import { ChargingScheduleComponent } from './charging-plan-module/components/charging-schedule/charging-schedule.component';
import { AddNewPlanComponent } from './charging-plan-module/components/add-new-plan/add-new-plan.component';
import { QualityInspectionManagementComponent } from './quality-inspection-management/quality-inspection-management.component';
import { BeforeQualityComponent } from './quality-inspection-management/components/before-quality/before-quality.component';
import { BeforeSelfTestComponent } from './quality-inspection-management/components/before-self-test/before-self-test.component';
import { BeforeUnqualifiedComponent } from './quality-inspection-management/components/before-unqualified/before-unqualified.component';
import { AfterSelfTestComponent } from './quality-inspection-management/components/after-self-test/after-self-test.component';
import { AfterQualityComponent } from './quality-inspection-management/components/after-quality/after-quality.component';
import { AfterUnqualifiedComponent } from './quality-inspection-management/components/after-unqualified/after-unqualified.component';
import { PlanInfoMsgComponent } from './charging-plan-module/components/plan-info-msg/plan-info-msg.component';
import { AddPlanCraftComponent } from './charging-plan-module/components/add-plan-craft/add-plan-craft.component';
// 9.出厂管理
import { FactoryManagementComponent } from './factory-management/factory-management.component';
import { CompletedRecordsComponent } from './factory-management/components/completed-records/completed-records.component';
import { RollsRecordsComponent } from './factory-management/components/rolls-records/rolls-records.component';


import { NormalizingCoolingComponent } from './normalizing-cooling/normalizing-cooling.component';
import { CoolingComponent } from './normalizing-cooling/components/cooling/cooling.component';
import { CoolingHistoryRecordComponent } from './normalizing-cooling/components/cooling-history-record/cooling-history-record.component';
import { TakeFurnaceComponent } from './take-furnace/take-furnace.component';
import { HeatTreatmentComponent } from './heat-treatment/heat-treatment.component';
import { HeatTreatmentDetailComponent } from './heat-treatment/components/heat-treatment-detail/heat-treatment-detail.component';

import { EditPlanComponent } from './charging-plan-module/components/edit-plan/edit-plan.component';
import { DevelopingComponent } from '../public/components/developing/developing.component';
import { RouteTransferComponent } from '../public/components/route-transfer/route-transfer.component';
import { CostAccountingDataComponent } from './data-report/components/cost-accounting-data/cost-accounting-data.component';
import { InProductionDataComponent } from './data-report/components/in-production-data/in-production-data.component';
import { OutputDataComponent } from './data-report/components/output-data/output-data.component';
import { RollDetailComponent } from './roll-detail/roll-detail.component';
import { RollResumeComponent } from './roll-detail/roll-resume/roll-resume.component';
import { EntryRecordResumeComponent } from './roll-detail/roll-resume/components/entry-record-resume/entry-record-resume.component';
import { BeforeQualityResumeComponent } from './roll-detail/roll-resume/components/before-quality-resume/before-quality-resume.component';
import { RecordResumeComponent } from './roll-detail/roll-resume/components/record-resume/record-resume.component';
import { ChargingPlanResumeComponent } from './roll-detail/roll-resume/components/charging-plan-resume/charging-plan-resume.component';
import { EnterFurnaceResumeComponent } from './roll-detail/roll-resume/components/enter-furnace-resume/enter-furnace-resume.component';
import { HeatTreatmentResumeComponent } from './roll-detail/roll-resume/components/heat-treatment-resume/heat-treatment-resume.component';
import { TakeFurnaceResumeComponent } from './roll-detail/roll-resume/components/take-furnace-resume/take-furnace-resume.component';
import { NormalizingCoolingResumeComponent } from './roll-detail/roll-resume/components/normalizing-cooling-resume/normalizing-cooling-resume.component';
import { AfterQualityResumeComponent } from './roll-detail/roll-resume/components/after-quality-resume/after-quality-resume.component';
import { RollDetailFormComponent } from './roll-detail/roll-detail-form/roll-detail-form.component';
import { SeeHeatTreatmentDetailComponent } from './roll-detail/roll-resume/components/see-heat-treatment-detail/see-heat-treatment-detail.component';
import { UpPassWordComponent } from '../root/up-pass-word/up-pass-word.component';
import { WelcomePageComponent } from '../public/components/welcome-page/welcome-page.component';
import { HeatTreatmentHistoryComponent } from './heat-treatment/components/heat-treatment-history/heat-treatment-history.component';


export const HOME_ROUTES: Routes = [
  {
    path: 'home',
    component: Page404Component,
    data: {
      breadcrumb: '404'
    }
  },
  {
    path: 'developing',
    component: DevelopingComponent,
    data: {
      breadcrumb: '正在开发中...'
    }
  },
  {
    path: 'upPassword',
    component: UpPassWordComponent,
    data: {
      breadcrumb: '更新用户信息'
    }
  },
  // Welcome
  {
    path: 'welcome',
    component: WelcomePageComponent,
    data: {
      breadcrumb: '首页'
    }
  },
  // 轧辊履历
  {
    path: 'rollDetail',
    component: RollDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'rollDetailForm',
        pathMatch: 'full'
      },
      {
        path: 'rollDetailForm',
        component: RollDetailFormComponent,
        data: {
          breadcrumb: '轧辊明细表',
          keep: true
        }
      },
      {
        path: 'rollResume',
        component: RollResumeComponent,
        children: [
          {
            path: 'entry/:id',
            component: RouteTransferComponent,
            children: [
              {
                path: '',
                component: EntryRecordResumeComponent,
              },
              {
                path: 'heatTreat/:id',
                component: SeeHeatTreatmentDetailComponent,
              },
            ]
          },
          {
            path: 'beforeQuality/:id',
            component: BeforeQualityResumeComponent,
          },
          {
            path: 'chargingPlan/:id',
            component: ChargingPlanResumeComponent
          },
          {
            path: 'enterFurnace/:id',
            component: EnterFurnaceResumeComponent
          },
          {
            path: 'heatTreatment/:id',
            component: HeatTreatmentResumeComponent
          },
          {
            path: 'takeFurnace/:id',
            component: TakeFurnaceResumeComponent
          },
          {
            path: 'normalizingCooling/:id',
            component: NormalizingCoolingResumeComponent
          },
          {
            path: 'afterQuality/:id',
            component: AfterQualityResumeComponent
          },
          {
            path: 'record/:id',
            component: RecordResumeComponent,
          }
        ],
        data: {
          breadcrumb: '轧辊履历'
        }
      }
    ],
    data: {
      breadcrumb: '轧辊明细'
    }
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        redirectTo: 'userList',
        pathMatch: 'full'
      },
      {
        path: 'roleList',
        component: RoleListComponent,
        data: {
          breadcrumb: '角色列表',
          keep: true
        }
      },
      {
        path: 'userList',
        component: UserListComponent,
        data: {
          breadcrumb: '用户列表',
          keep: true
        }
      },
      {
        path: 'usersList',
        component: UsersListComponent,
        data: {
          breadcrumb: '用户组列表',
          keep: true
        }
      },
    ],
    data: {
      breadcrumb: '用户管理'
    }
  },
  {
    path: 'enterFurnace',
    component: EnterFurnaceComponent,
    data: {
      breadcrumb: '入炉记录'
    },
    children: [
      {
        path: '',
        redirectTo: 'furnaceList',
        pathMatch: 'full'
      },
      {
        path: 'furnaceList',
        component: FurnaceListComponent,
        data: {
          breadcrumb: '入炉作业清单',
          keep: true
        },
      },
      {
        path: 'operation/:id',
        component: FurnaceOperationComponent,
        data: {
          breadcrumb: '入炉作业操作'
        }
      }
    ]
  },
  {
    path: 'takeFurnace',
    component: TakeFurnaceComponent,
    data: {
      breadcrumb: '出炉记录'
    },
    children: [
      {
        path: '',
        redirectTo: 'furnaceList',
        pathMatch: 'full'
      },
      {
        path: 'furnaceList',
        component: FurnaceListComponent,
        data: {
          breadcrumb: '出炉作业清单',
          keep: true
        },
      },
      {
        path: 'operation/:id',
        component: FurnaceOperationComponent,
        data: {
          breadcrumb: '出炉作业操作'
        }
      }
    ],
  },
  {
    path: 'entryRecord',
    component: EntryRecordComponent,
    data: {
      breadcrumb: '入厂记录',
      keep: true
    }
  },
  {
    path: 'configuration',
    component: ConfigurationManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'numberManage',
        pathMatch: 'full'
      },
      {
        path: 'numberManage',
        component: NumberManagementComponent,
        data: {
          breadcrumb: '轧辊货号管理',
          keep: true
        }
      },
      {
        path: 'craftManage',
        component: CraftManagementComponent,
        data: {
          breadcrumb: '工艺管理',
          keep: true
        }
      },
      {
        path: 'addCraft',
        component: AddCraftComponent,
        data: {
          breadcrumb: '添加工艺'
        }
      },
      {

        path: 'addCraft/:craftId',
        component: AddCraftComponent,
        data:
        {
          breadcrumb: '添加工艺'
        }
      },
      {

        path: 'seeCraft/:craftId',
        component: AddCraftComponent,
        data:
        {
          breadcrumb: '查看工艺'
        }
      },
      {
        path: 'deviceProduct',
        component: DeviceProductManagementComponent,
        data: {
          breadcrumb: '设备管理-生产设备',
          keep: true
        }
      },
      {
        path: 'deviceMonitor',
        component: DeviceMonitorManagementComponent,
        data: {
          breadcrumb: '设备管理-监测设备',
          keep: true
        }
      },
      {
        path: 'modifyLog',
        component: ModificationLogComponent,
        data: {
          breadcrumb: '修改日志',
          keep: true
        }
      }
    ],
    data: {
      breadcrumb: '系统配置管理'
    }
  },
  // 4.装炉计划
  {
    path: 'chargingPlan',
    component: ChargingPlanModuleComponent,
    data: {
      breadcrumb: '装炉计划'
    },
    children: [
      {
        path: '',
        redirectTo: 'planList',
        pathMatch: 'full'
      },
      {
        path: 'planList',
        component: PlanListComponent,
        data: {
          breadcrumb: '装炉计划列表',
          keep: true
        }
      },
      {
        path: 'chargingSchedule/:fid',
        component: ChargingScheduleComponent,
        data: {
          breadcrumb: '装炉计划明细表'
        }
      },
      {
        path: 'addNewPlan/:fid',
        component: AddNewPlanComponent,
        data: {
          breadcrumb: '编辑装炉计划'
        }
      },
      {
        path: 'addAllPlan/:fid',
        component: AddPlanCraftComponent,
        data: {
          breadcrumb: '编辑装炉计划'
        }
      },
      {
        path: 'editAllPlan/:fid',
        component: EditPlanComponent,
        data: {
          breadcrumb: '编辑装炉计划'
        }
      },
      {
        path: 'lookPlan/:fid',
        component: PlanInfoMsgComponent,
        data: {
          breadcrumb: '查看装炉计划'
        }
      },
    ]
  },
  // 9.出厂管理
  {
    path: 'factoryRecrod',
    component: FactoryManagementComponent,
    data: {
      breadcrumb: '出厂管理'
    },
    children: [
      {
        path: '',
        component: CompletedRecordsComponent,
        data: {
          breadcrumb: '完成记录',
          keep: true
        }
      },
      {
        path: 'completedRecrodsList',
        component: CompletedRecordsComponent,
        data: {
          breadcrumb: '完成记录',
          keep: true
        }
      },
      {
        path: 'rollRecrodsList',
        component: RollsRecordsComponent,
        data: {
          breadcrumb: '转辊记录',
          keep: true
        }
      },
    ]
  },
  {
    path: 'qiManagement',
    component: QualityInspectionManagementComponent,
    data: {
      breadcrumb: '自检管理'
    },
    children: [
      {
        path: '',
        redirectTo: 'beforeSelfTest',
        pathMatch: 'full'
      },
      {
        path: 'beforeSelfTest',
        component: BeforeSelfTestComponent,
        data: {
          breadcrumb: '热前自检',
          keep: true
        },
      },
      {
        path: 'afterSelfTest',
        component: BeforeSelfTestComponent,
        data: {
          breadcrumb: '热后自检',
          keep: true
        },
      },
    ]
  },
  {
    path: 'qiManagement',
    component: QualityInspectionManagementComponent,
    data: {
      breadcrumb: '质检管理'
    },
    children: [
      {
        path: '',
        redirectTo: 'beforeQuality',
        pathMatch: 'full'
      },
      {
        path: 'beforeQuality',
        component: BeforeQualityComponent,
        data: {
          breadcrumb: '热前质检',
          keep: true
        },
      },
      {
        path: 'afterQuality',
        component: BeforeQualityComponent,
        data: {
          breadcrumb: '热后质检',
          keep: true
        },
      },
    ]
  },
  {
    path: 'qiManagement',
    component: QualityInspectionManagementComponent,
    data: {
      breadcrumb: '不合格品管理'
    },
    children: [
      {
        path: '',
        redirectTo: 'beforeUnqualified',
        pathMatch: 'full'
      },
      {
        path: 'beforeUnqualified',
        component: BeforeUnqualifiedComponent,
        data: {
          breadcrumb: '热前不合格品',
          keep: true
        },
      },
      {
        path: 'afterUnqualified',
        component: BeforeUnqualifiedComponent,
        data: {
          breadcrumb: '热后不合格品',
          keep: true
        },
      },
    ]
  },
  {
    path: 'heatTreat/history',
    component: HeatTreatmentHistoryComponent,
    data: {
      breadcrumb: '热处理过程记录'
    },
  },
  {
    path: 'heatTreatment',
    component: RouteTransferComponent,
    data: {
      breadcrumb: '热处理过程管理'
    },
    children: [
      {
        path: '',
        component: HeatTreatmentComponent,
        data: {
          breadcrumb: ''
        },
      },
      // {
      //   path: 'history',
      //   component: HeatTreatmentHistoryComponent,
      //   data: {
      //     breadcrumb: '热处理过程记录'
      //   },
      // },
      {
        path: ':id',
        component: RouteTransferComponent,
        data: {
          breadcrumb: '热处理过程监控详情'
        },
        children: [
          {
            path: '',
            component: HeatTreatmentDetailComponent,
            data: {
              breadcrumb: ''
            },
          },
          {
            path: 'seeCraft/:craftId',
            component: AddCraftComponent,
            data:
            {
              breadcrumb: '查看工艺'
            }
          },
        ]
      },
    ]
  },
  {
    path: 'normalizingCooling',
    component: NormalizingCoolingComponent,
    children: [
      {
        path: '',
        redirectTo: 'cooling',
        pathMatch: 'full'
      },
      {
        path: 'cooling',
        component: CoolingComponent,
        data: {
          breadcrumb: '炉外正火冷却',
          keep: true
        }
      },
      {
        path: 'coolingHistoryRecord',
        component: CoolingHistoryRecordComponent,
        data: {
          breadcrumb: '正火冷却历史记录',
          keep: true
        }
      }
    ],
    data: {
      breadcrumb: '炉外正火冷却'
    }
  },
  {
    path: 'report',
    component: RouteTransferComponent,
    data: {
      breadcrumb: '数据报表'
    },
    children: [
      {
        path: '',
        redirectTo: 'output',
        pathMatch: 'full'
      },
      {
        path: 'output',
        component: OutputDataComponent,
        data: {
          breadcrumb: '产量统计表'
        },
      },
      {
        path: 'inProduction',
        component: InProductionDataComponent,
        data: {
          breadcrumb: '在制统计表'
        },
      },
      {
        path: 'costAccounting',
        component: CostAccountingDataComponent,
        data: {
          breadcrumb: '成本核算表'
        },
      }
    ]
  }
];
