import { Injectable } from '@angular/core';
;
import { HttpClient, HttpHeaders } from '@angular/common/http';





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

    return this.http.get(URI)
    
  }

  public getByArtist(artist) {
    let URI = `${this.serverApi}/api/discogs/${artist}`;
    
    return this.http.get(URI)
  }

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
    }
    console.log('service', newRecord);
    console.log(record.id);
    let URI = `${this.serverApi}/api/record/save/${record.id}`;
    return this.http.post(URI, newRecord).subscribe((data) => console.log(data));



  }


}
