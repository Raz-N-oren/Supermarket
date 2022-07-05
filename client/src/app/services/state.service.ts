
import { Injectable } from '@angular/core';
import ICart from '../models/ICarts.model';
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

  cart:ICart;
  cities: string[] =[
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
    public _productsService: ProductsService,
    public _ordersService: OrdersService,
    public _usersService: UsersService,
    public _cartsService: CartsService,
    public _cartItemsService: CartItemsService,
    private _categoriesService: CategoriesService
  ) {
    this._productsService.getAllProducts();
    this._ordersService.getAmountOfOrders();
    this._categoriesService.getAllCategories();

    this._usersService.followCurrentUser().subscribe((newUser)=>{

      console.log("NEWUSER IN STATE", newUser);
      if(newUser){
        this._cartsService.getLastCart();
        this._ordersService.getLastPurchaseDate();
      }
      else{
        this._cartsService.setCurrentCart(null);
        this._ordersService.lastPurchaseDate = null;
      }
    })
    let userData: string = sessionStorage.getItem("userData");

    if(userData){
      let currentUser = JSON.parse(userData);
      this._usersService.setCurrentUser(currentUser);
    }

    this._cartsService.followCurrentCart().subscribe((newCart)=>{
      console.log("NEWCART IN STATE",newCart);

      if(newCart){
        this._cartItemsService.getCartItemsByCartId(newCart.id)
      }
      else{
        this._cartItemsService.cartItemsArray =[];
      }
    })
  }
}
