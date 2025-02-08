import "./BuyInfo.css";
import BuyInfoImage1 from "../../images/buyinfo/01.png";
// import BuyInfoImage2 from "../../images/buyinfo/02.png";
import BuyInfoImage3 from "../../images/buyinfo/03.png";
import BuyInfoImage4 from "../../images/buyinfo/04.png";
import BuyInfoImage5 from "../../images/buyinfo/05.png";
import PointImage from "../../images/buyinfo/point.svg";
import axios from "axios";
import { useEffect, useState } from "react";
// import LoadingAnim from "../LoadingAnim/LoadingAnim";
import notAvailableImage from "../../images/buyinfo/notAvailableImage.svg";
import { useParams } from "react-router-dom";
// import { AuthContext } from "../../contexts/Auth/AuthContextProvider";
import { useSelector } from "react-redux";
import LoadingAnim from "../LoadingAnim/LoadingAnim";
import { RootState } from "../../store/store";
import BuyButtonForm from "../BuyButtonForm/BuyButtonForm";

export default function BuyInfo() {
  interface IBuyinfoData {
    available: number;
    description: string;
    name: string;
    code: string;
    manufacturer: string;
    price: string;
    id: number;
    brand: {
      name: string;
    };
    model: {
      name: string;
    };
    generation: {
      name: string;
    };
  }

  const [buyinfoData, setBuyinfoData] = useState<IBuyinfoData | null>(null);
  const [reviews, setReviews] = useState<IReviews[]>([]);

  const [clickBuyBtn, setClickBuyBtn] = useState(false);

  const [cardImages, setCardImages] = useState([
    BuyInfoImage1,
    BuyInfoImage3,
    BuyInfoImage4,
    BuyInfoImage5,
  ]);
  const [mainCardImage, setMainCardImage] = useState(0);

  const user = useSelector((state: RootState) => state.auth.user);

  const params = useParams();

  const [textValue, setTextValue] = useState("");
  const [reviewsError, setReviewsError] = useState(false);

  useEffect(() => {
    axios
      .get(`https://frost.runtime.kz/api/products/${params.id}`)
      .then((resp) => {
        const data = resp.data;
        setBuyinfoData(data);
      });
  }, [params]);
  useEffect(() => {
    axios
      .get(`https://frost.runtime.kz/api/reviews?productId=${params.id}`)
      .then((resp) => {
        const data = resp.data;
        setReviews(data);
      });
  }, [params]);

  useEffect(() => {
    axios
      .get(`https://frost.runtime.kz/api/reviews/exists?productId=${params.id}`)
      .then((resp) => {
        console.log(resp.data);
        setReviewsError(resp.data);
      });
  }, []);

  if (buyinfoData === null) {
    return <LoadingAnim />;
  }
  interface IReviews {
    review: string;
    user: {
      firstName: string;
      lastName: string;
    };
  }

  return (
    <section className="buyinfo">
      <div className="conteiner">
        <div className="buyinfo__row">
          <div className="buyinfo__box-one">
            <div className="buyinfo__box-card">
              <img
                className="buyinfo__box-img"
                src={cardImages[mainCardImage]}
                alt=""
              />
              <div className="img__row">
                {cardImages.map((img, index) => {
                  return (
                    <img
                      key={index}
                      onClick={() => setMainCardImage(index)}
                      className="img__row-item"
                      src={img}
                      alt=""
                    />
                  );
                })}
              </div>
            </div>
            <div className="auto">
              <p className="auto__text">Применим к автомобилям:</p>
              <div className="auto__card">
                <p className="auto__text-main">- {buyinfoData.brand.name}</p>
                <p className="auto__card-text">
                  + {buyinfoData.model.name + " " + buyinfoData.generation.name}
                </p>
              </div>
            </div>
          </div>
          <div className="buyinfo__box-two">
            <div className="description__inner">
              <div className="description__content">
                <h3 className="description__title">{buyinfoData.name}</h3>
                <p className="description__text">
                  <span>Артикул:</span> {buyinfoData.code}
                </p>
                <p className="description__text">
                  <span>Производитель:</span> {buyinfoData.manufacturer}
                </p>
                <p className="description__text">
                  <span>Описание:</span> {buyinfoData.description}
                </p>
              </div>
              <div className="description__card">
                <p className="description__card-price">
                  {buyinfoData.price} тг
                </p>
                <p className="description__card-text">
                  {buyinfoData.available == 1 ? (
                    <img src={PointImage} alt="" />
                  ) : (
                    <img src={notAvailableImage} alt="" />
                  )}
                  {buyinfoData.available == 1 ? "в наличии" : "нет в наличии"}
                </p>
                <p className="city">г. Нур-Султан</p>
                <p className="city">г. Алматы</p>
                <button
                  onClick={() => {
                    setClickBuyBtn(!clickBuyBtn);
                  }}
                  className="description__card-btn"
                >
                  Купить
                </button>
                <BuyButtonForm
                  style={clickBuyBtn ? "open" : null}
                  setClickBuyBtn={setClickBuyBtn}
                  clickCardText={buyinfoData.name}
                  id={buyinfoData.id}
                  available={buyinfoData.available}
                />
              </div>
            </div>

            <div className="reviews__inner">
              {user ? (
                <div className="auth__reviews">
                  {reviewsError ? (
                    <div style={{ fontSize: "18px", fontWeight: "600" }}>
                      Вы уже оставили отзыв на товар
                    </div>
                  ) : (
                    <div className="auth__reviews">
                      <textarea
                        className="auth__reviews-input"
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        // type="text"
                        placeholder="Поделитесь своими впечатлениями о товаре."
                      ></textarea>
                      <button
                        onClick={() => {
                          axios
                            .post<IReviews>(
                              "https://frost.runtime.kz/api/reviews",
                              {
                                product_id: params.id,
                                review: textValue,
                              }
                            )
                            .then((resp) => {
                              console.log(resp.data);

                              const copyReviews = [...reviews];
                              copyReviews.unshift(resp.data);
                              setReviews(copyReviews);
                              window.location.reload();
                            });
                        }}
                        className="auth__reviews-btn"
                      >
                        Оставить отзыв
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="reviews__title">Отзывы</h3>
                  <p className="reviews__text">
                    Чтобы оставить отзыв <a href="#">войдите на сайт</a>
                  </p>
                </div>
              )}
              {reviews.map((el: IReviews, i) => {
                return (
                  <div key={i} className="reviews__card">
                    <p className="reviews__card-title">
                      {el.user.firstName + " " + el.user.lastName}
                    </p>
                    <p className="reviews__card-text">{el.review}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
