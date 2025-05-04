import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  registerForm: FormGroup;
  isSubmitting = false;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cloudinaryService: CloudinaryService
  ) {
    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      profileImage: [null],
    });
  }

  showPassword = {
    password: false,
    confirmPassword: false,
  };

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    this.showPassword[field] = !this.showPassword[field];
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  removeImage() {
    this.selectedFile = null;
    this.registerForm.patchValue({ profileImage: null });
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.isSubmitting = true;
    const input = this.fileInput.nativeElement;

    try {
      let profileImageUrl = null;

      // Upload image if file was selected
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        profileImageUrl = await this.cloudinaryService.uploadImage(file);
        console.log('Image URL:', profileImageUrl);
        
      }

      const formData: any = {
        username: this.registerForm.value.name,
        email: this.registerForm.value.email,
        mobile: this.registerForm.value.mobile,
        password: this.registerForm.value.password,
      };

      // Add profile image URL if available
      if (profileImageUrl) {
        formData.profileImage = profileImageUrl;
      }

      console.log('Form data:', formData);

      this.userService.registerUser(formData).subscribe({
        next: (res) => {
          console.log('User registered:', res);
          alert('User registered successfully!');
          this.registerForm.reset();
          input.value = '';
        },
        error: (err) => {
          console.error('Registration error:', err);
          alert(
            'Registration failed: ' + (err.error?.message || 'Unknown error')
          );
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Image upload failed');
      this.isSubmitting = false;
    }
  }
}
