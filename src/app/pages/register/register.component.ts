import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { PasswordValidator } from '../../validators/password-validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  username: string = '';
  email: string = '';
  password: string = '';

  registerForm: FormGroup;

  constructor(private _fb: FormBuilder, private _auth: AuthService, private _router: Router) {
    this.registerForm = _fb.group({
      username: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(12)]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(12), PasswordValidator.strong])
    })
  }
  
  onSubmit() {
    if(this.registerForm.valid) {
      const {username, email, password} = this.registerForm.value;
      this._auth.register(username, email, password).subscribe(
        response => {
          const token = response.token;
          const userName = response.userName;
          localStorage.setItem('token', token);
          localStorage.setItem('username', userName);
          console.log(token, userName)
          this._router.navigate(['/']);
        }
      )
    }
  }
}
