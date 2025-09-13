import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm: FormGroup;
  errorMessage = '';
  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router) {
    this.registerForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  private passwordsMatchValidator(group: FormGroup) {
    const p = group.get('password')?.value;
    const c = group.get('confirmPassword')?.value;
    return p === c ? null : { passwordsMismatch: true };
  }

  register(): void {
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fix the errors in the form.';
      return;
    }
    const { username, password } = this.registerForm.value;
    if (this._authService.register(username, password)) {
      this._router.navigate(['/login']);
    } else {
      this.errorMessage = 'Username already exists.';
    }
  }

  // getters for template convenience
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }


  // Navigate to Login Page
  navigateToLogin(): void {
    this._router.navigate(['/login']);
  }
}
