import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  timeRanges: Object[];
  timeRangeSelected: string;

  artists: Object;
  preferenceForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  code: string;
  token: string;

  constructor(private data: DataService, private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { 
    this.preferenceForm = this.formBuilder.group({
      timeRange: [''],
      numberLimit: ['', Validators.max(50)]
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
    console.log(this.code);
    this.http.post('http://localhost:3000/token/artists/' + this.code, {}).subscribe((data : any) => {
      this.token = data.body.access_token;

      this.data.getUserArtists(this.timeRangeSelected, this.preferenceForm.get('numberLimit').value, this.token).subscribe((data : any) => {
        this.artists = data;
      });
    });
  }

  ngOnInit() {
    this.timeRanges = [
      {id: 1, value: "short_term"},
      {id: 2, value: "medium_term"},
      {id: 3, value: "long_term"}
    ];

    // this.data.getUserArtists("long_term", "50", this.token).subscribe((data : any) => {
    //   this.artists = data;
    //   console.log(this.artists);
    // });
  }

}
