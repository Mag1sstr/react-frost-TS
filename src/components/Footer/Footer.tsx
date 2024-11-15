import "./Footer.css";
import insta from "../../images/footer/Insta.svg";
import mail from "../../images/footer/mail.svg";
import phone from "../../images/footer/Phone.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="conteiner">
        <div className="footer-row">
          <div className="footer__inst">
            <img src={insta} alt="" />
            <p className="footer__text">frostauto</p>
          </div>
          <div className="footer__email">
            <img src={mail} alt="" />
            <p className="footer__text">frostauto@gmail.com</p>
          </div>
          <div className="footer__phone">
            <img src={phone} alt="" />
            <div className="footer__phone-item">
              <p className="phone__text">г. Нур-Султан</p>
              <p className="phone__number">+7 777 777 77 77</p>
            </div>
          </div>
          <div className="footer__phone">
            <img src={phone} alt="" />
            <div className="footer__phone-item">
              <p className="phone__text">г. Алматы</p>
              <p className="phone__number">+7 777 777 77 77</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
