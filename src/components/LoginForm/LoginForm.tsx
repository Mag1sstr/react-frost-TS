import { useContext, useState } from "react"
import "./LoginForm.css"
import axios from "axios"
import { AuthContext } from "../../contexts/Auth/AuthContextProvider"
import { useDispatch } from "react-redux"
import { getUser, signIn } from "../../store/authSlice"

// `/api/auth/token` (POST)
// * `username`
// * `password`

// 200 - Авторизация прошла успешно (возвращает токен доступа)
// 400 - Неверный логин либо пароль

export default function LoginForm(props) {
   let [loginValue, setLoginValue] = useState({
      username: "",
      password: "",
   })
   const signInFunction = useContext(AuthContext)
   const dispatch = useDispatch()

   const [error, setError] = useState(false)
   const [requestError, setRequestError] = useState(false)

   return (
      <div
         onClick={() => {
            props.getClickLoginModal(false)
         }}
         className={`login__modal ${props.style}`}
      >
         <div onClick={(e) => e.stopPropagation()} className="login__form">
            <p className="login__form-title">Вход в учётную запись</p>
            <div className="login__form-block">
               {error ? (
                  <div style={{ color: "red" }}>Заполните все поля!</div>
               ) : null}
               {requestError ? (
                  <div style={{ color: "red" }}>Неверный логин или пароль</div>
               ) : null}
               <input
                  value={loginValue.username}
                  onChange={(e) =>
                     setLoginValue({ ...loginValue, username: e.target.value })
                  }
                  className="login__form-input"
                  type="text"
                  placeholder="Адрес электронной почты"
               />
               <input
                  value={loginValue.password}
                  onChange={(e) =>
                     setLoginValue({ ...loginValue, password: e.target.value })
                  }
                  className="login__form-input"
                  type="text"
                  placeholder="Пароль"
               />

               <div className="login__form-forgot">Забыли пароль?</div>
            </div>
            <div className="login__form-btn-block">
               <button
                  onClick={() => {
                     if (
                        loginValue.password.length == 0 &&
                        loginValue.username.length == 0
                     ) {
                        setError(!error)
                     } else {
                        // signInFunction.signIn(
                        //    loginValue.username,
                        //    loginValue.password
                        // )
                        dispatch(
                           signIn(loginValue.username, loginValue.password)
                        )
                        // dispatch(getUser())

                        props.getClickLoginModal(false)
                     }
                  }}
                  className="login__form-btn"
               >
                  Войти
               </button>
               <button className="login__form-btn reg">
                  Создать новую учётную запись
               </button>
            </div>
         </div>
      </div>
   )
}
