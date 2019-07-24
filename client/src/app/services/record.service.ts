import { Injectable } from '@angular/core';
;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(
    private http: HttpClient,
  ) { }

  private serverApi = 'http://localhost:3000';


  public getAllRecords() {

    let URI = `${this.serverApi}/api/record/`;

    return this.http.get(URI);
  };

  public getByArtist(artist, page = '1') {
    let URI = `${this.serverApi}/api/discogs/${artist}?page=${page}&per_page=9`;
    console.log('URI', URI);
    return this.http.get(URI);
  };

  public saveRecord(record) {
    const newRecord ={
      title: record.title.split(' - ')[1],
      artist: record.title.split(' - ')[0],
      catno: record.catno,
      cover_image: record.cover_image,
      format: record.format,
      label: record.label,
      discogsId: record.id,
      masterId: record.master_id,
      masterUrl: record.master_url,
      style: record.style,
      thumb: record.thumb,
      type: record.type,
      year: record.year,
      uri: record.uri
    };

    let URI = `${this.serverApi}/api/record/save/${record.id}`;
    return this.http.post(URI, newRecord);
  }

  //get record list
  public getRecordList(recordArray) {
    let URI = `${this.serverApi}/api/record/recordList`;
    return this.http.post(URI, recordArray);
  }

  //get record price suggestion
  public getRecordPrice(releaseId) {
    let URI = `${this.serverApi}/api/discogs/record/market/${releaseId}`;
    console.log(URI)
    return this.http.get(URI).pipe(map((res) => {
      console.log('get price response', res)
    }))
  }
}
