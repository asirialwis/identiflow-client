import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login,User,Register } from '../interfaces/register';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient , private router:Router , private toastr:ToastrService) { }

  //getToken from the session
  getToken(): string {
    const token = sessionStorage.getItem('token');
  
    if (!token) {
      this.toastr.warning('Please Login First', 'Warning');
      this.router.navigate(['/user-login']);
      throw new Error('Token not found. User is not authenticated.');
    }
  
    return token;
  }
  
  
  registerUser(data: Register): Observable<any> {
    return this.http.post('http://localhost:8080/api/users', data);
  }

  loginUser(data:Login): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/login', data);
  }

  getAllUsers(): Observable<User[]> {
    const headers = { Authorization : `Bearer ${this.getToken()}` };
    return this.http.get<User[]>('http://localhost:8080/api/users',{headers});
  }

  getUserProfile():Observable<User>{
    const token = this.getToken();
    const headers = { Authorization : `Bearer ${token}` };
    return this.http.get<User>('http://localhost:8080/api/users/profile',{headers});
  }

  updateUser(data:User,id:number):Observable<User>{
    console.log(id);
    return this.http.put<User>(`http://localhost:8080/api/users/${id}`,data);
  }
  
  deleteUser(id:number):Observable<User>{
    return this.http.delete<User>(`http://localhost:8080/api/users/${id}`);
  }
  
}
