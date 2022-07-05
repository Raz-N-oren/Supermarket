import { CategoriesService } from 'src/app/services/categories.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IProduct from '../models/IProduct.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public productsArray: IProduct[] = [];
  public baseUrl: string = 'http://localhost:3001/products/';
  private currentProductSubject = new BehaviorSubject<IProduct>(null);

  productToEdit: IProduct;
  amountOfProducts: number;


  constructor(private _http: HttpClient) { }

  public getAllProducts(): void {
    this._http.get<IProduct[]>(this.baseUrl)
      .subscribe((products) => {
        this.productsArray = products,
          this.amountOfProducts = products.length
      },
        err => {
          console.log(err);
          alert("Cannot get products")
        })
  }

  public getProductsByCategory(categoryId: number): void {
    this._http.get<IProduct[]>(this.baseUrl + categoryId)
      .subscribe((products) => { this.productsArray = products },
        err => {
          console.log(err);
          alert("Cannot get products. ")
        });
  };

  public addNewProduct(product: object): void {
    this._http.post<IProduct>(this.baseUrl, product)
      .subscribe((product) => {
        console.log("Product has been added. ", product);
        this.getAllProducts();
      },
        err => {
          console.log(err);
          alert("Cannot Add New product")
        }
      )
  }

  public deleteProduct(id: string): void {
    this._http.delete<IProduct>(this.baseUrl + id)
      .subscribe((product) => {
        console.log(product);
        this.getAllProducts();
      },
        err => {
          console.log(err);
          alert("Cannot Delete product.");
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
          alert("Cannot get products. ")
        });
  };

  editProduct = (productToEdit: object) => {
    this._http.put(this.baseUrl, productToEdit).subscribe((product) => {
      this.getAllProducts();
    },
      (e) => {
        console.log(e);
        alert("Cannot edit product.");
      }
    )
  }

  followCurrentProduct = (): Observable<IProduct> => {
    return this.currentProductSubject.asObservable();
  }

  setCurrentProduct = (newProduct: IProduct) => {
    this.productToEdit = newProduct;
    this.currentProductSubject.next(newProduct);
  }


}
