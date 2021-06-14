import { Injectable } from '@angular/core';
import { Menu, MenuItem } from '../public/menu';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

const userInformation = new Menu('用户管理', 'iconfont icon-zu3', '/users', [
  new Menu('用户列表', 'dashboard', '/users/userList'),
  new Menu('角色列表', 'dashboard', '/users/roleList'),
  new Menu('用户组列表', 'dashboard', '/users/usersList'),
  // new Menu('查看组织结构', 'dashboard', '/users/structure'),
]);
const rollDetail = new Menu('轧辊明细', 'iconfont icon-zu', '/rollDetail', [
  new Menu('轧辊明细表', 'dashboard', '/rollDetail/rollDetailForm'),
  // new Menu('轧辊履历', 'dashboard', '/rollDetail/rollResume/entry'),
]);
const entryRecord = new Menu('入厂记录', 'iconfont icon-zu4', '/entryRecord');

// const qualityInspectionManagement = new Menu('质检管理', 'iconfont icon-zu1', '/qiManagement', [
//   new Menu('热前自检', '', '/qiManagement/beforeSelfTest', []),
//   new Menu('热前质检', '', '/qiManagement/beforeQuality', []),
//   new Menu('热前不合格品', '', '/qiManagement/beforeUnqualified', []),
//   new Menu('热后自检', '', '/qiManagement/afterSelfTest', []),
//   new Menu('热后质检', '', '/qiManagement/afterQuality', []),
//   new Menu('热后不合格品', '', '/qiManagement/afterUnqualified', []),
// ]);
const selfCheckPage = new Menu('自检管理', 'iconfont icon-zu16', '/qiManagementA', [
  new Menu('热前自检', '', '/qiManagement/beforeSelfTest', []),
  new Menu('热后自检', '', '/qiManagement/afterSelfTest', []),
]);
const qualityPage = new Menu('质检管理', 'iconfont icon-zu18', '/qiManagementB', [
  new Menu('热前质检', '', '/qiManagement/beforeQuality', []),
  new Menu('热后质检', '', '/qiManagement/afterQuality', []),
]);
const ngPage = new Menu('不合格品管理', 'iconfont icon-zu17', '/qiManagementC', [
  new Menu('热前不合格品', '', '/qiManagement/beforeUnqualified', []),
  new Menu('热后不合格品', '', '/qiManagement/afterUnqualified', []),
]);
// const chargingPlan = new Menu('装炉计划', 'profile', '/chargingPlan', [
//   new Menu('装炉计划', '', '/chargingPlan/planList', []),
//   new Menu('装炉计划明细表', '', '/chargingPlan/chargingSchedule', []),
//   new Menu('新增计划', '', '/chargingPlan/addNewPlan', []),
// ]);
const chargingPlan = new Menu('装炉计划', 'iconfont icon-zu9', '/chargingPlan');
const chargingOperation = new Menu('入炉记录', 'iconfont icon-zu2', '/enterFurnace', [
  new Menu('入炉作业清单', '', '/enterFurnace/furnaceList', []),
]);
const heatTreatment = new Menu('热处理', 'iconfont icon-zu5', '/heatTreatment', [
  new Menu('热处理过程管理', '', '/heatTreatment', []),
  new Menu('热处理过程记录', '', '/heatTreat/history', []),
  // history
  // new Menu('热处理过程监控详情', '', '/dataReport/qir', []),
]);
const ovenOperation = new Menu('出炉记录', 'iconfont icon-zu13', '/takeFurnace', [
  new Menu('出炉作业清单', '', '/takeFurnace/furnaceList', []),
]);
const normalizingCoolingOutsideTheFurnace = new Menu('炉外正火冷却', 'iconfont icon-zu12', '/overvie', [
  new Menu('炉外正火冷却', '', '/normalizingCooling/cooling', []),
  new Menu('正火冷却历史记录', '', '/normalizingCooling/coolingHistoryRecord', []),
]);
const factoryManagement = new Menu('出厂管理', 'iconfont icon-zu14', '/factoryRecrod', [
  new Menu('完成记录', '', '/factoryRecrod/completedRecrodsList', []),
  new Menu('转辊记录', '', '/factoryRecrod/rollRecrodsList', []),
]);
const systemConfiguration = new Menu('系统配置管理', 'iconfont icon-zu15', '/configuration', [
  new Menu('轧辊货号管理', 'iconfont icon-zu7', '/configuration/numberManage', []),
  new Menu('工艺管理', 'iconfont icon-zu10', '/configuration/craftManage', []),
  // new Menu('添加工艺', '', '/configuration/addCraft', []),
  new Menu('设备管理-生产设备', 'iconfont icon-zu8', '/configuration/deviceProduct', []),
  new Menu('设备管理-监测设备', 'iconfont icon-zu8', '/configuration/deviceMonitor', []),
  new Menu('修改日志', 'iconfont icon-zu11', '/configuration/modifyLog', []),
]);
const dataReport = new Menu('报表', 'iconfont icon-zu6', '/report', [
  new Menu('产量统计表', '', '/report/output', []),
  new Menu('在制统计表', '', '/report/inProduction', []),
  new Menu('成本核算表', '', '/report/costAccounting', []),
]);

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public fullScreen = false;
  constructor(private user: UserService) { }

  getMenu(): Observable<Menu[]> {
    // tslint:disable-next-line: max-line-length
    // return of([userInformation, rollDetail, entryRecord, qualityInspectionManagement, chargingPlan, chargingOperation, heatTreatment, ovenOperation, normalizingCoolingOutsideTheFurnace, factoryManagement, dataReport, systemConfiguration]);
    return this.user.getCurrentUser().pipe(map(userInfo => {
      const menuArr = {};
      const pageMenu = [];
      const nameArr = [
        { name: '用户管理页面权限', value: userInformation },
        { name: '轧辊明细', value: rollDetail },
        { name: '入厂记录页面权限', value: entryRecord },
        // {name: '质检管理页面权限', value: qualityInspectionManagement},
        { name: '自检管理页面', value: selfCheckPage },
        { name: '质检管理页面', value: qualityPage },
        { name: '不合格品页面', value: ngPage },
        { name: '装炉计划页面权限', value: chargingPlan },
        { name: '入炉作业页面权限', value: chargingOperation },
        { name: '热处理页面权限', value: heatTreatment },
        { name: '出炉作业页面权限', value: ovenOperation },
        { name: '炉外正火冷却页面权限', value: normalizingCoolingOutsideTheFurnace },
        { name: '出厂管理页面权限', value: factoryManagement },
        { name: '系统配置页面', value: systemConfiguration },
        { name: '报表页面权限', value: dataReport },
      ];
      nameArr.forEach(menu => {
        userInfo.role.accesses.forEach(item => {
          if (!menuArr[menu.name] && item.name.indexOf(menu.name) !== -1) {
            menuArr[menu.name] = menu.value;
            pageMenu.push(menu.value);
          }
        });
      });
      return pageMenu;
    }));
  }
  getFirstPage() {
    return this.user.getCurrentUser().pipe(map(userInfo => {
      const menuArr = {};
      const pageMenu = [];
      const nameArr = [
        { name: '用户管理页面权限', url: '/users/userList' },
        { name: '轧辊明细', url: '/rollDetail/rollDetailForm' },
        { name: '入厂记录页面权限', url: '/entryRecord' },
        // {name: '质检管理页面权限', value: qualityInspectionManagement},
        { name: '自检管理页面', url: '/qiManagement/beforeSelfTest' },
        { name: '质检管理页面', url: '/qiManagement/beforeQuality' },
        { name: '不合格品页面', url: '/qiManagement/beforeUnqualified' },
        { name: '装炉计划页面权限', url: '/chargingPlan' },
        { name: '入炉作业页面权限', url: '/enterFurnace/furnaceList' },
        { name: '热处理页面权限', url: '/heatTreatment' },
        { name: '出炉作业页面权限', url: '/takeFurnace/furnaceList' },
        { name: '炉外正火冷却页面权限', url: '/normalizingCooling/cooling' },
        { name: '出厂管理页面权限', url: '/factoryRecrod/completedRecrodsList' },
        { name: '系统配置页面', url: '/configuration/numberManage' },
        { name: '报表页面权限', url: '/report/output' },
      ];
      nameArr.forEach(menu => {
        userInfo.role.accesses.forEach(item => {
          if (!menuArr[menu.name] && item.name.indexOf(menu.name) !== -1) {
            menuArr[menu.name] = menu.url;
            pageMenu.push(menu.url);
          }
        });
      });
      return pageMenu[0];
    }));
  }
}
