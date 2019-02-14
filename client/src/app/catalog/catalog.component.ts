import { Component, OnInit } from '@angular/core';


import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  currentUser;
  catalog;

  constructor(
    private catalogService: CatalogService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


    console.log('current user', this.currentUser)
    this.catalogService.getCatalog(this.currentUser)
      .subscribe((catalog) => {
        this.catalog = catalog;
        console.log(this.catalog);
      })
  }

}
