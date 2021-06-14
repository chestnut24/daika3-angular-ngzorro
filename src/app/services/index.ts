import {MenuService} from './menu.service';
import {AuthService} from './auth.service';
import {DataReportService} from './data-report.service';
import {UserService} from './user.service';
import {DelongTableService} from './delong-table.service';
import {ConfigurationManagementService} from './configuration-management.service';
import {HeatTreatmentService} from './heat-treatment.service';

export const SERVICES = [
  MenuService,
  AuthService,
  DataReportService,
  UserService,
  DelongTableService,
  ConfigurationManagementService,
  HeatTreatmentService
];
