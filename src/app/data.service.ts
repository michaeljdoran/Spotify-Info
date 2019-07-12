import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getToken(){
    let params = ('grant_type=client_credentials');
    let client_id = 'ae7033e1ebde42c5a2f65afd8949d0c5'; // Your client id
    let client_secret = '3979189269b44a358023f0dfff6424cb'; // Your secret
    let encoded = btoa(client_id + ':' + client_secret);
    let headers = new HttpHeaders();
    headers.append( 'Authorization', 'Basic ' + encoded);
    headers.append('Content-Type' , 'application/x-www-form-urlencoded');
    let uurl = 'https://accounts.spotify.com/api/token';

    return this.http.post(uurl, params, { headers : headers }).pipe(
        map(data => { })).subscribe(result => {
          return result;
        });
}

  getUserArtists(timeRange, limit) {
    let authorizationHeader = "BQBEjwR1Uugqu_zenqC4eOgHRCmMyk6JFO6MoB79oQHDmKwapBnJK5GI1MXsl3e8y2jGFiuRDhlUJxb-qX2koFABLkzzkSmjN321A8z8fyX_8f5uDEHbWNrqTUAPNuI6Lrxnng_m72iwV__25CK7arZ6B6SMNXGifg";

    const headers = new HttpHeaders({
      Authorization: "Bearer " + authorizationHeader
    });
    return this.http.get("https://api.spotify.com/v1/me/top/artists?time_range="+ timeRange + "&limit=" + limit, {
      headers
    });
  }

  getUserTracks(timeRange, limit) {
    let authorizationHeader = "BQD0Mu1SPWLectias1NP84eBkdfn9dvpBh0yMrUH64nFywfSv8VbowmzLVvUNMiFaYH0QBY7VWkcfKBb8Psdheq1BRukm2ik7kDuZmkt2haVchboDnxLM8EUl2nbGXTh047f0lylL3T_nq4bllgh9hxA0ihHG75x7w";

    const headers = new HttpHeaders({
      Authorization: "Bearer " + authorizationHeader
    });
    return this.http.get("https://api.spotify.com/v1/me/top/tracks?time_range="+ timeRange + "&limit=" + limit, {
      headers
    });
  }
}
