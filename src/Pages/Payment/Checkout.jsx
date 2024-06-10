import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./Styes/detailedCard.css";
import "./Styes/paymentcard.css";
import Field from "./Field";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ApplyFormModal from "./ApplyFormModal";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

// card options
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",

      color: "#454545",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

// cardFields
const CardField = ({ onChange }) => (
  <div className="  mx-auto">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

// submit button component
const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton button ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);
// error messs=age component
const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const Checkout = ({ scholarshipId }) => {
  // load data from api for schoalrsg=hip
  console.log("inside checkout", scholarshipId);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data: scholarship = {} } = useQuery({
    queryKey: ["schoalrship", scholarshipId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${scholarshipId}`);
      return res.data;
    },
  });
  const {
    applicationFees,

    universityName,
    scholarshipCategory,
    subjectCategory,
  } = scholarship;
  console.log(applicationFees);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  // laod user
  const { user } = useAuth();
  // state
  const [error, setError] = useState("");
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: user?.email,
    phone: "",
    name: "",
  });

  // modal state
  const [modal, setModal] = useState(false);

  // client secreet

  const [clientSecret, setClientSecret] = useState("");

  // api call for paymentIntent

  useEffect(() => {
    if (applicationFees) {
      axiosPublic
        .post("/create-payment-intent", { price: applicationFees })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosPublic, applicationFees]);
  console.log("client", clientSecret);
  // handle submit process EVENT

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // if (error) {
    //   card.focus();
    //   return;
    // }

    if (cardComplete) {
      setProcessing(true);
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: billingDetails,
    });

    if (error) {
      console.log("[error]", error);
      setError(error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setPaymentMethod(paymentMethod);
      setError("");
    }
    // CONFIRM PAYMENT
    const { paymentIntent, confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: billingDetails,
        },
      }
    );
    if (confirmError) {
      console.log("confirem errr", confirmError);
      toast.error("payment Error");
    }
    if (paymentIntent) {
      //   console.log("confirm payment", paymentIntent);
      setPaymentIntent(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        toast.success("payment succeeded");
        // open modal for data
        setModal(true);
        // now save info in database

        const payment = {
          email: user.email,
          name: user.displayName,
          price: applicationFees,
          date: new Date(),
          transactionId: paymentIntent.id,
          scholarshipId,
        };
        const res = await axiosPublic.post("/payments", payment);
        console.log("payment savedd", res.data);
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "thannk you for ordering",
            showCancelButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  // confirm payment

  return (
    //   DETAILED CARD
    paymentMethod && paymentIntent ? (
      <ApplyFormModal
        scholarshipId={scholarshipId}
        universityName={universityName}
        modal={modal}
        scholarshipCategory={scholarshipCategory}
        subjectCategory={subjectCategory}
        setModal={setModal}
      ></ApplyFormModal>
    ) : (
      <form
        className=" form flex flex-col justify-center  max-w-2xl mx-auto my-8"
        onSubmit={handleSubmit}
      >
        <fieldset className="FormGroup">
          {/*  */}
          <Field
            label="Name"
            id="name"
            type="text"
            placeholder="Jane Doe"
            required
            autoComplete="name"
            readonly={true}
            value={user?.displayName}
          />
          <Field
            label="Email"
            id="email"
            type="email"
            placeholder="janedoe@gmail.com"
            required
            autoComplete="email"
            readonly={true}
            value={user?.email}
          />
          <Field
            label="Phone"
            id="phone"
            type="tel"
            placeholder="(941) 555-0123"
            required
            autoComplete="tel"
            value={billingDetails.phone}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, phone: e.target.value });
            }}
          />
        </fieldset>
        <fieldset className="FormGroup flex justify-center items-center">
          <div className="grow">
            <CardField
              onChange={(e) => {
                setError(e.error);
                setCardComplete(e.complete);
              }}
            />
          </div>
        </fieldset>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        <SubmitButton
          processing={processing}
          error={error}
          disabled={!stripe || !clientSecret}
        >
          Pay {applicationFees}
        </SubmitButton>
      </form>
    )
  );
};

export default Checkout;
