import { NavLink } from "react-router-dom";
import './NoProductPage.css'
export default function NoProductPage(){
    return(
        <div className="conteiner">
            <div className="noproductpage__inner">
            <h1 className="noproductpage__title">Нет товара в корзине</h1>

            <NavLink to='/' className='noproductpage__home'>Вернуться на главную</NavLink>
            </div>
        </div>
    )
}