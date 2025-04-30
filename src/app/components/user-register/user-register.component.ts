import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Register } from 'src/app/interfaces/register';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  registerForm: FormGroup;
  

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log('submit clicked');
    if (this.registerForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    const formValues = this.registerForm.value;
    const formData = {
      username: formValues.name,
      email: formValues.email,
      mobile: formValues.mobile,
      password: formValues.password,
    };
    
    console.log("Form data:", formData);
    this.userService.registerUser(formData).subscribe({
      next: (res) => {
        console.log('User registered:', res);
        alert('User registered successfully!');
        this.registerForm.reset();
        
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert('Registration failed');
      }
    });
  }

 
}
