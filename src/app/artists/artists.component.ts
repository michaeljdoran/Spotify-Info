import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  h1Style: boolean = false;
  artists: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUserArtists().subscribe((data : any) => {
      this.artists = data;
      console.log(this.artists);
    });
  }

}
