import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

  public jwtToken: string;

  constructor(private http: Http) {
      const theUser:any = JSON.parse(localStorage.getItem('currentUser'));
      if (theUser) {
          this.jwtToken = theUser.token;
      }
  }

  register(oUser) {
        let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post('http://localhost:3000/api/register', JSON.stringify(oUser), options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
  }

  private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
  }

}
