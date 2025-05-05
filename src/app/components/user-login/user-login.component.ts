import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Register } from 'src/app/interfaces/register';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

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
    private userService: UserService,
    private toastr:ToastrService,
    private authService:AuthService
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
        this.authService.setLoggedIn(true);
        this.toastr.success('Login Successfull!','Success');
        this.loginForm.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error('Invalid email or password','Error')
        } else if (err.status === 403) {
          this.toastr.error('Your account is deactivated','Error')
        } else {
          this.toastr.error('Server error. Please try again later','Error')
        }
      },
    });
  }
}
