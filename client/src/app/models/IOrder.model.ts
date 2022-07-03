export interface IOrder {
  cartId: number;
  finalPrice: number;
  city: string;
  street: string;
  shippingDate: Date;
  paymentLastDigits: string;
}
