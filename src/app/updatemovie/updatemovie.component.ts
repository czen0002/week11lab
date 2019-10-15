import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-updatemovie',
  templateUrl: './updatemovie.component.html',
  styleUrls: ['./updatemovie.component.css']
})
export class UpdatemovieComponent implements OnInit {
  private moviesDB: any[] = [];
  private actorsDB: any[] = [];

  title: string = "";
  year: number = 0;
  movieId: string = "";
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  constructor(private dbService: DatabaseService, private router: Router) { }

  onGetMovies() {
    console.log("From on GetMovies");
    this.dbService.getMovies().subscribe((data:any[]) => {
      this.moviesDB = data;
    });  
  }

  onSelectMovie(item){
    this.title = item.title;
    this.year = item.year;
    this.movieId = item._id;
  }

  // Update Movie
  onUpdataMovie(){
    let movieId = this.movieId;
    let actorId = this.actorId;
    let actorObj = { name: this.fullName, bYear: this.bYear, id: this.actorId };
    let movieObj = { title: this.title, year: this.year, id: this.movieId };
    this.dbService.updateMovie(movieId, actorObj).subscribe(result => this.dbService.updateMovie1(actorId, movieObj).subscribe(result => {
      this.router.navigate(["/listmovies"]);
    }))
  }

  onGetActors() {
    console.log("From on GetActors");
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

}
