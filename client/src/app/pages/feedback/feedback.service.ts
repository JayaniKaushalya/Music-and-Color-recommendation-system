import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = Environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getReview(): any {
    return this.httpClient.get<any>(this.baseUrl + '/feedbacks');
  }
  deleteReview(id: any): any {
    return this.httpClient.delete<any>(this.baseUrl + '/feedbacks/' + id);
  }

}
