import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CaptureService {
  private apiUrl = Environment.baseUrl;
  private botUrl = "https://asia-south1-music-and-color-recommendation.cloudfunctions.net/function-1";
  constructor(private httpClient: HttpClient) { }
  saveMoodExpression(moodExpression: any): Observable<any>{
    return this.httpClient.post<any>(this.apiUrl + '/captures', moodExpression);
  }

  sendMessage(message: any): Observable<any>{
    return this.httpClient.post<any>(this.botUrl, message);
  }
}
