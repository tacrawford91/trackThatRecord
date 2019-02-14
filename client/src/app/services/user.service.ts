import { Injectable } from '@angular/core';
;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
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
    console.log('service', newUser);
    console.log(user.id);
    let restId = this._restId(user);

    let URI = `${this.serverApi}/api/user/save/${restId}`;
    return this.http.post(URI, newUser).subscribe((data) => {return data});
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