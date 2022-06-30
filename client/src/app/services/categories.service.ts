import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ICategories from '../models/ICategories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesArray: ICategories[] = [];
  private categoriesSubject = new BehaviorSubject(this.categoriesArray);
  public baseUrl: string = 'http://localhost:3001/categories/';

  constructor(
    private _http: HttpClient
  ) {  }

  getAllCategories(): void {
    this._http.get<ICategories[]>(this.baseUrl)
      .subscribe((categories) => {
        this.categoriesArray = categories;
        this.categoriesSubject.next(this.categoriesArray);
      },
        err => {
          console.log(err);
          alert("Cannot get categories")
        })
  }

  followCategoriesArray = (): Observable<ICategories[]> =>{
    return this.categoriesSubject.asObservable();
  }


}
