import { Injectable } from '@angular/core';
;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { CatalogService } from './catalog.service';
import { WatchlistService } from '../services/watch-list.service'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private catalogService: CatalogService,
    private watchlistService: WatchlistService
  ) { }

  private serverApi = 'http://localhost:3000';


  // google login
  public getByGoogle(google) {
    let URI = `${this.serverApi}/api/user/guser/${google.id}`;

    return this.http.get(URI)
    .pipe(map(res => {
      if (res['user'] === null) {
        //create user
        this.addUser(this._createGoogleUser(google))
      }
      return res['user']
    }))

  }

  // facebook login
  public getByfaceBook(fb) {
    let URI = `${this.serverApi}/api/user/fbuser/${fb.id}`;

    return this.http.get(URI)
      .pipe(map(res => {
        let user = res['user'];
        if (user === null) {
        //create users
          this.addUser(this._createFacebookUser(fb))       
         }
        if(user) {
          // user.authdata = window.btoa(username + ':' + password);
          localStorage.setItem('currentUser', JSON.stringify(user));

        }
        return res['user']
      }))
  }


  // logout
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }



  // create
  public addUser(user) {
    const newUser = {
      name: user.name,
      gmail: user.gmail,
      email: user.email,
      provider: user.provider,
      gId: user.gId,
      fbId: user.fbId,
      image: user.image,
      catalog: user.catalog,
      watchList: user.watchList,
      bounds: [{}],
      tele: user.tele
    }

    let restId = this._restId(user);

    let URI = `${this.serverApi}/api/user/save/${restId}`;
    return this.http.post(URI, newUser).subscribe((data) => {
    //create catalog
    console.log('should be user inforatmuon', data['user'])
    this.catalogService.createCatalog(data['user']).subscribe((newCatalog) => {
      this.createCatalogForUser(data['user'], newCatalog['catalog'])
    })
    //create watchlist
    this.watchlistService.createWatchlist(data['user']).subscribe((newWatchlist) => {
      this.createWatchlistForUser(data['user'], newWatchlist['watchlist'])
    })

      return data
    });
  }

  createCatalogForUser(user, catalog) {
    
    let URI = `${this.serverApi}/api/user/save/catalog/${user._id}`;
    console.log('create catalog for user hit', catalog)

    
    return this.http.put(URI,catalog).subscribe((data) => {
      console.log('new catalog created', data)
    })

  }

  createWatchlistForUser(user, watchlist) {
    
    let URI = `${this.serverApi}/api/user/save/watchlist/${user._id}`;
    console.log('create watchlist  for user hit', watchlist)

    
    return this.http.put(URI,watchlist).subscribe((data) => {
      console.log('new watchlist created', data)
    })

  }


  _createGoogleUser(user) {
    let newUser = {
      name: user.name,
      gmail: user.email,
      provider: user.provider,
      gId: user.id,
      image: user.image,
    }
    return newUser;
  }

  _createFacebookUser(user) {
    let newUser = {
      name: user.name,
      email: user.email,
      provider: user.provider,
      fbId: user.id,
      image: user.image,
    }
    return newUser;
  }

  _restId(user) {
    return (user.gId) ? user.gId : user.fbId;
  }

}