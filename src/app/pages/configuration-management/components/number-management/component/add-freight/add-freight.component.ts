import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Freight} from '../../../../../../public/interface/configuration-management';

@Component({
  selector: 'app-add-freight',
  templateUrl: './add-freight.component.html',
  styleUrls: ['./add-freight.component.scss']
})
export class AddFreightComponent implements OnInit {
  @Input() freight: Freight;
  @Input() hidePassword: boolean;
  freightForm: FormGroup;
  constructor(
      private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.freightForm = this.fb.group(
        {
          freightNumber: [this.freight.freightNumber, [ Validators.required ]],
          material: [this.freight.material, [ Validators.required ]],
          materialCode: [this.freight.materialCode, [ Validators.required ]],
          size: [this.freight.size, [ Validators.required, this.confirmNetWeight]],
          netWeight: [this.freight.netWeight, [ Validators.required, this.confirmSize]],
          productionUnit: [this.freight.productionUnit, [ Validators.required ]],
          client: [this.freight.client, [ Validators.required ]],
          bodyHardness: [this.freight.bodyHardness, [ Validators.required ]],
          neckHardness: [this.freight.neckHardness, [ Validators.required ]],
        }
    );
  }

  private confirmNetWeight(control: FormControl): { [ key: string ]: boolean} {
      if (!control.value) {  // 如果输入为空则返回空，相当于去空格
          return null;
      }
      if (!/^\d+\*\d+\*\d+$/.test(control.value)) {
          return { weightError: true};
      }
      return null;
  }
  private confirmSize(control: FormControl): { [ key: string ]: boolean} {
      if (!control.value) {  // 如果输入为空则返回空，相当于去空格
          return null;
      }
      if (!/^\d+(\.\d+)?$/.test(control.value)) {
          return { sizeError: true};
      }
      return null;
  }

}
