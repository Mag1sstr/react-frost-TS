import { useState } from "react";
import "./BuyButtonForm.css";
import axios from "axios";
// import { AuthContext } from "../../contexts/Auth/AuthContextProvider";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
// import { messageToast } from "../ProductPage/ProductPage"
import { toast } from "react-toastify";

interface IProps {
  clickCardText: string;
  style: string | null;
  setClickBuyBtn: (bool: boolean) => void;
  available: number;
  id: number;
}
export default function BuyButtonForm(props: IProps) {
  const [count, setCount] = useState(1);
  const [availableError, setAvailableError] = useState(false);
  const [userError, setUserError] = useState(false);

  // const user = useContext(AuthContext)
  const user = useSelector((state: RootState) => state.auth.user);

  document.onkeydown = (e) => {
    if (e.key == "ArrowLeft") {
      count <= 1 ? null : setCount(count - 1);
    }
    if (e.key == "ArrowRight") {
      setCount(count + 1);
    }
  };
  return (
    <div
      onClick={() => {
        props.setClickBuyBtn(false);
        setCount(1);
      }}
      className={`addBasket__modal ${props.style}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="addBasket">
        <p className="addBasket__title">Товар добавлен в корзину</p>
        <p className="addBasket__text">{props.clickCardText}</p>

        {availableError ? (
          <div style={{ color: "red" }}>Товара нет в наличии</div>
        ) : null}
        {userError ? (
          <div style={{ color: "red" }}>Вы должны авторизоваться</div>
        ) : null}

        <div className="addBasket__block">
          <p className="addBasket__block-text">Укажите количество:</p>
          <div className="addBasket__count-block">
            <button
              onClick={() => {
                count <= 1 ? null : setCount(count - 1);
              }}
              className="addBasket__block-btn"
            >
              -
            </button>
            <p className="addBasket__block-count">{count}</p>
            <button
              onClick={() => setCount(count + 1)}
              className="addBasket__block-btn"
            >
              +
            </button>
          </div>
        </div>

        <div className="addBasket__column">
          <button
            onClick={() => {
              if (user == null) {
                return setUserError(!userError);
              }
              if (props.available == 1) {
                axios
                  .get(
                    `https://frost.runtime.kz/api/cart/add?productId=${props.id}&count=${count}`
                  )
                  .then((resp) => {
                    console.log(resp);
                  });

                props.setClickBuyBtn(false);

                toast.success("Добавлено в корзину");
              } else {
                setAvailableError(!availableError);
              }
            }}
            className="addBasket__column-btn"
          >
            Оформить заказ
          </button>
          <button
            onClick={() => props.setClickBuyBtn(false)}
            className="addBasket__column-btn addBasket__column-btn-continue"
          >
            Продолжить выбор товаров
          </button>
        </div>
      </div>
    </div>
  );
}
