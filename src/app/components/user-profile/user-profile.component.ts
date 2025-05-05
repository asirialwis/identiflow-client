import { Component,OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/register';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  user!: User;

  constructor(private userService:UserService , private toastr:ToastrService){}


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
        this.toastr.success('Update Successfully!','Success')
        this.ngOnInit(); // Refresh the user list
      }
      ,error:(err)=>{
        console.error('Error updating user:', err);
        this.toastr.error('Update Failed','Error')
      }
    })
  }

}
