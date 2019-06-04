import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';




@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    constructor(
        private http: HttpClient,
    ) { }

    private serverApi = 'http://localhost:3000';


    public getAllCatalogs() {

        let URI = `${this.serverApi}/api/catalog/`;

        return this.http.get(URI)

    }



    public getCatalog(user) {
        let URI = `${this.serverApi}/api/catalog/${user.catalog}`;

        return this.http.get(URI)
        .pipe(map((res) => {
            if (res) {
                console.log('success', res)
                return res
            } else {
                console.log('error occured in get catalog')
            }

        })
    )
    }


    public createCatalog(user) {
        let URI = `${this.serverApi}/api/catalog/create/${user._id}`;
        const newCatalog = {
            name: user.name,
            userId: user._id,
            records: user.records,
            age: user.age,
            value: user.value,
        }
       return this.http.post(URI, newCatalog)
       .pipe(map((res) => {
         return res
       }))
    }


    public addToCatalog(user,record) {
        const updateRecord = {
            record:record
        }
        let URI = `${this.serverApi}/api/catalog/add-record/${user._id}`;
        return this.http.put(URI,updateRecord);
    }

    public removeFromCatalog(catalogId,recordId) {

      let URI = `${this.serverApi}/api/catalog/remove-record/${catalogId}/${recordId}`;

      return this.http.delete(URI).pipe(map((data) => {return data}));
    }



    // public saveRecord(record) {
    //     const newRecord = {
    //         title: record.title.split(' - ')[1],
    //         artist: record.title.split(' - ')[0],
    //         catno: record.catno,
    //         cover_image: record.cover_image,
    //         format: record.format,
    //         label: record.label,
    //         discogsId: record.id,
    //         masterId: record.master_id,
    //         masterUrl: record.master_url,
    //         style: record.style,
    //         thumb: record.thumb,
    //         type: record.type,
    //         year: record.year,
    //         uri: record.uri
    //     }
    //     console.log('service', newRecord);
    //     console.log(record.id);
    //     let URI = `${this.serverApi}/api/record/save/${record.id}`;
    //     return this.http.post(URI, newRecord).subscribe((data) => console.log(data));



    // }


}
