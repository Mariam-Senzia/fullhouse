import EventListing from "../components/home/EventListing";
import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <EventListing />
    </>
  );
};

export default Home;
