import './InputCheckbox.css'
import { useState } from 'react';
export default function InputCheckbox(props){
  let [available, setAvailable] = useState(0)
    // console.log(available);
    
    return(
        <div className="availability__block">
            <div onClick={()=>{
                setAvailable(available === 0 ? available = 1 : available = 0)
                props.onChange(available)
                }} className="availability__item">
              <input className="availability__item--input" type="checkbox" />
              <p className="availability__item--text">в наличии</p>
            </div>
          </div>
    )
}