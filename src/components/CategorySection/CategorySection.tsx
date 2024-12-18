import "./CategorySection.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrandChange,
  getBrandData,
  getModelChange,
} from "../../store/filterSlice";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import DropdownCategory from "../DropdownCategory/DropdownCategory";
import { AppDispatch, RootState } from "../../store/store";

interface IProps {
  getInputValue: (value: number) => void;
  getBrandId: (brandId: number | string) => void;
  getModelId: (modelId: number | string) => void;
  getGenerationId: (generationId: number | string) => void;
  setCurrentPage: (number: number) => void;
}
export default function CategorySection(props: IProps) {
  const dispatch: AppDispatch = useDispatch();
  const brandData = useSelector((state: RootState) => state.filter.brandData);
  const modelsData = useSelector((state: RootState) => state.filter.modelsData);
  const generationsData = useSelector(
    (state: RootState) => state.filter.generationsData
  );

  useEffect(() => {
    dispatch(getBrandData());
  }, []);

  function inputChange(value: number) {
    props.getInputValue(value);
  }

  return (
    <div className="product__conteiner">
      <div className="category__section">
        <div className="category__section--inner">
          <div className="category__block">
            <div className="category__item">
              <p className="category__item--text">Категория</p>
              <DropdownCategory title="Все категории" items={[]} />
            </div>
            <div className="category__item">
              <p className="category__item--text">Марка</p>
              <DropdownCategory
                title="Все марки"
                items={brandData}
                onChange={function (brandId: number | string) {
                  dispatch(getBrandChange(brandId));
                  props.getBrandId(brandId);
                  props.setCurrentPage(1);
                }}
              />
            </div>
            <div className="category__item">
              <p className="category__item--text">Модель</p>
              <DropdownCategory
                title="Все модели"
                items={modelsData}
                onChange={function (modelId: number | string) {
                  dispatch(getModelChange(modelId));
                  props.getModelId(modelId);
                  props.setCurrentPage(1);
                }}
              />
            </div>
            <div className="category__item">
              <p className="category__item--text">Поколения</p>
              <DropdownCategory
                title="Все поколения"
                items={generationsData}
                onChange={function (generationId: number | string) {
                  props.getGenerationId(generationId);
                  props.setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <InputCheckbox onChange={inputChange} />
        </div>
      </div>
    </div>
  );
}
