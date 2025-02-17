import { useState } from "react";
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";
import "./ContactInformationPage.css";
import { IInputValue } from "../BasketPage/BasketPage";
import { useTranslation } from "react-i18next";

interface IProps {
  inputValue: IInputValue;
  setInputValue: (value: IInputValue) => void;
  setMainStage: (number: number) => void;
  setCurrentStage: (number: number) => void;
}
export default function ContactInformationPage(props: IProps) {
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { t } = useTranslation();
  const re =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const convertPhoneNumber = (inp: string) => {
    if (isValidPhoneNumber(inp, "RU")) {
      const phoneNumber = parsePhoneNumberWithError(inp, "RU");
      return phoneNumber.formatNational();
    }
    return inp;
  };

  return (
    <>
      <div style={{ marginBottom: "30px" }} className="conteiner">
        <div className="contactinfo">
          <div className="contactinfo__inner">
            <h1 className="contactinfo__title">{t("contact_info")}</h1>
            {error ? (
              <div style={{ color: "red" }}>Заполните все поля!</div>
            ) : null}
            <div className="contactinfo__row">
              <div className="contactinfo__block">
                <div className="contactinfo__input-block">
                  <p className="contactinfo__input-text">{t("surname")}</p>
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
                  <p className="contactinfo__input-text">{t("name")}</p>
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
                  <p className="contactinfo__input-text">{t("patronymic")}</p>
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
                  <p className="contactinfo__input-text">{t("telephone")}</p>
                  <input
                    value={props.inputValue.tel}
                    onChange={(e) => {
                      if (Number(e.target.value) == Number(e.target.value)) {
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
                  props.inputValue.name?.length !== 0 &&
                  props.inputValue.surname?.length !== 0 &&
                  props.inputValue.patronymic.length !== 0 &&
                  props.inputValue.tel.length !== 0 &&
                  props.inputValue.email?.length !== 0 &&
                  emailError.length == 0
                ) {
                  props.setMainStage(2);
                  props.setCurrentStage(3);
                } else {
                  setError(!error);
                }
              }}
              className="payment__btn"
            >
              {t("confirm_btn")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
