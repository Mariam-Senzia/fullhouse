import { useLocation } from "react-router-dom";
import EventListing from "../components/home/EventListing";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";
import { useEffect, useState } from "react";

const Home = () => {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("payment") === "success") {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }
  }, []);

  return (
    <>
      <Navbar />
      {showSuccess && (
        <div className="fixed top-4 left-4 bg-green-500 text-white px-6 py-3 rounded-sm shadow-lg z-50">
          Payment successful! Your ticket will be emailed to you shortly.
        </div>
      )}
      <Hero />
      <EventListing />
      <Footer />
    </>
  );
};

export default Home;
