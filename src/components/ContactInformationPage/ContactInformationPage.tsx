import { useContext, useState } from "react";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import "./ContactInformationPage.css";
import { AuthContext } from "../../contexts/Auth/AuthContextProvider";

export default function ContactInformationPage(props) {
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const convertPhoneNumber = (inp) => {
    if (isValidPhoneNumber(inp, "RU")) {
      const phoneNumber = parsePhoneNumber(inp, "RU");
      return phoneNumber.formatNational();
    }
    return inp;
  };

  // console.log(inputValue.surname);
  // const user = useContext(AuthContext);
  // console.log(user.user);

  return (
    <>
      <div style={{ marginBottom: "30px" }} className="conteiner">
        <div className="contactinfo">
          <div className="contactinfo__inner">
            <h1 className="contactinfo__title">Контактные данные</h1>
            {error ? (
              <div style={{ color: "red" }}>Заполните все поля!</div>
            ) : null}
            <div className="contactinfo__row">
              <div className="contactinfo__block">
                <div className="contactinfo__input-block">
                  <p className="contactinfo__input-text">Фамилия</p>
                  <input
                    value={props.inputValue.surname}
                    onChange={(e) =>
                      props.setInputValue({
                        ...props.inputValue,
                        surname: e.target.value,
                      })
                    }
                    className="contactinfo__input"
                    type="text"
                  />
                </div>
                <div className="contactinfo__input-block">
                  <p className="contactinfo__input-text">Имя</p>
                  <input
                    value={props.inputValue.name}
                    onChange={(e) =>
                      props.setInputValue({
                        ...props.inputValue,
                        name: e.target.value,
                      })
                    }
                    className="contactinfo__input"
                    type="text"
                  />
                </div>
                <div className="contactinfo__input-block">
                  <p className="contactinfo__input-text">Отчество</p>
                  <input
                    value={props.inputValue.patronymic}
                    onChange={(e) =>
                      props.setInputValue({
                        ...props.inputValue,
                        patronymic: e.target.value,
                      })
                    }
                    className="contactinfo__input"
                    type="text"
                  />
                </div>
                <div className="contactinfo__input-block">
                  <p className="contactinfo__input-text">Телефон</p>
                  <input
                    value={props.inputValue.tel}
                    onChange={(e) => {
                      if (e.target.value == Number(e.target.value)) {
                        props.setInputValue({
                          ...props.inputValue,
                          tel: convertPhoneNumber(e.target.value),
                        });
                      } else {
                        props.setInputValue({
                          ...props.inputValue,
                          tel: "",
                        });
                      }
                    }}
                    className="contactinfo__input"
                    type="text"
                    placeholder="+7 (___) ___ __ __"
                  />
                </div>
              </div>
              <div className="contactinfo__line"></div>
              <div className="contactinfo__block">
                <div className="contactinfo__input-block">
                  <p className="contactinfo__input-text">E-mail</p>
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    {emailError}
                  </div>
                  <input
                    value={props.inputValue.email}
                    onChange={(e) => {
                      props.setInputValue({
                        ...props.inputValue,
                        email: e.target.value,
                      });
                      if (!re.test(String(e.target.value).toLowerCase())) {
                        setEmailError("Некорректный email");
                      } else {
                        setEmailError("");
                      }
                    }}
                    className="contactinfo__input"
                    type="text"
                  />
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
                  props.inputValue.name.length !== 0 &&
                  props.inputValue.surname.length !== 0 &&
                  props.inputValue.patronymic.length !== 0 &&
                  props.inputValue.tel.length !== 0 &&
                  props.inputValue.email.length !== 0 &&
                  emailError.length == 0
                ) {
                  props.setMainStage(2);
                  props.setCurrentStage(3);
                } else {
                  setError(!error);
                  null;
                }
              }}
              className="payment__btn"
            >
              Подтвердить
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
