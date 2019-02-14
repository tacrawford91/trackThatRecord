import { Component, OnInit } from '@angular/core';

import{ RecordService } from '../services/record.service'
import { Records } from '../interface-record';
import { map } from 'rxjs/operators';;

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss']
})
export class RecordListComponent implements OnInit {

  private recordList: Records[] = [];

  constructor(
    private recordService: RecordService
  ) { }

  ngOnInit() {
    this.loadRecords();
  

  }



  public loadRecords() {
    this.recordService.getAllRecords()
    .subscribe(data =>{ 
      console.log(data['record'])
      this.recordList = data['record'];
  })
    // .pipe(map(data => {
    //   console.log(data)
    //   return data
    // }))
    console.log(this.recordList);
  }

}
