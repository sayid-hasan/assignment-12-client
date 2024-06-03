import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h2>this is home</h2>
      <Banner></Banner>
    </div>
  );
};

export default Home;
