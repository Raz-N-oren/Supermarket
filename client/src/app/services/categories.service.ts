import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ICategories from '../models/ICategories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public categoriesArray: ICategories[] = [];
  public baseUrl: string = 'http://localhost:3001/categories/';

  constructor(
    private _http: HttpClient
  ) { }

  public getAllCategories(): void {
    this._http.get<ICategories[]>(this.baseUrl)
      .subscribe((categories) => { this.categoriesArray = categories },
        err => {
          console.log(err);
          alert("Cannot get categories")
        })
  }
}
