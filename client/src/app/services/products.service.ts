import { CategoriesService } from 'src/app/services/categories.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IProduct from '../models/IProduct.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsArray: IProduct[] = [];
  baseUrl: string = 'http://localhost:3001/products/';
  currentProductSubject = new BehaviorSubject<IProduct>(null);
  amountOfProducts: number;

  constructor(
    private _http: HttpClient,
    private _messageService: MessageService,
    private _categoriesService: CategoriesService
  ) { }

  public getAllProducts(): void {
    this._http.get<IProduct[]>(this.baseUrl)
      .subscribe((products) => {
        this.productsArray = products,
          this.amountOfProducts = products.length,
          this._categoriesService.selectedCategory = 0;
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Failed to get products.' });
        })
  }

  public getProductsByCategory(categoryId: number): void {
    this._http.get<IProduct[]>(this.baseUrl + categoryId)
      .subscribe((products) => { this.productsArray = products },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Failed to get products.' });
        });
  };

  public addNewProduct(product: object): void {
    this._http.post<IProduct>(this.baseUrl, product)
      .subscribe((product) => {
        this._messageService.add({ key: 'appToast-right', severity: 'success', summary: 'Success', detail: 'The Product has been added.' });

        this.getAllProducts();
      },
        err => {
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'The product upload has failed.' });
          console.log(err);

        }
      )
  }

  public deleteProduct(id: string): void {
    this._http.delete<IProduct>(this.baseUrl + id)
      .subscribe((product) => {
        this._messageService.add({ key: 'appToast-right', severity: 'success', summary: 'Success', detail: 'The Product has been deleted.' });
        this.getAllProducts();
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Failed to delete product.' });
        })
  }

  public getProductsBySearchString(searchInputString: string): void {
    this._http.get<IProduct[]>(this.baseUrl + `search/` + searchInputString)
      .subscribe((products) => {
        this.productsArray = products
        if (!searchInputString) {
          this.getAllProducts();
        }
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Failed to get products.' });
        });
  };

  public editProduct = (productToEdit: object) => {
    this._http.put(this.baseUrl, productToEdit).subscribe((product) => {
      this._messageService.add({ key: 'appToast-right', severity: 'success', summary: 'Success', detail: 'The Product has been edited.' });
      this.getAllProducts();
    },
      (e) => {
        console.log(e);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Failed to edit product.' });
      }
    )
  }

  followCurrentProduct = (): Observable<IProduct> => {
    return this.currentProductSubject.asObservable();
  }

  setCurrentProduct = (newProduct: IProduct) => {
    this.currentProductSubject.next(newProduct);
  }


}
