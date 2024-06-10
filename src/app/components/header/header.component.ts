import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { JwtHelperService } from '../../helpers/jwt-helper.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn = false;
  username: string | null = '';
  userRole: string | null = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.checkLoginStatus();
  }

  constructor(private _auth: AuthService, private _jwtHelper: JwtHelperService) {
    
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // You should replace this with actual logic to decode the token and get the username
      const decode = this._jwtHelper.decodeToken(token);
      this.username = decode.given_name;
      this.userRole = decode.role;
      this.isLoggedIn = true;
    }
  }

  logout() {
    this._auth.logout();
    this.isLoggedIn = false;
    this.username = "";
  }
}
