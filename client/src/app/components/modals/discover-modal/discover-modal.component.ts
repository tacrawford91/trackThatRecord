import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { generate } from 'rxjs';

@Component({
    selector: 'discover-modal-component',
    templateUrl: './discover-modal.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class DiscoverModalComponent {
    closeResult: string;

    @Input() title; 
    @Input() genre;
    @Input() format;
    @Input() cover_image;

    @Output() SaveRecordPressed = new EventEmitter();
    @Output() addToCollectionPressed = new EventEmitter();
    @Output() addToWatchlistPressed = new EventEmitter();



    constructor(private modalService: NgbModal) { }

    openVerticallyCentered(content) {
        this.modalService.open(content, { centered: true, size:'lg' });
    }
}