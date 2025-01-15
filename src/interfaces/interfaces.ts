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
