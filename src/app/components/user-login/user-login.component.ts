import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Register } from 'src/app/interfaces/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
    });
  }

  showPassword = false;
  loading = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById(
      'password'
    ) as HTMLInputElement;
    passwordField.type = this.showPassword ? 'text' : 'password';
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const formValues = this.loginForm.value;
    const formData = {
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    };

    console.log('Form data:', formData);

    // Call the loginUser method from the UserService
    // and pass the formData to it
    this.userService.loginUser(formData).subscribe({
      next: (res) => {
       
        sessionStorage.setItem('token', res.token);
        console.log(sessionStorage.getItem('token'));
        alert('User logged in successfully!');
        this.loginForm.reset();
        this.router.navigate(['/user-profile']);
      },
      error: (err) => {
        if (err.status === 401) {
          alert('Invalid email or password');
        } else if (err.status === 403) {
          alert('Your account is deactivated');
        } else {
          alert('Server error. Please try again later.');
        }
      },
    });
  }
}
