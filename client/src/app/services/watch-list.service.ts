import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(
    private http: HttpClient,
) { }

private serverApi = 'http://localhost:3000';


public getAllWatchlists() {

    let URI = `${this.serverApi}/api/watchlist/`;

    return this.http.get(URI)

}



public getWatchlist(user) {
    console.log('get user watchlist',user )
    let URI = `${this.serverApi}/api/watchlist/${user.watchlist}`;

    return this.http.get(URI)
    .pipe(map((res) => {
        if (res) {
            console.log('success', res)
            return res
        } else {
            console.log('error occured in get watchlist')
        }

    })
)
}


public createWatchlist(user) {
    let URI = `${this.serverApi}/api/watchlist/create/${user._id}`;
    const newwatchlist = {
        name: user.name,
        userId: user._id,
        records: user.records,
        age: user.age,
        value: user.value,
    }
   return this.http.post(URI, newwatchlist)
   .pipe(map((res) => {
     return res
   }))
}


public addToWatchlist(user,record) {
    const updateRecord = {
        record:record
    }
    let URI = `${this.serverApi}/api/watchlist/add-record/${user._id}`;
    
    return this.http.put(URI,updateRecord);
  }

  public removeFromWatchlist(watchlistId,recordId) {

    let URI = `${this.serverApi}/api/watchlist/remove-record/${watchlistId}/${recordId}`;

    return this.http.delete(URI).pipe(map((data) => {return data}));
  }


}