import { Component , OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/register';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  constructor(private userService: UserService) {}

  


  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        console.log(this.users);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  handleUpdate(user: User) {
    this.userService.updateUser(user , user.id).subscribe({
      next: (res) => {
        console.log('User updated:', res);
        alert('User updated successfully!');
        this.ngOnInit(); // Refresh the user list
      },
      error: (err) => {
        console.error('Error updating user:', err);
        alert('Update failed');
      }
    });
  }

}
