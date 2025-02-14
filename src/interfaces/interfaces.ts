export interface IBasketPageData {
  id: number;
  count: number;
  product: {
    name: string;
    price: number;
    code: string;
    id: number;
  };
}

export interface IErrors {
  email?: string;
  password?: string;
}
