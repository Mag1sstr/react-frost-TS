import "./PersonalContactInfo.css";

export default function PersonalContactInfo() {
  return (
    <section className="personalcontactinfo">
      <div className="personalcontactinfo__inner">
        <h1 className="personalcontactinfo__title">Контактные данные</h1>
        <div className="personalcontactinfo__row">
          <div className="personalcontactinfo__block">
            <div className="personalcontactinfo__block-column">
              <p className="personalcontactinfo__text">Фамилия</p>
              <input className="personalcontactinfo__input" type="text" />
            </div>
            <div className="personalcontactinfo__block-column">
              <p className="personalcontactinfo__text">Имя</p>
              <input className="personalcontactinfo__input" type="text" />
            </div>
            <div className="personalcontactinfo__block-column">
              <p className="personalcontactinfo__text">Отчество</p>
              <input className="personalcontactinfo__input" type="text" />
            </div>
          </div>
          <div className="personalcontactinfo__block">
            <div className="personalcontactinfo__block-column">
              <p className="personalcontactinfo__text">Email</p>
              <input className="personalcontactinfo__input" type="text" />
            </div>
            <div className="personalcontactinfo__block-column">
              <p className="personalcontactinfo__text">Телефон</p>
              <input
                className="personalcontactinfo__input"
                type="text"
                placeholder="+7 (___) ___ __ __"
              />
            </div>
            <button className="personalcontactinfo__pass">
              Изменить пароль
            </button>
          </div>
        </div>
      </div>
      <div className="personalcontactinfo__button">
        <button className="personalcontactinfo__btn">
          Сохранить изменения
        </button>
      </div>
    </section>
  );
}
