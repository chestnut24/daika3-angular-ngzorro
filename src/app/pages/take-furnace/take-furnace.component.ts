import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-take-furnace',
  templateUrl: './take-furnace.component.html',
  styleUrls: ['./take-furnace.component.scss']
})
export class TakeFurnaceComponent implements OnInit {

  constructor() { }

  putOrTake = 'take';
  ngOnInit() {
  }

}
