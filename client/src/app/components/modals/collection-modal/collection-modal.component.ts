import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { generate } from 'rxjs';
import { RecordService } from '../../../services/record.service' 

@Component({
    selector: 'collection-modal-component',
    templateUrl: './collection-modal.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CollectionModalComponent {
    closeResult: string;
    priceEstimate

    @Input() title; 
    @Input() genre;
    @Input() format;
    @Input() cover_image;
    @Input() releaseId;

    @Output() removeFromCollectionPressed = new EventEmitter();


  
    constructor(
      private modalService: NgbModal,
      private recordService: RecordService
      ) { }

    openVerticallyCentered(content) {
        this.modalService.open(content, { centered: true, size:'lg' });
    }

    //get price estimate
    getRecordPrice(releaseId) {
      console.log('releaseId', releaseId)
      this.recordService.getRecordPrice(releaseId)
        .subscribe((data) => {
          console.log('data', data)
        })
    }

}