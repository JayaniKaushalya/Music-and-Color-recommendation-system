import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  private baseUrl = Environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  submitContactUs(contactUsDetails: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/feedbacks', contactUsDetails);
  }
}
