export interface IOrder {
  cartId: number;
  finalPrice: number;
  shippingCity: string;
  shippingStreet: string;
  shippingDate: Date;
  orderDate: Date;
  paymentLastDigits: string;
}
