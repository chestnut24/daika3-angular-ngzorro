import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit {
    data; // 表格数据
    expandDataCache = {};
    constructor(private userService: UserService) { }

  ngOnInit() {
      this.userService.getStructure().subscribe(data => {
          this.recursionData(data);
          this.data = [data];
          console.log('------->', this.data);
          this.data.forEach(item => {
              this.expandDataCache[ item.id ] = this.convertTreeToList(item);
          });
      });
  }

    recursionData(data) {
        if (data.children && data.children.length > 0) {
            if (data.users && data.users.length > 0) {
                data.children = data.users.concat(data.children);
            }
            data.children.forEach(item => {
                this.recursionData(item);
            });
        } else if (data.users && data.users.length > 0) {
            data.children = data.users;
            data.children.forEach(item => {
                this.recursionData(item);
            });
        } else {
            data.children = [];
        }
    }

    collapse(array, data, $event: boolean): void {
        if ($event === false) {
            if (data.children) {
                data.children.forEach(d => {
                    const target = array.find(a => a.id === d.id);
                    target.expand = false;
                    this.collapse(array, target, false);
                });
            } else {
                return;
            }
        }
    }

    convertTreeToList(root: object) {
        const stack = [];
        const array = [];
        const hashMap = {};
        stack.push({ ...root, level: 0, expand: false });
        while (stack.length !== 0) {
            const node = stack.pop();
            this.visitNode(node, hashMap, array);
            if (node.children) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push({ ...node.children[ i ], level: node.level + 1, expand: false, parent: node });
                }
            }
        }
        return array;
    }

    visitNode(node, hashMap: object, array): void {
        //     hashMap[ node.id.id ] = true;
            array.push(node);
        // }
    }


    toNodeName(level) {
        switch (level) {
            case   0: return '一层';
            default: return this.SectionToChinese(level + 1) + '层';
        }
    }

    SectionToChinese(num) {
        const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        const str = num.toString();
        let returnNum = '无';
        const length = str.length;
        if (length === 1) {
            returnNum = chnNumChar[Number(str[0])];
        }
        if (length === 2) {
            returnNum = (str[0] === '1' ? '' : chnNumChar[Number(str[0])]) + '十' + (str[1] === '0' ? '' : chnNumChar[Number(str[1])]);
        }
        return returnNum;
    }
}
