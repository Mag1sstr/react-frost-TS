import { useState } from "react";
import "./ProductCard.css";
import { NavLink } from "react-router-dom";
import BuyButtonForm from "./BuyButtonForm/BuyButtonForm";

interface IProps {
  id: number;
  text: string;
  price: number;
  available: number;
  image: string;
}
export default function ProductCard(props: IProps) {
  const [clickBuyBtn, setClickBuyBtn] = useState(false);

  return (
    <>
      <div className="card">
        <div className="card__inner">
          <NavLink style={{ color: "#000" }} to={`/product/${props.id}`}>
            <img className="card__img" src={props.image} alt="" />
            <p className="card__text">{props.text}</p>
          </NavLink>
          <div className="card__button-row">
            <p className="card__price">{props.price} тг</p>

            <button
              onClick={() => {
                setClickBuyBtn(!clickBuyBtn);
              }}
              className="card-btn"
            >
              Купить
            </button>
            <BuyButtonForm
              style={clickBuyBtn ? "open" : null}
              setClickBuyBtn={setClickBuyBtn}
              clickCardText={props.text}
              id={props.id}
              available={props.available}
            />
          </div>
        </div>
      </div>
    </>
  );
}
