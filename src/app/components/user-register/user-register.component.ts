import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { nicDobMatchValidator } from '../../validators/dob.validator';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  profileImageUrl: string | null = null;
  triggerImageUpload = false;
  hasImageSelected = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        nic: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
        dob: ['', Validators.required],
        mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: [this.passwordMatchValidator, nicDobMatchValidator] }
    );
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onImageUploaded(url: string | null) {
    this.profileImageUrl = url;
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.isSubmitting = true;
    this.triggerImageUpload = true; // This will trigger the image upload

    if (!this.hasImageSelected) {
      this.submitForm();
    }
  }

  showPassword = {
    password: false,
    confirmPassword: false,
  };

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    this.showPassword[field] = !this.showPassword[field];
  }

  // Handle the image upload result from child component
  handleImageUpload(url: string | null): void {
    this.profileImageUrl = url;
    this.submitForm();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.hasImageSelected = !!input.files?.length;
  }

  async submitForm(): Promise<void> {
    try {
      const formData: any = {
        username: this.registerForm.value.name,
        email: this.registerForm.value.email,
        nic:this.registerForm.value.nic,
        mobile: this.registerForm.value.mobile,
        password: this.registerForm.value.password,
      };

      if (this.profileImageUrl) {
        formData.profileImage = this.profileImageUrl;
      }

      this.userService.registerUser(formData).subscribe({
        next: (res) => {
          console.log('User registered:', res);
          this.toastr.success('Registerd Successfully!', 'Success');
          this.registerForm.reset();
          this.router.navigate(['/user-login']);
          this.profileImageUrl = null;
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Registration error:', err);
          alert(
            'Registration failed: ' + (err.error?.message || 'Unknown error')
          );
          this.isSubmitting = false;
        },
      });
    } catch (error) {
      console.error('Error:', error);
      this.isSubmitting = false;
    }
  }
}
