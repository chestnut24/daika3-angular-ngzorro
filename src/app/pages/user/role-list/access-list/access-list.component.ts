import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-access-list',
  templateUrl: './access-list.component.html',
  styleUrls: ['./access-list.component.scss']
})
export class AccessListComponent implements OnInit {
  @Input() accesses;
  @Input() accessList;
  @Input() isDisable: boolean;
  @Output() accessesChange = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    const accessIds = [];
    if (this.accesses) {
        this.accesses.forEach(item => {
            accessIds.push(item.id);
        });
        // console.log(accessIds)

    }
    this.accesses = accessIds;
    setTimeout(() => {
        this.accessesChange.emit(this.accesses);
    });
  }
    isTrue(id): boolean {
      if (this.accesses !== []) {
          return this.accesses.indexOf(id) !== -1;
      } else {
          return false;
      }
    }
    checkChange(id): void {
        this.isTrue(id) ? this.accesses.splice(this.accesses.indexOf(id), 1)
            : this.accesses.push(id);
        this.accessesChange.emit(this.accesses);
    }
}
