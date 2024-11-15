import axios from "axios";
import "./RegisterForm.css";
import { useState } from "react";
export default function RegisterForm(props) {
  let [registerValue, setRegisterValue] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repeat_password: "",
  });
  let [formErrors, setFormErrors] = useState({});
  // const [emailError, setEmailError] = useState(false);
  const [passRepeatError, setPassRepeatError] = useState(false);
  const [error, setError] = useState(false);
  // const [nameError, setNameError] = useState(false);
  // const [lastNameError, setLastNameError] = useState(false);
  // const [passError, setPassError] = useState(false);

  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


    // console.log(formErrors);

  return (
    <div
      onClick={() => {
        props.getClickRegModal(false);
      }}
      className={`register__modal ${props.style}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="register__form">
        <p className="register__form-title">Создание учётной записи</p>
        <div className="register__form-block">
          {error ? (
            <div style={{ color: "red" }}>Заполните все поля</div>
          ) : null}
          {formErrors.first_name ? <div style={{ color: "red" }}>{formErrors.first_name}</div> : null}
          {formErrors.last_name ? (
            <div style={{ color: "red" }}>{formErrors.last_name}</div>
          ) : null}
          <div className="register__form-row">
            <input
              value={registerValue.first_name}
              onChange={(e) => {
                setRegisterValue({
                  ...registerValue,
                  first_name: e.target.value,
                });
              }}
              className="register__form-input"
              type="text"
              placeholder="Имя"
            />

            <input
              value={registerValue.last_name}
              onChange={(e) => {
                setRegisterValue({
                  ...registerValue,
                  last_name: e.target.value,
                });
              }}
              className="register__form-input"
              type="text"
              placeholder="Фамилия"
            />
          </div>
          
          {formErrors.email ? <div style={{ color: "red" }}>{formErrors.email}</div> : null}
          <input
            value={registerValue.email}
            onChange={(e) => {
              setRegisterValue({ ...registerValue, email: e.target.value });
              // if (!re.test(String(e.target.value).toLowerCase())) {
              //   setEmailError("Некорректный email");
              // } else {
              //   setEmailError("");
              // }
            }}
            type="text"
            className="register__form-input"
            placeholder="Адрес электронной почты"
          />
          {passRepeatError ? (
            <div style={{ color: "red" }}>Повторите пароль</div>
          ) : null}

          {formErrors.password ? <div style={{ color: "red" }}>{formErrors.password}</div> : null}

          <input
            value={registerValue.password}
            onChange={(e) => {
              setRegisterValue({ ...registerValue, password: e.target.value });
            }}
            type="text"
            className="register__form-input"
            placeholder="Пароль"
          />
          <input
            value={registerValue.repeat_password}
            onChange={(e) => {
              setRegisterValue({
                ...registerValue,
                repeat_password: e.target.value,
              });
            }}
            type="text"
            className="register__form-input"
            placeholder="Повторите пароль"
          />
        </div>
        <div className="register__form-btn-block">
          <button
            onClick={() => {
              if (registerValue.password !== registerValue.repeat_password) {
                return setPassRepeatError(!passRepeatError);
              }
              if (
                registerValue.first_name.length == 0 &&
                registerValue.last_name.length == 0 &&
                registerValue.email.length == 0 &&
                registerValue.password.length == 0 &&
                registerValue.repeat_password.length == 0
              ) {
                setError(!error);
              } else {
                axios
                  .post("https://frost.runtime.kz/api/registration", {
                    first_name: registerValue.first_name,
                    last_name: registerValue.last_name,
                    email: registerValue.email,
                    password: registerValue.password,
                  })
                  .then((resp) => {
                    console.log(resp);
                  })
                  .catch((err) => {
                    let errors = err.response.data.errors;

                    setFormErrors(errors);

                    // console.log(errors);
                    

                    // setEmailError(errors.email);
                    // setNameError(errors.first_name);
                    // setLastNameError(errors.last_name);
                    // setPassError(errors.password);
                  });
              }
            }}
            className="register__form-btn"
          >
            Зарегистрироваться
          </button>
          <button className="register__form-btn login">
            Войти в существующую учётную запись
          </button>
        </div>
      </div>
    </div>
  );
}
