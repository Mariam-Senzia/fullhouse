import EventListing from "../components/home/EventListing";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <EventListing />
      <Footer />
    </>
  );
};

export default Home;
