import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  refreshTokens(refresh_token) {
    return new Promise((resolve) => {
      this.http.post('http://localhost:3000/refresh/' + refresh_token + '/', {}).subscribe((data : any) => {
        resolve(data.body);
      });
    });
  }

  getUserTokens(code, spotifyModule) {
    return new Promise((resolve) => {
      this.http.post('http://localhost:3000/token/' + spotifyModule + '/' + code, {}).subscribe((data : any) => {
        resolve(data.body);
      });
    });
  }

  getUserData(spotifyModule, timeRange, limit, token) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + token
    });
    return this.http.get("https://api.spotify.com/v1/me/top/" + spotifyModule + "?time_range="+ timeRange + "&limit=" + limit, { 
      headers 
    });
  }
}
