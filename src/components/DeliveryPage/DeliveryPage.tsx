import { useContext, useState } from "react";
import "./DeliveryPage.css";
import { AuthContext } from "../../contexts/Auth/AuthContextProvider";

export default function DeliveryPage(props) {
  // let [inputValue, setInputValue] = useState(
  //   {
  //     region:'',
  //     city:'',
  //     street:'',
  //     house:'',
  //     apartment:'',
  //   }
  // )
  const [error, setError] = useState(false);
  const newOrder = useContext(AuthContext);
  return (
    <>
      <div style={{ marginBottom: "30px" }} className="conteiner">
        <div className="deliverypage">
          <div className="deliverypage__inner">
            <p className="deliverypage__title">Доставка</p>
            {error ? (
              <div style={{ color: "red" }}>Заполните все поля!</div>
            ) : null}

            <div className="deliverypage__row">
              <div className="deliverypage__block">
                <div className="deliverypage__input-block">
                  <p className="deliverypage__input-text">Область</p>
                  <input
                    value={props.inputDeliveryValue.region}
                    onChange={(e) =>
                      props.setInputDeliveryValue({
                        ...props.inputDeliveryValue,
                        region: e.target.value,
                      })
                    }
                    type="text"
                    className="deliverypage__input"
                    placeholder="Акмолинская область"
                  />
                </div>
                <div className="deliverypage__input-block">
                  <p className="deliverypage__input-text">Город или поселок</p>
                  <input
                    value={props.inputDeliveryValue.city}
                    onChange={(e) =>
                      props.setInputDeliveryValue({
                        ...props.inputDeliveryValue,
                        city: e.target.value,
                      })
                    }
                    type="text"
                    className="deliverypage__input"
                  />
                </div>
              </div>
              <div className="deliverypage__line"></div>
              <div className="deliverypage__block">
                <div className="deliverypage__input-block">
                  <p className="deliverypage__input-text">Улица</p>
                  <input
                    value={props.inputDeliveryValue.street}
                    onChange={(e) =>
                      props.setInputDeliveryValue({
                        ...props.inputDeliveryValue,
                        street: e.target.value,
                      })
                    }
                    type="text"
                    className="deliverypage__input"
                  />
                </div>
                <div className="deliverypage__input-row">
                  <div className="deliverypage__input-block">
                    <p className="deliverypage__input-text">Дом</p>
                    <input
                      value={props.inputDeliveryValue.house}
                      onChange={(e) =>
                        props.setInputDeliveryValue({
                          ...props.inputDeliveryValue,
                          house: e.target.value,
                        })
                      }
                      type="text"
                      className="deliverypage__input"
                    />
                  </div>
                  <div className="deliverypage__input-block">
                    <p className="deliverypage__input-text">Квартира</p>
                    <input
                      value={props.inputDeliveryValue.apartment}
                      onChange={(e) =>
                        props.setInputDeliveryValue({
                          ...props.inputDeliveryValue,
                          apartment: e.target.value,
                        })
                      }
                      type="text"
                      className="deliverypage__input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="payment__button">
        <div className="conteiner">
          <div className="inner">
            <button
              onClick={() => {
                if (
                  props.inputDeliveryValue.apartment.length !== 0 &&
                  props.inputDeliveryValue.city.length !== 0 &&
                  props.inputDeliveryValue.house.length !== 0 &&
                  props.inputDeliveryValue.region.length !== 0 &&
                  props.inputDeliveryValue.street.length !== 0
                ) {
                  props.setMainStage(3);
                  props.setCurrentStage(4);

                  newOrder.newOrder(
                    props.tel,
                    props.area,
                    props.city,
                    props.street,
                    props.house,
                    props.apartment
                  );
                } else {
                  setError(!error);
                  null;
                }
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
