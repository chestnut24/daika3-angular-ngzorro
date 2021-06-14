import { Component, OnInit , Input} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent implements OnInit {
    @Input() accesses;
    @Input() accessList;
    @Input() roleName;
    @Input() remark;
    roleTableModal;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
      this.roleTableModal = this.fb.group({
          roleName: [null, [Validators.required]],
          remark: [null]
      });
      this.roleTableModal.patchValue({
          roleName: this.roleName,
          remark: this.remark,
      });
  }

}
