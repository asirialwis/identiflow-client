import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css'],
})
export class PasswordUpdateComponent {
  @Input() user!: any;
  @Output() updated = new EventEmitter<any>();
  passwordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    
    this.passwordForm = this.formBuilder.group(
      {
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }
  onSubmit() {
    if (this.passwordForm.valid && this.user.id) {
      const newPassword = this.passwordForm.value.newPassword;

      const updatedUser = { ...this.user, password: newPassword };

      this.updated.emit(updatedUser);

      this.passwordForm.reset();
    }
  }
}
