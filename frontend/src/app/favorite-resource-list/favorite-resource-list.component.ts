import { Component, OnInit } from '@angular/core';
import { ResourceApiService } from "../shared/resource-api/resource-api.service";
import { Resource } from "../resource";

@Component({
  selector: 'app-favorite-resource-list',
  templateUrl: './favorite-resource-list.component.html',
  styleUrls: ['./favorite-resource-list.component.css']
})
export class FavoriteResourceListComponent implements OnInit {

  resources: Resource[];

  constructor(
    private api: ResourceApiService,
  ) {
      this.resources = [];
  }

  getFavoriteResources() {
    this.api.getUserFavorites().subscribe(
      (favorites) => {
        for (let f of favorites) {
          this.resources.push(f.resource)
        }
      }
    );
  }

  getSession() {
    return this.api.session;
  }

  ngOnInit() {
      this.getFavoriteResources();
  }

}
