import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  timeRanges: Object[];
  timeRangeSelected: string;

  spotifyModules: Object[];
  spotifyModuleSelected: string;

  results: Object;
  preferenceForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  code: string;
  token: string;

  constructor(private data: DataService, private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { 
    this.preferenceForm = this.formBuilder.group({
      spotifyModule: [''],
      timeRange: [''],
      numberLimit: ['', Validators.max(50)],
    })
  }

  authorize() {
    window.location.href = "https://accounts.spotify.com/authorize?response_type=code&client_id=ae7033e1ebde42c5a2f65afd8949d0c5&scope=user-top-read&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fartists%2F";
  }

  onSubmit() {
    this.submitted = true;

    if (this.preferenceForm.invalid) {
      return;
    }

    this.success = true;

    this.code = this.router.url.substring(14, this.router.url.length);
    this.http.post('http://localhost:3000/token/' + this.spotifyModuleSelected + '/' + this.code, {}).subscribe((data : any) => {
      this.token = data.body.access_token;

      this.data.getUserData(this.spotifyModuleSelected, this.timeRangeSelected, this.preferenceForm.get('numberLimit').value, this.token).subscribe((data : any) => {
        this.results = data;
      });
    });
  }

  ngOnInit() {
    this.spotifyModules = [
      {id: 1, name: "Tracks", value: "tracks"},
      {id: 2, name: "Artists", value: "artists"},
    ];

    this.timeRanges = [
      {id: 1, name: "Last 4 weeks", value: "short_term"},
      {id: 2, name: "Last 6 months", value: "medium_term"},
      {id: 3, name: "Last few years", value: "long_term"}
    ];

    if(window.location.href.length < 30) {
      window.location.href = "https://accounts.spotify.com/authorize?response_type=code&client_id=ae7033e1ebde42c5a2f65afd8949d0c5&scope=user-top-read&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fartists%2F";
    }

    // this.code = this.router.url.substring(14, this.router.url.length);
    // this.http.post('http://localhost:3000/token/tracks/' + this.code, {}).subscribe((data : any) => {
    //   this.token = data.body.access_token;
      
    //   this.data.getUserData("tracks", "short_term", "10", this.token).subscribe((data : any) => {
    //     this.results = data;
    //   });
    // });
  }

}
