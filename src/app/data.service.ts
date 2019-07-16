import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUserArtists(timeRange, limit) {
    const headers = new HttpHeaders({
      Authorization: "Bearer BQDaduKizqJlRX8H7AjYKnPB5rJzly8-hPgTzgowDP_sAEfVjhXyowC0-EtXjTgXY-uIAl-AgVj6I_4JlH_OaGoztjMK4ND7puQCnVkSQR7-pSe2rTDoim6hWcKDP3nP9FT9snGGfdxh3LIfUPQrWwqp0pkyvVKxQQ"
    });
    return this.http.get("https://api.spotify.com/v1/me/top/artists?time_range="+ timeRange + "&limit=" + limit, {
      headers
    });
  }

  getUserTracks(timeRange, limit) {
    const headers = new HttpHeaders({
      Authorization: "Bearer BQBfl5IZf_0-MdHUhRKWsuSDBzvq6Xcglp3kYkY0mWBJyawx5kwCzAGByDaIJUXmaMbPMaYpVDxemdb7EZP4Pa5OganQQOchcUEMKhDsnIr1GeN7mzU0MrHtRfYQfegSp5f__H14OqSFlpOd_yB-ldAwNb58s9mmqw"
    });
    return this.http.get("https://api.spotify.com/v1/me/top/tracks?time_range="+ timeRange + "&limit=" + limit, {
      headers
    });
  }
}
