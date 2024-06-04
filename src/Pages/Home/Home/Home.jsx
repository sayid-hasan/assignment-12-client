import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import TopScholarship from "../TopScholarShip/TopScholarship";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Banner></Banner>
      <TopScholarship></TopScholarship>
    </div>
  );
};

export default Home;
