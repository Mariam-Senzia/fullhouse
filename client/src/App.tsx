import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateEvents from "./pages/CreateEvents";
import EventDetails from "./pages/EventDetails";
import BuyerLogin from "./pages/BuyerLogin";
import MerchantLogin from "./pages/MerchantLogin";
import BuyerSignUp from "./pages/BuyerSignUp";
import MerchantSignUp from "./pages/MerchantSignUp";
import Checkout from "./pages/Checkout";
import CheckIn from "./pages/CheckIn";
import useStore from "./store/useStore";
import { useEffect } from "react";

function App() {
  const { setEvents, setHasNext } = useStore();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/publicEvents?page=1&limit=8")
      .then((resp) => resp.json())
      .then((data) => {
        setEvents(data.events);
        setHasNext(data.has_next);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buyerLogin" element={<BuyerLogin />} />
          <Route path="/merchantLogin" element={<MerchantLogin />} />
          <Route path="/createEvents" element={<CreateEvents />} />
          <Route path="/eventDetails/:id" element={<EventDetails />} />
          <Route path="/buyerSignUp" element={<BuyerSignUp />} />
          <Route path="/MerchantSignUp" element={<MerchantSignUp />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkin/:id" element={<CheckIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
