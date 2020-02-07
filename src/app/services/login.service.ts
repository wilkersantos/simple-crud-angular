import { UserAuth } from './../domain/UserAuth';
import { Constants } from './app-const';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private router: Router) { }

  login(user: UserAuth) {
    return this.http.post<HttpResponse<any>>(Constants.HOME_URL + '/login', user, {observe: 'response'});
  }

  addHeader() {

    if (localStorage.getItem('auth') === null) {
      this.router.navigate(['']);
    } else {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Authorization', localStorage.getItem('auth'));
      return headers;
    }
  }
}
