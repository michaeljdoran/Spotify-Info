import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private data: DataService, private formBuilder: FormBuilder) { 
    this.preferenceForm = this.formBuilder.group({
      timeRange: [''],
      numberLimit: ['', Validators.max(50)]
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.preferenceForm.invalid) {
      return;
    }

    this.success = true;

    this.data.getUserArtists(this.timeRangeSelected, this.preferenceForm.get('numberLimit').value).subscribe((data : any) => {
      this.artists = data;
      console.log(this.artists);
    });
  }

  ngOnInit() {
    this.timeRanges = [
      {id: 1, value: "short_term"},
      {id: 2, value: "medium_term"},
      {id: 3, value: "long_term"}
    ];

    this.data.getUserArtists("long_term", "50").subscribe((data : any) => {
      this.artists = data;
      console.log(this.artists);
    });
  }

}
