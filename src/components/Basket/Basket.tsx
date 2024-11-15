import "./Basket.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingAnim from "../LoadingAnim/LoadingAnim";
import NoProductPage from "../NoProductPage/NoProductPage";

// `/api/cart/increase?productId=...` - увеличивыает кол-во на 1.

// `/api/cart/decrease?productId=...` - уменьшает кол-во на 1.

interface IProps {
  setMainStage: (number: number) => void;
  setCurrentStage: (number: number) => void;
}
export default function Basket(props: IProps) {
  const [basketPageData, setBasketPageData] = useState<[] | null>(null);
  let [sum, setSum] = useState(0);

  // сохранить токен в localStorage и оттуда его использовать
  useEffect(() => {
    axios.get("https://frost.runtime.kz/api/cart").then((resp) => {
      console.log(resp);

      setBasketPageData(resp.data.items);
      let sumPrice = 0;
      for (let el of resp.data.items) {
        sumPrice += el.product.price * el.count;
      }
      setSum(sumPrice);
    });
  }, []);

  if (basketPageData == null) {
    return <LoadingAnim />;
  } else if (basketPageData.length == 0) {
    return <NoProductPage />;
  }

  interface IBasketPageData {
    id: number;
    count: number;
    product: {
      name: string;
      price: number;
      code: string;
    };
  }
  return (
    <>
      <div style={{ marginBottom: "30px" }} className="conteiner">
        <div className="basket__inner">
          <h3 className="basket__title">Корзина</h3>
          <div className="basket__sec">
            <div className="names__box">
              <div className="names">
                <p className="names__title">Наименование товара</p>
                {/* <p className="names__text">
                  Компрессор кондиционера Hyundai Tucson, Kia Sportage
                  97701-2E300FD; 0935-03se; Kia Sportage 97701-2E300FD; 0935-02
                </p> */}
              </div>
              <div className="prices">
                <div className="kol">
                  <p className="names__title">Количество</p>
                  {/* <p className="kol__numbers">- 1 +</p> */}
                </div>
                <div className="kol">
                  <p className="names__title">Цена</p>
                  {/* <p className="kol__numbers">110 999 тг</p> */}
                </div>
              </div>
            </div>
          </div>
          {basketPageData.map((el: IBasketPageData, index) => {
            return (
              <div key={el.id} className="basket__sec">
                <div className="names__box">
                  <div className="names">
                    <p className="names__text">{el.product.name}</p>
                  </div>
                  <div className="prices">
                    <div className="kol">
                      <button
                        onClick={() => {
                          let minusCount: [] = [...basketPageData];
                          if (minusCount[index].count <= 1) {
                            null;
                          } else {
                            minusCount[index].count -= 1;
                          }
                          setBasketPageData(minusCount);
                          setSum(
                            el.count <= 1
                              ? el.product.price * el.count
                              : (sum -= el.product.price)
                          );

                          axios.get(
                            `https://frost.runtime.kz/api/cart/decrease?productId=${el.product.id}`
                          );
                        }}
                        className="kol__buttons"
                      >
                        -
                      </button>
                      <p className="kol__numbers">{el.count}</p>
                      <button
                        onClick={() => {
                          let plusCount: [] = [...basketPageData];
                          plusCount[index].count += 1;
                          setBasketPageData(plusCount);
                          setSum((sum += el.product.price));

                          axios.get(
                            `https://frost.runtime.kz/api/cart/increase?productId=${el.product.id}`
                          );
                        }}
                        className="kol__buttons"
                      >
                        +
                      </button>
                    </div>
                    <div className="kol">
                      <p className="kol__numbers">
                        {el.product.price * el.count} тг
                      </p>
                    </div>
                  </div>
                </div>
                <div className="delete">
                  <p className="delete__text">Артикул: {el.product.code}</p>
                  <button
                    onClick={() => {
                      axios.get(
                        `https://frost.runtime.kz/api/cart/delete?productId=${el.product.id}`
                      );

                      let copyData = [...basketPageData];
                      let filteredData = copyData.filter((item) => {
                        return item.product.id !== el.product.id;
                      });
                      setBasketPageData(filteredData);

                      setSum((sum -= el.product.price * el.count));
                    }}
                    href="#!"
                    className="delete__link"
                  >
                    Удалить из корзины
                  </button>
                </div>
              </div>
            );
          })}
          <div className="payment">
            <div className="payment__select">
              <p className="payment__text">Способ оплаты</p>
              <select className="payment__sel">
                <option>Оплата при получении</option>
              </select>
            </div>
            <div className="payment__price">
              <p>Итого к оплате:</p>
              <p>{sum} тг</p>
            </div>
          </div>
        </div>
      </div>
      <div className="payment__button">
        <div className="conteiner">
          <div className="inner">
            <button
              onClick={() => {
                props.setMainStage(1);
                props.setCurrentStage(2);
              }}
              className="payment__btn"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
