import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfigurationManagementService } from '../../../../services/configuration-management.service';
import { Freight } from '../../../../public/interface/configuration-management';
import { EntryRecord, SelfCheck } from '../../../../public/interface/entry-record';
import { UserService } from '../../../../services/user.service';
import { SearchConfig } from '../../../../public/interface/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IsExempt } from '../../../../public/interface/quality-inspection-management';
import { SelfCheckingComponent } from '../../../../public/components/self-checking/self-checking.component';


@Component({
    selector: 'app-add-record',
    templateUrl: './add-record.component.html',
    styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent implements OnInit {
    @Input() freight: EntryRecord;
    @ViewChild(SelfCheckingComponent, { static: false }) selfcheck: SelfCheckingComponent;
    disabled = {
        canInput1: true,
        canInput2: false,
        canInput3: false,
        canInput4: false,
    };
    checkUser: string;
    hardnessUser: string;
    information: FormGroup;
    EntryRecord = { // 入厂记录
        // tslint:disable-next-line:triple-equals
        isBlank: false, // 是否毛坯 1是毛坯 0不是毛坯
        remark: '', // 备注
        exteriorCheck: '', // 外观检验
        hardnessCheck1: '', // 传端
        hardnessCheck2: '', // 1
        hardnessCheck3: '', // 2
        hardnessCheck4: '', // 3
        hardnessCheck5: '', // 4
        hardnessCheck6: '', // 5
        hardnessCheck7: '', // 非端
        unit1: 'HSD',
        unit11: 'HSD',
        unit2: 'HSD',
        isExempt: false,
        exemptReason: ''
    };
    itemList = [
        { title: '材质：', content: '材质' },
        { title: '材质代码：', content: '材质代码' },
        { title: '尺寸(mm)：', content: '直径*辊身长度*总长度' },
        { title: '净重(t)：', content: '净重' },
        { title: '生产单位：', content: '生产单位' },
        { title: '用户信息：', content: '用户信息' },
    ];
    menuList: Freight[] = [];
    submitUsers = [];
    getFreight: any = {
        pageNum: 0,
        pageSize: 9999,
    };
    searchParams: SearchConfig = {
        pageNum: 0,
        pageSize: 9999,
        searchText: ''
    };
    submitPlaceHolder = '请选择交送人';

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        console.log(control.value);
        if (!control.value) {
            return { required: true };
        } else if (control.value == 25) {

            return { confirm: true, error: true };
        }
        return {};
    };
    constructor(
        private configurationManagement: ConfigurationManagementService,
        private users: UserService,
        private fb: FormBuilder,
        private user: UserService
    ) {
    }
    ngOnInit() {
        this.EntryRecord.remark = this.freight.remark;
        this.EntryRecord.isBlank = this.freight.isBlank === 'YES';
        this.EntryRecord.exteriorCheck = this.freight.selfCheck.exteriorCheck;
        this.EntryRecord.hardnessCheck1 = this.freight.selfCheck.hardnessCheck1;
        this.EntryRecord.hardnessCheck2 = this.freight.selfCheck.hardnessCheck2;
        this.EntryRecord.hardnessCheck3 = this.freight.selfCheck.hardnessCheck3;
        this.EntryRecord.hardnessCheck4 = this.freight.selfCheck.hardnessCheck4;
        this.EntryRecord.hardnessCheck5 = this.freight.selfCheck.hardnessCheck5;
        this.EntryRecord.hardnessCheck6 = this.freight.selfCheck.hardnessCheck6;
        this.EntryRecord.hardnessCheck7 = this.freight.selfCheck.hardnessCheck7;
        this.EntryRecord.unit1 = this.freight.selfCheck.unit1 ? this.freight.selfCheck.unit1 : 'HSD';
        this.EntryRecord.unit2 = this.freight.selfCheck.unit2 ? this.freight.selfCheck.unit2 : 'HSD';
        this.EntryRecord.isExempt = this.freight.selfCheck.isExempt === IsExempt.YES;
        this.EntryRecord.exemptReason = this.freight.selfCheck.exemptReason;
        this.isBlank();
        this.configurationManagement.inquireFreight(this.getFreight).subscribe((data) => {
            this.menuList = data.content;
        });
        this.users.getUsersList(this.searchParams).subscribe((data) => {
            this.submitUsers = data.content;
        });
        this.information = this.fb.group(
            {
                itemNum: [this.freight.freight.freightNumber, [Validators.required]],
                // productNum: [this.freight.productNo, [Validators.required, this.confirmationValidator]],
                productNum: [this.freight.productNo, [Validators.required]],
                submitUser: [this.freight.submitUser.name, [Validators.required]],
            });
        this.itemList[0].content = this.freight.freight.material;
        this.itemList[1].content = this.freight.freight.materialCode;
        this.itemList[2].content = this.freight.freight.size;
        this.itemList[3].content = this.freight.freight.netWeight;
        this.itemList[4].content = this.freight.freight.productionUnit;
        this.itemList[5].content = this.freight.freight.client;
        this.Hardness0721 = {
            bodyHardness: this.freight.freight.bodyHardness,
            neckHardness: this.freight.freight.neckHardness,
        }
        if (this.freight.selfCheck.exteriorUserId === null) {
            this.checkUser = '';
        } else {
            this.user.getUser(this.freight.selfCheck.exteriorUserId.toString()).subscribe((data) => {
                this.checkUser = data.name;
            });
        }
        if (this.freight.selfCheck.hardnessUserId === null) {
            this.hardnessUser = '';
        } else {
            this.user.getUser(this.freight.selfCheck.hardnessUserId.toString()).subscribe((data) => {
                this.hardnessUser = data.name;
            });
        }
    }
    proNumShow = true;
    Hardness0721 = {
        bodyHardness: null,
        neckHardness: null,
    };
    showAttribute(itemNum: string) {
        // tslint:disable-next-line:one-variable-per-declaration
        const product: any = {
            pageNum: 0,
            pageSize: 9999,
            freightNumber: itemNum
        };
        this.configurationManagement.inquireFreight(product).subscribe(
            (data) => {
                this.itemList[0].content = data.content[0].material;
                this.itemList[1].content = data.content[0].materialCode;
                this.itemList[2].content = data.content[0].size;
                this.itemList[3].content = data.content[0].netWeight;
                this.itemList[4].content = data.content[0].productionUnit;
                this.itemList[5].content = data.content[0].client;
                this.Hardness0721 = {
                    bodyHardness: data.content[0].bodyHardness,
                    neckHardness: data.content[0].neckHardness,
                }
            }
        );
        this.proNumShow = false;
    }
    isBlank() {
        this.disabled.canInput1 = this.EntryRecord.isBlank;
        this.disabled.canInput2 = this.EntryRecord.isBlank;
        this.disabled.canInput3 = this.EntryRecord.isBlank;
        this.disabled.canInput4 = this.EntryRecord.isBlank;
    }

    ceshi(data) {
        console.log(data);
    }
}
