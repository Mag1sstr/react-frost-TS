import "./ForgotPass.css";

export default function ForgotPass() {
  return (
    <div className="forgotPass__modal">
      <div className="forgotPass">
        <p className="forgotPass__title">Восстановление пароля</p>
        <p className="forgotPass__text">
          Для получения нового пароля необходимо вписать в поле ниже адрес
          электронной почты, указанный при регистрации
        </p>
        <input
          type="text"
          className="forgotPass__input"
          placeholder="Адрес электронной почты"
        />
        <div className="forgotPass__block">
          <button className="forgotPass__btn">Отправить подтверждение</button>
          <button className="forgotPass__btn forgotPass__reg">
            Создать новую учётную запись
          </button>
        </div>
      </div>
    </div>
  );
}
