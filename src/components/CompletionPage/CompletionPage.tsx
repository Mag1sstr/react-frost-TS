import "./CompletionPage.css";
import check from "./../../images/check.svg";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContextProvider";
import { NavLink } from "react-router-dom";
export default function CompletionPage() {
  const orderNumber = useContext(AuthContext);
  return (
    <div className="conteiner">
      <div className="comletionpage">
        <div className="comletionpage__inner">
          <h1 className="comletionpage__title">Заказ успешно создан</h1>
          <div className="comletionpage__row">
            <img src={check} alt="" />
            <p className="comletionpage__text">
              Заказ №{orderNumber.orderNumber} был создан. Вы можете просмотреть
              список всех ваших заказов в личном кабинете.
            </p>
            <NavLink to="/personal">
              <button className="comletionpage__btn">
                Перейти в личный кабинет
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
