import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {UserType} from '../../../../../public/interface/user';
import {userTypeName} from '../../../../../public/types';

@Component({
    selector: 'app-add-users',
    templateUrl: './add-users.component.html',
    styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
    @Input() dataSource: any;
    profileForm: FormGroup;
    // falseData = {
    //     'powerArea': ['一号炉'],
    //     'groupName': '1111111111',
    //     'powerType': '系统操作员',
    //     'remarks': '513↵5214',
    //     'team': '22222222222',
    // };
    falseOpt = ['一号炉', '二号炉', '三号炉'];
    authority = [
        // { value: UserType.ADMINISTRATOR, label: userTypeName[UserType.ADMINISTRATOR] },
        { value: UserType.OPERATOR, label: userTypeName[UserType.OPERATOR] },
        { value: UserType.SPEC_OPERATOR, label: userTypeName[UserType.SPEC_OPERATOR] },
        { value: UserType.VISITOR, label: userTypeName[UserType.VISITOR] }
    ];
    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.profileForm = this.fb.group(
            {
                groupName: [null, [Validators.required]],
                team: [null, [Validators.required]],
                powerType: [null, [Validators.required]],
                powerArea: [null, [Validators.required]],
                remarks: ['']
            }
        );
        this.profileForm.patchValue(this.dataSource);

    }

}
