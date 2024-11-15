import "./Header.css";
import logo from "../../images/logo.png";
import inputSearch from "../../images/input-search.svg";
import basket from "../../images/basket.svg";
import ellips from "../../images/ellips.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import { deleteUser } from "../../store/authSlice";

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [clickLoginModal, setClickLoginModal] = useState(false);
  const [clickRegModal, setClickRegModal] = useState(false);

  function getClickLoginModal(bool: boolean) {
    setClickLoginModal(bool);
  }
  function getClickRegModal(bool: boolean) {
    setClickRegModal(bool);
  }

  return (
    <header className="header">
      <div className="conteiner">
        <div className="header__top">
          <div className="header__logo">
            <NavLink to="/">
              <img className="main__logo" src={logo} alt="" />
            </NavLink>
          </div>
          <div className="adaptiv__icons">
            <img src="images/adaptive/person.png" alt="" />
            <img src="images/adaptive/search.png" alt="" />
            <img src="images/adaptive/basket.png" alt="" />
          </div>
          <div className="header__city">
            <p>г. Нур-Султан</p>
            <p>г. Алматы</p>
          </div>
          <div className="header__numbers">
            <p>+7 777 777 77 77</p>
            <p>+7 777 777 77 77</p>
          </div>
          <div className="header__input">
            <input
              type="text"
              placeholder="Поиск по каталогу ..."
              className="header__input-item"
            />
            <img src={inputSearch} alt="" className="header__input-img" />
          </div>
          {user == null ? (
            <div className="header__reg">
              <a
                onClick={() => {
                  setClickLoginModal(!clickLoginModal);
                }}
                href="#"
              >
                Вход в личный кабинет
              </a>
              <LoginForm
                style={clickLoginModal ? "open" : null}
                getClickLoginModal={getClickLoginModal}
              />
              <a
                onClick={() => {
                  setClickRegModal(!clickRegModal);
                }}
                href="#"
              >
                Зарегистрироваться
              </a>
              <RegisterForm
                style={clickRegModal ? "open" : null}
                getClickRegModal={getClickRegModal}
              />
            </div>
          ) : (
            <div className="header__reg">
              <NavLink to="/personal">
                <button className="auth__user-btn">
                  {`${user.firstName} ${user.lastName}(${user.email})`}
                </button>
              </NavLink>
              <button
                onClick={() => {
                  // user.setUser(null);
                  // user.setTokenInfo(null);
                  // userRedux = null
                  dispatch(deleteUser(null));
                  localStorage.setItem("token", null);
                }}
                className="auth__user-btn"
              >
                Выйти
              </button>
            </div>
          )}
          <NavLink to="/basket" className="header__basket">
            <img src={basket} alt="" />
            <img src={ellips} alt="" className="ellips" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}
