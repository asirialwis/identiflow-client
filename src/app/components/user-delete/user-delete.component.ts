import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/interfaces/register';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent {
  @Input() user!:User;
  @Output() deleted = new EventEmitter<User>();
  @Output() canceled = new EventEmitter<User>();

  onDelete(){
    this.deleted.emit(this.user)
  }
  onCancel(){
    this.canceled.emit(this.user);
  }


}