import { Component, OnInit } from '@angular/core';

import { RecordService } from '../services/record.service';
import { UserService } from '../services/user.service';
import { CatalogService } from '../services/catalog.service';
import { WatchlistService } from '../services/watch-list.service'
// import { NgModalComponent } from '../components/modal/ng-modal.component';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-discover-record',
  templateUrl: './discover-record.component.html',
  styleUrls: ['./discover-record.component.scss']
})
export class DiscoverRecordComponent implements OnInit {

  searchResults; 
  currentUser;
  page = '1';
  artist = '';
  currentPage = 1;
  lastPage;  


  constructor(
    private recordService: RecordService,
    private userService: UserService,
    private catalogService: CatalogService,
    private watchlistService: WatchlistService
  ) { }

  

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  public artistSearch(artist, page ='1') {
    console.log('artist search', artist +' ' + page);
    this.recordService.getByArtist(artist, page)
      .subscribe(data => {
        // console.log(data)
        // this.searchResults = data['results'];
        // let vinyls = [];
        // data['results'].forEach((record) => {
        //   if (record.format.includes('Vinyl')) {
        //     vinyls.push(record);
        //   } 
        // })
        // console.log(vinyls);

        // //clean images
        // vinyls.forEach(record => {
        //   if (record.cover_image.includes('spacer.gif')){
        //     record.cover_image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/12in-Vinyl-LP-Record-Angle.jpg/800px-12in-Vinyl-LP-Record-Angle.jpg';
        //   }
        // })
        console.log('can you see page', data);
        //update page
        this.page = data['pagination'].page;
        this.lastPage = data['pagination'].pages;
        this.artist = artist;
        // console.log('artist', this.artist);

        //clean images
        data['results'].forEach(record => {
          console.log(data)
          if (record.cover_image.includes('spacer.gif')) {
            record.cover_image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/12in-Vinyl-LP-Record-Angle.jpg/800px-12in-Vinyl-LP-Record-Angle.jpg'
          };
        });

        return this.searchResults = data['results'];
      })
  }


  public addToCollection(record) {
    this.recordService.saveRecord(record).subscribe((data) => {
      this.catalogService.addToCatalog(this.currentUser, data['savedRecord']._id)
      .subscribe((record) => console.log(`added record`, record));

    });

  }


  public addToWatchlist(record) {
    this.recordService.saveRecord(record).subscribe((data) => {
      this.watchlistService.addToWatchlist(this.currentUser, data['savedRecord']._id)
      .subscribe((record) => console.log(`added record`, record));

    });
  }

  public getPriceSuggestion() {

  }

  public nextPage() {
    if (this.currentPage < this.lastPage) {
      this.currentPage = this.currentPage + 1;
      console.log('next artist', this.artist);
      this.artistSearch(this.artist, this.currentPage.toString());
    }
  }

  public backPage() {
    if (this.currentPage == 1) {
      return;
    }

    this.currentPage = this.currentPage - 1;
    this.artistSearch(this.artist, this.currentPage.toString());
  }
}
