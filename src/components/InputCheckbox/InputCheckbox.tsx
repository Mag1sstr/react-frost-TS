import { useTranslation } from "react-i18next";
import "./InputCheckbox.css";
import { useState } from "react";

interface IProps {
  onChange: (number: number) => void;
}
export default function InputCheckbox(props: IProps) {
  const [available, setAvailable] = useState(0);
  // console.log(available);
  const { t } = useTranslation();

  return (
    <div className="availability__block">
      <div
        onClick={() => {
          setAvailable(available === 0 ? 1 : 0);
          props.onChange(available === 0 ? 1 : 0);
        }}
        className="availability__item"
      >
        <input className="availability__item--input" type="checkbox" />
        <p className="availability__item--text">{t("stock")}</p>
      </div>
    </div>
  );
}
