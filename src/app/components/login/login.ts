import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private _authService: AuthService, private _router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter username and password.';
      return;
    }
    const { username, password } = this.loginForm.value;
    if (this._authService.login(username, password)) {
      this._router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid username or password.';
    }
  }

  navigateToRegister(): void {
    this._router.navigate(['/register']);
  }
}
