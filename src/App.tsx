import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import ProductPage from "./components/ProductPage/ProductPage";
import BuyInfo from "./components/BuyInfo/BuyInfo";
import BasketPage from "./components/BasketPage/BasketPage";
import Personal from "./components/Personal/Personal";
import { useDispatch } from "react-redux";
import { getUser } from "./store/authSlice";
import { AppDispatch } from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch: AppDispatch = useDispatch();
  dispatch(getUser());

  // dispatch(getBasketPageData());

  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<ProductPage />} />

          <Route path={`/product/:id`} element={<BuyInfo />} />

          <Route path="/basket" element={<BasketPage />} />

          <Route path="/personal" element={<Personal />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
