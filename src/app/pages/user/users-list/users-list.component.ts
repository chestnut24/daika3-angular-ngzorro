import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { UsersModalComponent } from './users-modal/users-modal.component';
import { Router } from '@angular/router';
import { Customer } from '../../../public/interface/user';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
    dataSet: Customer[];
    indeterminate = false;
    allChecked = false;
    checkedNumber = 0;
    selectedIds: string[] = [];
    tableTotal = 0;
    pageNum = 1;
    pageSize = 10;
    searchText = '';
    text;
    timer;
    levelArr = [];
    isLoading = true; // 菜单是否加载中
    hasRoot = false; // 是否禁用 设为根节点
    isRoot = false; // 是否选中
    isRootForhtml;

    routerWata = {
        searchParams: { searchText: '' },
        pageNum: 1,
        pageSize: 10,
    };

    constructor(private userService: UserService,
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private router: Router) { }

    ngOnInit() {
        this.InitTable(false);
    }

    InitTable(isRefresh) {
        isRefresh ? this.pageNum = 1 : null;
        this.dataSet = [];
        this.userService.getCustomersList({
            pageNum: this.pageNum - 1,
            pageSize: this.pageSize,
            searchText: this.searchText,
        }).subscribe(data => {
            this.dataSet = data.content;
            this.tableTotal = data.totalElements;
            this.refreshStatus();
        });
    }

    pageChange() {
        this.routerWata = {
            searchParams: { searchText: this.searchText },
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

    onClose(userId: string, data): void {
        data.users.splice(userId, 1);
        this.userService.modifyCustomer({
            id: data.id,
            name: data.name,
            group: data.group,
            userIds: data.users.map(item => item.id),
            remark: data.remark,
            parentId: data.parentId
        }).subscribe(success => {
            this.messageService.create('success', '删除成功');
            this.InitTable(true);
        }, error => {
            this.messageService.create('error', `删除失败 ${error.error.message}`);
        });
    }

    batchDelete() {
        this.selectedIds.length > 0 ? this.deleteCustomers(this.selectedIds) : null;
    }

    deleteCustomer(idList: string[]) {
        this.deleteCustomers(idList);
    }

    deleteCustomers(idList: string[]) {
        this.modalService.confirm({
            nzTitle: '删除用户组',
            nzContent: `<span style="color:red">用户组删除后将不可恢复</span>`,
            nzOkText: '删除',
            nzOkType: 'danger',
            nzIconType: 'exclamation-circle',
            nzOnOk: () => {
                this.userService.deleteCustomers(idList).subscribe(success => {
                    this.messageService.create('success', '删除成功');
                    this.InitTable(true);
                }, error => {
                    this.messageService.create('error', '删除失败');
                });
            },
            nzCancelText: '取消',
            nzOnCancel: () => { },
        });
    }

    modifyCustomer(customers): void {
        this.createCustomerModal('修改' + customers.name, customers, false);
    }

    addCustomer(): void {
        this.createCustomerModal('新建用户组', { id: null, name: null, group: null, users: null, remark: null }, false);
    }

    addUser(customers: Customer): void {
        this.createCustomerModal('新增用户 至 ' + customers.name, customers, true);
    }

    createCustomerModal(title: string, customers: Customer, onlyOne: boolean): void {
        let showload = false;
        const modal = this.modalService.create({
            nzTitle: title,
            nzWidth: '700px',
            nzComponentParams: {
                customers,
                onlyOne
            },
            nzContent: UsersModalComponent,
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
                    disabled: (contentComponentInstance) => !contentComponentInstance.usersTableModal.valid,
                    onClick: (contentComponentInstance) => {
                        showload = true;
                        const cci = contentComponentInstance;
                        this.userService.modifyCustomer({
                            id: customers.id,
                            name: cci.usersTableModal.value.name,
                            group: cci.usersTableModal.value.group,
                            userIds: cci.usersTableModal.value.users,
                            remark: cci.usersTableModal.value.remark,
                            parentId: customers.parentId
                        }).subscribe(success => {
                            this.messageService.create('success', title.indexOf('修改') !== -1 ? '修改成功' : '新建成功');
                            this.InitTable(true);
                            showload = false;
                            modal.destroy();
                        }, error => {
                            this.messageService.create('error', title.indexOf('修改') !== -1 ? '修改失败' : '新建失败');
                            showload = false;
                        });
                    }
                }
            ]
        });
    }
    routerLink(url) {
        this.router.navigate([url]);
    }

    manageLevel(parent) {
        this.isLoading = true;
        this.userService.getNextLevelList(parent.id).subscribe(data => {
            this.hasRoot = data.hasRoot;
            this.isRoot = parent.parentId ? parent.parentId.id === '0' : false;
            this.isRootForhtml = this.isRoot;
            this.levelArr = data.customerList;
            if (this.levelArr) {
                this.levelArr.forEach(item => {
                    item.isChoose = item.parentId ? parent.id === item.parentId : false;
                });
            }
            this.isLoading = false;
        });

    }

    saveLevel(level, data) {
        this.userService.manageLevel({
            isRoot: this.isRoot,
            customerId: data.id,
            childIds: this.levelArr.filter(item => item.isChoose).map(item => item.id),
        }).subscribe(() => {
            this.messageService.create('success', '保存成功');
            this.InitTable(true);
        }, error => {
            this.messageService.create('error', `保存失败 ${error.error.message}`);
        });
    }

    clearStructure() {
        this.modalService.confirm({
            nzTitle: '删除组织结构',
            nzContent: `<span style="color:red">确定要删除组织结构吗</span>`,
            nzOkText: '删除',
            nzOkType: 'danger',
            nzIconType: 'exclamation-circle',
            nzOnOk: () => {
                this.userService.clearStructure().subscribe(success => {
                    this.messageService.create('success', '清除成功');
                }, error => {
                    this.messageService.create('error', `清除失败 ${error.error.message}`);
                });
            },
            nzCancelText: '取消',
            nzOnCancel: () => { },
        });

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
