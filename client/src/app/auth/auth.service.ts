import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = Environment.baseUrl;
  constructor( private httpClient: HttpClient) { }

  login(loginDetails: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/users/login', loginDetails);
  }

  createUser(userDetails: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/users', userDetails);
  }
}


