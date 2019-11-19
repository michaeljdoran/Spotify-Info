import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { ResultsObject } from '../results-object';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  timeRanges: Object[];
  timeRangeSelected: string = "short_term";
  spotifyModules: Object[];
  spotifyModuleSelected: string = "tracks";
  spotifyModuleDisplayed: string = "tracks";

  results: ResultsObject;
  preferenceForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;

  code: string;
  access_token: string;
  refresh_token: string;

  constructor(private data: DataService, private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { 
    this.preferenceForm = this.formBuilder.group({
      spotifyModule: ['Tracks'],
      timeRange: [''],
      numberLimit: ['10', Validators.max(50)]
    })
  }

  authorize() {
    var redirect_uri = encodeURIComponent(environment.backend.baseURL + "/spotify/");
    window.location.href = "https://accounts.spotify.com/authorize?response_type=code&client_id=ae7033e1ebde42c5a2f65afd8949d0c5&scope=user-top-read&redirect_uri=" + redirect_uri;
  }

  async onSubmit() {
    this.submitted = true;

    if (this.preferenceForm.invalid) {
      return;
    }

    this.success = true;

    await this.data.refreshTokens(this.refresh_token).then((res : any) => {
      this.access_token = res.access_token;
    });

    this.data.getUserData(this.spotifyModuleSelected, this.timeRangeSelected, this.preferenceForm.get('numberLimit').value, this.access_token).subscribe((data : any) => {
      this.results = data;
      this.spotifyModuleDisplayed = this.spotifyModuleSelected;
    });
  }

  async ngOnInit() {
    this.spotifyModules = [
      {id: 1, name: "Tracks", value: "tracks"},
      {id: 2, name: "Artists", value: "artists"},
    ];

    this.timeRanges = [
      {id: 1, name: "Last 4 weeks", value: "short_term"},
      {id: 2, name: "Last 6 months", value: "medium_term"},
      {id: 3, name: "Last few years", value: "long_term"}
    ];

    if(this.router.url.length < 30) {
      this.authorize();
    } else {
      this.router.navigate([], {
        queryParams: {
          code: null
        },
        queryParamsHandling: 'merge'
      });
    }

    this.code = this.router.url.substring(this.router.url.indexOf("?code=") + 6, this.router.url.length);

    await this.data.getUserTokens(this.code, "tracks").then((res : any) => {
      this.access_token = res.access_token;
      this.refresh_token = res.refresh_token;
    });

    this.data.getUserData(this.spotifyModuleSelected, this.timeRangeSelected, this.preferenceForm.get('numberLimit').value, this.access_token).subscribe((data : any) => {
      this.results = data;
      this.spotifyModuleDisplayed = this.spotifyModuleSelected;
    });
  }
}
