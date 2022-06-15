import ICart from "./ICarts.model";

export default interface SuccessfulLoginServerResponse{
  token: string;
  firstName: string;
  lastName: string,
  shippingCity: string,
  shippingStreet: string,
  role: string,
  cart: ICart
}
