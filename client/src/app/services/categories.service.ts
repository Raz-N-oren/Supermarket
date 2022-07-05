import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ICategories from '../models/ICategories.model';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesArray: ICategories[] = [{id:0,name:"All"}];
  private categoriesSubject = new BehaviorSubject(this.categoriesArray);
  public baseUrl: string = 'http://localhost:3001/categories/';
  selectedCategory: number = 0;

  constructor(
    private _http: HttpClient,
    private _messageService: MessageService
  ) {  }

  getAllCategories(): void {
    this._http.get<ICategories[]>(this.baseUrl)
      .subscribe((categories) => {
       categories.forEach((category) => {
        this.categoriesArray.push(category);
        });
        this.categoriesSubject.next(this.categoriesArray);
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Cannot get categories' });

        })
  }

  followCategoriesArray = (): Observable<ICategories[]> =>{
    return this.categoriesSubject.asObservable();
  }

}
