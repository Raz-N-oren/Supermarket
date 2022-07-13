import ICart from "./ICarts.model";

export default interface SuccessfulLoginServerResponse {
  token: string;
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  role: string;
  userCart: ICart;
}
