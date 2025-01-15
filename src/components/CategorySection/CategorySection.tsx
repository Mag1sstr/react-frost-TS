import "./CategorySection.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
   getBrandChange,
   getBrandData,
   getModelChange,
} from "../../store/filterSlice"
import InputCheckbox from "../InputCheckbox/InputCheckbox"
import DropdownCategory from "../DropdownCategory/DropdownCategory"
import { AppDispatch, RootState } from "../../store/store"
import { useTranslation } from "react-i18next"

interface IProps {
   getInputValue: (value: number) => void
   getBrandId: (brandId: number | string) => void
   getModelId: (modelId: number | string) => void
   getGenerationId: (generationId: number | string) => void
   setCurrentPage: (number: number) => void
}
export default function CategorySection(props: IProps) {
   const dispatch: AppDispatch = useDispatch()
   const brandData = useSelector((state: RootState) => state.filter.brandData)
   const modelsData = useSelector((state: RootState) => state.filter.modelsData)
   const generationsData = useSelector(
      (state: RootState) => state.filter.generationsData
   )

   useEffect(() => {
      dispatch(getBrandData())
   }, [])

   function inputChange(value: number) {
      props.getInputValue(value)
   }

   const { t } = useTranslation()

   return (
      <div className="product__conteiner">
         <div className="category__section">
            <div className="category__section--inner">
               <div className="category__block">
                  <div className="category__item">
                     <p className="category__item--text">{t("category")}</p>
                     <DropdownCategory title={t("all_categories")} items={[]} />
                  </div>
                  <div className="category__item">
                     <p className="category__item--text">{t("brand")}</p>
                     <DropdownCategory
                        title={t("all_brands")}
                        items={brandData}
                        onChange={function (brandId: number | string) {
                           dispatch(getBrandChange(brandId))
                           props.getBrandId(brandId)
                           props.setCurrentPage(1)
                        }}
                     />
                  </div>
                  <div className="category__item">
                     <p className="category__item--text">{t("model")}</p>
                     <DropdownCategory
                        title={t("all_models")}
                        items={modelsData}
                        onChange={function (modelId: number | string) {
                           dispatch(getModelChange(modelId))
                           props.getModelId(modelId)
                           props.setCurrentPage(1)
                        }}
                     />
                  </div>
                  <div className="category__item">
                     <p className="category__item--text">{t("generetions")}</p>
                     <DropdownCategory
                        title={t("all_generations")}
                        items={generationsData}
                        onChange={function (generationId: number | string) {
                           props.getGenerationId(generationId)
                           props.setCurrentPage(1)
                        }}
                     />
                  </div>
               </div>
               <InputCheckbox onChange={inputChange} />
            </div>
         </div>
      </div>
   )
}
