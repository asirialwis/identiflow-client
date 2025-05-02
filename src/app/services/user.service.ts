import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login,User } from '../interfaces/register';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient , private router:Router) { }

  //getToken from the session
  getToken() {
    if (sessionStorage.getItem('token')) {
      return sessionStorage.getItem('token');
    }
    else if (!localStorage.getItem('token')) {
      this.router.navigate(['/user-login']);
      alert('Please login first');
    }
    return null;
  }
  
  registerUser(data: any): Observable<any> {
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
    const headers = { Authorization : `Bearer ${this.getToken()}` };
    return this.http.get<User>('http://localhost:8080/api/users/profile',{headers});
  }

  updateUser(data:User,id:number):Observable<User>{
    console.log(id);
    return this.http.put<User>(`http://localhost:8080/api/users/${id}`,data);
  }
  
}
