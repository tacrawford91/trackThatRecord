import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { CatalogService } from '../services/catalog.service';
import { RecordService } from '../services/record.service';
import { WatchlistService } from '../services/watch-list.service'

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  currentUser;
  catalog;
  watchlist;

  constructor(
    private catalogService: CatalogService,
    private recordService: RecordService,
    private watchlistService: WatchlistService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


    console.log('current user', this.currentUser)

    this.catalogService.getCatalog(this.currentUser)
      .subscribe((catalog) => {
        console.log('get cata fired')
        this.catalog = catalog;
        console.log('catalog', catalog);
      })

      this.watchlistService.getWatchlist(this.currentUser)
      .subscribe((catalog) => {
        this.watchlist = catalog; 
      })
    }


    public removeFromCollection(record) {
        this.catalogService.removeFromCatalog(this.currentUser.catalog, record._id)
          .subscribe((res) => { 
            this.catalog = res['updatedList']
          })
    }
   
    public removeFromWatchlist(record) {
      this.watchlistService.removeFromWatchlist(this.currentUser.watchlist, record._id)
        .subscribe((res) => { 
          this.watchlist = res['updatedList']
        })
  }

}
