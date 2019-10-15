import { DatabaseService } from './../database.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-listmovies',
  templateUrl: './listmovies.component.html',
  styleUrls: ['./listmovies.component.css']
})
export class ListmoviesComponent implements OnInit {
  private moviesDB: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit() {
    console.log("Hi From MovieActors ngIOnit");

    this.dbService.getMovies().subscribe((data:any[]) => {
      this.moviesDB = data;
    });
    
  }

}
