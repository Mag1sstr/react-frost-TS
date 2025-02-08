import "./Header.css";
import logo from "../../images/logo.png";
import inputSearch from "../../images/input-search.svg";
import basket from "../../images/basket.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import { deleteUser } from "../../store/authSlice";
import { AppDispatch, RootState } from "../../store/store";
import { useTranslation } from "react-i18next";

export default function Header() {
  const user = useSelector((state: RootState) => state.auth.user);
  const basketData = useSelector(
    (state: RootState) => state.basket.basketPageData
  );
  const dispatch: AppDispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(getBasketPageData());
  //   }, [basketData]);

  const [clickLoginModal, setClickLoginModal] = useState(false);
  const [clickRegModal, setClickRegModal] = useState(false);

  const [currLang, setCurrLang] = useState("EN");

  const { t, i18n } = useTranslation();

  function getClickLoginModal(bool: boolean) {
    setClickLoginModal(bool);
  }
  function getClickRegModal(bool: boolean) {
    setClickRegModal(bool);
  }

  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
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
            <p>{t("astana")}</p>
            <p>{t("almaty")}</p>
          </div>
          <div className="header__numbers">
            <p>+7 777 777 77 77</p>
            <p>+7 777 777 77 77</p>
          </div>
          <div className="header__input">
            <input
              type="text"
              placeholder={t("search")}
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
                {t("signin")}
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
                {t("reg")}
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
                  localStorage.setItem("token", "null");
                }}
                className="auth__user-btn"
              >
                {t("exit")}
              </button>
            </div>
          )}
          <div className="lang">
            <div className="lang__item">{currLang}</div>
            <div className="lang__drop">
              <div
                onClick={() => {
                  changeLanguage(currLang === "RU" ? "en" : "ru");
                  setCurrLang(currLang === "RU" ? "EN" : "RU");
                }}
                className="lang__item"
              >
                {currLang === "RU" ? "EN" : "RU"}
              </div>
            </div>
          </div>
          <NavLink to="/basket" className="header__basket">
            <img src={basket} alt="" />
            {/* <img src={ellips} alt="" className="ellips" /> */}
            <div className="ellips">{basketData?.length}</div>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
