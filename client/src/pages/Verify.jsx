import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

const Verify = () => {

  const { search } = useLocation();
  const { axios, navigate, setCartitems } = useAppContext();

  const query = new URLSearchParams(search);
  const orderId = query.get("order_id");

  useEffect(() => {

    const verifyPayment = async () => {
      try {
        const { data } = await axios.post("/api/order/verify", {
          orderId,
        });

        if (data.success) {
          setCartitems({});
          toast.success("Payment Successful");
          navigate("/my-orders");
        } else {
          toast.error("Payment Failed");
          navigate("/cart");
        }

      } catch (error) {
        toast.error(error.message);
        navigate("/cart");
      }
    };

    if (orderId) verifyPayment();

  }, [orderId]);

  return <Loading />;
};

export default Verify;