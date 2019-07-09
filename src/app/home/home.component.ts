import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  h1Style: boolean = false;
  tracks: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUserTracks().subscribe((data : any) => {
      this.tracks = data;
      console.log(this.tracks);
    });
  }

}
