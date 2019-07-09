import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUserArtists() {
    const headers = new HttpHeaders({
      Authorization: "Bearer BQD6kBy4ROnZamZRhcstmWdqUGBHffmvO2QackuMgHbOX25gRhx1OPC61c5Aphc39JLP-QItXB7XMUYEBsDYzOJIbvCYZWL1h12TuOsn5A_tjfhONQmA3TDTJMQc1qTuQPc6OhR1Tb3-RAc7m7rTtpCLisi1u9fvsw"
    });
    return this.http.get("https://api.spotify.com/v1/me/top/artists", {
      headers
    });
  }

  getUserTracks() {
    const headers = new HttpHeaders({
      Authorization: "Bearer BQBJTHvcfnZ4dJdSFXFmV3gFFF42AwrItANxStsvZQ8rLMu6Ngm7A5rTzUJnET7C7TsKVJ2aiWItqPM8YEmvj-2WYeKfQ9Mrr4rMLi4cKODcqnebat3uFSKQ5krTNU6FqEcEHWhxbVCmzEjNHF5L9t-dVfnJhLW4bQ"
    });
    return this.http.get("https://api.spotify.com/v1/me/top/tracks", {
      headers
    });
  }
}
