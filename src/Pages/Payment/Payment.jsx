import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISH_KEY);
const Payment = () => {
  return (
    <div className="bg-[#F6F6F6] pt-[100px]">
      <div className=" w-full">
        <SectionTitle
          heading={" Payment"}
          subheading={"procced to payment"}
        ></SectionTitle>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <Checkout />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
