import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
    dataSet: any = [];
    indeterminate = false;
    allChecked = false;
    checkedNumber = 0;
    accessList: any;
    selectedIds: string[] = [];

    tableTotal = 0;
    pageNum = 1;
    pageSize = 10;
    searchText = '';
    text = '';
    timer;

    routerWata = {
        searchParams: {
            searchText: '',
        },
        pageNum: 1,
        pageSize: 10,
    };

    constructor(private userService: UserService,
        private modalService: NzModalService,
        private messageService: NzMessageService) { }

    ngOnInit() {
        this.InitTable(false);
    }

    InitTable(isRefresh) {
        isRefresh ? this.pageNum = 1 : null;
        this.userService.getRoleList({
            pageNum: this.pageNum - 1,
            pageSize: this.pageSize,
            searchText: this.searchText,
        }).subscribe(data => {
            
            this.tableTotal = data.totalElements;
            this.userService.getAccessesList().subscribe(accessList => {
                this.accessList = accessList;
                data.content.forEach(item => {
                    const powerArr = [];
                    if (item.accesses) {
                        item.accesses.forEach(id => {
                            this.accessList.forEach(access => {
                                access.children.forEach(children => {
                                    // console.log(children.id.id ,'=== ',id.id.id)
                                    if (children.id === id.id) {
                                        if (powerArr.indexOf(access.name) === -1) {
                                            powerArr.push(access.name);
                                        }
                                    }
                                });
                            });
                        });
                    }
                    item.power = powerArr.join(',');
                });
            });
            this.dataSet = data.content;
            this.refreshStatus();
        });
    }

    pageChange() {
        this.routerWata = {
            searchParams: { searchText: this.searchText, },
            pageNum: this.pageNum,
            pageSize: this.pageSize,
        };
    }

    init(val) {
        let data = JSON.parse(val);
        this.searchText = data.searchParams.searchText;
        this.pageNum = data.pageNum;
        this.pageSize = data.pageSize;
        this.InitTable(false);
    }


    refreshStatus(): void {
        this.selectedIds = [];
        const allChecked = this.dataSet.every(value => value.checked === true);
        const allUnChecked = this.dataSet.every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.checkedNumber = this.dataSet.filter(value => value.checked).length;
        this.dataSet.forEach(item => {
            if (item.checked) {
                this.selectedIds.push(item.id);
            }
        });
    }
    checkAll(value: boolean): void {
        this.dataSet.forEach(data => data.checked = value);
        this.refreshStatus();
    }
    batchDelete(): void {
        this.selectedIds.length > 0 ? this.deleteRoles(this.selectedIds) : null;
    }

    createModule(id, title, name, remark, accesses): void {
        let showload = false;
        const modal = this.modalService.create({
            nzTitle: title,
            nzWidth: '900px',
            nzComponentParams: {
                accesses,
                accessList: this.accessList,
                roleName: name,
                remark,
            },
            nzContent: RoleModalComponent,
            nzFooter: [
                {
                    label: '取消',
                    shape: 'default',
                    onClick: () => modal.destroy()
                },
                {
                    label: '确定',
                    type: 'primary',
                    loading: () => showload,
                    disabled: (contentComponentInstance) => !contentComponentInstance.roleTableModal.valid,
                    onClick: (contentComponentInstance) => {
                        showload = true;
                        const cci = contentComponentInstance;
                        if (cci.accesses > 0 && cci.accesses[0].id) {
                            cci.accesses = cci.accesses.map(item => item.id);
                        }
                        console.log(cci.accesses);

                        this.userService.modifyRole(id, cci.roleTableModal.value.roleName, cci.accesses, cci.roleTableModal.value.remark)
                            .subscribe(() => {
                                this.messageService.create('success', `${title}成功`);
                                this.InitTable(true);
                                showload = false;
                                modal.destroy();
                            }, (error) => {
                                this.messageService.create('error', `${title}失败 ${error.error.message}`);
                                showload = false;
                            });
                    }
                }
            ]
        });
    }
    addRole(): void {
        this.createModule(null, '新增角色', null, null, []);
    }

    modifyRole(id, title, name, remark, accesses): void {
        this.createModule(id, title, name, remark, accesses);
    }

    deleteRoles(ids) {
        this.modalService.confirm({
            nzTitle: '删除角色',
            nzContent: `<span style="color:red">角色删除后将不可恢复</span>`,
            nzOkText: '删除',
            nzOkType: 'danger',
            nzIconType: 'exclamation-circle',
            nzOnOk: () => {
                this.userService.deleteRoles(ids).subscribe(() => {
                    this.messageService.create('success', '删除成功');
                    this.InitTable(true);
                }, () => {
                    this.messageService.create('error', '删除失败');
                });
            },
            nzCancelText: '取消',
            nzOnCancel: () => { },
        });

    }

    search(): void {
        this.InitTable(true);
    }

    setTimer() {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            if (this.text === this.searchText) {
                this.InitTable(true);
                this.pageChange();
            }
        }, 500);
    }

    keyUpSearch() {
        this.text = this.searchText;
        this.setTimer();
    }
}
