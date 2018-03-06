import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular5-toaster';
import { AuthService } from '../../services/auth.service';
import { Http } from "@angular/http"
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: []
})
export class CartComponent implements OnInit {
  cartItems = [];

  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  // Pagination: initializing p to one
  p: number = 1;

  constructor(
    private authService: AuthService,
    private http: Http,
    private toaster: ToasterService,
    private httpClient: HttpClient

  ) {
  }

  ngOnInit() {
    this.reloadItems();
  }

  reloadItems() {
    let userID = JSON.parse(localStorage.getItem('currentUser')).user.id;
    let cartItemsIDs = null;
    //Gets all IDs in the list
    this.httpClient.get<any>('http://localhost:3000/api/user/getUser/' + userID)
      .subscribe(res => {
        cartItemsIDs = res.data.cartItems;
        let i;
        for (i = 0; i < cartItemsIDs.length; i++) {
          this.httpClient.get<any>('http://localhost:3000/api/product/getProduct/' + cartItemsIDs[i])
            .subscribe(res => { this.cartItems.push(res.data); });
        }

      });
  }

  checkout(){
    let userID = JSON.parse(localStorage.getItem('currentUser')).user.id;
    this.http.delete('http://localhost:3000/api/product/deleteCart/'+ userID).subscribe(res =>{
      this.cartItems = [];
      this.toaster.pop({
        type: 'success',
        title: "Success!",
        body: "Items checked out! Your cart is now empty",
        timeout: 2000
      });
    });
  }

  removeItem(item) {
    let userID = JSON.parse(localStorage.getItem('currentUser')).user.id;
    this.http.delete('http://localhost:3000/api/product/deleteCartItem/'+ userID+ '/' + item._id ).subscribe(res =>{
      this.cartItems.splice(this.cartItems.indexOf(item),1);
      this.toaster.pop({
        type: 'info',
        title: "Success!",
        body: "Item removed.",
        timeout: 2000
      });
    });


  }

}
