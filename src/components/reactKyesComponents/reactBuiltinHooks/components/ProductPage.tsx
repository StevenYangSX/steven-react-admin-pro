import { useCallback } from "react";
import ShippingForm from "./ShippingForm.js";
import styled from "styled-components";
const DarkComponent = styled.div`
  &.dark {
    color: white; /* Font color white */
    background-color: black; /* Background color black */
  }
  &.light {
    color: black; /* Font color white */
    background-color: none; /* Background color black */
  }
`;

export default function ProductPage({
  productId,
  referrer,
  theme,
}: {
  productId: number;
  referrer: string;
  theme: string;
}) {
  const handleSubmit = useCallback(
    (orderDetails: any) => {
      post("/product/" + productId + "/buy", {
        referrer,
        orderDetails,
      });
    },
    [productId, referrer]
  );

  //   function handleSubmit(orderDetails: any) {
  //     post("/product/" + productId + "/buy", {
  //       referrer,
  //       orderDetails,
  //     });
  //   }

  return (
    <DarkComponent className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </DarkComponent>
  );
}

function post(url: any, data: any) {
  // Imagine this sends a request...
  console.log("POST /" + url);
  console.log(data);
}
