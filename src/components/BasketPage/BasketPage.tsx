import { useState } from "react"
import "./BasketPage.css"
import Basket from "../Basket/Basket"
import ContactInformationPage from "../ContactInformationPage/ContactInformationPage"
import DeliveryPage from "../DeliveryPage/DeliveryPage"
import CompletionPage from "../CompletionPage/CompletionPage"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

export interface IUser {
   firstName?: string
   lastName?: string
   email?: string
}
export interface IInputValue {
   name?: string
   surname?: string
   patronymic: string
   tel: string
   email?: string
}
export interface IDeliveryValue {
   region: string
   city: string
   street: string
   house: string
   apartment: string
}
export default function BasketPage() {
   let [mainStage, setMainStage] = useState(0)
   let [currentStage, setCurrentStage] = useState(1)

   const user: IUser | null = useSelector((state: RootState) => state.auth.user)
   // console.log("gi");

   // let [inputValue, setInputValue] = useState({
   //    name: user ? user.firstName : "",
   //    surname: user ? user.lastName : "",
   //    patronymic: "",
   //    tel: "",
   //    email: user ? user.email : "",
   // })

   let [inputValue, setInputValue] = useState<IInputValue>({
      name: user ? user.firstName : "",
      surname: user ? user.lastName : "",
      patronymic: "",
      tel: "",
      email: user ? user.email : "",
   })

   // console.log(inputValue)

   let [inputDeliveryValue, setInputDeliveryValue] = useState({
      region: "",
      city: "",
      street: "",
      house: "",
      apartment: "",
   })
   // const newOrder = useContext(AuthContext);

   const stagesArray = [
      {
         name: "Корзина",
         component: (
            <Basket
               setMainStage={setMainStage}
               setCurrentStage={setCurrentStage}
            />
         ),
      },
      {
         name: "Контактные данные",
         component: (
            <ContactInformationPage
               setMainStage={setMainStage}
               setCurrentStage={setCurrentStage}
               setInputValue={setInputValue}
               inputValue={inputValue}
            />
         ),
      },
      {
         name: "Доставка",
         component: (
            <DeliveryPage
               setMainStage={setMainStage}
               setCurrentStage={setCurrentStage}
               setInputDeliveryValue={setInputDeliveryValue}
               inputDeliveryValue={inputDeliveryValue}
               tel={inputValue.tel}
               area={inputDeliveryValue.region}
               city={inputDeliveryValue.city}
               street={inputDeliveryValue.street}
               house={inputDeliveryValue.house}
               apartment={inputDeliveryValue.apartment}
            />
         ),
      },
      {
         name: "Завершение",
         component: <CompletionPage />,
      },
   ]
   // console.log(mainStage);

   return (
      <>
         <section className="order">
            <div className="conteiner">
               <div className="order__inner">
                  <h2 className="order__title">Оформление заказа</h2>
                  <div className="order__buttons">
                     {stagesArray.map((el, index) => {
                        return (
                           <div
                              key={el.name}
                              onClick={() => {
                                 setMainStage(
                                    index < currentStage ? index : mainStage
                                 )
                              }}
                              className="order__link"
                              // href="#"
                           >
                              <div
                                 className={
                                    index == mainStage
                                       ? "order__btn active__order"
                                       : "order__btn"
                                 }
                              >
                                 {el.name}
                              </div>
                           </div>
                        )
                     })}
                  </div>
               </div>
            </div>
         </section>
         {stagesArray.map((comp, i) => {
            return mainStage == i ? <div key={i}>{comp.component}</div> : null
         })}
      </>
   )
}
