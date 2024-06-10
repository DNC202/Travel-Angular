import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getUserRole();
    // if (role === 'Admin') {
    //   return true;
    // } else if {
    //   this.router.navigate(['/access-denied']); // Redirect to home or an appropriate page
    //   return false;
    // }
    switch (role) {
      case 'Admin':
        return true;
      case 'User':
        this.router.navigate(['/access-denied']); // Redirect to home or an appropriate page
        return false;
      default:
        this.router.navigate(['/']); // Redirect to home or an appropriate page
        return false;
    }
  }
}