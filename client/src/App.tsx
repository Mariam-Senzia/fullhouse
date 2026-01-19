import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateEvents from "./pages/CreateEvents";
import EventDetails from "./pages/EventDetails";
import BuyerLogin from "./pages/BuyerLogin";
import MerchantLogin from "./pages/MerchantLogin";
import BuyerSignUp from "./pages/BuyerSignUp";
import MerchantSignUp from "./pages/MerchantSignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buyerLogin" element={<BuyerLogin />} />
          <Route path="/merchantLogin" element={<MerchantLogin />} />
          <Route path="/createEvents" element={<CreateEvents />} />
          <Route path="/eventDetails" element={<EventDetails />} />
          <Route path="/buyerSignUp" element={<BuyerSignUp />} />
          <Route path="/MerchantSignUp" element={<MerchantSignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
