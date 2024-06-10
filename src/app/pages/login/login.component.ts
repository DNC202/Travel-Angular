import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordValidator } from '../../validators/password-validator';
import { JwtHelperService } from '../../helpers/jwt-helper.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  loginForm: FormGroup;

  constructor(private _fb: FormBuilder, private _auth: AuthService, private _router: Router) {
    this.loginForm = _fb.group({
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(12), PasswordValidator.strong])
    })
  }

  onSubmit() {
    if(this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this._auth.login(email, password).subscribe(
        response => {
          const token = response.token;
          localStorage.setItem('token', token);
          this._router.navigate(['/']);
        }
      )
    }
  }
}
