import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-listactors",
  templateUrl: "./listactors.component.html",
  styleUrls: ["./listactors.component.css"],
})
export class ListactorsComponent implements OnInit {
  private actorsDB: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit() {
    console.log("Hi From ListActors ngIOnit");

    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
}