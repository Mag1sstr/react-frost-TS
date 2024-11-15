import { useEffect, useState } from "react";
import "./ProductPage.css";
import cardImage3 from "../images/card/03.png";
import axios from "axios";
import LoadingAnim from "./LoadingAnim/LoadingAnim";
import CategorySection from "./CategorySection/CategorySection";
import Pagination from "./Pagination/Pagination";
import ProductCard from "./ProductCard";

export default function ProductPage() {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);

  let [brandId, setBrandId] = useState<number | string | null>(null);
  let [modelId, setModelId] = useState<number | string | null>(null);
  let [generationId, setGenerationId] = useState<number | string | null>(null);
  let [available, setAvailable] = useState(0);

  useEffect(() => {
    let params = `?page=${currentPage}&size=6`;
    if (brandId) {
      params += "&brandId=" + brandId;
    } else {
      modelId = null;
      generationId = null;
    }
    if (modelId) {
      params += "&modelId=" + modelId;
    } else {
      generationId = null;
    }
    if (generationId) {
      params += "&generationId=" + generationId;
    }
    axios
      .get(
        `https://frost.runtime.kz/api/products${params}&available=${available}`
      )
      .then((resp) => {
        const data = resp.data;
        setProductData(data.items);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      });

    // console.log(params);

    // ВАЖНО: Один вызов axios.get()
  }, [currentPage, brandId, modelId, generationId, available]);

  function getBrandId(id: number | string) {
    if (id === "all") {
      setBrandId(null);
    } else {
      setBrandId(id);
    }
  }
  function getModelId(id: number | string) {
    if (id === "all") {
      setModelId(null);
    } else {
      setModelId(id);
    }
  }
  function getGenerationId(id: number | string) {
    if (id === "all") {
      setGenerationId(null);
    } else {
      setGenerationId(id);
    }
  }
  function getInputValue(value: number) {
    setAvailable(value);
  }

  interface IProductData {
    id: number;
    name: string;
    price: number;
    available: number;
  }

  return (
    <>
      <CategorySection
        getBrandId={getBrandId}
        getModelId={getModelId}
        getGenerationId={getGenerationId}
        getInputValue={getInputValue}
        setCurrentPage={setCurrentPage}
      />
      <div className="product__conteiner">
        <div className="product__row">
          {productData.length == 0 ? <LoadingAnim /> : null}
          {productData.map((el: IProductData) => {
            return (
              <ProductCard
                key={el.id}
                image={cardImage3}
                text={el.name}
                price={el.price}
                id={el.id}
                available={el.available}
              />
            );
          })}
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
