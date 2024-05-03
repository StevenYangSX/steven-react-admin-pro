import { Divider } from "antd";
import { useState } from "react";
import ProductPage from "./components/ProductPage";

const UseCallbackHook = () => {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <h4>
        <code>useCallback</code> is a React Hook that lets you cache a function definition between
        re-renders.
      </h4>
      <p>Changing "Dark Mode" will not re-render ShippingForm component.</p>
      <Divider />
      <label style={{ width: "800px" }}>
        <input type="checkbox" checked={isDark} onChange={(e) => setIsDark(e.target.checked)} />
        Dark mode ( WITH <code>useCallback</code> )
      </label>
      <hr />
      <ProductPage referrer="wizard_of_oz" productId={123} theme={isDark ? "dark" : "light"} />
      <Divider />
    </>
  );
};

export default UseCallbackHook;
