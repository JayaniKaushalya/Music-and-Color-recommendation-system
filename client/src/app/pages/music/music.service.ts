import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environments';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private apiUrl = Environment.baseUrl;
  private getColor = 'https://asia-south1-music-and-color-recommendation.cloudfunctions.net/colorai';
  private getMusic = 'https://asia-south1-music-and-color-recommendation.cloudfunctions.net/musicai';
  private getMusic2 = 'https://asia-south1-music-and-color-recommendation.cloudfunctions.net/function-1';
  
  constructor( private httpClient: HttpClient) { }

  getUserData(userID: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/music/getusers', userID);
  }

  createMusic(createData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/music/createmusic', createData);
  }

  deleteMusic(createData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/music/deletemusic', createData);
  }

  getColorData(color: any) {
   return this.httpClient.post<any>(this.getColor, color);
  }

  getPlaylistData(color: any) {
   return this.httpClient.post<any>(this.getMusic, color);
  }

  
}
