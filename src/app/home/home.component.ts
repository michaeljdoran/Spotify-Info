import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  timeRanges: Object[];
  timeRangeSelected: string;

  tracks: Object;
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

    this.data.getUserTracks(this.timeRangeSelected, this.preferenceForm.get('numberLimit').value).subscribe((data : any) => {
      this.tracks = data;
      console.log(this.tracks);
    });
  }

  ngOnInit() {
    this.timeRanges = [
      {id: 1, value: "short_term"},
      {id: 2, value: "medium_term"},
      {id: 3, value: "long_term"}
    ];

    this.data.getUserTracks("long_term", "50").subscribe((data : any) => {
      this.tracks = data;
      console.log(this.tracks);
    });
  }

}
