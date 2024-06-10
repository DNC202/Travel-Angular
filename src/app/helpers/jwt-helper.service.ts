import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtHelperService {

  constructor() { }
  
  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  getTokenPayload(token: string): any {
    const decoded = this.decodeToken(token);
    if (decoded) {
      return decoded;
    }
    return null;
  }
}
