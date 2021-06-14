import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-batch-delete',
    templateUrl: './batch-delete.component.html',
    styleUrls: ['./batch-delete.component.scss']
})
export class BatchDeleteComponent implements OnInit {
    @Input() checkedNumber;
    @Output() batchDelete = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }
    delete() {
        this.batchDelete.emit();
    }
}
