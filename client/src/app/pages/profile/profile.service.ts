import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = Environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  updateProfile(userID: string, profileDetails: any): any {
    return this.httpClient.put<any>(this.baseUrl + '/users/' + userID, profileDetails);
  }
}
