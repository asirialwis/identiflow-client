import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  
  registerUser(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/users', data);
  }

  loginUser(data:{email:string;password:string}): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/login', data);
  }
  
}
