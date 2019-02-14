import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { generate } from 'rxjs';

@Component({
    selector: 'ng-modal-component',
    templateUrl: './ng-modal.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class NgModalComponent {
    closeResult: string;

    @Input() title; 
    @Input() genre;
    @Input() format;
    @Input() cover_image;

    @Output() SaveRecordPressed = new EventEmitter();
    @Output() addToCollectionPressed = new EventEmitter();



    constructor(private modalService: NgbModal) { }

    openVerticallyCentered(content) {
        this.modalService.open(content, { centered: true, size:'lg' });
    }
}