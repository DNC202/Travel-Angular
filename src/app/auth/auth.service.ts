import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '../helpers/jwt-helper.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://localhost:7211/api/auth/';
  

  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    const body = JSON.stringify({email, password});

    return this._http.post<any>(this.authUrl + 'login', body, { headers });
  }

  register(username: string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    const body = JSON.stringify({username, email, password});

    return this._http.post<any>(this.authUrl + 'register', body, { headers });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string {
    return localStorage.getItem('username')!;
  }

  getUserRole() {
    if(localStorage.getItem('token')) {
      return this._jwtHelper.getTokenPayload(localStorage.getItem('token')!).role;
    } else {
      return '';
    }
  }
}
