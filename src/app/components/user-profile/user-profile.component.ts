import { Component,OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/register';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  user!: User;

  constructor(private userService:UserService){}


  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next:(res)=>{
        this.user = res;
        console.log(this.user);
      }
      ,error:(err)=>{
        console.error('Error fetching user profile:', err);
      }
    })
  }
  handleUpdate(user:User){
    this.userService.updateUser(user,user.id).subscribe({
      next:(res)=>{
        console.log('User updated:', res);
        alert('User updated successfully!');
        this.ngOnInit(); // Refresh the user list
      }
      ,error:(err)=>{
        console.error('Error updating user:', err);
        alert('Update failed');
      }
    })
  }

}
