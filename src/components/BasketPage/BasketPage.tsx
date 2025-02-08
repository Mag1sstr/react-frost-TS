import { useState } from "react";
import "./BasketPage.css";
import Basket from "../Basket/Basket";
import ContactInformationPage from "../ContactInformationPage/ContactInformationPage";
import DeliveryPage from "../DeliveryPage/DeliveryPage";
import CompletionPage from "../CompletionPage/CompletionPage";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";

export interface IUser {
  firstName?: string;
  lastName?: string;
  email?: string;
}
export interface IInputValue {
  name?: string;
  surname?: string;
  patronymic: string;
  tel: string;
  email?: string;
}
export interface IDeliveryValue {
  region: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
}
export default function BasketPage() {
  const [mainStage, setMainStage] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);

  const { t } = useTranslation();

  const user: IUser | null = useSelector((state: RootState) => state.auth.user);

  const [inputValue, setInputValue] = useState<IInputValue>({
    name: user ? user.firstName : "",
    surname: user ? user.lastName : "",
    patronymic: "",
    tel: "",
    email: user ? user.email : "",
  });

  const [inputDeliveryValue, setInputDeliveryValue] = useState({
    region: "",
    city: "",
    street: "",
    house: "",
    apartment: "",
  });

  const stagesArray = [
    {
      name: t("basket"),
      component: (
        <Basket setMainStage={setMainStage} setCurrentStage={setCurrentStage} />
      ),
    },
    {
      name: t("contact_information"),
      component: (
        <ContactInformationPage
          setMainStage={setMainStage}
          setCurrentStage={setCurrentStage}
          setInputValue={setInputValue}
          inputValue={inputValue}
        />
      ),
    },
    {
      name: t("delivery"),
      component: (
        <DeliveryPage
          setMainStage={setMainStage}
          setCurrentStage={setCurrentStage}
          setInputDeliveryValue={setInputDeliveryValue}
          inputDeliveryValue={inputDeliveryValue}
          tel={inputValue.tel}
          area={inputDeliveryValue.region}
          city={inputDeliveryValue.city}
          street={inputDeliveryValue.street}
          house={inputDeliveryValue.house}
          apartment={inputDeliveryValue.apartment}
        />
      ),
    },
    {
      name: t("completion"),
      component: <CompletionPage />,
    },
  ];
  // console.log(mainStage);

  return (
    <>
      <section className="order">
        <div className="conteiner">
          <div className="order__inner">
            <h2 className="order__title">{t("making_order")}</h2>
            <div className="order__buttons">
              {stagesArray.map((el, index) => {
                return (
                  <div
                    key={el.name}
                    onClick={() => {
                      setMainStage(index < currentStage ? index : mainStage);
                    }}
                    className="order__link"
                    // href="#"
                  >
                    <div
                      className={
                        index == mainStage
                          ? "order__btn active__order"
                          : "order__btn"
                      }
                    >
                      {el.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {stagesArray.map((comp, i) => {
        return mainStage == i ? <div key={i}>{comp.component}</div> : null;
      })}
    </>
  );
}
