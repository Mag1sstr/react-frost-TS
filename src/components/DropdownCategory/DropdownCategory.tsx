import { useEffect, useState } from "react";
import "./DropdownCategory.css";
import dropdownIcon from "../../images/drop-icon.png";

interface IProps {
  onChange?: (value: number | string) => void | null;
  items: IItems[];
  title: string;
  //   title: string;
}
interface IItems {
  id: string | number;
  name: string;
}
export default function DropdownCategory(props: IProps) {
  const [dropdown, setDropdown] = useState(false);
  const [items, setItems] = useState<IItems[] | null>(props.items);
  const [category, setCategory] = useState<null | string>(null);

  useEffect(() => {
    setItems([{ id: "all", name: props.title }, ...props.items]);
    setCategory(props.title);
  }, [props.items, props.title]);

  //   useEffect(() => {}, [props.title]);
  return (
    <div className="parent">
      <p
        className="item"
        onClick={() => {
          setDropdown(!dropdown);
        }}
      >
        {category ?? props.title}
        <img className="item__img" src={dropdownIcon} alt="" />
      </p>
      <div className={dropdown ? "dropdown active" : "dropdown"}>
        {items?.map((el: IItems) => {
          return (
            <div
              key={el.id}
              className="item"
              onClick={() => {
                setCategory(el.name);
                setDropdown(!dropdown);
                if (props.onChange) props.onChange(el.id);
              }}
            >
              {el.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
