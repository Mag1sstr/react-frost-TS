import "./Personal.css";
import personalImage1 from "./../../images/personal/01.svg";
import personalImage2 from "./../../images/personal/02.svg";
import { useState } from "react";
import PersonalMyOrders from "../PersonalMyOrders/PersonalMyOrders";
import PersonalContactInfo from "../PersonalContactInfo/PersonalContactInfo";

export default function Personal() {
  const [mainStage, setMainStage] = useState(0);
  const personalStages = [
    {
      name: "Мои заказы",
      image: personalImage1,
      component: <PersonalMyOrders />,
    },
    {
      name: "Контактные данные",
      image: personalImage2,
      component: <PersonalContactInfo />,
    },
  ];

  return (
    <section className="personal">
      <div className="conteiner">
        <h3 className="personal__title">Личный кабинет</h3>
        <div className="personal__row">
          <div className="my__order">
            {personalStages.map((el, index) => {
              return (
                <button
                  onClick={() => setMainStage(index)}
                  key={el.name}
                  className="my__order-link"
                >
                  <div className="order__linkrow">
                    <img className="my__order-img" src={el.image} alt="" />
                    <p>{el.name}</p>
                  </div>
                </button>
              );
            })}
          </div>
          {personalStages.map((el, index) => {
            return index == mainStage ? <div>{el.component}</div> : null;
          })}
        </div>
      </div>
    </section>
  );
}
