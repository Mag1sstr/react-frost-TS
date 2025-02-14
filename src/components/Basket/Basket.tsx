import "./Basket.css";
import { useEffect } from "react";
import axios from "axios";
import LoadingAnim from "../LoadingAnim/LoadingAnim";
import NoProductPage from "../NoProductPage/NoProductPage";
import { useTranslation } from "react-i18next";
import { IBasketPageData } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getBasketPageData,
  setBasketPageData,
  setSum,
} from "../../store/basketSlice";

// `/api/cart/increase?productId=...` - увеличивыает кол-во на 1.

// `/api/cart/decrease?productId=...` - уменьшает кол-во на 1.

interface IProps {
  setMainStage: (number: number) => void;
  setCurrentStage: (number: number) => void;
}

export default function Basket(props: IProps) {
  //   const [basketPageData, setBasketPageData] = useState<
  //     IBasketPageData[] | null
  //   >(null);
  //   let [sum, setSum] = useState(0);
  const { t } = useTranslation();

  // сохранить токен в localStorage и оттуда его использовать
  //   useEffect(() => {
  //     axios.get("https://frost.runtime.kz/api/cart").then((resp) => {
  //       // console.log(resp);

  //       setBasketPageData(resp.data.items);
  //       let sumPrice = 0;
  //       for (let el of resp.data.items) {
  //         sumPrice += el.product.price * el.count;
  //       }
  //       setSum(sumPrice);
  //     });
  //   }, []);
  const dispatch: AppDispatch = useDispatch();
  const { basketPageData, sum } = useSelector(
    (state: RootState) => state.basket
  );
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    dispatch(getBasketPageData());
  }, []);

  if (!user) {
    return <NoProductPage />;
  }

  if (!basketPageData) {
    return <LoadingAnim />;
  } else if (!basketPageData.length) {
    return <NoProductPage />;
  }

  return (
    <>
      <div style={{ marginBottom: "30px" }} className="conteiner">
        <div className="basket__inner">
          <h3 className="basket__title">{t("basket")}</h3>
          <div className="basket__sec">
            <div className="names__box">
              <div className="names">
                <p className="names__title">{t("product_name")}</p>
                {/* <p className="names__text">
                  Компрессор кондиционера Hyundai Tucson, Kia Sportage
                  97701-2E300FD; 0935-03se; Kia Sportage 97701-2E300FD; 0935-02
                </p> */}
              </div>
              <div className="prices">
                <div className="kol">
                  <p className="names__title">{t("quantity")}</p>
                  {/* <p className="kol__numbers">- 1 +</p> */}
                </div>
                <div className="kol">
                  <p className="names__title">{t("price")}</p>
                  {/* <p className="kol__numbers">110 999 тг</p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="basket__column">
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
                            const minusCount: IBasketPageData[] = [
                              ...basketPageData,
                            ];
                            if (minusCount[index].count > 1) {
                              minusCount[index] = {
                                ...minusCount[index],
                                count: minusCount[index].count - 1,
                              };
                              dispatch(
                                setSum(
                                  el.count > 1
                                    ? sum - el.product.price
                                    : el.product.price * el.count
                                )
                              );
                              axios.get(
                                `https://frost.runtime.kz/api/cart/decrease?productId=${el.product.id}`
                              );
                            }
                            dispatch(setBasketPageData(minusCount));
                          }}
                          className="kol__buttons"
                        >
                          -
                        </button>
                        <p className="kol__numbers">{el.count}</p>
                        <button
                          onClick={() => {
                            const plusCount: IBasketPageData[] = [
                              ...basketPageData,
                            ];
                            plusCount[index] = {
                              ...plusCount[index],
                              count: plusCount[index].count + 1,
                            };
                            dispatch(setBasketPageData(plusCount));
                            dispatch(setSum(sum + el.product.price));

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
                    <p className="delete__text">
                      {t("article")}: {el.product.code}
                    </p>
                    <button
                      onClick={() => {
                        axios.get(
                          `https://frost.runtime.kz/api/cart/delete?productId=${el.product.id}`
                        );

                        const copyData: IBasketPageData[] = [...basketPageData];
                        const filteredData = copyData.filter(
                          (item: { product: { id: number } }) => {
                            return item.product.id !== el.product.id;
                          }
                        );
                        dispatch(setBasketPageData(filteredData));

                        dispatch(setSum(sum - el.product.price * el.count));
                      }}
                      // href="#!"
                      className="delete__link"
                    >
                      {t("delete")}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="payment">
            <div className="payment__select">
              <p className="payment__text">{t("payment_method")}</p>
              <select className="payment__sel">
                <option>Оплата при получении</option>
              </select>
            </div>
            <div className="payment__price">
              <p>{t("total_price")}:</p>
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
              {t("checkout_btn")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
