import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class StoreService {

  constructor(private _http: HttpClient) {

    function getProducts() {
        this._http.get('http://localhost:3000/api/product/getProducts').subscribe(res => {
          console.log(res.data)
        });
    }

  }



}
