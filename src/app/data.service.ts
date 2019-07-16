import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUserArtists(timeRange, limit, token) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + token
    });
    return this.http.get("https://api.spotify.com/v1/me/top/artists?time_range="+ timeRange + "&limit=" + limit, {
      headers
    });
  }

  getUserTracks(timeRange, limit, token) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + token
    });
    return this.http.get("https://api.spotify.com/v1/me/top/tracks?time_range="+ timeRange + "&limit=" + limit, {
      headers
    });
  }
}
