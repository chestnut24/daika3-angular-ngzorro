import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnterFurnaceService } from '../../../services/enter-furnace.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { DetailInquiry, Freights } from '../../interface/enter-furnace';

@Component({
  selector: 'app-furnace-diagram',
  templateUrl: './furnace-diagram.component.html',
  styleUrls: ['./furnace-diagram.component.scss']
})
export class FurnaceDiagramComponent implements OnInit {
  @Input() putOrTake = 'put'; // 控制炉子是出炉还是入炉 put是入炉 take是出炉
  @Input() readOnly = false; // 控制装炉显示是否只读，热处理时需要为true
  @Output() initData = new EventEmitter(); // 调用父组件的重新获取值的函数
  // 从父组件获得的值对象，此对象是links下的detail中的具体对象
  @Input() set tableData(tableData: DetailInquiry) {
    if (tableData) {
      this.newTableData = tableData;
      console.log(this.newTableData);
      this.yaGunGuoList = [];
      this.yaGunIndex = 0;
      this.newTableData.detailRolls.forEach(item => {
        if (item.pushNum) {
          this.yaGunGuoList.push(item.pushNum);
          this.yaGunGuoList = this.unique(this.yaGunGuoList);
        }
      });
      console.log(this.yaGunGuoList);
      this.furnaceListPutted = tableData.furnacePutted;
    }
  }
  newTableData: DetailInquiry;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enterFurnaceService: EnterFurnaceService,
    private messageService: NzMessageService,
    private modalService: NzModalService,
  ) { }
  detailId: number; // 本详情的id
  selectFre = ''; // 选中的货号id
  selectPro = ''; // 选中的生产号id
  selectFur = 0; // 选中的左边炉号
  selectDetailId = 0; // 选中的右边的炉号的detail id
  selectDetailIdLeft = 0; // 选中的左边的炉号的detail id
  furnaceList = [ // 装炉图左边所有的炉号
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  ];
  furnaceListPutted: Array<Freights> = []; // 已经装入炉子的货号
  yaGunList = [
    1, 2, 3, 4, 5, 6
  ];
  yaGunGuoList = [];
  yaGunIndex = 0;

  ngOnInit() {
    this.detailId = this.route.snapshot.params.id;
  }
  selectFreightPut(): void { // 选中右边已经入炉轧辊时
    this.selectFre = '';
    this.selectPro = '';
  }
  selectFreight(freight, rollDetail): void { // 选中右边未入炉轧辊时
    if (this.putOrTake && this.putOrTake === 'put') { // 当为入炉时，右边炉子可选
      this.selectFre = freight.freightNumber;
      this.selectPro = rollDetail.roll.productNo;
      this.selectDetailId = rollDetail.id;
      this.yaGunIndex = 0;
    } else { // 当为出炉时，右边炉子不可选
      this.selectFreightPut();
    }
  }
  selectFurnace(index): void { // 选中左边炉子位置
    if (!this.readOnly) { // 如果不是只读的话，才可以操作出入炉
      this.selectFur = index;
    }
    if (this.furnaceListPutted[index]) {
      this.furnaceListPutted[index].detailRolls.forEach(
        detailRoll => {
          if (detailRoll.position && Number(detailRoll.position) === index) {
            this.selectDetailIdLeft = detailRoll.id;
          }
        }
      );
    }
    if (this.putOrTake && this.putOrTake === 'put') { // 当为入炉时，可以进行入炉保存
      if (this.selectFre && this.selectPro) { // 如果货号和生产号存在 进行保存环节
        let showloadR = false;
        const modal = this.modalService.create({
          nzTitle: '轧辊入炉',
          nzContent: `是否将轧辊  ${this.selectFre} - ${this.selectPro}  保存到炉 ${index} 位置？`,
          nzClosable: false,
          nzFooter: [
            {
              label: '取消',
              shape: 'default',
              loading: () => showloadR,
              onClick: () =>
                modal.destroy()
            },
            {
              label: '确定',
              type: 'primary',
              loading: () => showloadR,
              onClick: () => {
                showloadR = true;
                if (!this.furnaceListPutted[index]) {
                  this.enterFurnaceService.savePutFreight({ id: this.selectDetailId, position: index.toString(), status: 'IN_FURNACE' }).subscribe(
                    success => {
                      showloadR = false;
                      this.messageService.create('success', '入炉成功！');
                      this.selectFre = '';
                      this.selectPro = '';
                      this.selectFur = 0;
                      this.selectDetailId = null;
                      this.initData.emit();
                      modal.destroy();
                    }, error => {
                      showloadR = false;
                      this.messageService.create('error', '入炉失败!' + error.error.message);
                    }
                  );
                } else {
                  showloadR = false;
                  this.messageService.create('error', '放入失败，此处已有轧辊');
                }
              }
            }
          ]
        });
      } else if (this.furnaceListPutted[index] && this.yaGunIndex) {
        console.log(this.furnaceListPutted[index]);
        let areaRoll = '';
        let areaRollpro;
        this.furnaceListPutted[index].detailRolls.forEach(
          detailRoll => {
            if ((detailRoll.position && Number(detailRoll.position) === index) && (detailRoll.status === 'IN_FURNACE' || detailRoll.status === 'EXECUTING')) {
              areaRoll = detailRoll.roll.productNo;
              areaRollpro = detailRoll.roll;
            }
          }
        );
        let showloadRT = false;
        const modal = this.modalService.create({
          nzTitle: '压辊标记',
          nzContent: `是否对轧辊  ${this.furnaceListPutted[index].freightNumber} - ${areaRoll}  进行${this.yaGunIndex}#压辊标记？`,
          nzClosable: false,
          nzFooter: [
            {
              label: '取消',
              shape: 'default',
              loading: () => showloadRT,
              onClick: () =>
                modal.destroy()
            },
            {
              label: '确定',
              type: 'primary',
              loading: () => showloadRT,
              onClick: () => {
                showloadRT = true;
                console.log(areaRollpro.id);
                this.enterFurnaceService.savePutFreightYa({
                  rollId: areaRollpro.id,
                  pushNum: this.yaGunIndex,
                  detailId: this.detailId
                }).subscribe(
                  success => {
                    showloadRT = false;
                    this.messageService.create('success', '压辊标记成功！');
                    this.selectFre = '';
                    this.selectPro = '';
                    this.selectFur = 0;
                    this.yaGunIndex = 0;
                    this.selectDetailId = null;

                    this.yaGunGuoList.push(this.yaGunIndex);
                    this.yaGunGuoList = this.unique(this.yaGunGuoList);
                    this.initData.emit();
                    modal.destroy();
                  }, error => {
                    showloadRT = false;
                    this.messageService.create('error', '压辊标记失败!' + error.error.message);
                  }
                );
              }
            }
          ]
        });
      }
    } else {
      if (this.furnaceListPutted[index]) { // 当为take时，进行出炉弹窗
        let showloadC = false;
        const takeModal = this.modalService.create({
          nzTitle: '轧辊出炉',
          nzContent: `是否将轧辊  ${this.furnaceListPutted[index].freightNumber} 从炉 ${index} 位置取出？`,
          nzClosable: false,
          nzFooter: [
            {
              label: '取消',
              shape: 'default',
              loading: () => showloadC,
              onClick: () => takeModal.destroy()
            },
            {
              label: '确定',
              type: 'primary',
              loading: () => showloadC,
              onClick: () => {
                showloadC = true;
                if (this.furnaceListPutted[index]) {
                  this.furnaceListPutted[index].detailRolls.forEach(
                    detailRoll => {
                      if ((detailRoll.position && Number(detailRoll.position) === index) && (detailRoll.status === 'IN_FURNACE' || detailRoll.status === 'EXECUTING')) {
                        this.selectDetailIdLeft = detailRoll.id;
                      }
                    }
                  );
                }
                this.enterFurnaceService.saveTakeFreight({ id: this.selectDetailIdLeft, position: index.toString(), status: 'OUT_FURNACE' }).subscribe(
                  success => {
                    showloadC = false;
                    this.messageService.create('success', '出炉成功！');
                    this.selectFur = 0;
                    this.initData.emit();
                    takeModal.destroy();
                  },
                  error => {
                    showloadC = false;
                    this.messageService.create('error', '出炉失败!' + error.error.message);
                  }
                );
              }
            }
          ]
        });
      } else {
        console.log('该炉子为空');
      }
    }
    this.ngOnInit();
  }
  selectCancel(freight, rollDetail): void { // 撤销装入
    let showload = false;
    const cancelModal = this.modalService.create({ // 确认撤销弹窗
      nzTitle: '撤销入炉',
      nzContent: `是否撤销将轧辊 ${freight.freightNumber} - ${rollDetail.roll.productNo} 装入炉 ${rollDetail.position}？`,
      nzClosable: false,
      nzFooter: [
        {
          label: '取消',
          shape: 'default',
          loading: () => showload,
          onClick: () => cancelModal.destroy(),
        },
        {
          label: '确定',
          shape: 'primary',
          loading: () => showload,
          onClick: () => {
            showload = true;
            this.enterFurnaceService.savePutFreight({ id: rollDetail.id, position: rollDetail.position.toString(), status: 'NOT_PUT' }).subscribe(
              success => {
                showload = false;
                this.messageService.create('success', '撤销成功！');
                this.initData.emit();
                cancelModal.destroy();
              },
              error => {
                showload = false;
                this.messageService.create('error', '撤销失败!' + error.error.message);
              }
            );
          },
        },
      ],
    });
  }

  changeYa(num) {
    if (!this.readOnly) { // 如果不是只读的话，才可以操作出入炉
      if (this.putOrTake && this.putOrTake === 'put') {
        if (this.yaGunGuoList.indexOf(num) === -1) {
          this.yaGunIndex = num;
          // 右侧辊列表取消选择
          this.selectFre = '';
          this.selectPro = '';
        } else {
          let rollId = null;
          this.newTableData.detailRolls.forEach(item => {
            if (Number(item.pushNum) === num) {
              console.log(item);
              rollId = item.rollId;
            }
          });

          let showloadRT = false;
          const modal = this.modalService.create({
            nzTitle: '压辊标记撤销',
            nzContent: `是否撤销炉中${num}#压辊标记？`,
            nzClosable: false,
            nzFooter: [
              {
                label: '取消',
                shape: 'default',
                loading: () => showloadRT,
                onClick: () =>
                  modal.destroy()
              },
              {
                label: '确定',
                type: 'primary',
                loading: () => showloadRT,
                onClick: () => {
                  showloadRT = true;
                  this.enterFurnaceService.savePutFreightYa({
                    rollId: rollId,
                    pushNum: null,
                    detailId: this.detailId
                  }).subscribe(
                    success => {
                      showloadRT = false;
                      this.messageService.create('success', '撤销成功！');
                      this.selectFre = '';
                      this.selectPro = '';
                      this.selectFur = 0;
                      this.yaGunIndex = 0;
                      this.selectDetailId = null;
                      this.initData.emit();
                      modal.destroy();
                    }, error => {
                      showloadRT = false;
                      this.messageService.create('error', '压辊标记撤销失败!' + error.error.message);
                    }
                  );
                }
              }
            ]
          });
        }
      }
    }
  }
  unique(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
          arr.splice(j, 1);
          j--;
        }
      }
    }
    let arr2 = [];
    arr.forEach(item => {
      arr2.push(Number(item))
    })
    return arr2;
  }
}
