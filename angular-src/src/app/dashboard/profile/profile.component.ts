import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular5-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Pipe } from "@angular/core";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  Users: any;
  currentUser;

  AllProducts: any;
  productID; productName;  productPrice;
  productToBeEdited: any;
  edit = false;

  // Table sorting
  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  // Pagination: initializing p to one
  p: number = 1;

  constructor(
    private http: Http,
    private toaster: ToasterService,
    private router: Router,
    private httpClient: HttpClient,
  ) { }

  // #################### Admin #################### //

  getAllUsers() {
    this.httpClient.get('http://localhost:3000/api/user/getAllUsers/')
      .subscribe((res: any) => {
        this.Users = res.data;
      });
  }

  makeAdmin(userID) {
    let updatedUser = {
      userType: 2
    };
    this.http.patch('http://localhost:3000/api/user/updateUser/' + userID , updatedUser)
      .catch(err => {
        this.toaster.pop({
          type: 'error',
          title: "Error!",
          body: "Error Could not make him/her Admin",
          timeout: 3000
        });
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.toaster.pop({
          type: 'success',
          title: "Success!",
          body: "This user is now an Admin",
          timeout: 3000
        });
        this.getAllUsers();

      });
  }

  makeManager(userID) {
    let updatedUser = {
      userType: 1
    };
    this.http.patch('http://localhost:3000/api/user/updateUser/' + userID , updatedUser)
      .catch(err => {
        this.toaster.pop({
          type: 'error',
          title: "Error!",
          body: "Error Could not make him/her Admin",
          timeout: 3000
        });
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.toaster.pop({
          type: 'success',
          title: "Success!",
          body: "This user is now a Manager",
          timeout: 3000
        });
        this.getAllUsers();

      });
  }

  makeViewer(userID) {
    let updatedUser = {
      userType: 0
    };
    this.http.patch('http://localhost:3000/api/user/updateUser/' + userID , updatedUser)
      .catch(err => {
        this.toaster.pop({
          type: 'error',
          title: "Error!",
          body: "Error Could not make him/her Admin",
          timeout: 3000
        });
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.toaster.pop({
          type: 'success',
          title: "Success!",
          body: "This user is now a Manager",
          timeout: 3000
        });
        this.getAllUsers();

      });
  }

  // ################################################ //

  // #################### Admin & Manager #################### //

  getAllProducts() {
    this.httpClient.get('http://localhost:3000/api/product/getProducts/')
      .subscribe((res: any) => {
        this.AllProducts = res.data;
      });
  }

  selectProduct(product) {
    this.productToBeEdited = product;
    this.productName = this.productToBeEdited.name;
    this.productPrice = this.productToBeEdited.price;
  }

  editProduct() {

    this.productID = this.productToBeEdited._id;

    let updatedProduct = {
      name: this.productName,
      price: Number(this.productPrice)
    };

    this.http.patch('http://localhost:3000/api/product/updateProduct/' + this.productID , updatedProduct)
      .catch(err => {
        this.toaster.pop({
          type: 'error',
          title: "Error!",
          body: "name(String) and price(Number) are required fields.",
          timeout: 3000
        });
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.toaster.pop({
          type: 'success',
          title: "Success!",
          body: "You've been successfully Updated The Product!",
          timeout: 3000
        });
        this.getAllProducts();
        this.edit = false;
      });

  }

  deleteProduct(productID) {
    this.http.delete('http://localhost:3000/api/product/deleteProduct/' + productID)
      .subscribe(res => {
        this.toaster.pop({
          type: 'error',
          title: "Deleted!",
          body: "You've been successfully deleted the Product!",
          timeout: 3000
        });
        this.getAllProducts();
    });
  }

  // ################################################ //

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user!;
    this.getAllUsers();
    this.getAllProducts();
  }

}
