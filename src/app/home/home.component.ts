import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

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
  code: string;
  token: string;

  constructor(private data: DataService, private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { 
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
  }

  ngOnInit() {
    this.timeRanges = [
      {id: 1, name: "Last 4 weeks", value: "short_term"},
      {id: 2, name: "Last 6 months", value: "medium_term"},
      {id: 3, name: "Last few years", value: "long_term"}
    ];
  }
}
