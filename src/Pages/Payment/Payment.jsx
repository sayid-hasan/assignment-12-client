import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISH_KEY);
const Payment = () => {
  const { state } = useLocation();
  //   console.log("inside payment", state?.scholarshipId);

  const scholarshipId = state?.scholarshipId;
  //   console.log(scholarshipId);
  return (
    <div className=" pt-[100px]">
      <div className=" w-full">
        <SectionTitle
          heading={" Payment"}
          subheading={"procced to payment"}
        ></SectionTitle>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <Checkout scholarshipId={scholarshipId} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
