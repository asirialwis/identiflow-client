import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/register';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {

  @Input() user!:User;
  @Output() updated = new EventEmitter<User>();

  isModalOpen:boolean = false;
  updateForm!:FormGroup;

  constructor(private formBuilder:FormBuilder){}

  openModel(){
    this.isModalOpen = true;
    this.updateForm = this.formBuilder.group({
      username:[this.user.username],
      email:[this.user.email],
      mobile:[this.user.mobile],
      status:[this.user.status]
    });
  }
  closeModal(){
    this.isModalOpen = false;
  }

  onSubmit(){
    if(this.updateForm.valid){
      const updatedUser:User = {
        ...this.user,
        ...this.updateForm.value
      }
      //remove password because its not update from the user list
      delete updatedUser.password;
      console.log("Updated user without password",updatedUser);
      this.updated.emit(updatedUser);
      this.isModalOpen = false;
    }
  }
  
    
  
}
