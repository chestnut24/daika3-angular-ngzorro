import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-up-pass-word',
    templateUrl: './up-pass-word.component.html',
    styleUrls: ['./up-pass-word.component.scss']
})
export class UpPassWordComponent implements OnInit {

    userMsg;
    gridStyle = {
        width: '100%',
        textAlign: 'center'
    };

    ModalTitle = 1;
    isVisible = false;
    sendData = '';
    isConfirmLoading = false;

    constructor(
        private user: UserService,
        private messageService: NzMessageService
    ) { }

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        this.user.getCurrentUser().subscribe(data => {
            this.userMsg = data;
        });
    }
    upPass(num) {
        this.ModalTitle = num;
        this.isVisible = true;
    }
    handleCancel() {
        this.isVisible = false;
        this.sendData = '';
    }
    handleOk() {
        this.isConfirmLoading = true;
        let cci = {
            id: this.userMsg.id,
            name: this.userMsg.name,
            staffNo: this.userMsg.staffNo,
            phone: this.userMsg.phone,
            roleId: this.userMsg.role.id,
            password: this.userMsg.password,
            remark: this.userMsg.remark,
            post: this.userMsg.post,
            avatar: '',
        };
        if (this.ModalTitle === 1) {
            cci.password = this.sendData;
            if (this.sendData.length > 16 || this.sendData.length < 6) {
                this.messageService.create('error', '密码应该在6-16位之间');
                this.isConfirmLoading = false;
                return false;
            }
        } else if (this.ModalTitle === 2) {
            cci.phone = this.sendData;
            if (this.sendData.length !== 11) {
                this.messageService.create('error', '请输入正确的手机号');
                this.isConfirmLoading = false;
                return false;
            }
        }
        this.user.modifyUser(cci).subscribe(success => {
            this.messageService.create('success', `修改成功`);
            this.getUser();
            this.isConfirmLoading = false;
            this.isVisible = false;
            this.sendData = '';
        }, error => {
            this.messageService.create('error', `修改失败 ${error.error.message}`);
            this.isConfirmLoading = false;
        });
    }
}
