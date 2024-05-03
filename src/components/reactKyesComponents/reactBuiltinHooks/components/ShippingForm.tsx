import { memo, useState } from "react";

const ShippingForm = memo(function ShippingForm({ onSubmit }: { onSubmit: any }) {
  const [count, setCount] = useState(1);

  console.log("[ARTIFICIALLY SLOW] Rendering <ShippingForm />");
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count,
    };
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <b>
          Note: <code>ShippingForm</code> is artificially slowed down!
        </b>
      </p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ width: "500px" }}>
          Number of items:
          <button type="button" onClick={() => setCount(count - 1)}>
            –
          </button>
          {count}
          <button type="button" onClick={() => setCount(count + 1)}>
            +
          </button>
        </label>
        <label style={{ width: "500px" }}>
          Street:
          <input name="street" />
        </label>
        <label style={{ width: "500px" }}>
          City:
          <input name="city" />
        </label>
        <label style={{ width: "500px" }}>
          Postal code:
          <input name="zipCode" />
        </label>
        <button style={{ width: "500px" }} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
});

export default ShippingForm;
