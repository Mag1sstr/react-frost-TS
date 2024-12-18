import "./CompletionPage.css"
import check from "./../../images/check.svg"
// import { useContext } from "react";
// import { AuthContext } from "../../contexts/Auth/AuthContextProvider";
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

export default function CompletionPage() {
   // const orderNumber = useContext(AuthContext);

   const orderNumber = useSelector(
      (state: RootState) => state.newOrder.orderNumber
   )
   return (
      <div className="conteiner">
         <div className="comletionpage">
            <div className="comletionpage__inner">
               <h1 className="comletionpage__title">Заказ успешно создан</h1>
               <div className="comletionpage__row">
                  <img src={check} alt="" />
                  <p className="comletionpage__text">
                     Заказ №{orderNumber} был создан. Вы можете просмотреть
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
   )
}
