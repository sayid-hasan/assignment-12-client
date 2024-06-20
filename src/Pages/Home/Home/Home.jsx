import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import TopScholarship from "../TopScholarShip/TopScholarship";
import TopReview from "../TopReview/TopReview/TopReview";
import ContactUs from "../ContactUs/ContactUs";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Banner></Banner>
      <TopScholarship></TopScholarship>
      <TopReview></TopReview>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
