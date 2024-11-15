import { useEffect, useState } from "react";
import "./PersonalMyOrders.css";
import axios from "axios";

export default function PersonalMyOrders() {
  const [ordersData, setOrdersData] = useState([]);
  useEffect(() => {
    axios.get("https://frost.runtime.kz/api/orders").then((resp) => {
      //  console.log(resp)
      setOrdersData(resp.data);
    });
  }, []);
  return (
    <div className="history">
      <h3 className="history__title">История заказов</h3>
      <div className="history__row">
        <div className="number__name">
          <p>Номер заказа</p>
          <p>Наименование товара</p>
        </div>
        <div className="date__price">
          <p>Дата заказа</p>
          <p>Стоимость</p>
        </div>
      </div>
      {ordersData.map((el) => {
        let sumPrice = 0;
        for (let i of el.items) {
          sumPrice += i.product.price * i.count;
        }
        return (
          <div key={el.id} className="history__product-row">
            <p className="history__product-number">№{el.id}</p>
            <div className="history__product-column">
              {el.items.map((item) => {
                return (
                  <p className="history__product-text">{item.product.name}</p>
                );
              })}
            </div>

            <p>{new Date(el.created_at).toLocaleString()}</p>

            <div key={el.id} className="history__product-column">
              {sumPrice}
            </div>
          </div>
        );
      })}
    </div>
  );
}
