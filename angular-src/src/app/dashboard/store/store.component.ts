import { Component, OnInit } from '@angular/core';

// import { HttpModule, Response } from '@angular/http';
// import { FormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { ToasterService } from 'angular5-toaster';
import { Router, ActivatedRoute } from '@angular/router';

/* Services Modules */
// import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  public ProductsList = [];

  // Pagination: initializing p to one
  p: number = 1;

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private toaster: ToasterService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/api/product/getProducts')
      .subscribe((res: any) => { this.ProductsList = res.data; });
  }

  addItemToCart(productID) {
    if (localStorage.length == 0) {
      this.toaster.pop({
        type: 'info',
        title: "Oops!",
        body: "You need to login first to be able to use the cart system",
        timeout: 2000
      });
      this.router.navigate(['dashboard/store']);
      return false;
    }

    let userID = {
      id: JSON.parse(localStorage.getItem('currentUser')).user.id
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:3000/api/product/addToCart/' + productID, JSON.stringify(userID), { headers: headers })
      // .catch((err: any) => console.log(err))
      .subscribe(res => {
        this.toaster.pop({
          type: 'success',
          title: "Success!",
          body: "Item added to cart",
          timeout: 2000
        });
        this.router.navigate(['dashboard/cart']);

      });


  }

}
