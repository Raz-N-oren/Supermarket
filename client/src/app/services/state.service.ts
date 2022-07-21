import { Injectable } from '@angular/core';
import ICart from '../models/ICarts.model';
import IUser from '../models/IUser.model';
import { CartItemsService } from './cart-items.service';
import { CartsService } from './carts.service';
import { CategoriesService } from './categories.service';
import { OrdersService } from './orders.service';
import { ProductsService } from './products.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  isStore: boolean;
  searchedInput: string;
  currentUser: IUser;

  cart: ICart;
  cities: string[] = [
    'Akko',
    'Afula',
    'Al Buţayḩah',
    'Al Khushnīyah',
    'Ashdod',
    'Ashqelon',
    'Bat Yam',
    'Beersheba',
    'Bené Beraq',
    'Bet Shemesh',
    'Dimona',
    'Eilat',
    'El‘ad',
    'Eṭ Ṭaiyiba',
    'Fīq',
    'Givatayim',
    'Hadera',
    'Haifa',
    'Herẕliyya',
    'Hod HaSharon',
    'Holon',
    'Jerusalem',
    'Karmiel',
    'Kefar Sava',
    'Lod',
    'Ma‘alot Tarshīḥā',
    'Modi‘in Makkabbim Re‘ut',
    'Nahariyya',
    'Nazareth',
    'Nes Ẕiyyona',
    'Netanya',
    'Netivot',
    'Or Yehuda',
    'Petaẖ Tiqwa',
    'Qiryat Ata',
    'Qiryat Bialik',
    'Qiryat Gat',
    'Qiryat Moẕqin',
    'Qiryat Ono',
    'Qiryat Yam',
    'Ra‘ananna',
    'Rahat',
    'Ramat Gan',
    'Ramat HaSharon',
    'Ramla',
    'Reẖovot',
    'Rishon LeẔiyyon',
    'Rosh Ha‘Ayin',
    'Sakhnīn',
    'Tamra',
    'Tel Aviv-Yafo',
    'Tiberias',
    'Umm el Faḥm',
    'Yehud',
    'Ẕefat'
  ]

  constructor(
    private _productsService: ProductsService,
    private _ordersService: OrdersService,
    private _usersService: UsersService,
    private _cartsService: CartsService,
    private _cartItemsService: CartItemsService,
    private _categoriesService: CategoriesService
  ) {
    this._productsService.getAllProducts();
    this._ordersService.getAmountOfOrders();
    this._categoriesService.getAllCategories();

    this._usersService.followCurrentUser().subscribe((newUser) => {
      if (newUser) {
        this._cartsService.getLastCart();
        this._ordersService.getLastPurchaseDate();
        this.currentUser = newUser;
      }
      else {
        this._cartsService.setCurrentCart(null);
        this._ordersService.lastPurchaseDate = null;
      }
    })


    let userData: string = sessionStorage.getItem("userData");

    if (userData) {
      let currentUser = JSON.parse(userData);
      this._usersService.setCurrentUser(currentUser);
    }

    this._cartsService.followCurrentCart().subscribe((newCart) => {
      if (newCart) {
        if (newCart.isOpen == false && this.currentUser.role == 'user' ) {
          this._cartsService.openCart();
        }
        else {
          this._cartItemsService.getCartItemsByCartId(newCart.id)
        }
      }
      else {
        this._cartItemsService.setCartItems(null);
      }
    })
  }
}
