import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/register';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser!: User;
  showDeleteDialog = false;
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        console.log(this.users);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  handleUpdate(user: User) {
    this.userService.updateUser(user, user.id).subscribe({
      next: (res) => {
        console.log('User updated:', res);
        this.toastr.success('User updated successfully!', 'Success');
        this.ngOnInit(); // Refresh the user list
      },
      error: (err) => {
        console.error('Error updating user:', err);
        this.toastr.error('Update failed', 'Error');
      },
    });
  }

  openDeleteDialog(user: User) {
    this.selectedUser = user;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe({
      next: (res) => {
        this.closeDeleteDialog();
        this.toastr.success('User Deleted Sucessfully!', 'Success');
        this.ngOnInit();  //refresh the userList
      },
      error: (err) => {
        console.error('Delete Failed', err);
        this.toastr.error('Delete Failed', 'Error');
      },
    });
  }
}
